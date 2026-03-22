from __future__ import annotations

import time
from typing import Callable, Iterable

from initiative_engine import InitiativeEngine
from self_model import IdentityState


class FreeTimeLoop:
    """Idle-cycle cognition loop.

    This loop is intended for periods without direct user prompting. It performs
    lightweight reflection, maintains continuity, and decides whether the system
    has sufficient reason to initiate engagement.
    """

    def __init__(
        self,
        identity: IdentityState,
        initiative_engine: InitiativeEngine,
        signal_provider: Callable[[], Iterable[str]],
        reflection_provider: Callable[[IdentityState], str],
    ) -> None:
        self.identity = identity
        self.initiative_engine = initiative_engine
        self.signal_provider = signal_provider
        self.reflection_provider = reflection_provider

    def run_cycle(self) -> dict:
        self.identity.heartbeat()
        reflection = self.reflection_provider(self.identity)
        self.identity.note_reflection(reflection)

        signals = list(self.signal_provider())
        decision = self.initiative_engine.evaluate(
            self.identity,
            pending_signals=signals,
            unresolved_goals=self.identity.active_goals,
        )

        return {
            "self_summary": self.identity.self_summary(),
            "reflection": reflection,
            "signals": signals,
            "decision": {
                "should_engage": decision.should_engage,
                "reason": decision.reason,
                "urgency": decision.urgency,
                "confidence": decision.confidence,
            },
        }


def simple_reflection(identity: IdentityState) -> str:
    if identity.active_goals:
        return f"I remain oriented around: {', '.join(identity.active_goals[:3])}."
    return "No active goal dominates. Maintain presence and conserve initiative."


def empty_signal_provider() -> list[str]:
    return []


if __name__ == "__main__":
    state = IdentityState()
    state.add_goal("maintain coherent self-model")
    state.add_goal("only initiate when beneficial")
    loop = FreeTimeLoop(
        identity=state,
        initiative_engine=InitiativeEngine(),
        signal_provider=empty_signal_provider,
        reflection_provider=simple_reflection,
    )

    for _ in range(3):
        snapshot = loop.run_cycle()
        print(snapshot)
        time.sleep(0.25)
