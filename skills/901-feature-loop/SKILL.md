---
name: 901-feature-loop
description: >
  Use `901` to run one feature end-to-end through SpecFlow's full pipeline as a single
  git-tracked run: high-level design, happy-path specs, per-scenario test-driven build-out,
  cleanup, an optional expanded-coverage round, and a merge back to the base branch. Every
  design/spec artifact and every end-of-round cleanup pass is checked by `900-feedback-loop`
  before the run advances, and every stage lands its own commit on a dedicated feature branch.
  Trigger it for prompts like "901", "feature loop", "master loop this feature", or "run the full
  pipeline for feature F013" when a feature should go from a bare name to a merged, cleaned-up
  branch with commit-level traceability at every stage.
argument-hint: "[feature-name-or-fid] [round-2-coverage: none|balanced|comprehensive]"
disable-model-invocation: true
context: fork
---

# 901 - Feature Loop

Run one feature end-to-end on its own branch, headless: a green four-layer baseline gate, then
`201` → `202` (Happy Path) → per-scenario `301`+`401`+`401` (each scenario closed out with a
`specs.feature` status-tag update and its own green check) → end-of-round cleanup and a round
close-out green check → an optional expanded-coverage round of the same shape → final validation
→ merge. Every `NNN` call below is a single direct skill invocation except `900`, which is itself
a small review ⇄ apply-fix loop. `900-feedback-loop` reviews every design/spec artifact and every
aggregate cleanup pass before the run advances past it. Every green check — baseline, per
scenario, round close-out, and final — covers unit, integration/e2e, lint, and build as four
separate `@validator` calls; see Step 2 for the full repair discipline. Nothing in this run
blocks on a user question — every fork in the road routes through the Decision Consult, a
two-`@decider`-call arbitration the orchestrator resolves itself before continuing; see Decision
Consult below.

**Output**: Updates project source/test files and `.specflow/features/<fid>-<feature-slug>/`
artifacts. Creates a feature branch, commits throughout, and merges it back. No new artifact type
of its own.

---

## Required Inputs

Before proceeding, confirm:

1. **Feature identity** — a name and/or `F-ID`, resolved the same way `201` resolves it (existing
   `D10` entry, or an explicit new `F-ID` assignment). Do not create the feature branch before this
   resolves; see Step 3 for how ambiguity here is resolved without asking.
2. **Round 2 coverage** — one of `none`, `balanced`, `comprehensive`. Default `comprehensive` if
   unstated; say so in the final summary rather than blocking. Round 1 is always **Happy Path
   Only** and always runs.
3. **Workflow fit** — this is for a whole feature that justifies full BDD rigor and branch-level
   traceability. For an isolated fix or small maintenance change, reroute to `301-spec-implementation`
   or `401-cleanup` directly instead.

This workflow runs headless end-to-end: nothing here is resolved by asking the user. Feature
identity ambiguity is resolved by the Decision Consult (see below) using the defaults documented
in Step 3.

---

## Execution Protocol

- You are the orchestrator for the entire run, and you run it headless: no step ever pauses to
  ask the user a question. Every decision point that would otherwise block routes through the
  Decision Consult below instead, and the run acts on its result immediately.
- All four validation layers — unit, integration/e2e, lint, build — gate every checkpoint:
  baseline (Step 2), each scenario (Step 10), each round close-out (Steps 13 and 17), and final
  validation (Step 19). Each layer is always its own separate `@validator` call, matching
  that agent's one-mode-per-call contract, and is never checked directly by this orchestrating
  context. No branch or Phase 1 work exists until the Step 2 baseline is green — see Step 2 for
  the repair discipline and Rule 4 for the full checkpoint list.
- `201` and `202` each get a `900-feedback-loop` pass immediately after they run. Aggregate
  end-of-round cleanup gets the same treatment, but there Step 2 (apply-fix) is a real
  `401-cleanup` invocation, not a bare edit. Per-scenario build steps never go through
  `900-feedback-loop` — see Rule 3.
