---
name: 501-browser-qa-analyst
description: >
  Use `501` to explore a live site with a real, visible Chrome browser and log defects the way a
  QA analyst would: click through flows, judge what happens against what a reasonable user would
  expect, and record anything broken or unintuitive with clear repro steps. Trigger it for prompts
  like "501", "browser QA", "QA analyst pass", "explore this site for bugs", or "find defects on
  this site" when the next step is a live, click-driven exploratory test pass rather than authoring
  test cases directly. Produces `.specflow/docs/D11-exploratory-defects.md`, a running defect
  backlog meant to feed `502-defect-resolution` (reproduction and fix dispatch via `402`) or
  `202-spec-design` once someone is ready to turn findings into fixes.
argument-hint: "[starting-url] [credentials?] [priority-features?]"
context: fork
---

# 501 - Browser QA Analyst

Drive a real, visible Chrome browser through a live site the way a QA analyst would: click through
every reachable page and flow, judge each one against a baseline rubric (console errors, failed
network requests, broken links, dead controls, failed submits) and against open judgment about
what a reasonable user would expect given the feature's evident intent, and log anything that
fails either check as a defect with exact repro steps.

This skill only explores and logs. It never writes Gherkin scenarios and never fixes anything —
once `.specflow/docs/D11-exploratory-defects.md` has entries, turning them into fixes is a
separate, later pass through `502-defect-resolution` (which dispatches entries to
`402-test-correction` for reproduction and correction) or `202-spec-design` /
`301-spec-implementation`, run manually when someone is ready for that phase.

**Output**: `.specflow/docs/D11-exploratory-defects.md` — one running defect backlog, updated in
place across every run. This skill creates no other artifacts and never invokes `202`, `301`,
`402`, or `502` itself.

This file is not a general-purpose defect log for implementation sessions — a defect surfaced
outside a `501` run (direct user report, incidental discovery mid-feature-work) should be fixed and
documented in the commit/PR, not appended here.

---

## Required Inputs

1. **Starting URL** — where exploration begins. If missing, ask for it before proceeding.
2. **Test credentials** *(optional)* — username/password (or equivalent) for sites that require
   login. If a login wall is hit mid-run and no credentials were given, ask once rather than
   guessing or silently skipping the entire authenticated surface.
