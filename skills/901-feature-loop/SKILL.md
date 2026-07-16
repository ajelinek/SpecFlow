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

Run one feature through `201` → `202` (Happy Path) → per-scenario `301`+`401`+`401` → end-of-round
cleanup → optional expanded-coverage round of the same shape → final validation → merge, on its
own branch, with a commit after every stage. `900-feedback-loop` reviews every design/spec
artifact and every aggregate cleanup pass before the run advances past it.

**Output**: Updates project source/test files and `.specflow/features/<fid>-<feature-slug>/`
artifacts. Creates a feature branch, commits throughout, and merges it back. No new artifact type
of its own.

---

## Required Inputs

Before proceeding, confirm:

1. **Feature identity** — a name and/or `F-ID`, resolved the same way `201` resolves it (existing
   `D10` entry, or an explicit new `F-ID` assignment). Do not create the feature branch before this
   resolves.
2. **Round 2 coverage** — one of `none`, `balanced`, `comprehensive`. Default `comprehensive` if
   unstated; say so in the final summary rather than blocking. Round 1 is always **Happy Path
   Only** and always runs.
3. **Workflow fit** — this is for a whole feature that justifies full BDD rigor and branch-level
   traceability. For an isolated fix or small maintenance change, reroute to `301-spec-implementation`
   or `401-cleanup` directly instead.

If feature identity cannot be resolved, ask one blocking question.

---

## Execution Protocol

- You are the orchestrator for the entire run.
- `201` and `202` calls, and every aggregate end-of-round `401` cleanup, are each followed by a
  `900-feedback-loop` call reviewing their output before the run advances.
- Per-scenario build steps (`301`, then `401` source, then `401` test) run as direct sequential
  skill calls — never wrapped in `900-feedback-loop`. `301`'s own internal phase validation is the
  guardrail at that granularity.
- All git operations (branch, commit, merge) run directly here via Bash, never delegated to a
  subagent.
- Keep working state compact: feature identity, branch name, base branch, current stage, and a
  running commit ledger. Do not carry full skill or subagent transcripts forward between stages.

---

## Steps

### Phase 0 - Set Up

- [ ] **Step 1: Verify a clean working tree.** `git status --porcelain` must be empty. If not, stop
  and ask whether to commit or stash the outstanding changes first.

- [ ] **Step 2: Resolve feature identity.** Use `201`'s own resolution rule: check `D10` for an
  existing `F-ID`, or ask whether to add one before continuing. If `overview.md` already exists
  with `status: done`, stop and confirm this is really a new run. If it exists with
  `status: implementing`, ask whether to resume from that point or restart.

- [ ] **Step 3: Create the feature branch.** Record the current branch as the base branch. Create
  and check out `feature/<fid>-<feature-slug>` from it. If that branch already exists, ask whether
  to resume on it or choose a different name.

- [ ] **Step 4: Resolve round-2 coverage.** `none`, `balanced`, or `comprehensive` (default
  `comprehensive`).

### Phase 1 - High-Level Design

- [ ] **Step 5: Run `201-high-level-design`** directly for the feature. Commit:
  `201: high-level design for <feature-slug>`.

- [ ] **Step 6: Run `900-feedback-loop` on the overview.** Step 1 brief: `overview.md` already
  exists; no-op until feedback exists, then apply it directly to the file (agent:
  `general-purpose`). Step 2 brief: review `overview.md` against `201`'s own Step 6 quality checks —
  scope clarity, real acceptance criteria, explicit out-of-scope exclusions, a user-journey that
  leads with user-visible flow (agent: `@reviewer`). Commit if changed: `900: refine 201 overview
  for <feature-slug>`.

### Phase 2 - Round 1: Happy Path

- [ ] **Step 7: Run `202-spec-design`** directly, coverage: Happy Path Only. Commit:
  `202: happy-path specs for <feature-slug>`.

