# D11 — Exploratory Defects

> **Purpose**: A running backlog of defects found by `902-browser-qa-analyst` exploratory QA
> passes. Each entry is a specific, reproducible finding from a live, click-driven browser session
> — not a design opinion or a feature request. This file accumulates across every run: entries are
> updated in place by each run's reconciliation pass, never duplicated.
>
> Instructions: `902` maintains this file automatically. Manual edits (e.g. flipping an entry to
> `Fixed` or `Won't Fix` once a downstream fix lands) are expected and preserved — a later run only
> touches an entry it directly matches again.
>
> New DEF-### entries may only be created by a `902` run. Other flows (`402`, `301`, manual fixes)
> may append a triage note or flip status on an existing entry, but must never fabricate a new id.
>
> Marking an entry `Not a Defect` requires filling in **Rationale** — a specific explanation of why
> the observed behavior is expected/intentional, precise enough that a later run can tell whether a
> recurrence still matches it. A `Not a Defect` entry with no rationale is incomplete. On a later
> run, this entry is only left suppressed if the new occurrence matches the rationale; if it
> doesn't, the run reopens it rather than silently continuing to suppress it (see `902`'s
> reconciliation step).

---

## Status legend

| Status | Meaning |
|---|---|
| `Open` | Logged, not yet triaged into a fix |
| `In Progress` | A fix is underway (e.g. via `202-spec-design` + `301`/`402`) |
| `Fixed` | Verified resolved |
| `Won't Fix` | Triaged, confirmed as a real defect, and intentionally not addressed |
| `Not a Defect` | Investigated and determined to not be a real defect — requires a **Rationale** |
| `Reopened` | Previously `Fixed`/`Not a Defect`, recurred in a later run in a way that no longer matches prior triage |

## Severity legend

| Severity | Meaning |
|---|---|
| `Critical` | Blocks a core flow entirely, or risks data loss/corruption |
| `High` | A major feature is broken; a workaround may exist |
| `Medium` | Noticeable friction or incorrect behavior, not blocking |
| `Low` | Cosmetic or minor polish issue |

---

## Active Defects

> `Open`, `In Progress`, and `Reopened` entries live here, in ascending id order. When an entry's
> status becomes terminal (`Fixed`, `Won't Fix`, `Not a Defect`), move it down into **Resolved
> Defects** below rather than leaving it here — this section should only ever show what still
> needs attention. If a resolved entry later reopens, move it back up here.

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
- **Rationale**: [Required only when Status is `Not a Defect` — specific explanation of why this
  behavior is expected/intentional, including the conditions under which that holds, so a later run
  can tell whether a recurrence still matches. Leave blank for all other statuses.]
- **Notes**: [Optional — recurrence history, related defects, anything else worth flagging]

---

<!-- Add new DEF-### entries above this line, in ascending id order. Never renumber an existing id.
     When an entry here resolves, cut it whole and paste it into Resolved Defects below instead of
     leaving it in place. -->

## Resolved Defects

> `Fixed`, `Won't Fix`, and `Not a Defect` entries live here, in ascending id order, out of the way
> of the active list above. Ids are never renumbered on the move — only the entry's position in the
> file changes.

<!-- Move resolved DEF-### entries here, in ascending id order. Never renumber an existing id. -->
