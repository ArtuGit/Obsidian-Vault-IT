## What it is

**Stratified random sampling**, in this exam's context, means randomly sampling extractions *for human review* in a way that's stratified by segment — document type, field, and confidence band — rather than sampled uniformly or drawn only from low-confidence items. Critically, the sample must include **high-confidence, already-automated** items, not just the ones already flagged for review.

## Why the exam tests this

Domain 5, **Context Management & Reliability** (15%), Human Review & Confidence Calibration. This is the audit mechanism that makes [[Confidence-Based Routing]] and [[Confidence Thresholds]] trustworthy *after* automation begins, not just at the moment they're set.

## The core reasoning: why sample the automated items at all

>[!TIP]
> Low-confidence items are already routed to human review by design — sampling those tells you nothing new. High-confidence items are automated and nobody is looking at them. **If the model develops a novel error pattern that affects high-confidence extractions, only stratified sampling will catch it.**

## Exam traps (all four are tested)

| Trap | Why it's wrong |
|---|---|
| Using aggregate accuracy for automation decisions | "97% overall" can hide 40%+ error rates on a specific document type or field |
| Sampling only low-confidence extractions | Misses novel error patterns that show up in already-automated (high-confidence) items |
| Using uncalibrated confidence scores | The same reported score means different actual accuracy per field type — see [[Confidence Score]] |
| Even reviewer capacity distribution | Wastes limited review capacity; the queue should serve the highest-uncertainty item next, not the next one chronologically |

## Worked example

A pipeline shows 97% accuracy overall. Broken down:
- Standard invoices: 99.5% date accuracy
- Handwritten receipts: 60.1%
- International formats: 45.2%

Stratified sampling — checking accuracy **by document type and field segment** — is what surfaces this. An aggregate number alone would never reveal it.

## The validation sequence this belongs to

1. Measure accuracy by document type and field segment
2. Calibrate confidence scores using validation sets (see [[Confidence Score]])
3. Set calibrated thresholds for routing (see [[Confidence Thresholds]])
4. Implement stratified random sampling — this step, ongoing, not one-time
5. Only then reduce human review on the segments that validated safely

## Related

- [[Confidence Score]]
- [[Confidence Thresholds]]
- [[Confidence-Based Routing]]
- [[Anthropic Exam]]

## Sources

- [5.5 Human Review & Confidence Calibration — Claude Certification Guide](https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
