## What it is

A **confidence score** is the raw, self-reported numeric estimate a model or ML pipeline attaches to a single output or field — e.g. `{"amount": 1280.50, "confidence": 0.62}`. On its own, this number is just a claim the model makes about itself. It only becomes decision-useful after **calibration**: checking it against actual accuracy on a labelled validation set. See [[Confidence Thresholds]] for what happens once it's calibrated, and [[Confidence-Based Routing]] for how it drives routing decisions.

## Why the exam tests this

Domain 5, **Context Management & Reliability** (15%), specifically the confidence-handling and human-review material. The exam's core move here is to test whether you treat a confidence score as ground truth (wrong) or as an uncalibrated signal that needs validation before it can gate anything (right).

## A confidence score is not an accuracy guarantee

>[!WARNING] Exam trap
> Do not assume `confidence: 0.92` means "92% accurate." A confidence score is the model's self-assessment, and self-assessment is unreliable until measured against reality.

Calibration exposes how unreliable the raw number can be — the *same* reported score means different real-world accuracy depending on what it's attached to:

| Reported confidence | Field type   | Actual accuracy (measured against a labelled set) |
| -------------------- | ------------- | ---------------------------------------------------- |
| 0.90                  | date fields   | 94%                                                    |
| 0.90                  | amount fields | 82%                                                    |

That gap is exactly why a confidence score by itself can't be the automation gate — see [[Confidence Thresholds]] for the calibration step that turns it into one.

## Example: raw scores in a structured extraction

```json
{
  "vendorName": { "value": "Acme Corp", "confidence": 0.98 },
  "invoiceDate": { "value": "2024-03-15", "confidence": 0.95 },
  "totalAmount": { "value": "$1,247.83", "confidence": 0.72 },
  "lineItems": { "value": ["..."], "confidence": 0.61 }
}
```

Each field carries its own score because accuracy varies by field type, not just by document. A single per-document or per-pipeline confidence number would hide that variation.

## Related

- [[Confidence Thresholds]]
- [[Confidence-Based Routing]]
- [[Stratified Random Sampling]]
- [[Anthropic Exam]]

## Sources

- [Human Review & Confidence Calibration — Claude Certification Guide](https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
