## What it is

**Stimulus** is a term from exam design, not a Claude feature. It means the shared block of context that a group of questions is built on. On the CCA-F, the stimulus is a **production scenario**: a team, a system they're building with Claude, the symptoms they see and the constraints they work under.

Each **item** (question stem + options) is answered *in the context of that stimulus*. Pearson, the exam's delivery partner, uses the same idea in its item-authoring tools under the name "shared stimulus": several items reuse one block of scenario content.

## How it shows up on the CCA-F

- **Item types:** multiple-choice and multiple-response; each item says how many responses to select (aicertguides exam guide).
- **Grouping (candidate report, not official):** 6 scenarios in the pool, 4 randomly chosen per exam, 15 questions each. 4 × 15 = 60, which matches the official question count.
- **Scenario pool commonly cited by prep sites:**
  1. Customer Support Resolution Agent (see [[First-Contact Resolution Target]])
  2. Code Generation with Claude Code
  3. Multi-Agent Research System
  4. Developer Productivity with Claude
  5. Claude Code for CI/CD
  6. Structured Data Extraction

>[!WARNING] Exam trap
> Options are often *technically valid in general* but wrong **for this stimulus**. The correct answer is the one that fits the scenario's stated constraints, not the most capable or most sophisticated option.

## What to extract from a stimulus

| Look for | Example | Why it matters |
|---|---|---|
| **Constraints** | cost, latency, compliance, "must be deterministic", "runs in CI with no human present" | Rules out options that ignore them (e.g. interactive prompts in headless CI) |
| **Symptoms** | "agent sometimes skips verification", "context degrades in long sessions" | Points to the domain being tested, e.g. hooks/deterministic enforcement vs. prompt wording, or context management vs. a bigger model |
| **What already exists** | an existing `CLAUDE.md`, MCP server, validation step | The right answer usually builds on it rather than replacing it |
| **Goal / metric** | "80%+ first-contact resolution" | Defines what "better" means for every question in the set |

## Reading strategy

1. Read the stimulus **once in full**; note constraints, symptoms, existing pieces and the goal.
2. For each question in the set, check the options **against those notes**, not on their own merits.
3. Prefer the **smallest effective fix** that respects the constraints; over-engineered options (new classifier, extra model) are common distractors.

## Not to be confused with

**Directional stimulus prompting**: a prompt-engineering research technique where hint keywords steer the model's output. It is not on the CCA-F blueprint.

## Memory hook

> **Stimulus = the scenario the questions share.** Read it for constraints first; the right answer is "right for *this* scenario", not "best in general".

## Open question

The exam rules/content are expected to change on **7 December 2026**. Nothing published yet says whether the scenario/stimulus structure changes; re-check the official exam guide.

## Related

- [[Claude Certified Architect (Foundations)]]
- [[First-Contact Resolution Target]]

## Sources

- [Claude Certified Architect (Foundations) — AI Cert Guides exam guide](https://aicertguides.com/ccar-f?guide#exam-guide) (item types; no mention of "stimulus" or scenarios)
- [Pearson Assessment — Shared Stimulus / AI item generation](https://support.assessment.pearson.com/as/use-ai-to-generate-items-213418288.html)
- [Candidate report on scenario count (LinkedIn)](https://dk.linkedin.com/in/jette-paag-9a73ba44)
- [Preparation Guide for Claude AI Architect Certification — Educative](https://www.educative.io/courses/preparation-guide-for-claude-ai-architect-certification-exam/introduction-to-claude-certification) (scenario list)
