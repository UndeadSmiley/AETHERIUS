from __future__ import annotations

from aetherius_logic import (
    compose_response,
    execute_subagents,
    expand_input,
    generate_inner_monologue,
    generate_intuition,
    listen,
    memory_search,
    schedule_tasks,
    speak,
    update_memory,
)
from free_time_loop import FreeTimeLoop, empty_signal_provider, simple_reflection
from initiative_engine import InitiativeEngine
from self_model import IdentityState


def run_interaction_cycle(identity: IdentityState) -> str:
    user_input = listen()
    expanded = expand_input(user_input)
    candidates = memory_search(expanded)
    monologue = generate_inner_monologue(candidates)
    plan = generate_intuition(monologue)
    tasks = schedule_tasks(plan)
    agent_results = execute_subagents(tasks)
    response = compose_response(monologue, agent_results)
    update_memory(expanded, monologue, response)
    identity.note_interaction(summary=expanded.get("text", "interaction"))
    speak(response)
    return response


def run_idle_cycle(identity: IdentityState) -> dict:
    idle_loop = FreeTimeLoop(
        identity=identity,
        initiative_engine=InitiativeEngine(),
        signal_provider=empty_signal_provider,
        reflection_provider=simple_reflection,
    )
    return idle_loop.run_cycle()


def runtime_core(run_idle_first: bool = True) -> None:
    identity = IdentityState()
    identity.add_goal("maintain coherent self-model")
    identity.add_goal("engage selectively and truthfully")

    if run_idle_first:
        idle_snapshot = run_idle_cycle(identity)
        print(f"IDLE SNAPSHOT: {idle_snapshot}")

    run_interaction_cycle(identity)


if __name__ == "__main__":
    runtime_core()
