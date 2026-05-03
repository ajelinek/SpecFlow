---
name: 301-spec-implementation
description: >
  Use `301` to implement a substantial change through the main SpecFlow spec-driven workflow. It
  handles preparation, tests-first implementation, separate cleanup passes, and final validation.
  Trigger it for prompts like "301", "spec implementation", or "implement this feature" when the
  work is large enough to benefit from a disciplined multi-phase delivery flow.
---

# 301 - Spec-Driven System Implementation

Implement a substantial change with this strict phase order:

1. Prepare or refresh feature context
2. Write failing tests
3. Implement the minimum production code to pass
4. Clean up tests
5. Clean up production code
6. Run full validation

Do not mix test and production cleanup in the same pass.

**Output**: Update source and test files in the project. If
`.specflow/features/<fid>-<feature-slug>/overview.md` exists, change `status` from `todo` to
`implementing` when work starts and to `done` only after full validation passes. If 201/202/203/204
artifacts had to be synthesized for this run, keep them in working memory unless the user explicitly
asks to persist them.

---

## Required Inputs

Before proceeding, confirm:

1. **Change request or spec reference** — a `.feature` path, scenario title, design/plan reference,
   or plain-language change request
2. **Scope**
   - If the user provided a `.feature` file, scope must be exactly one of: a single `@TS###`, a
     single `TSM###`, or the full file.
   - If the file is provided but the scope is not, ask one blocking question.
   - If no `.feature` file is provided, derive a working scenario set from the request.
3. **Workflow fit** — use 301 only for substantial planned implementation work, not one-file
   maintenance or isolated cleanup

If the request is too vague to identify the behavior, ask one blocking question about the primary
action and expected outcome.

---

## Operating Model

This workflow uses an orchestrator-worker model specialized for software delivery. The lead agent
plans and controls phase progression, coding subagents execute tightly scoped changes, `@designer`
serves as the UI direction worker when the change affects user-facing surfaces, and
`@execution-agent` serves as the primary evaluator by reporting environment-grounded test, lint,
and build results.

1. **You are the orchestrator.** Own the change model for the run: scope, architecture, touched
   modules, phase state, and validation status.
2. **All code changes go through a coding subagent.** Use `@coder` when available; otherwise use
   the general agent as the fallback.
3. **UI changes go through `@designer` first when available.** If the change materially affects UI
   structure, interaction flow, visual hierarchy, navigation behavior, component usage, or page
   layout, invoke `@designer` before coding. Ground the brief in D06, D07, and relevant D08 page
   docs; ask it to keep those documents consistent and to return implementation-facing UI direction
   rather than broad creative exploration.
4. **All execution goes through `@execution-agent`.** Test, lint, and build results are the ground
   truth for whether the workflow may advance.
5. **Keep context tight.** Maintain a compact lead-agent working model. Give coding subagents only
   the relevant excerpt for the current task, not the full conversation or full artifact set.
6. **Use phase-isolated task packets.** Every coding pass must clearly name the phase, allowed
   files, forbidden files, relevant scenarios, relevant design excerpts, and success criteria.

---

## Lead-Agent Working State

Before any coding pass, create and maintain these compact artifacts for the run:

- **Working feature brief** — intended outcome, scope, and key behavior
- **Architecture ledger** — decisions, invariants, touched modules, and boundaries
- **Context map** — likely production files, likely test files, helpers, dependencies, reference
  patterns
- **Standards index** — relevant conventions, config files, and short applicability notes
- **Task packet template** — the required fields every coding pass receives

Keep these concise and current. The lead agent owns the full bundle; subagents receive only the
current slice.

When the change touches UI, also maintain a **UI direction brief**: the applicable D06/D07/D08
constraints, any proposed design-doc updates, unresolved design conflicts, and the concrete UI
implementation guidance returned by `@designer`.

---

## Task Packet Template

Every coding subagent invocation should include only:

- implementation objective
- current phase
- exact files or modules in scope
- relevant scenario text
- relevant design or architecture excerpt
- relevant UI direction excerpt when the change touches UI
- applicable standards excerpt
- allowed reference files for just-in-time reading
- explicit out-of-scope boundaries
- concrete success criteria

Do not pass the full conversation, every feature artifact, or every standards file by default.

---

## Steps

### Phase 0 - Prepare Feature Context

- [ ] **Step 1: Resolve feature and scope.** Determine the feature `F-ID`, feature slug, feature
  folder `<fid>-<feature-slug>`, and working scope. If the request points to an existing `.feature`
  file, require a single `@TS###`, single `TSM###`, or the full file.

- [ ] **Step 2: Load or synthesize feature artifacts.** Check for:
  - `overview.md`
  - `specs.feature`
  - `implementation.md`

  If any are missing, synthesize them in this order and keep them in memory for this run:
  1. `201-high-level-design`
  2. `202-spec-design`
  3. `203-implementation-design`
  4. `204-feature-validation`

