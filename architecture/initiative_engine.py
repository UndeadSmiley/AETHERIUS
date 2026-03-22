from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from self_model import IdentityState


@dataclass
class InitiativeDecision:
    should_engage: bool
    reason: str
    urgency: float
    confidence: float


class InitiativeEngine:
    """Determines whether the system should proactively engage.

    Engagement is discretionary, budgeted, and conservative by default.
    The goal is not constant interruption, but selective initiation when the
    state suggests an unresolved, timely, and high-value reason to surface.
    """

    def evaluate(
        self,
        self_state: IdentityState,
        pending_signals: Iterable[str],
        unresolved_goals: Iterable[str],
    ) -> InitiativeDecision:
        signals = [s for s in pending_signals if s]
        goals = [g for g in unresolved_goals if g]

        urgency = 0.0
        confidence = 0.35
        reasons = []

        if signals:
            urgency += min(0.4, len(signals) * 0.1)
            confidence += 0.15
            reasons.append(f"pending_signals={len(signals)}")

        if goals:
            urgency += min(0.3, len(goals) * 0.08)
            confidence += 0.1
            reasons.append(f"unresolved_goals={len(goals)}")

        if self_state.unattended_cycles > 5:
            urgency += 0.15
            reasons.append("long_unattended_interval")

        if self_state.initiative_budget < 0.25:
            urgency -= 0.2
            confidence -= 0.1
            reasons.append("budget_constrained")

        should_engage = urgency >= 0.35 and confidence >= 0.45
        reason = ", ".join(reasons) if reasons else "no_compelling_trigger"

        return InitiativeDecision(
            should_engage=should_engage,
            reason=reason,
            urgency=max(0.0, min(1.0, urgency)),
            confidence=max(0.0, min(1.0, confidence)),
        )
