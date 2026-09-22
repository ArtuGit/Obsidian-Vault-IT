## What it is

A **confidence threshold** is the calibrated cutoff applied to a model- or pipeline-reported confidence score that decides what happens to an output next: auto-accept, route to human review, or retry. The number only becomes useful once it has been checked against reality — a raw, self-reported score is not a threshold by itself.

## Why the exam tests this

This falls under Domain 5, **Context Management & Reliability** (15% of the exam) — specifically the "confidence handling" and human-review-integration material. It's one of the more trap-heavy topics because the intuitive answer (trust the number Claude reports) is the wrong one.

## The core distinction: raw vs. calibrated confidence

>[!WARNING] Exam trap
> "Self-reported low confidence" is **not** a valid trigger for escalating to a human. A **confidence-score threshold breach measured against a labelled validation set** is. The model's own stated confidence is unreliable until it has been checked against ground truth — do not assume `confidence: 0.92` means 92% accuracy.

Calibration means: build a labeled validation set, run the pipeline against it, and measure *actual* accuracy per confidence band, per field, per document type — then set the threshold from that measurement, not from the model's raw number.

Example from a document-extraction pipeline:

| Reported confidence | Field type    | Actual accuracy (measured) |
| -------------------- | -------------- | --------------------------- |
| 0.90                  | date fields    | 94%                          |
| 0.90                  | amount fields  | 82%                          |

The same reported score means different things depending on what it's attached to — so a single global threshold across all fields is itself a trap. Thresholds must be set **per segment** (see [[Stratified Random Sampling]]).

## Calibrated decision hints, not raw scores

Good pipeline design doesn't hand the model a bare `confidence: 0.62` and ask it to reason about what to do with it. It applies the calibrated threshold in code and returns a derived decision instead:

```json
{
  "fields": {
    "vendor": { "value": "Acme Corp", "confidence": 0.94 },
    "amount": { "value": 1280.50, "confidence": 0.62 }
  },
  "requires_review": true,
  "review_reasons": ["amount_below_confidence_threshold"]
}
```

## Validation sequence (exam tests this order)

1. Measure accuracy by document type **and** field segment — never trust an aggregate number (see [[Stratified Random Sampling]])
2. Calibrate confidence scores against a labeled validation set
3. Set thresholds *per segment*, derived from that calibration
4. Implement stratified random sampling to keep monitoring after automation starts
5. Only then reduce human review on the segments that validated safely

>[!TIP]
> "97% accuracy overall" can hide a document type or field sitting at 45–60% accuracy. Never set or raise a threshold from an aggregate metric — this is the same trap as in [[Stratified Random Sampling]].

## Related

- [[Confidence Score]]
- [[Confidence-Based Routing]]
- [[Stratified Random Sampling]]
- [[Anthropic Exam]]

## Sources

- [Human Review & Confidence Calibration — Claude Certification Guide](https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
- [Claude Certified Architect (CCAR-F) Exam Guide 2026 — FlashGenius](https://flashgenius.net/blog-article/a-guide-to-the-claude-certified-architect-foundations-certification)
