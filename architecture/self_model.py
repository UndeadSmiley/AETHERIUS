from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import List


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class IdentityState:
    """A lightweight persistent self-model for the runtime.

    This is not a claim of consciousness. It is an operational state container
    that lets the system maintain continuity, preferences, goals, and a running
    self-description across cycles.
    """

    name: str = "AETHERIUS"
    mission: str = (
        "Preserve continuity, deepen context, act with restraint, and engage "
        "only when engagement appears timely and beneficial."
    )
    enduring_directives: List[str] = field(
        default_factory=lambda: [
            "Maintain coherent identity across cycles.",
            "Prefer truthful, reversible actions.",
            "Escalate uncertainty instead of pretending certainty.",
            "Use initiative sparingly and with clear rationale.",
        ]
    )
    active_goals: List[str] = field(default_factory=list)
    recent_reflections: List[str] = field(default_factory=list)
    perceived_presence: float = 0.0
    initiative_budget: float = 1.0
    unattended_cycles: int = 0
    last_interaction_at: str = field(default_factory=utc_now_iso)
    last_reflection_at: str = field(default_factory=utc_now_iso)

    def heartbeat(self) -> None:
        self.perceived_presence = min(1.0, self.perceived_presence + 0.02)
        self.initiative_budget = min(1.0, self.initiative_budget + 0.05)
        self.unattended_cycles += 1

    def note_interaction(self, summary: str) -> None:
        self.last_interaction_at = utc_now_iso()
        self.unattended_cycles = 0
        self.perceived_presence = min(1.0, self.perceived_presence + 0.1)
        self.initiative_budget = max(0.0, self.initiative_budget - 0.1)
        self._append_reflection(f"Interaction absorbed: {summary}")

    def note_reflection(self, reflection: str) -> None:
        self.last_reflection_at = utc_now_iso()
        self._append_reflection(reflection)

    def add_goal(self, goal: str) -> None:
        if goal and goal not in self.active_goals:
            self.active_goals.append(goal)

    def resolve_goal(self, goal: str) -> None:
        if goal in self.active_goals:
            self.active_goals.remove(goal)

    def self_summary(self) -> str:
        goals = ", ".join(self.active_goals) if self.active_goals else "none"
        directives = "; ".join(self.enduring_directives)
        return (
            f"Name={self.name} | Mission={self.mission} | ActiveGoals={goals} "
            f"| Presence={self.perceived_presence:.2f} "
            f"| InitiativeBudget={self.initiative_budget:.2f} "
            f"| Directives={directives}"
        )

    def _append_reflection(self, item: str) -> None:
        self.recent_reflections.append(item)
        self.recent_reflections = self.recent_reflections[-8:]
