---
name: 901-feature-loop
description: >
  Use `901` to run one feature end-to-end, headless, on its own git branch: high-level design,
  happy-path specs, test-driven build-out committed per module, cleanup, optional expanded coverage,
  a whole-feature review, and a validated merge back. Trigger it for prompts like "901", "feature
  loop", "master loop this feature", or "run the full pipeline for feature F013" when a feature should
  go from a bare name to a merged, cleaned-up branch.
argument-hint: "[feature-name-or-fid] [round-2-coverage: none|balanced|comprehensive]"
context: fork
---

# 901 - Feature Loop

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Run one feature end-to-end on its own branch, headless: Green Check baseline → `201` → `202` (Happy
Path) → per-scenario `301` grouped by `TSM#` module → aggregate cleanup and a round close-out Green
Check → optional expanded-coverage round of the same shape → base sync → whole-feature review → final
Green Check → merge.

Each `@TS###` gets its own `301` pass and `specs.feature` status-tag update, but the module is the
unit that gets a Module Check and a commit. Every design/spec artifact and aggregate cleanup pass gets
a Feedback Pass (`900-feedback-loop`, under tighter caps than its default) before the run advances.
Every stage lands its own commit.

Each `301` pass includes code-grounded design and two independent design reviews before its
tests-first implementation, fresh diff review/refinement, and final validation. These are internal
gates, not extra persisted design artifacts or `900` Feedback Passes.
`901` owns whole-feature completion at its final gate, not the per-scenario `301` calls; they report
scope complete and leave the overview `implementing` until Step 22.

**Complete** means the merged code passed every required gate: a completed Feature Review (clean or
explicitly resolved through the decider) and a passing final Green Check on the same code, with the
base branch already synced in. Review limits bound deliberation, not forward progress.

**Output**: Project source/test files; `.specflow/features/<fid>-<feature-slug>/` artifacts; this
feature's `.specflow/docs/D10-feature-overview.md` entry when tracked there; a feature branch with
commits, merged back; and `implementation-log.jsonl` in the feature folder (see **Implementation
Log**).

---

## Required Inputs

1. **Feature identity** — a name and/or `F-ID`, resolved as `201` does (existing `D10` entry, or an
   explicit new `F-ID`). Don't create the branch before it resolves (Step 3).
2. **Round 2 coverage** — `none`, `balanced`, or `comprehensive`; default `balanced`, stated in the
   final summary. Round 1 is always Happy Path Only and always runs.
3. **Workflow fit** — a whole feature justifying full BDD rigor and branch-level traceability. For an
   isolated fix or small maintenance change, use a focused fix or `401-cleanup`; reserve
   `301-spec-implementation` for substantial features or implementation chunks.

---

## Execution Protocol

- You are the orchestrator, and the run is headless: no step ever asks the user. Invoking `901`
  authorizes the run to decide within the feature, broadening only when a step needs it. Every
  blocking decision — including any blocking question a called skill returns — goes through the
  **Decision Consult**, and the run acts on the result immediately (re-invoking the skill with the
  decision when needed). "Ask whether…" and "stop and confirm…" mean "run the consult, then continue."
- **Fail closed on validation.** Executable gates — Green Checks, Module Checks, and `301`'s required
  test/lint/build checks — never pass by consult, skip, or waiver. A gate that can't pass ends the run
  at that gate: append `terminal`, keep every commit, leave the branch unmerged, and return a terminal report
  so the run can resume from that step once the blocker is fixed.
- **Review limits are decision points.** A `301` `review_limit` result or any exhausted `900` pass
  enters **Review-Limit Resolution**, never a terminal report merely because the cap was reached.
  Never restart a skill to reset its review budget. An actual inability to implement required behavior
  safely is a substantive blocker, distinct from reviewer disagreement or budget exhaustion.
- All git operations (branch, commit, merge) run here via Bash, never in a subagent. Never push to a
  remote. Merges are always `--no-ff`; the feature branch is kept afterward.
- One commit per top-level step, skipped only when a step changed no files. Its log lines are staged
  in that same commit, never a separate one.
- Keep working state to feature identity, branch name, base branch, and current stage. The commit
  ledger, consults, gate results, and Feedback Pass counts live in `implementation-log.jsonl` — read
  it back rather than carrying transcripts or re-deriving from memory.
