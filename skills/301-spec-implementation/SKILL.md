---
name: 301-spec-implementation
description: >
  Use `301` to implement a substantial change through the main SpecFlow spec-driven workflow. It
  handles preparation, tests-first implementation, separate cleanup passes, and final validation.
  Trigger it for prompts like "301", "spec implementation", or "implement this feature" when the
  work is large enough to benefit from a disciplined multi-phase delivery flow.
---

# 301 — Spec-Driven System Implementation

Implement a substantial system change with a strict phase order:

1. Prepare or refresh the feature context
2. Write failing tests
3. Implement the minimum production code to pass
4. Clean up tests
5. Clean up production code
6. Run full validation

Do not mix test and production cleanup in the same pass. The change is not complete until the
full test suite is green, lint is clean, and the build succeeds.

**Output**: Updated source and test files in the project codebase. If
`.specflow/features/<feature-name>/overview.md` exists, update its `status` field from `todo`
to `implementing` when work starts, then to `done` after full validation passes. If any feature
artifacts were missing, keep the generated 201/202/203/204 outputs in working memory for this
run; do not write them to `.specflow/` unless the user explicitly asks.

---

## Operating Model

This workflow uses an orchestrator-worker model specialized for software delivery. The lead
agent plans and controls phase progression, coding subagents execute tightly scoped changes,
`@designer` serves as the UI direction worker when the change affects user-facing surfaces, and
`@execution-agent` serves as the primary evaluator by reporting environment-grounded test, lint,
and build results.

1. **You are the orchestrator.** Own the change model for the run: scope, architecture,
   touched modules, phase state, and validation status.

2. **All code changes go through a coding subagent.** Use `@coder` when available; otherwise use
   the general agent as the fallback.

3. **UI changes go through `@designer` first when available.** If the change materially affects
   UI structure, interaction flow, visual hierarchy, navigation behavior, component usage, or page
   layout, invoke `@designer` before coding. Treat `@designer` as a docs-first worker: ground the
   brief in D06, D07, and relevant D08 page docs; ask it to keep those documents consistent and to
   return implementation-facing UI direction rather than broad creative exploration.

4. **All execution goes through `@execution-agent`.** Test, lint, and build results are the
   ground truth for whether the workflow may advance.

5. **Keep context tight.** Maintain a compact lead-agent working model. Give coding subagents only
   the relevant excerpt for the current task, not the full conversation or full artifact set.

6. **Use phase-isolated task packets.** Every coding pass must clearly name the phase, allowed
   files, forbidden files, relevant scenarios, relevant design excerpts, and success criteria.

---

## Required Inputs

Before proceeding, confirm:

1. **Change request or spec reference** — a `.feature` path, a scenario title, a design/plan
   reference, or a plain-language description of the system change.

   If the request is too vague to identify the intended behavior, ask one blocking question about
   the primary action and expected outcome.

2. **Scope**
   - If the user provided a `.feature` file, the valid scopes are exactly one of:
     - a single `@TS###`
     - a single `TSM###`
     - the full `.feature` file
   - If the user provided the file but not the scope, ask one blocking question before proceeding.
   - If the user did not provide a `.feature` file, derive the scope from the request and use the
     internally generated scenario set as the working scope unless the user narrows it.

3. **Workflow fit** — use 301 only for substantial, planned implementation work. If the request is
   really a small isolated cleanup, narrow naming pass, tiny test-only cleanup, or one-file
   maintenance task, stop and route to the appropriate 400-series workflow instead.

---

## Lead-Agent Working State

Before any coding pass, create and maintain these compact artifacts for the run:

- **Working feature brief** — intended outcome, scope, and key behavior
- **Architecture ledger** — decisions, invariants, touched modules, and boundaries
- **Context map** — likely production files, likely test files, helpers, dependencies, reference patterns
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

### Phase 0 — Prepare Feature Context

- [ ] **Step 1: Resolve feature and scope.**
  - Determine the feature slug and working scope from the request.
  - If the request points to an existing `.feature` file, anchor scope to that file and require
    one of: single `@TS###`, single `TSM###`, or full file.
  - If the request is plain language only, derive the initial feature name, intended outcome, and
    working scenario set from the request.

