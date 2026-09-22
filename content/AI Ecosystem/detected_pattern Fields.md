## What it is

`detected_pattern` is a structured-output field pattern used in validation/retry/feedback-loop pipelines — most commonly cited for automated code review — that records *what kind of construct or rule* triggered a given finding, alongside sibling fields like `rule_id` and `evidence`. It exists so that when a finding gets dismissed, you can tell *why the tool flagged it* rather than only *that it was dismissed*.

## Why the exam tests this

Domain 4, **Prompt Engineering & Structured Output** (20%), under Validation, Retry, and Feedback Loops. The source guide calls the fixable-vs-unfixable distinction (below) "the concept the exam tests most aggressively in this task statement" — `detected_pattern` is the mechanism that makes systematic improvement possible once that distinction is drawn.

## The point of the field: closing the feedback loop

Without `detected_pattern`, a dismissed finding is a dead end — you know it was wrong, but not what to fix. With it, you can aggregate:

>[!TIP]
> "If developers consistently dismiss findings triggered by 'variable shadowing in nested scope,' that pattern likely needs prompt refinement." Aggregate dismiss rates **by pattern**, then update the prompt criteria for the over-reporting patterns — don't just tweak the prompt on a hunch.

## Example schema

```json
{
  "finding_id": "F-2291",
  "detected_pattern": "variable_shadowing_nested_scope",
  "rule_id": "no-shadow-nested",
  "evidence": "let value declared in outer scope, redeclared at line 42",
  "dismissed": true
}
```

## Part of a broader retry/validation pattern

`detected_pattern` sits inside a larger Domain 4 pattern the exam expects you to know end-to-end:

- **Retry-with-error-feedback** needs three things: the original input, the failed output, and the *specific* validation error — "without the specific error, the model has no guidance for what to fix and usually reproduces the same mistake."
- **Fixable** issues (format mismatches, structural errors, misplaced values, math discrepancies) → retry with the specific error.
- **Unfixable** issues (genuinely absent information, external data not provided) → flag for human review, don't keep retrying.
- **Self-correction schema design**: extract paired fields like `calculated_total` / `stated_total` so discrepancies are detected automatically, and `conflict_detected` booleans to flag contradictions without the model silently resolving them.

## Related

- [[Confidence Score]]
- [[Anthropic Exam]]

## Sources

- [4.4 Validation, Retry, and Feedback Loops — Claude Certification Guide](https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
