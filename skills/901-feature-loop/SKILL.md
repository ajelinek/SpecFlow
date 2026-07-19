---
name: 901-feature-loop
description: >
  Use `901` to run one feature end-to-end through SpecFlow's full pipeline as a single
  git-tracked run: high-level design, happy-path specs, per-module test-driven build-out,
  cleanup, an optional expanded-coverage round, and a merge back to the base branch. Every
  design/spec artifact and every end-of-round cleanup pass is checked by `900-feedback-loop`
  before the run advances, and every stage lands its own commit on a dedicated feature branch.
  Trigger it for prompts like "901", "feature loop", "master loop this feature", or "run the full
  pipeline for feature F013" when a feature should go from a bare name to a merged, cleaned-up
  branch with commit-level traceability at every stage.
argument-hint: "[feature-name-or-fid] [round-2-coverage: none|balanced|comprehensive]"
context: fork
---

# 901 - Feature Loop

Runs one feature end-to-end on its own branch, headless: a Green Check baseline, then `201` →
`202` (Happy Path) → per-module `301` (each `TSM#` module closed out in one pass, with a
`specs.feature` status-tag update for every scenario it contains and its own lightweight Module
Check) → aggregate end-of-round cleanup and a
round close-out Green Check → an optional expanded-coverage round of the same shape → final Green
Check → merge.

Every `NNN` call is a single direct skill invocation, except `900-feedback-loop` — a small
review⇄apply-fix cycle (see **Feedback Pass** below) that checks every design/spec artifact and
aggregate cleanup pass before the run advances, under a tighter cap than `900`'s own default.
Nothing here blocks on a user question: every fork in the road routes through the **Decision
Consult**, a single `@decider` call.

**Output**: Updates project source/test files and `.specflow/features/<fid>-<feature-slug>/`
artifacts, plus this feature's entry in `.specflow/docs/D10-feature-overview.md` when that registry
tracks it. Creates a feature branch, commits throughout, and merges it back. No new artifact type
of its own.

---

## Required Inputs

1. **Feature identity** — a name and/or `F-ID`, resolved the same way `201` resolves it (existing
   `D10` entry, or an explicit new `F-ID` assignment). Don't create the feature branch before this
   resolves — see Step 3.
2. **Round 2 coverage** — `none`, `balanced`, or `comprehensive`. Default `balanced` if unstated;
   state the default in the final summary. Round 1 is always **Happy Path Only** and always runs.
3. **Workflow fit** — this is for a whole feature that justifies full BDD rigor and branch-level
   traceability. For an isolated fix or small maintenance change, reroute to
   `301-spec-implementation` or `401-cleanup` directly instead.

This workflow runs headless: nothing is resolved by asking the user. Feature identity ambiguity is
resolved by the Decision Consult using Step 3's defaults.

---

## Execution Protocol

- You are the orchestrator for the entire run, and you run it headless — no step ever pauses to
  ask the user a question. Every blocking decision routes through the **Decision Consult** below,
  and the run acts on its result immediately.
- Every checkpoint runs a **Green Check** or, for per-module build steps, the lighter **Module
  Check**; every design/spec artifact and aggregate cleanup pass gets a **Feedback Pass** — all
  three defined once under **Checkpoint Protocols** below.
- All git operations (branch, commit, merge) run directly here via Bash, never delegated to a
  subagent.
- Keep working state compact: feature identity, branch name, base branch, current stage, a running
  commit ledger, and a log of every Decision Consult invoked. Don't carry full skill or subagent
  transcripts forward between stages.

---

## Decision Consult

This workflow never pauses mid-run to ask the user a question. Every point below that would
otherwise be a blocking question instead runs this consult, and the run acts on the result
immediately — "ask whether..." and "stop and confirm..." always mean "run this consult, then
continue."

1. **Frame a brief:** the specific question, the concrete option set (including that step's
   documented default, if any), and the state needed to reason about it — feature identity,
   current stage, what triggered the decision.
2. **Call `@decider` once** with that brief. `@decider` (`agents/decider.md`) returns exactly one
   decided option, a rationale, and a confidence level; how it arrives there is its own concern.
   It's a purpose-built worker running this run's strongest model setup, since these are calls
   nothing double-checks.
3. **Act on it.** Take the decision immediately. On `UNANSWERABLE`, fall back to that step's
   documented default; a step with none ends the run with a terminal status report instead of a
   merge — only possible at the baseline gate (Step 2) or final validation (Step 19). Log the brief
   and the returned decision for Step 22's summary.

