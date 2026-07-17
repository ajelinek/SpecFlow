# D11 — Exploratory Defects

> **Purpose**: A running backlog of defects found by `902-browser-qa-analyst` exploratory QA
> passes. Each entry is a specific, reproducible finding from a live, click-driven browser session
> — not a design opinion or a feature request. This file accumulates across every run: entries are
> updated in place by each run's reconciliation pass, never duplicated.
>
> Instructions: `902` maintains this file automatically. Manual edits (e.g. flipping an entry to
> `Fixed` or `Won't Fix` once a downstream fix lands) are expected and preserved — a later run only
> touches an entry it directly matches again.

---

## Status legend

| Status | Meaning |
|---|---|
| `Open` | Logged, not yet triaged into a fix |
| `In Progress` | A fix is underway (e.g. via `202-spec-design` + `301`/`402`) |
| `Fixed` | Verified resolved |
| `Won't Fix` | Triaged and intentionally not addressed |
| `Reopened` | Previously `Fixed`, recurred in a later run |

## Severity legend

| Severity | Meaning |
|---|---|
| `Critical` | Blocks a core flow entirely, or risks data loss/corruption |
| `High` | A major feature is broken; a workaround may exist |
| `Medium` | Noticeable friction or incorrect behavior, not blocking |
| `Low` | Cosmetic or minor polish issue |

---

## Defects

### DEF-001: [Short, specific title]

- **Status**: Open
- **Severity**: [Critical | High | Medium | Low]
- **Detected by**: [Rubric | Judgment]
- **Found on**: [Page / flow / URL]
- **Steps to reproduce**:
  1. [Step]
  2. [Step]
  3. [Step]
- **Expected**: [What a reasonable user would expect to happen]
- **Actual**: [What actually happened]
- **Notes**: [Optional — recurrence history, related defects, anything else worth flagging]

---

<!-- Add new DEF-### entries above this line, in ascending id order. Never renumber an existing id. -->
