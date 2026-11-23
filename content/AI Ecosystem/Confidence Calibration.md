## What it is

**Confidence calibration** means checking a model's self-reported [[Confidence Score]] against its **actual accuracy** on a **labelled validation set**: a set of documents whose correct values (ground truth) are already known. It answers one question: *when the model says 0.90, how often is it really right?*

Until a score has been calibrated, it is only the model's claim about itself. After calibration, it is a measured signal you can set [[Confidence Thresholds]] on.

## Why the exam tests this

Domain 5, **Context Management & Reliability** (15%), lesson 5.5 Human Review & Confidence Calibration. Calibration is step 2 of the validation sequence and the reason "automate everything above 95% confidence" is always a wrong answer.

## How calibration works

1. **Build a labelled validation set:** for example, past invoices and receipts with verified values.
2. **Run the pipeline on it:** record each field's value **and** its confidence score.
3. **Compare score vs. correctness:** group outputs by confidence band and measure how many are actually correct.
4. **Plot the calibration curve:** observed accuracy at each confidence level.
5. **Repeat per field and per document type:** one curve for the whole pipeline hides differences.
6. **Set thresholds from the curve**, not from the raw number.

## Example: same score, different reality

| Reported confidence | Field type    | Actual accuracy on labelled set |
| ------------------- | ------------- | ------------------------------- |
| 0.90                | date fields   | ~94% (model is under-confident) |
| 0.90                | amount fields | ~82% (model is over-confident)  |

So a single global cutoff is wrong. For amounts, 0.90 must not be treated as "safe to automate"; the threshold has to be set per field from its own curve.

## What calibrated thresholds then drive

| Zone                        | Handling                               |
| --------------------------- | -------------------------------------- |
| Above calibrated threshold  | Automate, with ongoing sampling        |
| Ambiguous zone              | Human review, higher priority          |
| Below calibrated threshold  | Human review                           |

See [[Confidence-Based Routing]].

## Calibration is not a one-off

A labelled set only covers the failure modes it contains. A new supplier's invoice layout can produce wrong totals **at high confidence**. That's why calibration is followed by [[Stratified Random Sampling]] of automated (high-confidence) items: to confirm each segment still performs at its validated level and to catch novel errors.

>[!WARNING] Exam traps
> - Using **raw** confidence scores to gate automation ("> 95% → automate").
> - "Fixing" it by **raising the threshold** (95% → 99%): still uncalibrated.
> - One threshold for **all fields and document types**.
> - Calibrating against **aggregate** accuracy: 97% overall can hide handwritten receipts at ~60% and international formats at ~45%.

## Validation sequence (order matters)

1. Measure accuracy by document type and field segment
2. **Calibrate confidence scores against a labelled validation set** ← this note
3. Set calibrated thresholds for automation vs. review
4. Stratified random sampling for ongoing checks
5. Reduce human review only in segments with consistently validated accuracy

## Sample question

> A structured extraction system has 97% overall accuracy. The team proposes automating every extraction with confidence above 95%. What is the critical risk?
>
> **Answer:** Aggregate accuracy can mask poor per-type performance, **and confidence scores need calibration before use.**

## Related

- [[Confidence Score]]
- [[Confidence Thresholds]]
- [[Confidence-Based Routing]]
- [[Stratified Random Sampling]]
- [[Claude Certified Architect (Foundations)]]

## Sources

- [5.5 Human Review & Confidence Calibration — AI Cert Guides](https://aicertguides.com/learn/5-context-management/5-5-human-review-calibration)
