---
name: 502-defect-resolution
description: >
  Use `502` to work through the D11 exploratory defect backlog: for each targeted Active entry,
  dispatch it to `402-test-correction` for reproduction, classification, and a real fix, update
  the entry's status from the outcome, commit the change, and finish by compacting the resolved
  history. Trigger it for prompts like "502", "resolve the defect backlog", "work through D11",
  "fix DEF-003", or "compact the defect backlog" (compact-only mode, no `402` dispatch). Reads and
  writes `.specflow/docs/D11-exploratory-defects.md`, the backlog `501-browser-qa-analyst` logs
  findings to.
argument-hint: "[DEF-### ...] | compact"
context: fork
---

# 502 - Defect Resolution

Work an existing exploratory defect backlog toward resolution. For each targeted entry in
`.specflow/docs/D11-exploratory-defects.md`'s **Active Defects** section, dispatch it to
`402-test-correction` — which already accepts a `DEF-###` entry as its failure anchor — to
reproduce, classify, and (when justified) fix it. Update the entry's status from what `402`
found, commit the change, and move on to the next entry. Finish by compacting eligible
**Resolved Defects** entries down to their permanent one/two-line form.

This skill never opens a browser and never invents a fix on its own — `402` does the actual
investigation and correction; `502` is the loop that feeds it entries, applies the confirmed
status-mapping rules below, and keeps the backlog file itself in good shape.

**Output**: Corrected source/test files (via `402`, one commit per resolved entry) and an updated
`.specflow/docs/D11-exploratory-defects.md`. Never creates a new `DEF-###` entry — that's
`501-browser-qa-analyst`'s job.

---

## Modes

- **Resolution** (default) — dispatches targeted Active entries to `402`, applies the status
  mapping (see below), commits per resolved entry, then compacts. Steps 1-8.
- **Compact-only** — triggered by "502 compact", "compact the defect backlog", or similar. Skips
  the `402` dispatch loop entirely and runs only the compaction pass. See **Compact-Only Steps**.

---

## Required Inputs

**Resolution mode:**

1. **Target entries** *(optional)* — specific `DEF-###` id(s) to work. If omitted, targets every
   entry currently in **Active Defects** (`Open`, `In Progress`, `Reopened`).

**Compact-only mode:** no target entries needed — only the existing D11 file.

If `.specflow/docs/D11-exploratory-defects.md` doesn't exist, or has no matching entries to work,
report that and stop — this skill never invents entries to work on.

---

## Status Mapping

Once `402` finishes on an entry, its Step 11 triage note (classification + outcome) drives the
status update — `402` itself never touches the entry's status; `502` always applies it:

- **`402` applied a real fix** (source and/or test changed) → `Fixed`, regardless of whether the
  entry was `Rubric`- or `Judgment`-detected. A real code change is equally verifiable evidence
  either way.
- **`402` concluded the behavior is intentional / working as designed, no fix applied**:
  - Entry was **`Rubric`**-detected (console error, failed request, broken link, dead control) →
    set `Not a Defect` automatically, using `402`'s classification as the entry's **Rationale**.
    Report this in the run summary — it's a closed loop, not a silent one.
  - Entry was **`Judgment`**-detected (a subjective UX call) → do **not** auto-set. Leave the
    entry `Open`/`In Progress`, add a note summarizing `402`'s technical finding, and surface it
    to the user for a decision — a UX judgment call needs a human, even when the code is
    technically working as intended.
- **`402` returned a blocking/ambiguous decision** (real functionality change, product-capability
  question) → leave the entry as-is, append `402`'s blocking question as a note, and surface it
  in the summary for the user to resolve. Never guess a status here.
- **`402` could not reproduce the failure at all** → never silently mark `Fixed`. Add a note that
  it could not be reproduced this run and needs confirmation, and leave the status unchanged —
  the same conservative rule `501` follows for a flow that merely "appears resolved."

`Won't Fix` is never set by a `502` run — it requires a human decision not to address a confirmed
real defect, which is a prioritization call, not a technical one.

---

## Steps

- [ ] **Step 1: Resolve targets.** Read `.specflow/docs/D11-exploratory-defects.md`. If specific
  `DEF-###` ids were given, target exactly those (they must currently be in **Active Defects** —
  flag any that aren't and skip them). Otherwise target every entry currently in **Active
  Defects**. If nothing to target, report that and stop.

- [ ] **Step 2: Dispatch the next entry to `402-test-correction`.** Process targets one at a
  time, in ascending `DEF-###` order — never in parallel, since `402` may edit source/test files
  and concurrent entries could conflict. Invoke `402` with:
  - **Failure anchor**: this `DEF-###` entry.
  - **Execution surface**: derived from the entry's `Found on` flow (usually UI; mixed if the
    repro touches an API call directly).
  - **Change window**: recent commits/changed files near that flow — `402` builds this itself in
    its own Step 4, no need to pre-supply it.
  - **Decision boundary**: either test or source, once `402` classifies the failure — don't
    narrow this unless the entry itself implies a boundary.

  Let `402` run to completion per its own protocol, including applying its fix when justified.

- [ ] **Step 3: Apply the status mapping.** Using `402`'s Step 11 triage note now appended to the
  entry, apply exactly one branch of the **Status Mapping** above. Update the entry's `Notes`
  and, when applicable, `Rationale`.