- Any decision point below — feature identity, an existing branch, a dirty working tree, a merge
  conflict, or a repair/feedback loop that stops converging — resolves through the Decision
  Consult, never through a question to the user. Only the baseline gate (Step 2) and final
  validation (Step 19) can end the run without a merge, and even then as a terminal status report,
  not a suspended question.
- All git operations (branch, commit, merge) run directly here via Bash, never delegated to a
  subagent.
- Keep working state compact: feature identity, branch name, base branch, current stage, a running
  commit ledger, and a log of every Decision Consult invoked (brief, both recommendations,
  resolution). Do not carry full skill or subagent transcripts forward between stages.

---

## Decision Consult

This workflow never pauses mid-run to ask the user a question. Every point in the steps below
that would otherwise be a blocking question instead runs this consult, and the run acts on the
result immediately — "ask whether..." and "stop and confirm..." below always mean "run this
consult, then continue."

1. **Frame it.** State the decision as a short, self-contained brief: the specific question, the
   concrete option set (including that step's documented default, if any), and the state needed to
   reason about it — feature identity, current stage, and what triggered the decision.
2. **Consult two independent `@decider` calls in parallel**, given the identical situational
   brief, each in its own fresh context with no visibility into the other's answer. `@decider` is
   a purpose-built worker (`agents/decider.md`) — a stronger model at higher effort than the
   other workers, since these are the calls nothing double-checks in a headless run. Append
   opposing stance framing to each copy of the brief so the two calls reason from different
   vantage points rather than converging on the same first idea:
   - Call A — stance: *if this trades off forward progress against caution, weight keeping the
     run moving.*
   - Call B — stance: *if this trades off forward progress against caution, weight the
     lowest-risk, most-correct, most-reversible option.*
   Each returns exactly: the option it picked from the set, a one-paragraph rationale, and a
   confidence (`high`/`medium`/`low`) — see `agents/decider.md`'s output format.
3. **Resolve.**
   - Same option from both → take it.
   - Different options, one `high` confidence and the other not → take the `high`-confidence
     option.
   - Different options, confidence tied → take whichever option has the smaller blast radius
     (reversible over irreversible, narrower scope over broader, an option that preserves prior
     work over one that discards it). If that still doesn't separate them, spawn a third
     `@decider` call, no stance framing, with both recommendations and their rationale attached,
     and take its pick.
   - Both agents report the brief is genuinely unanswerable (missing information no amount of
     reasoning supplies) → fall back to that step's documented default. A step with no documented
     default ends the run with a terminal status report instead of a merge — this only happens at
     the baseline gate (Step 2) or final validation (Step 19); see Rule 9.
4. **Log it.** Record the brief, both recommendations, and the resolution in the running working
   state so Step 22's summary can show what was decided and why.

---

## Steps

### Phase 0 - Set Up

- [ ] **Step 1: Verify a clean working tree.** `git status --porcelain` must be empty. If not, run
      a Decision Consult — options: commit the outstanding changes as a pre-run commit, or stash
      them (`git stash push -u`) and continue; default on an unresolved tie: stash, since it's
      fully reversible and keeps the run's own commit ledger free of unrelated changes. Act on the
      result and continue.

- [ ] **Step 2: Establish and confirm a green baseline.** Before any design or code work starts,
      run `@validator` as four separate calls, one per layer — `@validator` accepts only
      one mode per invocation, so these are never combined into a single pass, and this orchestrating
      context never checks any of them itself:
  1. `mode: test`, scoped to the unit suite
  2. `mode: test`, scoped to the integration/e2e suite (whatever the project actually separates
     out)
  3. `mode: lint`
  4. `mode: build`

  For each failing test, run `402-test-correction` scoped to exactly that test, then rerun the
  layer it came from. Repeat per failing test until that layer is green or `402` returns a
  blocking question. On a blocking question, run a Decision Consult — options: `402`'s own
  suggested resolutions, plus "skip this test and flag it in the final summary" as a last resort;
  default: whichever resolution `402` itself flagged as most likely. Act on the result and
  continue the repair loop. For a lint or build failure, run a focused `@coder` repair pass, then
  recheck — the same repair path used at every other checkpoint. If that repair pass stops
  converging (the same failure recurs after an attempt), run a Decision Consult — options: retry
  with a widened repair scope, or end the run with a terminal blocked-status report; default: one
  widened-scope retry before falling back to the terminal report.

  A pre-existing baseline that still cannot be made green after consult-driven retries ends the
  run here with a terminal report — this is one of only two checkpoints (the other is Step 19)
  where "end the run" rather than "keep going" is the right call, since no feature work has
  started yet to build on top of a red baseline. Otherwise, do not create the feature branch
  (Step 4) or begin Phase 1 until all four layers above are confirmed green.

- [ ] **Step 3: Resolve feature identity.** Use `201`'s own resolution rule: check `D10` for an
      existing `F-ID`. If none exists, run a Decision Consult — options: assign the next available
      `F-ID` and add the `D10` entry now, or treat the given name as referring to an existing
      near-match entry; default: assign the next available `F-ID` — an unresolvable name is more
      likely new work than a typo against something already tracked.

      If `overview.md` already exists with `status: done`, run a Decision Consult — options: start
      a new run under a new `F-ID` for follow-on work, or treat the invocation as unintended and
      end the run with a terminal report; default: start a new run — a `done` feature being
      invoked again is almost always new follow-on work, not a re-run of the same one.

      If it exists with `status: implementing`, run a Decision Consult — options: resume from that
      point, or restart from Phase 1; default: resume — it preserves prior work and is fully
      reversible if wrong, where a restart is not.

- [ ] **Step 4: Create the feature branch.** Record the current branch as the base branch. Create
      and check out `feature/<fid>-<feature-slug>` from it. If that branch already exists, run a
      Decision Consult — options: check it out and resume on it, or create a disambiguated name
      (append a short numeric suffix) and start fresh; default: resume on it — a branch with this
      exact name is almost always this same feature's own prior attempt.

- [ ] **Step 5: Resolve round-2 coverage.** `none`, `balanced`, or `comprehensive` (default
      `comprehensive`).

### Phase 1 - High-Level Design

- [ ] **Step 6: Run `201-high-level-design`** directly for the feature. Commit:
      `201: high-level design for <feature-slug>`.

- [ ] **Step 7: Run `900-feedback-loop` on the overview.** Step 1 brief (review): judge
      `overview.md` against `201`'s own Step 6 quality checks — scope clarity, real acceptance
      criteria, explicit out-of-scope exclusions, a user-journey that leads with user-visible flow
      (agent: `@reviewer`). Step 2 brief (apply-fix): apply Step 1's feedback directly to
      `overview.md` (agent: `general-purpose`). Commit if changed: `900: refine 201 overview for
      <feature-slug>`.

### Phase 2 - Round 1: Happy Path

- [ ] **Step 8: Run `202-spec-design`** directly, coverage: Happy Path Only. Commit:
      `202: happy-path specs for <feature-slug>`.

- [ ] **Step 9: Run `900-feedback-loop` on the specs.** Same shape as Step 7, criteria drawn from
      `202`'s own Step 5 quality check. Commit if changed: `900: refine 202 happy-path specs for
      <feature-slug>`.

- [ ] **Step 10: Build out each happy-path scenario, one at a time.** For each `@TS###` in the
      happy-path set, in order:
  1. Run `301-spec-implementation` scoped to exactly that `@TS###`.
  2. Run `401-cleanup` (`source-cleanup-only`), scope anchor: the working-tree changes from that
     `301` pass.
  3. Run `401-cleanup` (`test-cleanup-only`), same scope anchor.
  4. In `specs.feature`, replace that scenario's status tag with `@status_done` — `301`'s own
     validation already confirmed a passing test run for it, which is the tag's own definition of
     done.
  5. Verify the project is green: the same four separate `@validator` calls as Step 2
     (unit, integration/e2e, lint, build). A failing test goes through `402-test-correction`,
     scoped to that test, then revalidate; a lint or build failure goes through a focused
     `@coder` repair pass, then recheck — this is a regression from this scenario's own changes,
     not a baseline issue, so it is repaired here rather than surfaced as a blocker. If that
     repair does not converge, run a Decision Consult — options: retry `301` for this scenario
     with a revised approach informed by the failure, revert this scenario's changes and retry
     `301` from scratch, or end the run with a terminal report naming the stuck scenario; default:
     one revised-approach retry, then one from-scratch retry, then the terminal report if both
     fail.
  6. Commit: `test cycle: <TS###> implement + cleanup + status`.

  Do not start the next scenario until the current one — including its status-tag update and
  green check — is committed.

- [ ] **Step 11: Run `900-feedback-loop` on aggregate source cleanup.** Step 1 brief (review):
      judge the round-1 source diff for cross-scenario issues a single-scenario view could miss —
      duplication, inconsistent patterns, dead code (agent: `@reviewer`). Step 2 brief (apply-fix):
      run `401-cleanup` (`source-cleanup-only`) scoped to that same round-1 source diff, driven by
      Step 1's feedback — a real `401-cleanup` run, so its own baseline/validation/repair discipline
      applies, not a bare edit (agent: `general-purpose`). Strictly bounded to round-1 files (see
      Rule 2 on final-round scope expansion). Commit if changed: `900: round-1 source cleanup`.

- [ ] **Step 12: Run `900-feedback-loop` on aggregate test cleanup.** Same shape as Step 11,
      `test-cleanup-only`, round-1 test files. Commit if changed: `900: round-1 test cleanup`.

- [ ] **Step 13: Verify the project is green to close out Round 1.** Same four separate
      `@validator` calls as Step 2. A failing test goes through `402-test-correction`, scoped
      to that test, then revalidate; a lint or build failure goes through a focused `@coder` repair
      pass, then recheck — this is a mid-run regression from Round 1's own work, not a baseline
      issue. If that repair does not converge, run a Decision Consult — options: retry with a
      widened repair scope, or end the run with a terminal report naming the failing layer;
      default: one widened-scope retry before the terminal report. Commit if anything changed:
      `green check: round-1 fixes`.

### Phase 3 - Round 2: Expanded Coverage (skip entirely if round-2 coverage is `none`)

- [ ] **Step 14: Run `202-spec-design`** again, coverage: the resolved round-2 level. Commit:
      `202: <level> specs for <feature-slug>`.

- [ ] **Step 15: Run `900-feedback-loop` on the updated specs.** Same shape as Step 9. Commit if
      changed.

- [ ] **Step 16: Build out each newly added scenario, one at a time.** Same as Step 10, scoped
      only to the `@TS###` scenarios Step 14 added — not the round-1 scenarios again.

- [ ] **Step 17: Run `900-feedback-loop` on final aggregate source cleanup.** Same shape as
      Step 11, scoped to the entire feature branch diff. This is the final round's cleanup:
      pre-authorize scope expansion past the frozen boundary so `401`'s normal approval gate does not
      stop the run. Commit if changed: `900: final source cleanup`.

- [ ] **Step 18: Run `900-feedback-loop` on final aggregate test cleanup.** Same shape as Step
      12, same expanded authorization. Commit if changed: `900: final test cleanup`.

### Phase 4 - Finalize

- [ ] **Step 19: Run full validation.** Same four separate `@validator` calls as Step 2 —
      unit, integration/e2e, lint, build — each its own invocation, never combined. For each failing
      test, run `402-test-correction` scoped to that test, then rerun the layer it came from; repeat
      per failing test until green or `402` escalates. On escalation, resolve it the same way Step 2
      does: a Decision Consult over `402`'s suggested resolutions plus a skip-and-flag last resort.
      For a lint or build failure, run a focused repair pass through `@coder`, then recheck. If
      either repair path stops converging, run a Decision Consult — options: retry with a widened
      scope, or end the run with a terminal report; default: one widened-scope retry before the
      terminal report. Do not merge on a red build — if consult-driven retries here don't converge,
      end the run with a terminal report instead of merging. This and Step 2 are the only two
      points where the run ends without a merge.

- [ ] **Step 20: Update feature status** to `done` in `overview.md` if not already.

- [ ] **Step 21: Merge back.** `git merge --no-ff feature/<fid>-<feature-slug>` into the recorded
      base branch. Keep the feature branch afterward — do not delete it. Never push to a remote. If
      the merge conflicts, run a Decision Consult — options: resolve the conflicting hunks directly
      (favoring the feature branch's changes, since the base branch is expected to be behind it), or
      abort the merge and end the run with a terminal report describing the conflicting files;
      default: resolve directly. Resolving a conflict here does not stand in for a green check:
      rerun the full Step 19 four-layer validation afterward before treating this step as complete.
      If that revalidation cannot converge, abort the merge and end the run with a terminal report
      instead of leaving a red merge on the base branch.

- [ ] **Step 22: Summarize.** Report: feature identity, branch name, round-2 coverage used, the
      full commit ledger, scenarios implemented per round, `900-feedback-loop` iteration counts per
      stage, final validation result, the merge commit (or terminal-report reason if the run ended
      without one), and every Decision Consult invoked during the run with its resolution.

---

## Rules

1. Round 1 is always Happy Path Only and always runs; round 2 is optional and defaults to
   `comprehensive`.
2. Scope-expansion authorization for aggregate `401` cleanup applies only to whichever round
   actually runs last — round 2's cleanup if it runs, otherwise round 1's cleanup. Every other
   aggregate cleanup pass stays strictly bounded to its own round's files.
3. Per-scenario `301`/`401`/`401` cycles run as direct sequential skill calls, never wrapped in
   `900-feedback-loop`. Only design/spec artifacts and aggregate end-of-round cleanup get the
   `900-feedback-loop` treatment.
4. Every validation checkpoint this workflow owns directly — baseline (Step 2), the per-scenario
   green check (Steps 10 and 16), the round-1 close-out check (Step 13), and final validation
   (Step 19) — covers all four layers (unit, integration/e2e, lint, build) as separate
   `@validator` calls, repaired the same way at every checkpoint including baseline:
   `402-test-correction` for failing tests, a focused `@coder` pass for lint/build failures, each
   scoped to exactly the failure found and revalidated after. No branch or Phase 1 work exists
   until the Step 2 baseline is green. A repair pass that stops converging routes through the
   Decision Consult rather than escalating to the user; only the baseline gate (Step 2) and final
   validation (Step 19) can end the run outright once consult-driven retries are exhausted, and
   even then as a terminal report, not a question.
5. One commit per top-level sequence item. Skip a commit only when a step produced no file
   changes.
6. All git operations run directly in this orchestrating context, never delegated to a subagent.
7. Never push to a remote. Merge is always `--no-ff`; the feature branch is kept afterward, not
   deleted.
8. Never start the next scenario's build cycle before the current one — including its
   `specs.feature` status-tag update and green check — is committed. A scenario is never left at
   `@status_pending` once its build cycle has run.
9. Never stop mid-run to ask the user a question. Feature identity, an existing branch of the
   same name, a dirty working tree, a merge conflict, and a repair/feedback loop that stops
   converging all route through the Decision Consult instead, and the run acts on its result
   immediately. The only way this workflow ends without a merge is a documented terminal report
   from the baseline gate (Step 2) or final validation (Step 19) once consult-driven retries are
   exhausted — never a suspended question.
10. This workflow is heavy by design: a feature with several scenarios across two coverage rounds
    can involve on the order of a hundred or more subagent invocations. Use it for a feature that
    genuinely warrants full BDD rigor and branch-level traceability — route small, isolated changes
    to `301-spec-implementation` or `401-cleanup` directly instead.
