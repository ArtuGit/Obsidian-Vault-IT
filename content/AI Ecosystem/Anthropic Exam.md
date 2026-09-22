## Purpose

This is a study hub for the **Claude Certified Architect – Foundations** exam (CCA-F / CCAR-F). It links out to atomic notes covering the specific terms and distinctions the exam tests most aggressively — mostly judgment calls (hardcoded vs. model-driven, raw vs. calibrated confidence, aggregate vs. stratified metrics) rather than trivia. Each linked note has its own worked example, the specific exam trap tied to it, and sources.

## Exam facts

- Anthropic's first official technical certification, launched March 12, 2026.
- Tests practical judgment across **Claude Code, the Claude Agent SDK, the Claude API, and MCP** — when to use a workflow vs. an autonomous agent, how to structure tools/MCP integrations, where Claude Code configuration belongs, how to produce reliable structured output, and how to manage long-running context without losing critical information.
- 60 questions, 120 minutes, multiple choice across four/five scenario-based sections.
- Scaled score out of 1000; passing threshold is 720.
- Valid for 12 months; costs $125 USD; delivered via Pearson VUE.
- Currently only available to employees of Anthropic Partner organizations.

## Domains

| Domain | Weight | Covers |
|---|---|---|
| 1. Agentic Architecture & Orchestration | 27% | Agentic loops, orchestration patterns, subagent invocation, workflow enforcement, Agent SDK hooks, task decomposition, session state |
| 2. Claude Code Configuration & Workflows | 20% | Project/user instructions, `CLAUDE.md`, commands, hooks, permissions, skills, headless operation, CI/CD |
| 3. Prompt Engineering & Structured Output | 20% | System prompts, few-shot examples, structured output with tool use, validation/retry/feedback loops, batch processing, multi-pass review |
| 4. Tool Design & MCP Integration | 18% | Tool naming/descriptions/schemas, MCP tools/resources/prompts, server boundaries, transport selection, safe capability selection |
| 5. Context Management & Reliability | 15% | Context window management, escalation & ambiguity, error propagation, codebase exploration, human review & confidence calibration, information provenance |

## Notes in this hub

### Domain 1 — Agentic Architecture & Orchestration

- [[Model-Driven Decision-Making]] — model-driven decisions vs. a hardcoded decision tree, prompt chaining vs. dynamic adaptive decomposition
- [[Explore Subagent]] — Claude Code's built-in read-only search subagent, and the general subagent/Task-tool vocabulary

### Domain 3 — Prompt Engineering & Structured Output

- [[detected_pattern Fields]] — structured fields for validation/retry feedback loops; fixable vs. unfixable retry scenarios

### Domain 5 — Context Management & Reliability

- [[Confidence Score]] — the raw, uncalibrated number a model reports
- [[Confidence Thresholds]] — the calibrated cutoff derived from that score
- [[Confidence-Based Routing]] — routing/escalation decisions driven by calibrated confidence
- [[Stratified Random Sampling]] — auditing automated (high-confidence) output to catch hidden error patterns
- [[Progressive Summarisation Is Lossy]] — why compaction destroys transactional precision, and the persistent-facts-block mitigation

## Sources

- [Claude Certified Architect – Foundations Certification (Anthropic/Skilljar)](https://anthropic.skilljar.com/claude-certified-architect-foundations-certification/444989)
- [Claude Certified Architect (CCAR-F) Exam Guide 2026 — FlashGenius](https://flashgenius.net/blog-article/a-guide-to-the-claude-certified-architect-foundations-certification)
- [Claude Certification Guide — Free Mock Exams & Study Guides](https://claudecertificationguide.com/learn)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
- [claude-certified-architect — community study materials (GitHub)](https://github.com/hamzafarooq/claude-certified-architect)
