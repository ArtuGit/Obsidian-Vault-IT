## What it is

Progressive summarisation — compacting earlier turns of a long conversation to stay within the context window — systematically destroys the most critical information in transactional or customer-facing systems: **numerical values, dates, percentages, and precisely-stated expectations**. A summary is shorter than the original by definition, and precision is exactly what compression discards first in favor of general patterns.

## Why the exam tests this

Domain 5, **Context Management & Reliability** (15%), Context Window Management. This is a "sounds safe but isn't" trap: summarisation feels like a harmless space-saving step, but it quietly deletes the facts a downstream process needs to actually act correctly.

>[!WARNING] Exam trap
> A common wrong answer treats "progressive summarisation is safe for transactional data" as true. It is not — the pattern consistently fails for numerical values and specific identifiers.

## Concrete example

Original customer statement:
> "I'd like a refund of $247.83 for order #8891 placed on March 3rd."

After compaction:
> "Customer wants a refund for a recent order."

The three facts a refund-processing step actually needs — **amount, order ID, date** — are gone. The summary reads fine to a human; it's useless to the system.

## Mitigation: the persistent case-facts block

Instead of trying to make summarisation more careful, pull transactional facts out of the narrative entirely into a structured block that sits **outside** the summarisation process and is re-included in every prompt:

```json
{
  "caseFactsBlock": {
    "customerId": "C-4421",
    "issues": [
      {
        "orderId": "#8891",
        "orderDate": "2024-03-03",
        "refundAmount": "$247.83",
        "status": "pending_refund"
      }
    ]
  }
}
```

Narrative history can still be summarised freely — it's no longer the thing carrying the facts that matter.

## Related patterns worth knowing alongside this

- **Tool result trimming** — raw tool lookups often return 40+ fields when 5–10 matter; leaving the rest in context wastes budget silently across turns.
- **Lost-in-the-middle effect** — information buried mid-context is processed less reliably than information at the start or end; put key findings up front and use explicit section headers.
- **Scratchpad files** — the equivalent mitigation for long codebase exploration: files an agent maintains to persist key findings across context boundaries, rather than trusting summarisation to carry them.

## Related

- [[Explore Subagent]]
- [[Anthropic Exam]]

## Sources

- [5.1 Context Window Management — Claude Certification Guide](https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management)
- [claude-architect-exam-guide — exam-preparation-guide.md (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide/blob/main/exam-preparation-guide.md)
