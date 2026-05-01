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
`.specflow/features/<feature-name>/overview.md` exists, change `status` from `todo` to
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

## Execution Protocol

- You are the orchestrator.
- All code changes go through `@coder` when available; otherwise use the general agent.
- All execution and validation go through `@execution-agent`.
- If the change materially affects visible UI, route it through `@designer` first when available.
- Maintain a compact working model for the run: feature brief, architecture ledger, context map,
  standards index, and focused task packets.
- Every coding packet should include only the current phase, exact files in scope, relevant
  scenario text, relevant design/architecture excerpts, applicable standards, explicit forbidden
  files, and concrete success criteria.

---

## Steps

### Phase 0 - Prepare Feature Context

- [ ] **Step 1: Resolve feature and scope.** Determine the feature slug and working scope. If the
  request points to an existing `.feature` file, require a single `@TS###`, single `TSM###`, or
  the full file.

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