- [ ] **Step 2: Load or synthesize feature artifacts.** Check for these files under
      `.specflow/features/<feature-name>/`:
  - `overview.md`
  - `specs.feature`
  - `implementation.md`

  If all exist:
  - Read them directly.
  - Load the project conventions and relevant config already available for this change, then distill
    them into the standards index.

  If any are missing:
  - Synthesize the missing artifacts before writing tests or production code.
  - Use isolated design passes in this order. Each pass should get the original request plus any
    already-available feature context, then return a compact result back into the lead-agent working model:
    1. `201-high-level-design` for missing `overview.md`
    2. `202-spec-design` for missing `specs.feature`
    3. `203-implementation-design` for missing `implementation.md`
    4. `204-feature-validation` after any artifact was created or substantially refreshed
  - Keep generated artifacts in memory for this run. Do not write them to `.specflow/` as part of 301.

- [ ] **Step 3: Build the lead-agent working state.** Create the working feature brief,
      architecture ledger, context map, standards index, and task packet template before any
      coding subagent is invoked.

- [ ] **Step 4: Route UI changes through `@designer` when available.** Determine whether the scope
      materially changes any user-facing surface. Trigger this step when the implementation affects
      page layout, component composition, navigation, interaction flow, empty/loading/error state
      presentation, or other visible UX behavior.

  If the change is not UI-affecting, skip this step.

  If the change is UI-affecting and `@designer` is available:
  - Load the current UI context first: `.specflow/docs/D06-ui-design.md`,
    `.specflow/docs/D07-ui-experience.md`, and any relevant `.specflow/docs/D08-ui-pages/...`
    documents that describe the touched screens or patterns.
  - Pass the context directly to `@designer`; do not ask it to do open-ended repository discovery.
  - Ask `@designer` to return:
    1. the established UI rules that govern this change
    2. any gaps or conflicts between the requested UI change and the existing docs
    3. the minimal doc updates needed to keep D06/D07/D08 consistent
    4. a concise UI direction brief for implementers: layout, hierarchy, interaction, state, and
       consistency guidance tied to the touched surfaces
  - Prefer extending or updating existing UI docs over inventing parallel ad hoc guidance.
  - If `@designer` identifies a conflict with D06, D07, or D08, stop and surface the conflict to
    the user before coding unless the correct resolution is already explicit in the loaded docs.

  If the change is UI-affecting and `@designer` is not available:
  - Derive the UI direction brief directly from D06, D07, and D08.
  - Note in the summary that UI implementation proceeded without `@designer` assistance.

- [ ] **Step 5: Update feature status.** If `.specflow/features/<feature-name>/overview.md` exists
      and `status` is `todo`, change it to `implementing`. If no overview exists on disk, do not
      create one just for status tracking.

- [ ] **Step 6: Establish the baseline.** Run `@execution-agent` for:
  1. `mode: test`
  2. `mode: lint`
  3. `mode: build`

  Record the baseline results. If there are pre-existing failures, surface them to the user and ask
  whether to proceed. Previously passing tests are part of the acceptance bar for this workflow.

---

### Phase 1 — Write Failing Tests

- [ ] **Step 7: Run the test-only coding pass.** Invoke `@coder` (or general fallback) with a
      task packet that includes:
  - the selected scope
  - only the relevant scenario text
  - phase: `test-only`
  - exact test files to create or modify
  - production files the subagent may inspect as references
  - the UI direction brief if UI behavior is part of the scenarios
  - relevant feature/design excerpts and standards excerpts
  - explicit no-touch production scope

  Instruction: write only the tests for this scope. Follow existing test patterns and helpers. Do
  not write production code. The tests must fail cleanly because the behavior is not implemented yet.

- [ ] **Step 8: Verify the new tests fail for the right reason.** Run `@execution-agent` with
      `mode: test` scoped to the new tests. Confirm:
  - the new tests are discovered
  - they fail, not error
  - previously passing tests still pass

  If tests error or regressions appear, repeat the test-only pass with the failure output until the
  failure is a clean "required behavior not implemented" failure.

---

### Phase 2 — Implement Minimum Production Code

- [ ] **Step 9: Run the production-only coding pass.** Invoke `@coder` (or general fallback) with
      a task packet that includes:
  - the failing test output from Step 7
  - phase: `production-only`
  - exact production files or modules in scope
  - relevant implementation-plan and architecture excerpts
  - the UI direction brief and any approved doc-update notes when the scope touches UI
  - applicable standards excerpts
  - explicit no-touch test scope

  Instruction: implement only what is needed to make the failing tests pass. Prefer extending
  existing modules. For UI work, follow the `@designer` direction and resolved D06/D07/D08
  guidance exactly; do not improvise new patterns in code. No cleanup, refactoring, or extra
  scope in this pass.

- [ ] **Step 10: Verify the tests pass.** Run `@execution-agent` with `mode: test`. Confirm:
  - all targeted scenarios now pass
  - previously passing tests still pass
  - no new failures were introduced

  If anything fails, repeat the production-only pass with the current failure output and the
  instruction to fix only the failing behavior.