- [ ] **Step 8: Run `900-feedback-loop` on the specs.** Same shape as Step 6, criteria drawn from
  `202`'s own Step 5 quality check. Commit if changed: `900: refine 202 happy-path specs for
  <feature-slug>`.

- [ ] **Step 9: Build out each happy-path scenario, one at a time.** For each `@TS###` in the
  happy-path set, in order:
  1. Run `301-spec-implementation` scoped to exactly that `@TS###`.
  2. Run `401-cleanup` (`source-cleanup-only`), scope anchor: the working-tree changes from that
     `301` pass.
  3. Run `401-cleanup` (`test-cleanup-only`), same scope anchor.
  4. Commit: `test cycle: <TS###> implement + cleanup`.

  Do not start the next scenario until the current one is committed.

- [ ] **Step 10: Run `900-feedback-loop` on aggregate source cleanup.** Wraps `401-cleanup`
  (`source-cleanup-only`) across every source file changed in round 1. Strictly bounded to round-1
  files (see Rule 2 on final-round scope expansion). Commit if changed:
  `900: round-1 source cleanup`.

- [ ] **Step 11: Run `900-feedback-loop` on aggregate test cleanup.** Same shape,
  `test-cleanup-only`, round-1 test files. Commit if changed: `900: round-1 test cleanup`.

### Phase 3 - Round 2: Expanded Coverage (skip entirely if round-2 coverage is `none`)

- [ ] **Step 12: Run `202-spec-design`** again, coverage: the resolved round-2 level. Commit:
  `202: <level> specs for <feature-slug>`.

- [ ] **Step 13: Run `900-feedback-loop` on the updated specs.** Same shape as Step 8. Commit if
  changed.

- [ ] **Step 14: Build out each newly added scenario, one at a time.** Same as Step 9, scoped only
  to the `@TS###` scenarios Step 12 added — not the round-1 scenarios again.

- [ ] **Step 15: Run `900-feedback-loop` on final aggregate source cleanup.** Wraps `401-cleanup`
  (`source-cleanup-only`) across the entire feature branch diff. This is the final round's cleanup:
  pre-authorize scope expansion past the frozen boundary so `401`'s normal approval gate does not
  stop the run. Commit if changed: `900: final source cleanup`.

- [ ] **Step 16: Run `900-feedback-loop` on final aggregate test cleanup.** Same shape,
  `test-cleanup-only`, same expanded authorization. Commit if changed:
  `900: final test cleanup`.

### Phase 4 - Finalize

- [ ] **Step 17: Run full validation** directly via `@execution-agent`: `mode: test`, `mode: lint`,
  `mode: build`. If anything fails, run a focused repair pass through `@coder`, then recheck. Stop
  and surface the blocker if repair stops converging — do not merge on a red build.

- [ ] **Step 18: Update feature status** to `done` in `overview.md` if not already.

- [ ] **Step 19: Merge back.** `git merge --no-ff feature/<fid>-<feature-slug>` into the recorded
  base branch. Keep the feature branch afterward — do not delete it. Never push to a remote. If the
  merge conflicts, stop and surface it rather than resolving it unilaterally.

- [ ] **Step 20: Summarize.** Report: feature identity, branch name, round-2 coverage used, the
  full commit ledger, scenarios implemented per round, `900-feedback-loop` iteration counts per
  stage, final validation result, and the merge commit.

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
4. One commit per top-level sequence item. Skip a commit only when a step produced no file
   changes.
5. All git operations run directly in this orchestrating context, never delegated to a subagent.
6. Never push to a remote. Merge is always `--no-ff`; the feature branch is kept afterward, not
   deleted.
7. Never start the next scenario's build cycle before the current one is committed.
8. Stop and ask rather than guessing at feature identity, round-2 coverage ambiguity, a dirty
   working tree, an existing branch of the same name, or a repair/feedback loop that stops
   converging.
9. This workflow is heavy by design: a feature with several scenarios across two coverage rounds
   can involve on the order of a hundred or more subagent invocations. Use it for a feature that
   genuinely warrants full BDD rigor and branch-level traceability — route small, isolated changes
   to `301-spec-implementation` or `401-cleanup` directly instead.