---

## Checkpoint Protocols

Three shapes recur at almost every checkpoint below: two flavors of validation (**Green Check**,
**Module Check**) and one convergence loop (**Feedback Pass**). Defined once here; each step
below just names which applies and what's unique to it.

### Green Check

The full four-mode validation. Reserved for the baseline (Step 2), each round's close-out (Steps
13, 19), and merge revalidation (Step 21) — never per-module; see **Module Check** for that.

Dispatch all four `@validator` calls in parallel, in a single message — `@validator` takes one
mode per invocation, the four modes are independent, and this orchestrating context never checks
output directly, so sequential calls would be pure latency with no benefit:

1. `mode: test`, unit suite
2. `mode: test`, integration/e2e suite (whatever the project separates out)
3. `mode: lint`
4. `mode: build`

`@validator` runs on its own pinned model (haiku) — call it plainly, no override needed.

Repair, per layer, once all four calls return:
- **Failing test** → `402-test-correction` scoped to exactly that test, then revalidate that
  layer. Repeat per failing test until green or `402` raises a blocking question.
- **Lint/build failure** → a focused `@coder` repair pass scoped to the failure, then recheck.

Non-convergence fallback — **standard fallback** (Steps 2, 13, 19, 21): on a `402` blocking
question, Decision Consult — `402`'s suggested resolutions, or skip-and-flag; default: `402`'s own
likeliest pick. On lint/build non-convergence, Decision Consult — widened-scope retry, or terminal
report; default: one widened retry, then terminal.

### Module Check

The lightweight per-module validation used at Steps 10 and 16 instead of a full Green Check. A
regression from one module's own change is almost always in lint or that module's own spec
scenarios, not the unit suite or the build — those get their one real check at the round's Green
Check (Steps 13, 19).

Two `@validator` calls, dispatched in parallel:

1. `mode: lint`
2. `mode: test`, scoped to exactly this module's own spec file(s) — not the full e2e suite.
   Re-running every prior module's spec after each new one is quadratic waste; the full suite
   runs once, at the round's Green Check.

Repair: same per-layer repair as Green Check above, scoped to just these two layers.

Non-convergence fallback — **per-module fallback** (Steps 10, 16 only): any non-convergence,
regardless of layer, gets one Decision Consult — retry `301` for this module with a revised
approach, revert and retry `301` from scratch, or terminal report naming the stuck module (and, if
only some of its scenarios are implicated, which `@TS###` within it); default: revised-approach
retry, then from-scratch retry, then terminal.

### Feedback Pass

One `900-feedback-loop` cycle: a Review pass by `@reviewer`, an Apply-Fix pass, then a commit if
anything changed. Pin the Apply-Fix role's `general-purpose` call to `sonnet` at every site — it's
mechanical fix application driven entirely by Review's feedback, not fresh judgment. Both flavors
below override `900`'s own default iteration cap of 5. These are the only two flavors — Steps 10
and 16's per-module build cycles never get one.

- **Artifact refine** (Steps 7, 9, 15): `@reviewer` judges the artifact against that artifact's
  own producing skill's documented quality checks; `general-purpose` applies the feedback directly
  to the file. Iteration cap: **1** — a freshly produced artifact rarely needs a second pass, and
  this flavor fires three times a run.
- **Aggregate cleanup** (Steps 11, 12, 17, 18): `@reviewer` judges the round's diff for
  cross-scenario issues a single-scenario view would miss — duplication, inconsistent patterns,
  dead code. `general-purpose` applies the fix by running a real `401-cleanup` invocation (not a
  bare edit) scoped to that diff and driven by the review, so `401`'s own baseline/validation/repair
  discipline applies. Iteration cap: **2** — cross-scenario cleanup can legitimately need one
  retry, but never the full default of 5.

---

## Steps

### Phase 0 - Set Up

- [ ] **Step 1: Verify a clean working tree.** `git status --porcelain` must be empty. If not,
      Decision Consult — commit the outstanding changes as a pre-run commit, or stash
      (`git stash push -u`) and continue; default: stash (fully reversible, keeps the run's own
      commit ledger free of unrelated changes).