---

### Phase 3 — Clean Up Tests

- [ ] **Step 11: Run the test-cleanup pass.** Invoke `@coder` (or general fallback) with phase
      `test-cleanup-only`.
  - Scope: exact test files, plus shared test helpers only if explicitly allowed.
  - Production files are out of scope.

  Instruction: improve clarity, naming, and test deduplication without changing what is asserted or
  what scenarios are covered.

- [ ] **Step 12: Verify tests still pass.** Run `@execution-agent` with `mode: test`. If cleanup
      introduced failures, repeat the test-cleanup pass until the suite is green again.

---

### Phase 4 — Clean Up Production Code

- [ ] **Step 13: Run the production-cleanup pass.** Invoke `@coder` (or general fallback) with
      phase `production-cleanup-only`.
  - Scope: only the production files changed in Phase 2.
  - Test files are out of scope.

  Instruction: improve clarity, naming, deduplication, and structure without changing observable
  behavior. For UI-affecting changes, preserve the approved UI direction and any resolved design
  doc alignment from Step 4.

- [ ] **Step 14: Verify tests still pass.** Run `@execution-agent` with `mode: test`. If cleanup
      introduced failures, repeat the production-cleanup pass until the suite is green again.

---

### Phase 5 — Final Validation

- [ ] **Step 15: Run full validation.** Execute all three modes in sequence:
  1. `mode: test` — full suite
  2. `mode: lint`
  3. `mode: build`

  If any mode fails:
  - run a focused repair pass through `@coder` (or general fallback)
  - fix only the reported failure
  - rerun all three modes
  - repeat until clean

  If the workflow stops making progress across repeated repair cycles:
  - stop the loop instead of continuing indefinitely
  - summarize the current blocker, failed validation output, and files in play
  - surface the issue to the user before proceeding further

- [ ] **Step 16: Request human review when risk is high.** If the change alters architecture,
      cross-cutting behavior, public interfaces, data boundaries, or other high-impact behavior,
      recommend human review after validation passes and before declaring the change fully complete.

- [ ] **Step 17: Update feature status.** If `.specflow/features/<feature-name>/overview.md`
      exists and `status` is `implementing`, change it to `done` after full validation passes.

- [ ] **Step 18: Summarize.** Report:
  - implemented scope: single `@TS###`, single `TSM###`, full `.feature` file, or internal scenario set
  - scenarios implemented
  - production files created or modified
  - test files created or modified
  - which artifacts were generated internally, if any
  - whether `@designer` was invoked and which D06/D07/D08 docs shaped the UI work, if applicable
  - baseline issues discovered before implementation, if any
  - final validation result
  - key scope or architecture decisions that shaped the implementation

---

## Non-Negotiable Constraints

1. **Spec first.** No production code is written until failing tests define the target behavior.

2. **Phase isolation is mandatory.** Test cleanup never changes production files. Production cleanup
   never changes test files.

3. **Baseline integrity is mandatory.** A previously passing test that fails after this workflow is a
   blocking defect.

4. **Clean validation is required.** The change is not done until `@execution-agent` reports clean
   results for the full test suite, lint, and build.

5. **The environment is the primary evaluator.** For implementation work, tests, lint, build,
   and other execution feedback outrank model opinion when deciding whether behavior is correct.

6. **Extend before creating.** Prefer existing modules. A new file needs a real responsibility with
   no natural home in the current codebase.

7. **Do not duplicate spec-design responsibilities.** If scenarios need to be created or materially
   revised, route that work through `202-spec-design` instead of inventing a second Gherkin review
   process inside 301.

8. **Context minimization is mandatory.** The lead agent owns the full change model; coding
   subagents receive only focused task packets.

9. **UI doc consistency is mandatory for UI changes.** When the implementation touches visible UI
   behavior and `@designer` is available, route the change through `@designer` before coding and
   ground the implementation in D06, D07, and relevant D08 guidance rather than in code-only
   interpretation.

10. **Orchestration only.** You do not write implementation code directly. Code changes go through a
    coding subagent; execution goes through `@execution-agent`.

11. **Missing design artifacts stay in memory.** When 301 synthesizes `overview.md`, `specs.feature`,
    or `implementation.md`, treat them as working context for the run unless the user explicitly asks
    to persist them.

12. **Escalate stalled loops.** If repeated repair passes are not converging, stop and surface the
    blocker rather than looping indefinitely.

13. **Human review remains valuable for high-risk changes.** Clean validation is necessary, but it
    does not replace human judgment for broad architectural fit or sensitive behavior changes.
