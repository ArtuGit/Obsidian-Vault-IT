## What it is

**Dynamic adaptive decomposition** is a task-decomposition strategy where the agent starts with only a **high-level goal**, investigates, and **generates or reorders subtasks based on what it discovers**. The plan isn't fixed at design time. It's rebuilt at runtime as findings come in.

Its opposite is the **fixed sequential pipeline** ([[Model-Driven Decision-Making|prompt chaining]]): predetermined steps run in order, each consuming the previous step's output, and the sequence never changes based on what the steps find.

## Why the exam tests this

Domain 1, **Agentic Architecture & Orchestration** (27%), lesson **1.6 Task Decomposition Strategies**. The question is almost always a *selection* question: given a scenario, which decomposition pattern fits? The rule is to **match the pattern to the task's characteristics, not to which one sounds more sophisticated**.

## The loop

1. Start from the goal, not from a step list.
2. Investigate (map structure, read code, gather signals).
3. Generate a prioritised set of subtasks from what was found.
4. Execute, and when a discovery changes the picture, **add, drop or reorder** subtasks.
5. Repeat until the goal is met.

In a multi-agent setup this usually looks like a coordinator spawning [[Explore Subagent|subagents]] on the fly. How many subagents it spawns, and what each one does, is a model-driven decision made mid-task.

## When to use it vs. a fixed pipeline

| Task | Pattern |
|---|---|
| Open-ended, unknown scope | **Dynamic decomposition** |
| Legacy codebase exploration | **Dynamic decomposition** |
| Security audit, research | **Dynamic decomposition** |
| Debugging an unfamiliar system | **Dynamic decomposition** |
| Steps known in advance, structured input | Fixed pipeline |
| Multi-file code review | Fixed pipeline |
| Document / data extraction, compliance checks | Fixed pipeline |

|  | Dynamic adaptive decomposition | Fixed pipeline |
|---|---|---|
| Strength | Adapts to unexpected complexity; more thorough on open-ended work | Consistent; easy to debug and monitor (you know which step produced what) |
| Weakness | Less predictable; runtime and cost vary with discoveries; harder to debug | Cannot adapt: later steps follow the original plan even after a surprise |

## Worked example (lesson's fictional bookshop)

**Task:** add tests to a legacy checkout system.

- Map the code structure → identify high-impact areas → write a prioritised test plan.
- A dependency is discovered: the **basket** module depends on the **discount** module, which has **no tests**.
- The plan is **reprioritised**: test discount first, then basket. It keeps adapting as more dependencies appear.

**Contrast showing why a fixed pipeline fails here:** a fixed pipeline that finds a deleted function used across many files **cannot add a step** to check those callers.

>[!WARNING] Exam traps
> 1. **Dynamic decomposition for a structured task** with known steps (e.g. a multi-file code review). Adaptive plans are less predictable and harder to debug. Pick the fixed pipeline.
> 2. **Fixed pipeline for open-ended investigation.** It can't respond to unexpected findings. Hard-coded investigation steps tend to either miss the real problem or waste effort on irrelevant data.
> 3. **Confusing it with the attention-dilution fix.** A review that degrades across many files (deep feedback early, shallow later, the same pattern flagged in one file and approved in another) is fixed by a **multi-pass fixed pipeline**: per-file passes plus one cross-file integration pass. Dynamic decomposition is the wrong fix, and so are a stronger model, a bigger context window, a stronger prompt, or batching without an integration pass.

>[!TIP] One-line rule
> **Known steps + structured input → fixed pipeline. Open-ended scope + unknown complexity → dynamic adaptive decomposition.**

## Related

- [[Model-Driven Decision-Making]]
- [[Explore Subagent]]
- [[Claude Certified Architect (Foundations)]]

## Sources

- [1.6 Task Decomposition Strategies — AI Cert Guides](https://aicertguides.com/learn/1-agentic-architecture/1-6-task-decomposition) (checked 2026-11-24; re-check after the 7 Dec 2026 exam update)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
