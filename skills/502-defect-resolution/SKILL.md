---
name: 502-defect-resolution
description: >
  Use `502` to work through the D11 exploratory defect backlog: dispatch each targeted Active entry to
  `402-test-correction` for reproduction and a real fix, update its status, commit, then compact
  resolved history. Trigger it for prompts like "502", "resolve the defect backlog", "work through
  D11", "fix DEF-003", or "compact the defect backlog" (compact-only mode).
argument-hint: "[DEF-### ...] | compact"
context: fork
---

# 502 - Defect Resolution

Work `.specflow/docs/D11-exploratory-defects.md` toward resolution. For each targeted **Active
Defects** entry, dispatch it to `402-test-correction` (which accepts a `DEF-###` as its failure
anchor) to reproduce, classify, and fix when justified; apply the status mapping below; commit; move
on. Finish by compacting **Resolved Defects**.

`502` never opens a browser, never invents a fix (all investigation and correction happens inside
`402`), and never creates a `DEF-###` entry (only `501-browser-qa-analyst` does). D11's own header
and legends (from `501`'s template) define statuses, sections, and the compacted entry format.

Status mapping lives here rather than in `402` on purpose: `402` is also run directly on ordinary
failing tests with no D11 entry, so it stays unaware of D11's vocabulary and the rubric/judgment
policy.

**Output**: Corrected source/test files (via `402`, one commit per entry) and an updated D11 file.

---

## Modes

- **Resolution** (default) — Steps 1-7.
- **Compact-only** — "502 compact", "compact the defect backlog", or similar. No `402` calls and no
  source/test edits; runs only **Compaction**, reformatting the D11 file.

---

## Required Inputs

- **Target entries** *(optional, resolution mode)* — specific `DEF-###` ids, e.g. a
  `Critical`/`High` subset or a release batch. Default: every entry in **Active Defects** (`Open`,
  `In Progress`, `Reopened`).

If D11 doesn't exist or has nothing to work, report that and stop.

---

## Status Mapping

Apply exactly one branch from `402`'s triage note (classification + outcome). Never change status
silently.

- **`402` applied a real fix** (source and/or test changed) → `Fixed`, whether `Rubric`- or
  `Judgment`-detected; a real code change is equally verifiable either way. `Fixed` is set only in
  this case.
- **`402` concluded the behavior is intentional, no fix:**
  - `Rubric`-detected → set `Not a Defect`, using `402`'s classification as the **Rationale**, and
    report it in the summary.
  - `Judgment`-detected → don't change status. Add a note summarizing `402`'s finding and surface it
    for a human decision; a UX judgment call needs a human even when the code works as designed.
- **`402` returned a blocking/ambiguous decision** → leave status as-is, append `402`'s question as a
  note, and surface it in the summary.
- **`402` couldn't reproduce** → leave status as-is; note that it couldn't be reproduced this run and
  needs confirmation (the same conservative rule `501` uses for "appears resolved").

`Won't Fix` is never set by `502` — not addressing a confirmed defect is a human prioritization call.

---

## Steps

- [ ] **Step 1: Resolve targets.** Read D11. Given ids must currently be in **Active Defects** — flag
  and skip any that aren't. Otherwise target all Active entries.

- [ ] **Step 2: Dispatch the next entry to `402`** — one at a time in ascending `DEF-###` order,
  never concurrently, since fixes can touch overlapping files. Pass: failure anchor = this entry;
  execution surface derived from its `Found on` flow (usually UI; mixed if the repro hits an API
  directly); decision boundary = test or source once classified (narrow it only if the entry implies
  a boundary). `402` builds its own change window. Let it run to completion, including its fix.

- [ ] **Step 3: Apply the Status Mapping**, updating the entry's `Notes` and, when applicable,
  `Rationale`.

- [ ] **Step 4: Commit this entry** — `402`'s file changes plus this entry's D11 update in one commit
  scoped to this entry only (never batch entries). With no code changes, commit just the D11 update if
  the file changed.

- [ ] **Step 5: Loop** Steps 2-4 over the remaining targets.

- [ ] **Step 6: Compact and write.** Run **Compaction** over the whole **Resolved Defects** section
  (not just this run's entries), moving any entry that became terminal this run into it.

- [ ] **Step 7: Summarize.** Per entry: `DEF-###`, `402`'s classification, resulting status, whether
  committed. Then: entries auto-set `Not a Defect`; judgment entries awaiting a human UX call; entries
  left open on a blocking question or failed reproduction; entries compacted; remaining Active size.

---

## Compaction

Used by Step 6 and compact-only mode. A reformatting pass only: no entry is deleted, renumbered, or
reclassified.

1. **Read the file.** In compact-only mode, if D11 is missing or **Resolved Defects** has nothing to
   compact, report that and stop.
2. **Repair structure first.** `Open`/`In Progress`/`Reopened` belong in **Active Defects**,
   everything else in **Resolved Defects**, each in ascending id order. Move drifted entries (e.g. a
   manual status edit that never moved the entry) without changing id, status, or content.
3. **Compact Resolved entries** to D11's compacted format:
   - `Fixed` / `Won't Fix` → one line (id, status, severity, short flow + failure, one-line resolution
     drawn from `Notes`); detailed repro/expected/actual are dropped.
   - `Not a Defect` → the same line plus the **Rationale** verbatim on its own line — never shortened,
     since `501` compares recurrences against it.
   - Skip entries already compact. Never compact **Active Defects**, regardless of age.
4. **Write the file**, preserving every id and status.
5. **Summarize** (compact-only mode): entries compacted (ids), entries left untouched and why,
   structural drift repaired, and file size before/after (line count, resolved-entry count).