- **Model routing:** mechanical work runs on cheaper pinned models — `@validator` (haiku, pinned in
  its definition; call it plainly) and the Feedback Pass Apply-Fix role (`sonnet`). Judgment-heavy
  work — `@decider`, the Feature Review, and the `201`/`202`/`301`/`302` invocations, including the
  `general-purpose` subagents carrying `201`/`202` — inherits this run's own tier.

---

## Skill Dispatch

`201-high-level-design` and `202-spec-design` run in their caller's context (so a human can shape the
artifact). Here there is no human and no room for their full context, so run each in its own
`general-purpose` subagent. The brief carries everything the skill would otherwise ask for:

- the resolved feature identity (`F-ID`, name, slug, folder path) — the skill must never re-resolve it
- the skill and its arguments (for `202`, this round's coverage level)
- an instruction to run the real skill, follow its own steps and quality checks, and write its
  artifact to disk
- an instruction to make no git commits
- what to return: the artifact path, a short summary, and any blocking question, unanswered

Read the artifact back from disk when a later step needs it. `301`, `302`, `401`, and `402`
fork on their own; call them directly.

---

## Decision Consult

1. **Frame a brief:** the question, the concrete option set (including the step's documented
   default), and the needed state — feature identity, current stage, what triggered it.
2. **Call `@decider` once.** It returns one option, a rationale, and a confidence level.
3. **Act on it immediately.** On `UNANSWERABLE`, use the step's documented default; a step with none
   ends the run with a terminal report. A consult never waives executable validation or confirmed
   defects. Review limits use the protocol below. Append a `decision_consult` log line.

---

## Review-Limit Resolution

Use this at every exhausted review budget: artifact refine, aggregate cleanup, `301` design readiness,
and the Feature Review. Keep the cap; replace further debate with a bounded decision.

1. **Prepare evidence and options.** Include the scope, artifact/brief revision or code state, rounds
   consumed, actual reviewer verdicts, outstanding findings, prior fixes, and relevant code/test evidence.
   Offer concrete ways forward: retain the best existing approach with reasoned dispositions, or apply
   a specific minimal correction. Prefer correctness/security, required behavior, then lower risk,
   reversibility, and reuse — not the newest revision or majority reviewer opinion. Name the
   lowest-risk feasible option as the documented default before calling the decider.
2. **Call `@decider` once** through Decision Consult. Ask it to select the best evidence-backed way
   forward, not whether to increase the cap. On `UNANSWERABLE`, use that documented default. If there
   is no feasible safe option, report the substantive blocker and its evidence, not the review limit.
3. **Act, then advance.** Log the choice with pending verification before edits. Record each finding
   as accepted (fix required), rejected (evidence refutes it),
   or deferred (non-blocking risk/improvement), with rationale and evidence. Apply the chosen approach
   with at most one bounded correction pass, following the originating skill's scope and tests-first
   rules; no new review loop. Verify accepted fixes against their criteria with code inspection and
   targeted checks; retain that evidence. Confirmed correctness or security defects, missing required
   behavior, and missing required coverage must be repaired, not deferred; a failed correction reports
   the actual remaining blocker. Never weaken tests or assertions, drop scope or acceptance criteria,
   or invent approval to advance. The next required validation still runs in full.
4. **Preserve the distinction.** The `decision_consult` has `trigger: review_limit`, scope/revision,
   verdict, consumed rounds, selected approach, rationale, per-finding dispositions, pending verification,
   remaining risks, and next step. Append the linked verification entry before advancing. A completed
   resolution authorizes advancing, but never relabel
   `CHANGES_REQUIRED` as `CLEAN` or `converged: false` as true. Within that scope, the same findings on
   unchanged evidence do not justify another consult or a new review budget. Expected edits implementing
   a resolution do not invalidate it; new material evidence outside that decision invalidates only the affected
   resolution and needs a new evidence-backed decision, not a cap reset.

For `301`, log the decision before handing it back as a caller resolution; re-enter at the pending
phase with the reviewed brief revision, dispositions, and consumed budget, not a fresh `301` run.
Design corrections update the brief here; production/test changes still go through `301`'s normal
tests-first implementation, with the chosen design addressing confirmed defects and required behavior.
For a Feedback Pass, carry its original outstanding items and their dispositions into the Feature
Review. A rejection/deferment remains visible; do not repeatedly reopen it without new evidence.

---

## Checkpoint Protocols

### Green Check

Full validation at the baseline (Step 2), the Round 1 close-out (Step 13), and the final gate
(Step 21). Dispatch four `@validator` calls in parallel in one message:

1. `mode: test`, unit suite
2. `mode: test`, integration/e2e suite (whatever the project separates out)
3. `mode: lint`
4. `mode: build`

Repair in rounds. Each round repairs every reported failure, then reruns all four layers against the
same code:

- **Failing test** → `402-test-correction` scoped to exactly that test. When `402` returns a
  behavior-intent question, consult on its suggested resolutions; default: `402`'s likeliest pick.
  Never skip, quarantine, or weaken the test.
- **Lint/build failure** → a focused `@coder` repair scoped to the failure.

Keep repairing while each round leaves fewer failing tests and layers than the last. A round that
doesn't reduce them is non-convergence: the gate fails closed (see Execution Protocol), and the
terminal report names the failing checks and `402`'s classifications. The gate passes only when all
four layers pass in the same round. Append a `gate` line either way.

### Module Check

Lightweight validation at Steps 10 and 16, run once after every scenario in a module has had its own
full `301` pass. Two `@validator` calls in parallel: `mode: lint`, and `mode: test` scoped to exactly
this module's spec file(s) — not the full e2e suite, which runs at the round's Green Check. Repair
rounds work as in Green Check, for these two layers only. Append a `gate` line.

**Per-module fallback** (Steps 10, 16): Module Check non-convergence gets one
consult — retry `301` for the implicated `@TS###` with a revised approach; revert the module's
uncommitted changes and retry the whole module; or terminal report naming the stuck module (and
`@TS###`, if isolated). Default: revised-approach retry, then from-scratch retry, then terminal.
Preserve consumed review budgets and existing resolutions on either retry.

### Feedback Pass

One `900-feedback-loop` cycle — Review by `@reviewer`, Apply-Fix by `general-purpose` pinned to
`sonnet` — then a commit if anything changed. Two flavors; the per-module build cycles never get one.

- **Artifact refine** (Steps 7, 9, 15): `@reviewer` judges the artifact against its producing skill's
  quality checks; Apply-Fix edits the file directly. Cap **1**.
- **Aggregate cleanup** (Steps 11, 12, 17, 18): `@reviewer` judges the round's diff for
  cross-scenario issues — duplication, inconsistent patterns, dead code. Apply-Fix runs a real
  `401-cleanup` invocation scoped to that diff and driven by the review, so `401`'s
  baseline/validation/repair discipline applies. Cap **2**.

Feedback Passes improve the work; they aren't completion gates. Cap exhaustion doesn't end the run:
append `feedback_pass` with `converged: false` and the outstanding items, run Review-Limit Resolution,
then continue. The Feature Review receives every outstanding item and its disposition. Append a
`feedback_pass` line for each pass, including clean passes.

### Feature Review

The whole-feature completion gate, run once at Step 20 on the synced feature branch. One
`900-feedback-loop` cycle — Review by `@reviewer`, Apply-Fix by `@coder` — cap **2**.

- **Scope**: the entire feature-branch diff against the base, `overview.md`, every scenario in
  `specs.feature`, and every outstanding Feedback Pass item and disposition from the log. Honor
  existing evidence-backed rejections and non-blocking deferrals; reopen only on new material evidence.
- **Blocking criteria**: every acceptance criterion and In Scope item is met; every scenario is
  implemented and covered by a test asserting its outcome; no correctness, security, or regression
  risk, including cross-scenario interactions and the base changes synced in Step 19; no material
  maintainability problem.
- **Advisories**: optional improvements go under the reviewer's out-of-criteria observations. They
  appear in the summary and never block.
- **Apply-Fix**: fixes exactly the blocking findings. Missing coverage is written tests-first: the new
  test fails for the missing behavior before any source change. Never weaken an assertion to clear a
  finding.

At the cap, use Review-Limit Resolution; budget exhaustion is not terminal. Step 20 completes with a
clean review or a completed decider resolution whose accepted fixes are verified and whose remaining
items have explicit non-blocking dispositions. A confirmed defect or unmet required outcome cannot
be waived by the decider even if tests pass. Preserve the actual reviewer verdict in the log.
Commit if changed: `900: feature review fixes`. Append a `feedback_pass` line with flavor
`feature-review`, keeping `converged: false` when resolution, rather than a clean review, ended the loop.
Step 21 validates the resulting code. If its repairs materially change reviewed behavior, refresh the
affected review evidence/resolution before completion, without resetting an exhausted review budget.

---

## Implementation Log

`.specflow/features/<fid>-<feature-slug>/implementation-log.jsonl` — the run's durable resume state
and audit trail. JSON Lines, **append-only, never rewritten in place** (an append can't corrupt prior
entries). Each line has a `type` and `ts` (ISO 8601):

- **`run_init`** — Step 4, once. Fields: `fid`, `feature`, `branch`, `base_branch`, `round_2_coverage`.
- **`step_complete`** — after every top-level step. Fields: `step`, `phase`, `prev_commit` (HEAD before
  this step's commit, or `null`), `summary`. A line can't hold its own commit's SHA, so each step
  records the one before it.
- **`scenario_complete`** — Steps 10 and 16, after each scenario's `301` pass. Fields: `step`,
  `module`, `scenario`, `repair_rounds` (`301` design-review rounds used), `result`.
- **`gate`** — every Green Check and Module Check. Fields: `step`, `check` (`green` or `module`),
  `layers`, `repair_rounds`, `result`.
- **`decision_consult`** — every Decision Consult. Fields: `step`, `question`, `decision`, `confidence`.
  For `trigger: review_limit`, also record `scope` (module/scenario or pass), `revision` (brief revision
  plus relevant code/artifact state), `repair_rounds`, `verdict`, `rationale`, `dispositions`,
  `verification`, `remaining_risks`, `next_step`; `supersedes_terminal` (the old terminal line's `ts`)
  when resolving a prior cap-only stop. Log the choice before edits (`verification: pending`) and
  append a `resume` verification entry before advancing; a choice alone is not a completed resolution.
- **`feedback_pass`** — every Feedback Pass and the Feature Review. Fields: `step`, `flavor`,
  `iterations`, `converged`, `outstanding`.
- **`resume`** — Step 3 when resuming, or when verifying a pending review-limit decision. Fields:
  `step`, `phase`, `found`; for decision verification, also `resolution_of` (consult line's `ts`),
  `verification` (criteria checked, evidence/results), `remaining_risks`, `next_step`. Append only after
  the chosen correction or retained approach has been verified.
- **`terminal`** — substantive failure after log initialization, including failed validation or an
  evidenced inability to deliver required behavior safely; not review-budget exhaustion.
  Fields: `step`, `reason`.
- **`run_complete`** — Step 24, once. Fields: `step: 24`, `prev_commit` (the merge commit).

- **Initialize** at Step 4 after the branch exists: create the feature folder if needed and append
  `run_init`; skip if the file already exists from a resumed run.
- **On resume**: read backward for the last `step_complete`, `scenario_complete`, or `resume` line to
  get the current step/phase, and check for unresolved `terminal` lines — don't guess — then append a
  `resume` line. A resume line alone never clears a terminal; a cap-only terminal is superseded only
  after its referenced consult has a verified `resolution_of` entry. Check every recorded `prev_commit`
  against `git log`; if the ledger and branch
  history disagree, end with a terminal report. A substantive terminal blocker is not an automatic
  retry point; report it unless evidence shows it is fixed.
- **Prior cap-only terminal**: reconstruct the pending scope, current brief/artifact/code, and findings
  from the ledger and current evidence. Route through Review-Limit Resolution, appending `resume` and
  a consult with `supersedes_terminal`; never rewrite or delete the old terminal line. Check the
  underlying findings, not just the reason's wording: any substantive blocker still needs a repair or
  evidence-backed rejection. Reuse a recorded resolution only when scope, revision, and evidence still
  match; finish any pending correction/verification, do not consult again or assume the decision was
  applied. Missing repair history means the review budget is exhausted, not grounds for a fresh loop.
- **Mid-module resume**: keep the working tree as is and continue at the first scenario in that
  module without a `scenario_complete` line. That scenario's `301` baseline surfaces any breakage the
  interrupted pass left behind. For any pending `301`, rebuild and re-review its in-memory design
  brief against current code before more implementation while review budget remains; otherwise use
  Review-Limit Resolution on the rebuilt brief. The prior ledger alone is not design approval.
  Carry each scenario's consumed `repair_rounds` forward; if unavailable, treat its budget as exhausted.
- **On terminal** (any stage after initialization; Step 2 predates the log): append `terminal` before
  ending.
- **On completion**: append `run_complete`, then read the full file for the final report.

---

## Steps

### Phase 0 - Set Up

- [ ] **Step 1: Verify a clean working tree.** `git status --porcelain` must be empty. If not,
      consult — commit as a pre-run commit, or stash (`git stash push -u`); default: stash (reversible
      and keeps unrelated changes out of the run's ledger). Exception: on this feature's own
      `feature/<fid>-<feature-slug>` branch with an incomplete ledger, uncommitted changes are that
      run's resumable state — keep them and skip to Step 3.

- [ ] **Step 2: Green baseline.** Green Check. If it can't be made green, end with a terminal report —
      no feature work has started. Don't create the branch or begin Phase 1 until it's green. Skip on
      resume: the baseline was established when the run started, and later gates cover resumed work.

- [ ] **Step 3: Resolve feature identity** per `201`'s rule (check `D10` for an `F-ID`). Inspect any
      existing feature `implementation-log.jsonl` before interpreting `overview.md` `status: done`
      as a completed feature or considering a new `F-ID`:
      - A prior cap-only terminal routes through Review-Limit Resolution, including a stopped `301`
        or Feature Review. A substantive blocker overrides stale overview status: report it and
        leave the branch unmerged unless evidence shows it is fixed. Never use a new `F-ID` to reset
        a review budget.
      - An incomplete ledger (no `run_complete` for this run, including pending stages) overrides
        `status: done` for routing. Keep the existing `F-ID`; consult — resume from its last
        recorded step, or restart from Phase 1; default: resume. Follow the Implementation Log resume
        protocol and append a `resume` line. Consumed repair rounds are carried forward, not reset by
        a restart or branch change; unrecoverable repair history counts as an exhausted review budget.

      Apply the remaining cases only when no pending or unresolved terminal ledger state exists:
      - No entry → consult — assign the next `F-ID` and add the `D10` entry now, or treat the name as
        a near-match of an existing entry; default: assign new.
      - `overview.md` has `status: done` → consult — new run under a new `F-ID` for follow-on work, or
        end with a terminal report; default: new run.
      - `status: implementing` without the log → consult — restart from Phase 1, or infer a resume
        point from the branch's commits; default: restart (no trustworthy resume state).

- [ ] **Step 4: Create the feature branch.** Record the current branch as base; create and check out
      `feature/<fid>-<feature-slug>`. If it exists, consult — check it out and resume, or create a
      name with a short numeric suffix and start fresh; default: resume (almost always this feature's
      own prior attempt). Initialize the log.

- [ ] **Step 5: Resolve round-2 coverage** (default `balanced`).

### Phase 1 - High-Level Design

- [ ] **Step 6: Run `201-high-level-design`** per Skill Dispatch. Commit:
      `201: high-level design for <feature-slug>`.

- [ ] **Step 7: Feedback Pass (artifact refine) on the overview**, against `201`'s Step 6 quality
      checks. Commit if changed: `900: refine 201 overview for <feature-slug>`.

### Phase 2 - Round 1: Happy Path

- [ ] **Step 8: Run `202-spec-design`** per Skill Dispatch, coverage Happy Path Only. Commit:
      `202: happy-path specs for <feature-slug>`.

- [ ] **Step 9: Feedback Pass (artifact refine) on the specs**, against `202`'s Step 5 quality
      checks. Commit if changed: `900: refine 202 happy-path specs for <feature-slug>`.

- [ ] **Step 10: Build each happy-path module.** For each `TSM#` in order:
  1. For each `@TS###` in it, in order: run `301-spec-implementation` scoped to exactly that
     scenario as a chunk of this substantial feature, including its full design/review and tests-first
     discipline. On success only, set its tag in `specs.feature` to `@status_done` and append
     `scenario_complete`. A `review_limit` result first goes through Review-Limit Resolution, then
     resumes `301` at its pending phase with the explicit decision and original budget.
  2. Run one Module Check with the per-module fallback; regressions are repaired on the spot.
  3. Commit once for the module: `test cycle: <TSM###> implement + status`.

  No per-module cleanup — Steps 11/12 (and 17/18) clean in aggregate. Never start the next module
  until the current one is fully built, every tag updated (none left `@status_pending`), Module Check
  passed, and committed. A one-scenario module needs no special case.

- [ ] **Step 11: Feedback Pass (aggregate cleanup) on round-1 source.** Round-1 source diff,
      `source-cleanup-only`, strictly bounded to round-1 files — unless round-2 coverage is `none`,
      making this the final round: then pass `401` pre-authorized scope expansion (see Step 17).
      Commit if changed: `900: round-1 source cleanup`.

- [ ] **Step 12: Feedback Pass (aggregate cleanup) on round-1 tests.** As Step 11,
      `test-cleanup-only`. Commit if changed: `900: round-1 test cleanup`.

- [ ] **Step 13: Close Round 1 with a Green Check.** Failures here are mid-run regressions from
      Round 1. A red Round 1 ends the run here rather than building Round 2 on top of it. Commit if
      changed: `green check: round-1 fixes`.

### Phase 3 - Round 2: Expanded Coverage (skip if round-2 coverage is `none`)

- [ ] **Step 14: Run `202-spec-design`** per Skill Dispatch at the round-2 level. Commit:
      `202: <level> specs for <feature-slug>`.

- [ ] **Step 15: Feedback Pass (artifact refine) on the updated specs.** As Step 9. Commit if changed.

- [ ] **Step 16: Build each new or changed module.** First compare `specs.feature` against the Step 13
      commit: any `@status_done` scenario whose steps, examples, or outcomes Steps 14–15 changed goes
      back to `@status_pending`, keeping its `TS###`. Wording-only edits keep their status. Then, as
      Step 10, build every module with a `@status_pending` scenario, running the inner `301` loop only
      over those. Unchanged `@status_done` scenarios aren't rebuilt but stay in that module's Module
      Check.

- [ ] **Step 17: Feedback Pass (aggregate cleanup) on final source** — the entire feature branch
      diff. The last round to run (round 2 here, or round 1 at Steps 11/12 when round 2 is `none`)
      passes `401` pre-authorized scope expansion, so its approval gate doesn't stop the run; every
      other aggregate cleanup stays bounded to its own round's files. Commit if changed:
      `900: final source cleanup`.

- [ ] **Step 18: Feedback Pass (aggregate cleanup) on final tests.** As Step 17 for test files.
      Commit if changed: `900: final test cleanup`.

### Phase 4 - Finalize

- [ ] **Step 19: Sync the base branch.** Merge the current base branch into the feature branch
      (`git merge --no-ff --no-commit <base>`), record the base HEAD as the synced base, stage the
      log line, and commit: `sync: merge <base> into feature/<fid>-<feature-slug>`. Nothing to commit
      when the base hasn't moved. On conflict, consult — resolve the hunks so both branches' intended
      behavior survives, or end with a terminal report naming the files; default: resolve. Steps
      20–21 then review and validate the combined result.

- [ ] **Step 20: Feature Review** of the synced branch (see Checkpoint Protocols).

- [ ] **Step 21: Final Green Check.** Never merge on red. Non-convergence fails closed and leaves the
      branch unmerged. Review-limit decisions never substitute for passing validation.

- [ ] **Step 22: Update feature status.** Confirm the base branch HEAD still equals the synced base
      from Step 19; if it moved, return to Step 19 and rerun Steps 19–21. Only after Steps 20 and 21
      pass on the same code (Step 20 clean or decider-resolved, Step 21 green) — confirming the whole
      feature passes its required acceptance gates —
      set `status: done` in `overview.md`, and 🟢 Done on the `D10` entry when D10 tracks this `F-ID`.
      Scenario-scoped `301` successes cannot make this update. Commit:
      `901: mark <feature-slug> done`.

- [ ] **Step 23: Merge back.** `git merge --no-ff feature/<fid>-<feature-slug>` into the base branch.
      The base is already in the feature branch, so the merge can't conflict and its tree is exactly
      the one Step 21 validated; no revalidation is needed. If git reports a conflict anyway, run
      `git merge --abort` and end with a terminal report.

- [ ] **Step 24: Summarize.** Append `run_complete` and commit only the log on the base branch:
      `901: run complete for <feature-slug>`. Build the report from the full log plus `git log`:
      feature identity, branch, round-2 coverage used, the commit ledger, modules and scenarios per
      round, gate results and repair rounds, Feedback Pass iteration counts and outstanding items with
      how the Feature Review resolved them, actual reviewer verdicts, decider-selected approaches and
      remaining risks, Feature Review advisories, final validation result, the merge commit (or terminal
      reason), and every Decision Consult with its resolution.