- [ ] **Step 3: Build the working model.** Record the intended outcome, touched modules,
  architectural boundaries, likely test files, likely production files, and relevant conventions.
  For UI work, also maintain a UI direction brief grounded in D06/D07/D08.

- [ ] **Step 4: Route UI changes through `@designer` when available.** If the scope changes layout,
  interaction flow, navigation, visible state handling, or other user-facing behavior:
  - load the relevant D06/D07/D08 docs first
  - pass only the relevant context to `@designer`
  - ask for governing UI rules, any doc conflicts, minimal doc updates, and a concise
    implementation-facing UI direction brief

  If `@designer` finds a conflict with existing UI docs and the resolution is not already explicit,
  stop and surface it before coding. If the user approves a conflicting direction, update the
  governing doc first or carry the approved resolution explicitly in the UI direction brief.

- [ ] **Step 5: Update feature status.** If `overview.md` exists and its `status` is `todo`, change
  it to `implementing`.

- [ ] **Step 6: Establish the baseline.** Run `@execution-agent` for:
  1. `mode: test`
  2. `mode: lint`
  3. `mode: build`

  Record baseline results. If there are pre-existing failures, surface them and ask whether to
  proceed.

### Phase 1 - Write Failing Tests

- [ ] **Step 7: Run the test-only coding pass.** Use `@coder` with:
  - phase: `test-only`
  - the selected scope
  - only the relevant scenario text
  - exact test files to create or modify
  - production files allowed only as references
  - explicit no-touch production scope

  Instruction: write only the tests for the selected scope. The tests must fail cleanly because the
  behavior is not implemented yet.

- [ ] **Step 8: Verify the tests fail for the right reason.** Run `@execution-agent` with
  `mode: test` scoped to the new tests. Confirm they are discovered and fail, not error, while
  previously passing tests remain green.

### Phase 2 - Implement Minimum Production Code

- [ ] **Step 9: Run the production-only coding pass.** Use `@coder` with:
  - phase: `production-only`
  - the failing test output
  - exact production files/modules in scope
  - relevant implementation-plan and architecture excerpts
  - any approved UI direction brief
  - explicit no-touch test scope

  Instruction: implement only what is needed to make the failing tests pass. Prefer extending
  existing modules. No cleanup or extra scope in this pass.

- [ ] **Step 10: Verify the tests pass.** Run `@execution-agent` with `mode: test`. Confirm the
  targeted scenarios now pass and previously passing tests still pass.

### Phase 3 - Clean Up Tests

- [ ] **Step 11: Run the test-cleanup pass.** Use `@coder` with phase `test-cleanup-only` and exact
  test files in scope. Improve clarity, naming, and deduplication without changing coverage or
  assertions.

- [ ] **Step 12: Verify tests still pass.** Run `@execution-agent` with `mode: test`.

### Phase 4 - Clean Up Production Code

- [ ] **Step 13: Run the production-cleanup pass.** Use `@coder` with phase
  `production-cleanup-only` and only the production files changed in Phase 2. Improve clarity,
  naming, structure, and deduplication without changing behavior.

- [ ] **Step 14: Verify tests still pass.** Run `@execution-agent` with `mode: test`.

### Phase 5 - Final Validation

- [ ] **Step 15: Run full validation.** Execute, in order:
  1. `mode: test`
  2. `mode: lint`
  3. `mode: build`

  If any mode fails, run a focused repair pass through `@coder`, fix only the reported failure, and
  rerun all three modes. If repair loops stop converging, stop and surface the blocker.

- [ ] **Step 16: Request human review when risk is high.** Recommend human review after validation
  if the change affects architecture, public interfaces, data boundaries, or other high-impact
  behavior.

- [ ] **Step 17: Update feature status.** If `overview.md` exists and `status` is `implementing`,
  change it to `done` after full validation passes.

- [ ] **Step 18: Summarize.** Report:
  - implemented scope
  - scenarios implemented
  - production files changed
  - test files changed
  - any internally generated artifacts
  - whether `@designer` was used and which UI docs mattered
  - baseline issues discovered before implementation
  - final validation result
  - key design or architecture decisions that shaped the implementation

---

## Non-Negotiables

1. No production code before failing tests define the target behavior.
2. Test cleanup never edits production files.
3. Production cleanup never edits test files.
4. Previously passing tests are part of the acceptance bar.
5. The change is not done until tests, lint, and build are clean.
6. Extend before creating new modules.
7. If scenarios need to be created or materially revised, route that through `202-spec-design`.
8. Keep task packets tight; do not dump full conversation state into subagents.
9. For UI changes, follow resolved D06/D07/D08 guidance rather than inventing new patterns in code.
10. Code edits go through a coding subagent; validation goes through `@execution-agent`.
11. Missing design artifacts stay in memory unless the user asks to persist them.
12. Stop and escalate when repair loops stop converging.
13. Clean validation is necessary, but human review still matters for high-risk architectural or
    public-behavior changes.
