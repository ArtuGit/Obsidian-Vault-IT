## What it is

**Confidence-based routing** is a routing/escalation pattern where the path an item takes — auto-process, retry, or escalate to a human — is decided by a **calibrated** confidence signal rather than a fixed rule or a raw self-reported number. It's a specific instance of the broader **Routing Pattern** concept ("an approach where a classification step decides which specialised handler processes a request"), where the classifier signal happens to be a confidence score.

## Why the exam tests this

Spans two domains: Domain 1 (**Agentic Architecture & Orchestration**, 27%) covers routing/orchestration patterns generally; Domain 5 (**Context Management & Reliability**, 15%) covers the escalation-trigger and confidence-handling specifics. The exam tests whether you can name the *valid* trigger for escalation versus the tempting but wrong one.

## Valid trigger vs. invalid trigger

>[!WARNING] Exam trap
> **Invalid trigger:** routing on the model's raw, self-reported low confidence. Uncalibrated confidence is not a reliable signal.
> **Valid trigger:** routing on a **confidence-score threshold breach measured against a labelled validation set** — see [[Confidence Thresholds]] for how that threshold gets set.

In other words: confidence-based routing is only sound once [[Confidence Score]] has been calibrated into a [[Confidence Thresholds|threshold]]. Routing directly on the raw score skips the calibration step the exam expects you to name.

## What a calibrated routing decision looks like

Rather than exposing a raw score and asking the model (or downstream code) to interpret it, a pipeline should apply the calibrated threshold and return the routing decision pre-computed:

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

`requires_review` is the routing outcome; `review_reasons` is what makes the routing decision auditable instead of a black box.

## It doesn't end at automation

Confidence-based routing sends low-confidence items to human review, but that alone isn't a complete design — the exam also expects [[Stratified Random Sampling]] of the items that were routed to auto-processing, because a routing rule that trusts high confidence can still be blindsided by a novel error pattern that happens to produce high-confidence, wrong output.

## Related

- [[Confidence Score]]
- [[Confidence Thresholds]]
- [[Stratified Random Sampling]]
- [[Model-Driven Decision-Making]]
- [[Anthropic Exam]]

## Sources

- [Human Review & Confidence Calibration — Claude Certification Guide](https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
- [Domain 1 Glossary — Claude Certification Guide](https://claudecertificationguide.com/learn/glossary/domain-1)
