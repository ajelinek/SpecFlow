---
name: 901-feature-loop
description: >
  Use `901` to run one feature end-to-end, headless, on its own git branch: high-level design,
  happy-path specs, test-driven build-out committed per module, cleanup, optional expanded coverage,
  and a merge back. Trigger it for prompts like "901", "feature loop", "master loop this feature", or
  "run the full pipeline for feature F013" when a feature should go from a bare name to a merged,
  cleaned-up branch.
argument-hint: "[feature-name-or-fid] [round-2-coverage: none|balanced|comprehensive]"
context: fork
---

# 901 - Feature Loop

Run one feature end-to-end on its own branch, headless: Green Check baseline → `201` → `202` (Happy
Path) → per-scenario `301` grouped by `TSM#` module → aggregate cleanup and a round close-out Green
Check → optional expanded-coverage round of the same shape → final Green Check → merge.

Each `@TS###` gets its own `301` pass and `specs.feature` status-tag update, but the module is the
unit that gets a Module Check and a commit. Every design/spec artifact and aggregate cleanup pass gets
a Feedback Pass (`900-feedback-loop`, under tighter caps than its default) before the run advances.
Every stage lands its own commit.

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
   isolated fix or small maintenance change, reroute to `301-spec-implementation` or `401-cleanup`.

---

## Execution Protocol

- You are the orchestrator, and the run is headless: no step ever asks the user. Every blocking
  decision — including any blocking question a called skill returns — goes through the **Decision
  Consult**, and the run acts on the result immediately (re-invoking the skill with the decision when
  needed). "Ask whether…" and "stop and confirm…" always mean "run the consult, then continue."
- All git operations (branch, commit, merge) run here via Bash, never in a subagent. Never push to a
  remote. Merge is always `--no-ff`; the feature branch is kept afterward.
- One commit per top-level step, skipped only when a step changed no files. Its log lines are staged
  in that same commit, never a separate one.
- Keep working state to feature identity, branch name, base branch, and current stage. The commit
  ledger, consults, and Feedback Pass counts live in `implementation-log.jsonl` — read it back rather
  than carrying transcripts or re-deriving from memory.
- **Model routing:** mechanical work runs on cheaper pinned models — `@validator` (haiku, pinned in
  its definition; call it plainly) and the Feedback Pass Apply-Fix role (`sonnet`). Judgment-heavy
  work — `@decider` and the `201`/`202`/`301`/`302` invocations, including the `general-purpose`
  subagents carrying `201`/`202` — inherits this run's own tier.

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

Read the artifact back from disk when a later step needs it. `301`, `302`, `401`, `402`, and `204`
fork on their own; call them directly.

---

## Decision Consult

1. **Frame a brief:** the question, the concrete option set (including the step's documented
   default), and the needed state — feature identity, current stage, what triggered it.
2. **Call `@decider` once.** It returns one option, a rationale, and a confidence level.
3. **Act on it immediately.** On `UNANSWERABLE`, use the step's documented default; a step with none
   ends the run with a terminal report — possible only at Step 2 or Step 19. Append a
   `decision_consult` log line.

---

## Checkpoint Protocols

### Green Check

Full validation, used only at the baseline (Step 2), round close-outs (Steps 13, 19), and merge
revalidation (Step 21). Dispatch four `@validator` calls in parallel in one message:

1. `mode: test`, unit suite
2. `mode: test`, integration/e2e suite (whatever the project separates out)
3. `mode: lint`
4. `mode: build`

Repair per layer once all return:
- **Failing test** → `402-test-correction` scoped to exactly that test, then revalidate that layer;
  repeat per failing test until green or `402` returns a blocking question.
- **Lint/build failure** → a focused `@coder` repair scoped to the failure, then recheck.

**Standard fallback** (Steps 2, 13, 19, 21): on a `402` blocking question, consult — `402`'s
suggested resolutions or skip-and-flag; default `402`'s likeliest pick. On lint/build
non-convergence, consult — widened-scope retry or terminal report; default one widened retry, then
terminal.

### Module Check

Lightweight validation at Steps 10 and 16, run once after every scenario in a module has had its own
full `301` pass. Two `@validator` calls in parallel: `mode: lint`, and `mode: test` scoped to exactly
this module's spec file(s) — not the full e2e suite, which runs once at the round's Green Check.
Repair as in Green Check, for these two layers only.

**Per-module fallback** (Steps 10, 16): any non-convergence gets one consult — retry `301` for the
implicated `@TS###` with a revised approach; revert the module's uncommitted changes and retry the
whole module; or terminal report naming the stuck module (and `@TS###`, if isolated). Default:
revised-approach retry, then from-scratch retry, then terminal.

### Feedback Pass

One `900-feedback-loop` cycle — Review by `@reviewer`, Apply-Fix by `general-purpose` pinned to
`sonnet` — then a commit if anything changed. Only two flavors exist; the per-module build cycles
never get one.

- **Artifact refine** (Steps 7, 9, 15): `@reviewer` judges the artifact against its producing skill's
  quality checks; Apply-Fix edits the file directly. Cap **1**.
- **Aggregate cleanup** (Steps 11, 12, 17, 18): `@reviewer` judges the round's diff for
  cross-scenario issues — duplication, inconsistent patterns, dead code. Apply-Fix runs a real
  `401-cleanup` invocation scoped to that diff and driven by the review, so `401`'s
  baseline/validation/repair discipline applies. Cap **2**.