- [ ] **Step 4: Commit this entry's resolution.** If `402` changed any files for this entry,
  commit them together with this entry's D11 status update in one commit, scoped to just this
  entry's changes. If `402` made no code changes (blocking, no-repro, or an auto `Not a Defect`
  with no fix needed), commit just the D11 update if the file changed.

- [ ] **Step 5: Loop.** Repeat Steps 2-4 for each remaining target, in order.

- [ ] **Step 6: Compact eligible Resolved entries.** Once every target has been processed, run
  the same compaction pass as **Compact-Only Steps** below over the full **Resolved Defects**
  section (not just entries resolved this run).

- [ ] **Step 7: Write the file.** Preserve every id. Keep **Active Defects** and **Resolved
  Defects** each in ascending id order; move any entry whose status became terminal this run down
  into **Resolved Defects**.

- [ ] **Step 8: Summarize.** Report, per entry processed: `DEF-###`, `402`'s classification, the
  resulting status, and whether a commit was made. Then report: entries auto-set `Not a Defect`
  (rubric-detected), entries surfaced for a human UX call (judgment-detected, working as
  intended), entries left open on a blocking question or failed reproduction, entries compacted
  this run, and the remaining Active backlog size.

---

## Compact-Only Steps

Runs instead of Steps 1-8 above when compact-only mode is triggered. No `402` dispatch happens,
and no source/test files are touched.

- [ ] **Compact Step 1: Read the file.** Read `.specflow/docs/D11-exploratory-defects.md`. If it
  doesn't exist, or **Resolved Defects** has no entries to compact, report there's nothing to
  clean up and stop.

- [ ] **Compact Step 2: Repair structure first.** Before compacting anything, confirm every entry
  lives in the right section and order: `Open`/`In Progress`/`Reopened` in **Active Defects**,
  everything else in **Resolved Defects**, both in ascending `DEF-###` order. Fix any entry that
  drifted from this (e.g. a manual status edit that never moved the entry) without changing its
  id, status, or content yet.

- [ ] **Compact Step 3: Compact eligible Resolved entries.** For every entry in **Resolved
  Defects**:
  - `Fixed` or `Won't Fix` → collapse the full block to one line: id, status, severity, a short
    flow + failure description, and a one-line resolution note (drawn from the entry's `Notes`
    field if present). Discard the detailed Steps to reproduce / Expected / Actual — the one-line
    summary is the permanent record from here on.
  - `Not a Defect` → collapse to two lines: the same one-line id/status/severity/flow+failure
    summary, plus the entry's **Rationale** kept verbatim on its own line. Never shorten or drop
    the Rationale — `501`'s reconciliation reads it verbatim on every future run to decide
    whether a recurrence still matches or needs reopening.
  - Leave entries already in compact form (from a prior compaction) untouched.
  - Never touch **Active Defects** — `Open`, `In Progress`, and `Reopened` entries keep full
    detail regardless of age; they aren't resolved yet.

- [ ] **Compact Step 4: Write the file.** Preserve every id and status exactly. This is a
  reformatting pass only — no entry is deleted, renumbered, or reclassified.

- [ ] **Compact Step 5: Summarize.** Report: entries compacted (with ids), entries left untouched
  and why (already compact, or still Active), any structural drift repaired in Compact Step 2,
  and the file's size before/after (line count, resolved-entry count).

---

## Rules

1. `502` never creates a new `DEF-###` entry — only `501-browser-qa-analyst` does that.
2. `502` never opens a browser and never invents a fix itself — all investigation and correction
   happens inside `402-test-correction`; `502` only dispatches, maps the outcome to a status, and
   maintains the file.
3. Process targeted entries strictly one at a time — never dispatch multiple entries to `402`
   concurrently, since fixes can touch overlapping files.
4. `Fixed` is only set when `402` actually applied a fix. `Not a Defect` is only auto-set for
   `Rubric`-detected entries when `402` concludes the behavior is intentional; `Judgment`-detected
   entries always go back to the user for that call. `Won't Fix` is never set by a `502` run.
5. A `402` run that can't reproduce the failure, or returns a blocking/ambiguous decision, never
   results in a silent status change — leave the entry as-is with a note and surface it in the
   summary.
6. Commit per resolved entry, scoped to exactly that entry's changes — never batch multiple
   entries' fixes into one commit.
7. The compaction pass (Step 6, or Compact-Only mode) never changes an id, status, or which
   section an entry belongs in beyond fixing structural drift — it only shortens already-resolved
   entries' detail level, and never touches a `Not a Defect` entry's **Rationale**.
8. Compact-only mode makes no `402` calls and no source/test edits — it only reformats the D11
   file.

## Additional Guidance

**On why `402` doesn't set status itself**: `402-test-correction` is also invoked directly by
humans on ordinary failing tests with no D11 entry involved at all — it has no reason to know
about D11's status vocabulary. Keeping status-mapping in `502` keeps `402` simple and reusable,
and keeps the rubric/judgment split (a `502`-specific policy) out of a skill that isn't otherwise
D11-aware.

**On picking the right entries to target**: a `502` run defaults to the whole Active backlog,
which is deliberately the common case — "just work through the backlog." Narrow it to specific
`DEF-###` ids when only a subset should be touched right now (e.g. only `Critical`/`High`
severity, or a batch tied to a specific upcoming release).

**On `Not a Defect` vs. `Won't Fix`**: `502` can reach `Not a Defect` on its own (for
rubric-detected entries, via `402`'s classification) but never `Won't Fix` — that status requires
a human to decide not to address a *confirmed real* defect, which is a prioritization call this
skill has no basis to make.