- [ ] **Step 2: Establish and confirm a green baseline.** Before any design or code work starts,
      run a **Green Check** with the standard fallback. A baseline that still can't be made green
      after consult-driven retries ends the run here with a terminal report — this is one of only
      two checkpoints (the other is Step 19) where ending the run is right, since no feature work
      has started yet. Don't create the feature branch (Step 4) or begin Phase 1 until this is
      satisfied.

- [ ] **Step 3: Resolve feature identity.** Use `201`'s own resolution rule: check `D10` for an
      existing `F-ID`.
      - No entry → Decision Consult — assign the next `F-ID` and add the `D10` entry now, or treat
        the given name as an existing near-match entry; default: assign new (an unresolvable name
        is more likely new work than a typo).
      - `overview.md` exists with `status: done` → Decision Consult — start a new run under a new
        `F-ID` for follow-on work, or treat the invocation as unintended and end with a terminal
        report; default: start a new run (a `done` feature invoked again is almost always follow-on
        work).
      - `overview.md` exists with `status: implementing` → Decision Consult — resume from that
        point, or restart from Phase 1; default: resume (preserves prior work and is reversible if
        wrong, where a restart isn't).

- [ ] **Step 4: Create the feature branch.** Record the current branch as the base branch. Create
      and check out `feature/<fid>-<feature-slug>` from it. If that branch already exists,
      Decision Consult — check it out and resume, or create a disambiguated name (append a short
      numeric suffix) and start fresh; default: resume (a branch with this exact name is almost
      always this same feature's own prior attempt).

- [ ] **Step 5: Resolve round-2 coverage.** `none`, `balanced`, or `comprehensive` — default
      `balanced` if unstated.

### Phase 1 - High-Level Design

- [ ] **Step 6: Run `201-high-level-design`** directly for the feature. Commit:
      `201: high-level design for <feature-slug>`.

- [ ] **Step 7: Feedback Pass (artifact refine) on the overview.** Criteria: scope clarity, real
      acceptance criteria, explicit out-of-scope exclusions, a user-journey that leads with
      user-visible flow (`201`'s own Step 6 quality checks). Commit if changed: `900: refine 201
      overview for <feature-slug>`.

### Phase 2 - Round 1: Happy Path

- [ ] **Step 8: Run `202-spec-design`** directly, coverage: Happy Path Only. Commit:
      `202: happy-path specs for <feature-slug>`.

- [ ] **Step 9: Feedback Pass (artifact refine) on the specs.** Criteria from `202`'s own Step 5
      quality check. Commit if changed: `900: refine 202 happy-path specs for <feature-slug>`.

- [ ] **Step 10: Build out each happy-path module, one at a time.** For each `TSM#` in the
      happy-path set, in order:
  1. Run `301-spec-implementation` scoped to exactly that `TSM###` — one pass builds out every
     `@TS###` scenario the module contains, not one call per scenario. `301`'s own phases (write
     failing tests for the module's scope, then implement, then clean up tests/production) already
     operate across a multi-scenario scope; this is the same discipline `301` applies whenever it's
     handed the full file, just narrowed to one module's scenarios.
  2. In `specs.feature`, replace the status tag for every `@TS###` scenario in that module with
     `@status_done` — `301`'s own validation already confirmed the passing run this tag certifies.
  3. Run a **Module Check** with the per-module fallback — a failure here is a regression from
     this module's own change, repaired on the spot rather than surfaced as a blocker.
  4. Commit: `test cycle: <TSM###> implement + status`.

  Skip per-module cleanup — Steps 11/12 (and 17/18 in round 2) clean the same files in aggregate
  at round end. Never start the next module until the current one, including its status-tag
  updates and Module Check, is committed. A module with only one `@TS###` scenario collapses to the
  same single-scenario cycle this replaced — no special case needed.

- [ ] **Step 11: Feedback Pass (aggregate cleanup) on round-1 source.** Scope: the round-1 source
      diff, `source-cleanup-only`. Strictly bounded to round-1 files (see Rule 2 on final-round
      scope expansion). Commit if changed: `900: round-1 source cleanup`.

- [ ] **Step 12: Feedback Pass (aggregate cleanup) on round-1 tests.** Same as Step 11,
      `test-cleanup-only`, round-1 test files. Commit if changed: `900: round-1 test cleanup`.

- [ ] **Step 13: Run a Green Check to close out Round 1.** Standard fallback. A failure here is a
      mid-run regression from Round 1's own work, not a baseline issue. Commit if anything
      changed: `green check: round-1 fixes`.

### Phase 3 - Round 2: Expanded Coverage (skip entirely if round-2 coverage is `none`)

- [ ] **Step 14: Run `202-spec-design`** again, coverage: the resolved round-2 level. Commit:
      `202: <level> specs for <feature-slug>`.

- [ ] **Step 15: Feedback Pass (artifact refine) on the updated specs.** Same as Step 9. Commit if
      changed.

- [ ] **Step 16: Build out each newly touched module, one at a time.** Same as Step 10, scoped
      only to the `TSM#` modules Step 14 added or changed — not round-1 modules that got no new
      scenarios. If a targeted module mixes round-1 `@status_done` scenarios with new
      `@status_pending` ones, scope `301` to the module as usual; its own scope-handling already
      covers a partial-completion file (this is the same case as being handed the full file with
      some scenarios already done), so it only needs to build out what's still pending.

- [ ] **Step 17: Feedback Pass (aggregate cleanup) on final source.** Scope: the entire feature
      branch diff. This is the final round's cleanup, so pre-authorize scope expansion past the
      frozen boundary — `401`'s normal approval gate doesn't stop the run here. Commit if changed:
      `900: final source cleanup`.

- [ ] **Step 18: Feedback Pass (aggregate cleanup) on final tests.** Same as Step 17, same
      expanded authorization, test files. Commit if changed: `900: final test cleanup`.

### Phase 4 - Finalize

- [ ] **Step 19: Run the final Green Check.** Standard fallback: any failing test found here is
      repaired via `402-test-correction`, scoped to exactly that test and revalidated, per Green
      Check's own repair discipline — before anything is treated as non-convergent. Don't merge on
      a red build — if consult-driven retries here don't converge, end the run with a terminal
      report instead of merging. This and Step 2 are the only two points where the run ends
      without a merge.

- [ ] **Step 20: Update feature status.** Set `status: done` in `overview.md` if not already. If
      `.specflow/docs/D10-feature-overview.md` exists and tracks this `F-ID`, update that entry's
      status marker to 🟢 Done too — the same registry Step 3 may have added it to.

- [ ] **Step 21: Merge back.** `git merge --no-ff feature/<fid>-<feature-slug>` into the recorded
      base branch. If the merge conflicts, Decision Consult — resolve the conflicting hunks
      directly (favoring the feature branch, since the base branch is expected to be behind it), or
      abort and end with a terminal report describing the conflicting files; default: resolve
      directly. Resolving a conflict here doesn't stand in for a green check: rerun the full Step
      19 Green Check afterward before treating this step as complete. If that revalidation can't
      converge, abort the merge and end with a terminal report instead of leaving a red merge on
      the base branch.

- [ ] **Step 22: Summarize.** Report: feature identity, branch name, round-2 coverage used, the
      full commit ledger, modules and scenarios implemented per round, Feedback Pass iteration counts per
      stage, final validation result, the merge commit (or terminal-report reason if the run ended
      without one), and every Decision Consult invoked during the run with its resolution.

---

## Rules

1. Round 1 is always Happy Path Only and always runs; round 2 is optional per Required Input #2's
   default.
2. Scope-expansion authorization for aggregate `401` cleanup applies only to whichever round runs
   last (round 2's cleanup if it runs, otherwise round 1's). Every other aggregate cleanup pass
   stays strictly bounded to its own round's files.
3. One commit per top-level step; skip a commit only when a step produced no file changes.
4. All git operations run directly in this orchestrating context, never delegated to a subagent.
   Never push to a remote. Merge is always `--no-ff`; the feature branch is kept afterward, not
   deleted.
5. Never start the next module's build cycle before the current one — including its
   `specs.feature` status-tag updates and Module Check — is committed. No scenario within a module
   is ever left at `@status_pending` once that module's build cycle has run.
6. Only Step 2 and Step 19 can end the run outright, and only as a terminal report once
   consult-driven retries are exhausted — never as a blocking question. Every other decision point
   routes through the Decision Consult and the run acts on the result immediately.
7. Route mechanical subagent work to a cheaper/faster model than this run's own tier — `@validator`
   (haiku) and the Feedback Pass's Apply-Fix role (sonnet), both pinned in **Checkpoint
   Protocols**. Reserve this run's own strongest model tier for judgment-heavy work: `@decider` and
   the `201`/`202`/`301`/`302` skill invocations.
