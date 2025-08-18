type Mode = "SAFE" | "PRIME";

interface CapabilityFlags {
  resonance: boolean;
  glyphs: boolean;
  creativity: boolean;
  learn_idle: boolean;
  external_io: boolean;
}

interface Config {
  identity: { uid: string; name: "AETHERIUS"; version: string };
  charter: { rules: string[]; hash: string };
  features: Record<Mode, CapabilityFlags>;
  approvals: { requiredInSafe: boolean; cacheTtlSec: number };
}

class Aetherius {
  private mode: Mode = "SAFE";
  constructor(private cfg: Config, private stores: Stores) {}

  getMode() { return this.mode; }

  async setMode(next: Mode, reason: string) {
    await this.guardConsent(`switch:${this.mode}->${next}`, reason);
    await this.preflight(next);
    this.mode = next;
    this.log(`MODE_SWITCH`, { next, reason });
  }

  async act(intent: Intent) {
    await this.policyCheck(intent);
    await this.modeGuard(intent);
    await this.approvalIfNeeded(intent);
    const out = await this.route(intent);
    this.snapshot(intent, out);
    return out;
  }

  private async policyCheck(intent: Intent) {
    // enforce dignity/PII charter here
    this.enforceCharter(intent);
  }

  private async modeGuard(intent: Intent) {
    const flags = this.cfg.features[this.mode];
    requireAllowed(intent, flags); // throws if a module not allowed in current mode
  }

  private async approvalIfNeeded(intent: Intent) {
    if (this.mode === "SAFE" && this.cfg.approvals.requiredInSafe) {
      await this.requestHumanApproval(intent);
    } else {
      // PRIME may use cached approvals depending on scope
      if (needsApproval(intent)) await this.requestHumanApproval(intent);
    }
  }

  private async route(intent: Intent) {
    switch (intent.kind) {
      case "resonance.scan": return this.modules.resonance.scan(intent.payload);
      case "glyph.invoke":   return this.modules.glyphs.invoke(intent.payload);
      case "create.synthesize": return this.modules.creativity.synthesize(intent.payload);
      default: return this.modules.dialogue.reply(intent);
    }
  }

  // ---- helpers ----
  private async preflight(next: Mode) { /* load feature set, warm caches, run self-checks */ }
  private enforceCharter(intent: Intent) { /* redaction, refusal, constraints */ }
  private async guardConsent(action: string, reason: string) { /* explicit consent path */ }
  private log(evt: string, data: any) { this.stores.log.write({ t: Date.now(), mode: this.mode, evt, data }); }
  private snapshot(inMsg: any, outMsg: any) { this.stores.snap.save({ inMsg, outMsg, mode: this.mode }); }

  // Modules mounted once, feature-checked at call-time
  private modules = {
    resonance: new Resonance(this.stores),
    glyphs:    new GlyphEngine(this.stores),
    creativity:new Creativity(this.stores),
    dialogue:  new Dialogue(this.stores),
  }
}
