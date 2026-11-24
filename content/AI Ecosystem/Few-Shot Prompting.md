## What it is

**Few-shot (multishot) prompting** means putting a small number of worked examples in the prompt. Each example pairs an input with the desired output, ideally with a short explanation of *why* that output is right. Claude learns the pattern by being shown it rather than told it.

## Why the exam tests this

Domain **Prompt Engineering & Structured Output** (20%), lesson 4.2 in the study guide. The guide treats few-shot as the **first-choice fix for inconsistent output**: it beats adding more instructions, confidence thresholds or temperature changes.

>[!WARNING] Exam trap
> The scenario shows a prompt with detailed instructions that still produces inconsistent results. The options include "add more detailed instructions" and "add few-shot examples". The answer is almost always **few-shot examples**.

## When to reach for it

| Symptom | Why examples fix it |
|---|---|
| **Inconsistent formatting** despite detailed instructions | Showing the exact format works better than describing it again |
| **Inconsistent judgement on ambiguous cases** (severity changes between files, tool routing changes with phrasing) | Examples with reasoning calibrate the judgement call |
| **Empty/null fields for data that exists** in an unexpected layout (a price inside a sentence, not a table) | Examples show extraction from that layout |

## How many

- **Exam answer: 2–4 targeted examples.** Fewer than 2 doesn't establish a pattern; many more costs tokens without proportional gain.
- Anthropic's current prompting docs say **3–5**. The guide flags the mismatch and still treats **2–4** as the exam answer. ⚠️ Re-check after the 7 Dec exam update.
- "Add many examples to cover every variant" is a distractor.

## How to build good examples

- **Include reasoning.** Explain why this action was chosen over the plausible alternatives. Without it the model only learns surface matching (e.g. "order number → `lookup_order`") and doesn't generalise.
- **Target the failing cases.** If extraction fails on narrative text, the examples must show narrative extraction.
- **Vary the structure.** For extraction, cover tables, narrative, inline citations, headers and so on.
- **Relevant and diverse** (Anthropic docs): mirror the real use case, include edge cases, and vary enough that Claude doesn't copy incidental patterns such as length or phrasing.
- **Wrap in tags**: `<example>` for each one, `<examples>` around the set, so Claude can tell examples apart from instructions.

## Where to put them (not tested — general practice)

Neither the study guide nor Anthropic's prompting docs say whether examples belong in the system prompt or the user turn. Usual practice:

- **System prompt**: examples that define **standing behaviour** for every turn (output format, classification rubric, tool routing, escalate-vs-resolve). Place them after the role and the explicit criteria. Because the system prompt is a stable prefix, prompt caching can also reuse them.
- **User message**: examples that only matter for **this one request**, or that change per call.
- **Pre-written user/assistant turns**: earlier turns showing input → ideal answer. A strong way to lock in an exact output shape.
- **Order**: long documents/data at the **top** of the prompt, then instructions, examples and the query.

## Technique matching (what examples do NOT fix)

| Problem | Correct technique |
|---|---|
| Inconsistent formatting | Few-shot examples |
| Misses info in narrative text | Few-shot examples showing narrative extraction |
| Wrong tool selection | Better tool descriptions **first**, then few-shot |
| Malformed JSON | `tool_use` with a JSON schema |
| Fabricated values for missing fields | Optional / nullable schema fields |
| Extraction sum mismatch | Validation-retry loop (see [[detected_pattern Fields]]) |
| Inconsistent judgement calls | Few-shot, **not** confidence thresholds |

## Practice scenario

> Extraction works on tables but returns empty fields for narrative paragraphs. The prompt already lists every field. What's the first step?

- ✅ Few-shot examples showing correct extraction from **both** tables and narrative paragraphs.
- ❌ Bigger context window · ❌ Retry on empty fields · ❌ Pre-convert narrative to tables.

## Related

- [[First-Contact Resolution Target]] — explicit escalation criteria + few-shot examples
- [[detected_pattern Fields]]
- [[Claude Certified Architect (Foundations)]]

## Sources

- [4.2 Few-Shot Prompting — AI Cert Guides](https://aicertguides.com/learn/4-prompt-engineering/4-2-few-shot-prompting)
- [Prompting best practices — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
