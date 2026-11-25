## What it is

`tool_choice` is a **Claude API (Messages API) parameter** that controls whether Claude must call a tool, and which one. On the CCA-F it sits under structured output (official guide Task 4.3).

| Mode | Must Claude call a tool? | Who picks the tool? |
|---|---|---|
| `{"type": "auto"}` | No, it can reply with text | Claude |
| `{"type": "any"}` | Yes | Claude, from the provided tools |
| `{"type": "tool", "name": "X"}` | Yes | You (always tool X) |
| `{"type": "none"}` | No tools allowed | — |

- **Defaults:** `auto` when `tools` are provided; `none` when no tools are provided.
- **Forcing side effect (`any` / `tool`):** the API prefills the assistant turn, so the response starts with the `tool_use` block. Claude emits **no natural-language text before it**, even if asked. Want an explanation *and* the tool? Keep `auto` and say "use the get_weather tool" in the user message.
- **Exactly one call:** `disable_parallel_tool_use: true` with `any` / `tool` → exactly one tool call (with `auto` → at most one).

## How it shows up on the CCA-F

Mostly in the **Structured Data Extraction** scenario (see [[Exam Stimulus]]). The tested distinction: `auto` lets the model return text, so there is **no guarantee** of structured output; `any` guarantees a tool call but lets the model pick which tool.

**Worked example.** An extraction pipeline has `extract_invoice`, `extract_receipt` and `extract_contract`. The document type is unknown, and some responses come back as plain text instead of JSON.

- `auto` → the cause of the problem.
- Forced `extract_invoice` → pushes receipts and contracts into the wrong schema.
- **`any`** → a tool call is guaranteed and Claude picks the matching schema. ✅

Use the **forced `tool`** mode when the step is fixed (e.g. "always run `extract_metadata` first") or there is only one output schema.

>[!WARNING] Exam traps
> 1. **"auto + a firmer prompt"** guarantees nothing. If output *must* be structured → `any` or forced, not better wording.
> 2. **Forcing one tool when input varies** over-constrains. Unknown document type → `any`.
> 3. **A tool call guarantees shape, not truth.** Semantic checks (totals, conflicts, missing fields) and retry loops are still needed — see [[detected_pattern Fields]].
> 4. **Agentic loops normally use `auto`.** *(My reasoning, not sourced:)* with `any` the model can never end its turn with a plain-text answer, so the loop won't stop on its own.

## Memory hook

> **auto = "may", any = "must, you choose", tool = "must, I choose", none = "mustn't".** Unknown document type → `any`. Fixed step → forced `tool`.

## Open question — real API vs. exam (re-check after 7 Dec 2026)

Current Anthropic docs are stricter than most prep material:

- **Manual extended thinking** (`thinking: {type: "enabled"}`): `any` and `tool` return an error → use `auto` or `none`.
- **Adaptive thinking** doesn't block forcing, but a forced call **skips thinking** (no `thinking` block).
- **Claude Fable 5.2, Mythos 5.2, Opus 5.5, Sonnet 5.5, Fable 5.1, Mythos 5.1:** `any` and `tool` return **400** regardless of thinking → use `auto` + **strict tool use**, or **structured outputs** for a fixed JSON shape.
- On models that still allow forcing, the strongest setup is `tool_choice: {"type": "any"}` + `strict: true` on tool definitions: a tool is guaranteed to be called *and* its inputs follow the schema.
- Changing `tool_choice` **invalidates cached message blocks** (tool definitions and system prompt stay cached).

Exam scenarios were written for Claude 4-era models, so answer `any` / forced as the guide expects. If the 7 Dec update changes this, expect `strict: true` / structured outputs to become the correct answer.

## Related

- [[Claude Certified Architect (Foundations)]]
- [[detected_pattern Fields]]
- [[Few-Shot Prompting]]
- [[Exam Stimulus]]

## Sources

- aicertguides.com: no dedicated `tool_choice` coverage found on [/learn](https://aicertguides.com/learn) or [/quick-reference](https://aicertguides.com/quick-reference) (checked 2026-11-25)
- [Define tools — Forcing tool use (Claude Docs)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- [Implement tool use (Claude Docs)](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/implement-tool-use)
- [Task 4.3 Structured Output with Tool Use — Claude Certification Guide](https://claudecertificationguide.com/learn/4-prompt-engineering/4-3-structured-output)
- [Extraction tools and tool_choice — CertSafari](https://certsafari.com/anthropic/claude-certified-architect-foundations/learn/extraction-tools-and-tool-choice-forcing-structured-output)