Append a `feedback_pass` log line for each.

---

## Implementation Log

`.specflow/features/<fid>-<feature-slug>/implementation-log.jsonl` — the run's durable resume state
and audit trail. JSON Lines, **append-only, never rewritten in place** (an append can't corrupt prior
entries). Each line has a `type` and `ts` (ISO 8601):

| `type` | Written at | Fields |
|---|---|---|
| `run_init` | Step 4, once | `fid`, `feature`, `branch`, `base_branch`, `round_2_coverage` |
| `step_complete` | after every top-level step | `step`, `phase`, `commit` (SHA, or `null`), `summary` |
| `decision_consult` | every Decision Consult | `step`, `question`, `decision`, `confidence` |
| `feedback_pass` | every Feedback Pass | `step`, `flavor`, `iterations`, `converged` |
| `resume` | Step 3, when resuming | `step`, `phase`, `found` |
| `terminal` | Step 19 non-convergence | `step`, `reason` |
| `run_complete` | Step 22, once | `step: 22` |

- **Initialize** at Step 4 after the branch exists: create the feature folder if needed and append
  `run_init`; skip if the file already exists from a resumed run.
- **On resume**: read backward for the last `step_complete` or `resume` line to get the current
  step/phase — don't guess or parse the whole file — then append a `resume` line.
- **On terminal** (Step 19 only; Step 2 predates the log): append `terminal` before ending.
- **On completion**: append `run_complete`, then read the full file for the final report.

---

## Steps

### Phase 0 - Set Up

- [ ] **Step 1: Verify a clean working tree.** `git status --porcelain` must be empty. If not,
      consult — commit as a pre-run commit, or stash (`git stash push -u`); default: stash (reversible
      and keeps unrelated changes out of the run's ledger).

- [ ] **Step 2: Green baseline.** Green Check, standard fallback. If it can't be made green, end with
      a terminal report — no feature work has started. Don't create the branch or begin Phase 1
      until it's green.

- [ ] **Step 3: Resolve feature identity** per `201`'s rule (check `D10` for an `F-ID`):
      - No entry → consult — assign the next `F-ID` and add the `D10` entry now, or treat the name as
        a near-match of an existing entry; default: assign new.
      - `overview.md` has `status: done` → consult — new run under a new `F-ID` for follow-on work, or
        end with a terminal report; default: new run.
      - `status: implementing` with `implementation-log.jsonl` → consult — resume from its last
        `step_complete`, or restart from Phase 1; default: resume (preserves work, reversible). Append
        a `resume` line.
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
     scenario (its full tests-first discipline), then set its tag in `specs.feature` to
     `@status_done`.
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

- [ ] **Step 13: Close Round 1 with a Green Check** (standard fallback); failures here are mid-run
      regressions from Round 1. Commit if changed: `green check: round-1 fixes`.

### Phase 3 - Round 2: Expanded Coverage (skip if round-2 coverage is `none`)

- [ ] **Step 14: Run `202-spec-design`** per Skill Dispatch at the round-2 level. Commit:
      `202: <level> specs for <feature-slug>`.

- [ ] **Step 15: Feedback Pass (artifact refine) on the updated specs.** As Step 9. Commit if changed.

- [ ] **Step 16: Build each new or changed module.** As Step 10, but only for modules Step 14 added or
      changed, and the inner `301` loop runs only over `@status_pending` scenarios. Round-1
      `@status_done` scenarios aren't rebuilt but stay in that module's Module Check.

- [ ] **Step 17: Feedback Pass (aggregate cleanup) on final source** — the entire feature branch
      diff. The last round to run (round 2 here, or round 1 at Steps 11/12 when round 2 is `none`)
      passes `401` pre-authorized scope expansion, so its approval gate doesn't stop the run; every
      other aggregate cleanup stays bounded to its own round's files. Commit if changed:
      `900: final source cleanup`.

- [ ] **Step 18: Feedback Pass (aggregate cleanup) on final tests.** As Step 17 for test files.
      Commit if changed: `900: final test cleanup`.

### Phase 4 - Finalize

- [ ] **Step 19: Final Green Check** (standard fallback; failing tests repaired via `402` before
      anything counts as non-convergent). Never merge on red: if retries don't converge, append
      `terminal` and end with a terminal report. Only Steps 2 and 19 can end the run without a merge.

- [ ] **Step 20: Update feature status** — `status: done` in `overview.md`, and 🟢 Done on the `D10`
      entry when D10 tracks this `F-ID`.

- [ ] **Step 21: Merge back.** `git merge --no-ff feature/<fid>-<feature-slug>` into the base branch.
      On conflict, consult — resolve the hunks directly (favoring the feature branch) or abort with a
      terminal report naming the files; default: resolve. After any resolution, rerun the full Green
      Check; if it can't converge, abort the merge and end with a terminal report rather than leave a
      red merge on the base branch.

- [ ] **Step 22: Summarize.** Append `run_complete`, then build the report from the full log plus
      `git log`: feature identity, branch, round-2 coverage used, the commit ledger, modules and
      scenarios per round, Feedback Pass iteration counts, final validation result, the merge commit
      (or terminal reason), and every Decision Consult with its resolution.