3. **Priority features/flows** *(optional)* — specific pages or flows to check first. This biases
   exploration order only; it never caps overall coverage (see Step 6's exit condition).

Assume the target is a safe/staging environment. There are no destructive-action restrictions —
submit forms, complete flows, and interact with the site the way a real user would.

---

## Execution Protocol

- Run directly in this skill's own context — do not delegate exploration to a generic subagent.
  The value here is live, watchable judgment as it happens; splitting that across a subagent
  boundary adds nothing.
- Load the browser tools before the first action, in one batch: `tabs_context_mcp`, `navigate`,
  `computer`, `find`, `read_page`, `tabs_create_mcp`, plus `form_input` (forms are expected) and
  `read_console_messages` / `read_network_requests` (needed for the rubric checks in Step 4).
- Always drive a real, visible Chrome window via `claude-in-chrome` — never a headless or scripted
  browser driver. Narrate what's being tried and what happened as you go; this narration is for
  whoever's watching and is not persisted anywhere.
- Keep working state compact: the discovery map (Step 3), the raw findings collected so far, and
  the existing backlog's highest `DEF-###` id — not full page dumps or tool transcripts.

---

## Steps

- [ ] **Step 1: Confirm inputs.** Starting URL is required. Note whether credentials and a
  priority list were given.

- [ ] **Step 2: Open the browser and reach the starting point.** Call `tabs_context_mcp`, create a
  new tab, and navigate to the starting URL. If the site immediately shows a login wall, use the
  given credentials to sign in; if none were given, ask for them once before continuing rather than
  exploring only the unauthenticated surface.

- [ ] **Step 3: Build a discovery map as you go.** Track every distinct page, flow, and feature
  surfaced by navigation, buttons, and forms — this map is what Step 6's exit condition checks
  against, not a fixed page list. Stay within the starting URL's domain: note that an outbound
  third-party link exists (payment processor, external auth, social share, etc.) but do not follow
  it. If a priority list was given, visit those first; otherwise explore breadth-first from the
  starting point.

- [ ] **Step 4: Exercise each page or flow and judge it.** For every page/flow reached, interact
  with it the way a real user would — click through, fill in plausible sample data, submit where
  that's the natural next step — and check it against two things:
  - **Rubric** (objective): console errors, failed network requests, broken links, dead or
    unresponsive controls, failed submits.
  - **Judgment** (subjective): given what this feature is evidently for, does it behave the way a
    reasonable user would expect? Judge this in context as you go — no separate research phase.

  Briefly narrate what's being tried and what happened. Don't stop the run over a single defect —
  log it (Step 5) and keep exploring.

- [ ] **Step 5: Capture a raw finding for anything that fails either check.** For each: the
  page/flow and exact repro steps, expected vs. actual behavior, a severity estimate
  (`Critical`/`High`/`Medium`/`Low`), and whether it was caught by the rubric or by judgment
  (`502-defect-resolution` uses this detection mode later to decide how much autonomy it has when
  triaging the entry). Hold these as this run's working set — do not write to or reconcile against
  `D11-exploratory-defects.md` yet; that happens once, at the end (Step 7).

- [ ] **Step 6: Continue until the discovered surface is covered.** Keep exploring until every
  page/flow in Step 3's discovery map has been exercised at least once. This is the run's
  completion condition — not a timer, not a fixed defect count.

- [ ] **Step 7: Reconcile this run's findings against the existing backlog.** Only now, read
  `.specflow/docs/D11-exploratory-defects.md` if it exists. For each raw finding from Step 5:
  - Matches an existing `Open` or `In Progress` entry (same flow, same failure) → leave that entry
    as-is; fold in a cleaner repro if this pass found one, but don't duplicate it.
  - Matches an entry previously marked `Fixed` or `Won't Fix` → set it to `Reopened` and add a note
    that it recurred on this run.
  - Matches an entry previously marked `Not a Defect` → don't reflag it on recurrence alone. Read
    that entry's **Rationale** and compare this run's finding against it:
    - Finding is consistent with the rationale (same trigger, same conditions the rationale says
      make this expected) → leave the entry untouched, still `Not a Defect`. Do not create a
      duplicate and do not change status. Optionally add a dated note that it recurred and still
      matches, but this is not a new finding.
    - Finding diverges from the rationale (different trigger, different conditions, worse
      severity, or the stated reason no longer holds) → the rationale doesn't cover this
      occurrence. Set the entry to `Reopened` and add a note stating specifically how this run's
      finding differs from the recorded rationale, so a human can re-triage it.
  - Doesn't match anything existing → append as a new entry, status `Open`, next sequential
    `DEF-###` id.

  Leave every existing entry this run didn't directly re-encounter untouched — not revisiting a
  flow is not evidence it's fixed. If a previously `Open`/`In Progress` entry's flow *was*
  re-exercised this run and it now behaves correctly, don't silently mark it `Fixed` — add a note
  that it appeared resolved on this run and needs confirmation before anyone flips its status;
  exploratory judgment isn't the same guarantee as a passing regression test.

- [ ] **Step 8: Write the file.** Use `./templates/D11-exploratory-defects.md` for a new file, or
  update the existing one in place following Step 7's reconciliation. Keep `DEF-###` ids stable and
  sequential — never renumber existing entries. Keep entries split across the file's two sections
  by current status, each in ascending id order:
  - **Active Defects** — `Open`, `In Progress`, `Reopened`.
  - **Resolved Defects** — `Fixed`, `Won't Fix`, `Not a Defect`.

  Any entry whose status changed this run moves to match: newly resolved entries move down out of
  Active into Resolved; a `Reopened` entry (including one reopened out of `Not a Defect` per Step
  7) moves back up into Active. This is a position change only — the id and content move with the
  entry unchanged.

- [ ] **Step 9: Summarize.** Report: pages/flows covered, new defects logged (with ids and
  severities), any entries reopened (split out ones reopened because a `Not a Defect` rationale no
  longer matched), any `Not a Defect` entries that recurred but were left suppressed as still
  matching their rationale, and the current total open/in-progress backlog size. If this run logged
  any new or reopened entries, say so explicitly and offer to run `502-defect-resolution` next to
  attempt reproduction and resolution — don't run it automatically as part of this pass.

---

## Rules

1. Always drive a real, visible browser via `claude-in-chrome` — never a headless or scripted
   driver, and never delegate the exploration itself to a subagent.
2. Stay within the starting URL's domain; note outbound third-party links without following them.
3. Treat the target as a safe/staging environment — no destructive-action restrictions during
   exploration.
4. Reconcile against the existing backlog once, at the end of the run (Step 7) — never mid-
   exploration, and never by pre-filtering what to explore based on what's already logged.
5. This skill never invokes `202-spec-design`, `301-spec-implementation`, `402-test-correction`, or
   `502-defect-resolution` itself. Converting defects into fixes is always a separate, later,
   manually triggered step.
6. Every defect entry, as originally logged (Step 8) or reopened, carries an id, status, severity,
   detection mode (rubric/judgment), repro steps, and expected-vs-actual — no partial entries.
7. Only Step 7's reconciliation logic changes status on an existing entry. A run never marks
   something `Fixed` on its own — only `Open` (new), `Reopened` (recurrence), or an explicit
   "appears resolved, needs confirmation" note.
8. `Not a Defect` is a manual or `502`-investigated triage status — a `501` run never sets it on
   its own. Every entry in that status must carry a **Rationale** explaining why the behavior is
   expected; an entry missing one is incomplete and should be flagged as such rather than silently
   treated as resolved.
9. A recurring finding that matches a `Not a Defect` entry's rationale is left suppressed, not
   reflagged — that's the entire point of recording the rationale. It's only reopened when this
   run's finding diverges from what the rationale actually covers (Step 7).
10. Terminal-status entries (`Fixed`, `Won't Fix`, `Not a Defect`) belong in the **Resolved
    Defects** section, not mixed into **Active Defects** — move an entry the moment its status
    becomes terminal, and move it back if it's later reopened (Step 8).

## Additional Guidance

**On the rubric vs. judgment split**: Both matter, but they're not interchangeable. A rubric hit
(console error, failed request, broken link, dead control) is objective and repeatable — log it
without much editorializing. A judgment call ("this flow is technically working but confusing") is
inherently more subjective — write the expected-vs-actual pair precisely enough that someone
reading it cold, without having watched the run, can see why it's a real problem and not just a
matter of taste. `502-defect-resolution` treats these two modes differently when it triages a
`402` outcome, so getting the detection mode right here matters downstream, not just for this run.

**On "business perspective"**: There's no separate research step. As each page or flow is reached,
form a quick read of what it's evidently for — a checkout flow's job is to get someone to a
completed order with minimal friction; a settings page's job is to make a change stick reliably —
and judge behavior against that evident purpose, not against an abstract UI checklist.

**On matching findings during reconciliation (Step 7)**: Treat two findings as the same defect
when they share the same flow/page and the same failure mode, even if the exact click path or
sample data differs slightly. When in doubt whether two findings are the same underlying defect or
two distinct ones, prefer keeping them distinct — collapsing unrelated issues into one entry loses
detail a later fix pass needs.

**On severity**: `Critical` blocks a core flow entirely or risks data loss/corruption. `High` — a
major feature is broken, though a workaround may exist. `Medium` — noticeable friction or incorrect
behavior that doesn't block completion. `Low` — cosmetic or minor polish. Estimate severity from
the user's perspective, not implementation difficulty.

**On `Not a Defect` vs. `Won't Fix`**: These sound similar but mean different things. `Won't Fix`
confirms the behavior *is* a real defect but a decision was made not to address it. `Not a Defect`
means investigation concluded the behavior was never a defect at all — it's expected, intentional,
or a correct response to the input given. Don't use `Not a Defect` as a softer way to say "low
priority"; that's what `Won't Fix` + `Low` severity is for.

**On matching a recurrence against a `Not a Defect` rationale (Step 7)**: The rationale should say
*why* the behavior is expected and under what conditions — e.g. "field is read-only by design for
archived records" or "this validation error is correct because the test account lacks the required
role." When this run hits the same flow again, don't just check that the same failure mode
recurred — check whether the conditions the rationale describes still hold. Same trigger, same
conditions, same outcome the rationale already accounts for → leave it alone, that's the rationale
doing its job. Different trigger, different conditions (e.g. it now happens for non-archived
records too, or for an account that *does* have the required role), or a materially worse outcome →
the rationale doesn't cover this case, so reopen it rather than assuming it's still fine. When the
rationale is too vague to make that call confidently, treat it as a mismatch and reopen with a note
asking for a more specific rationale — don't guess in favor of suppression.
