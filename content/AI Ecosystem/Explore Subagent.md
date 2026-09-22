## What it is

**Explore** is Claude Code's built-in, read-only search subagent. It's the one a coordinator delegates to when it needs to find files, grep for symbols, or locate definitions across a codebase without making any changes. It runs on Haiku by default, which keeps it fast and cheap relative to the main agent loop.

It's one of several built-in subagent types (alongside **Plan** — can explore but can't edit, used for architectural planning — and **general-purpose** — can both explore and modify, used when a task needs multi-step reasoning plus changes).

## How it fits the exam's subagent vocabulary (Domain 1)

The exam doesn't test "Explore" by name so much as the general subagent mechanics it's an instance of:

| Term | Definition |
|---|---|
| **Subagent** | "A separate Claude instance spawned by a coordinator to handle a scoped piece of work. It runs in its own context window with its own system prompt and its own tool list." |
| **Task Tool (Agent)** | "The tool a coordinator calls to delegate work to a subagent. The exam guide names it `Task`. Current Claude Code renamed it to `Agent`." |
| **AgentDefinition** | "The declaration of a subagent: its description, its instructions, and the `tools` field that scopes which tools it can reach." |
| **allowedTools** | "The list of tools a given agent is permitted to call. For a coordinator this is a gate on delegation itself: unless `allowedTools` includes `Task` (or `Agent`), the coordinator cannot spawn subagents." |

Explore, as an `AgentDefinition`, scopes its `tools` field to read-only tools (search/read, no edit/write) — that scoping is *why* it's safe to delegate to freely: it structurally cannot modify anything, regardless of what it's asked.

>[!WARNING] Exam trap
> A coordinator cannot spawn *any* subagent — Explore included — unless its own `allowedTools` includes `Task` (or `Agent`). This is a binary gate, not a default behavior.

## Why delegate to Explore instead of searching inline

Subagents run in an isolated context window. Delegating a search-heavy task to Explore keeps the noisy part (many file reads, grep results) out of the coordinator's own context, so the coordinator's window stays focused on synthesis and decision-making rather than raw search output.

## Related

- [[Model-Driven Decision-Making]]
- [[Anthropic Exam]]

## Sources

- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [1.3 Subagent Invocation and Context Passing — Claude Certification Guide](https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context)
- [Domain 1 Glossary — Claude Certification Guide](https://claudecertificationguide.com/learn/glossary/domain-1)
