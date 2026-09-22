## What it is

**Model-driven decision-making** means letting Claude decide, at runtime, how to break down or route a task — rather than fixing the logic in advance as code. The exam frames this as a choice between two task-decomposition strategies, and knowing which one fits a given scenario is one of the most heavily tested judgment calls in Domain 1.

## Model-driven decision vs. a hardcoded decision tree

| | **Prompt Chaining** (hardcoded) | **Dynamic Adaptive Decomposition** (model-driven) |
|---|---|---|
| Definition | "A fixed sequential decomposition: the task is split at design time into an ordered series of steps, and each step receives the previous step's output." | "Letting the model decide at runtime how to break a task up, rather than fixing the steps in advance." |
| When it fits | Known steps, structured input | Open-ended scope, unknown complexity |
| Strength | Consistency, debuggability | Adaptability to what it actually finds |
| Weakness | Cannot adapt to unexpected findings | Less predictable, harder to debug |
| Example use case | Code review pipeline, document processing, compliance checks | Legacy system exploration, security audits, debugging an unfamiliar codebase |

>[!TIP] Selection rule the exam tests
> **Known steps + structured input → hardcode it** (prompt chaining). **Open-ended scope + unknown complexity → let the model decide** (dynamic decomposition). Hard-coding investigation steps for an open-ended problem "tends to either miss the actual problem or waste effort gathering irrelevant data."

## Why this matters beyond decomposition

The same model-driven-vs-hardcoded tension shows up in system-prompt design, not just task decomposition:

- Use **general principles** for judgment-heavy behavior (adaptive explanations, learning from signals).
- Use **explicit conditionals** for safety-critical triggers (emergency detection, regulated-workflow entry points).

The pattern is consistent across the exam: fix in code only what must never vary; leave everything that requires judgment about an unknown situation to the model.

## Where subagents fit in

Dynamic adaptive decomposition is usually what's happening when a coordinator spawns [[Explore Subagent|subagents]] on the fly based on what it discovers — the number and shape of subagent calls isn't decided up front, it's a model-driven decision made mid-task.

## Related

- [[Explore Subagent]]
- [[Confidence-Based Routing]]
- [[Anthropic Exam]]

## Sources

- [1.6 Task Decomposition Strategies — Claude Certification Guide](https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition)
- [Domain 1 Glossary — Claude Certification Guide](https://claudecertificationguide.com/learn/glossary/domain-1)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
