## What it is

**First-contact resolution (FCR)** is a customer-support metric: the share of cases fully resolved in the first interaction, without a follow-up, callback or hand-off to someone else.

On the exam it comes from **Scenario 1: Customer Support Resolution Agent**. The agent is built with the Claude Agent SDK, handles returns, billing disputes and account issues, and uses custom MCP tools (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`). The stated goal is **80%+ first-contact resolution while knowing when to escalate**.

## Why the exam tests this

Scenario 1 draws mostly on **Agentic Architecture & Orchestration** (hooks, workflow enforcement, handoff), **Tool Design & MCP Integration** (tool descriptions and errors) and **Context Management & Reliability** (escalation and ambiguity). Prep sites list these three as the scenario's primary domains, which makes it one of the most heavily weighted scenarios. The 80% figure is not a number to maximise. It tests **escalation calibration**: whether the agent resolves the right cases itself and escalates the rest.

>[!WARNING] Exam trap
> A high FCR number is not automatically good. An agent that never escalates would score high on FCR and still be wrong. A wrong resolution, such as a refund over the policy cap, counts as a failure, not as an FCR win.

## The two halves of the target

| Half | Meaning | Failure mode |
|---|---|---|
| **Resolve enough** | Routine cases (standard returns, simple billing questions) close without a human | Over-escalation, so FCR drops below target |
| **Escalate correctly** | Policy exceptions and gaps go to a human | Under-escalation: the agent handles complex cases on its own and gets them wrong |

## Typical question pattern

> The agent is well **below 80% FCR**. Logs show it **escalates straightforward cases** while **attempting complex ones on its own**, such as policy exceptions. What's the most effective fix?

- ✅ **Explicit escalation criteria in the system prompt, with few-shot examples** of escalate vs. resolve.
- ❌ The agent self-reports a confidence score (1–10) and escalates below a threshold, because self-reported confidence is unreliable.
- ❌ Sentiment analysis drives escalation, because sentiment doesn't measure how complex a case is.
- ❌ A separate classifier model trained on historical tickets, which is too much machinery for a first fix.

## Valid vs. invalid escalation triggers

**Valid**

- The customer **explicitly asks for a human**. Escalate immediately, without investigating first.
- A **policy exception or gap**: for example, a refund above the cap, or a case the policy doesn't cover.
- The agent **can't make meaningful progress**.
- The customer is frustrated but the issue is within the agent's ability: acknowledge it and offer a resolution. Escalate if the customer **repeats** that they want a human.

**Invalid** (unreliable proxies for how complex a case is)

- Sentiment or frustration on its own. An angry customer with a valid policy denial doesn't need escalating just for being upset.
- The model's raw, self-reported confidence. Compare [[Confidence-Based Routing]], where only a confidence score **calibrated** against a labelled validation set is a valid signal; that applies to extraction and review pipelines, not to this prompt-calibration question.

## Related patterns in the same scenario

- **Hard limits go in hooks, not prompts.** A refund cap and required ID verification are enforced in code, for example with a PreToolUse hook that blocks `process_refund` above the cap or before `get_customer` has verified the customer. Prompt-only rules are probabilistic and will sometimes be broken.
- **Structured handoff.** On escalation the human gets a summary, not the raw transcript: customer ID, issue, what was already tried, root cause, amount and recommended action.

## Memory hook

> **FCR 80% = resolve the routine cases, escalate the right ones.** When calibration is off, fix it with **explicit criteria and few-shot examples**, not with confidence scores or sentiment.

## Related

- [[Confidence-Based Routing]]
- [[Confidence Score]]
- [[Model-Driven Decision-Making]]
- [[Claude Certified Architect (Foundations)]]

## Sources

- [Claude Certified Architect – Foundations Exam Guide (SlideShare copy)](https://www.slideshare.net/slideshow/claude-certified-architect-foundations-certification-exam-guide/286518975)
- [Study Guide based on the official exam guide — claude-certified-architect-practice-tests](https://claude-certified-architect-practice-tests.pages.dev/docs/guide_en.MD)
- [Customer Support Resolution Agent — claudearchitectcertification.com](https://claudearchitectcertification.com/scenarios/customer-support-resolution-agent)
- [D1 Agentic Architecture & Orchestration — AI Cert Guides](https://aicertguides.com/learn/1-agentic-architecture) (lesson 1.4 "Workflow Enforcement and Handoff"; no FCR detail on the overview page)
