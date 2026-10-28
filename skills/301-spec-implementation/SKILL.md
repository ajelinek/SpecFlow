---
name: 301-spec-implementation
description: >
  Use `301` to implement a substantial change through the main SpecFlow spec-driven workflow. It
  handles preparation, tests-first implementation, separate cleanup passes, and final validation.
  Trigger it for prompts like "301", "spec implementation", or "implement this feature" when the
  work is large enough to benefit from a disciplined multi-phase delivery flow.
argument-hint: "[change-request-or-spec-reference]"
context: fork
---

# 301 - Spec-Driven System Implementation

Implement a substantial change in strict phase order: prepare context → failing tests → minimum
production code → test cleanup → production cleanup → full validation. Never mix test and production
cleanup in one pass. Reuse over creation, per `engineering-principles`, governs every coding pass.

**Output**: Updated source and test files. Feature `overview.md` `status` (if the file exists) goes
`todo` → `implementing` at start and → `done` only after full validation passes. Design artifacts
synthesized for this run stay in memory unless the user asks to persist them.

---

## Required Inputs

1. **Change request or spec reference** — a `.feature` path, scenario title, design/plan reference,
   or plain-language change request
2. **Scope** — for a `.feature` file, exactly one of: a single `@TS###`, a single `TSM###`, or the
   full file. Without a `.feature` file, derive a working scenario set from the request.
3. **Workflow fit** — substantial planned implementation only; not one-file maintenance or isolated
   cleanup

**Blocking questions.** This skill runs in a forked context and can't reach the user. Wherever this
workflow needs a decision (missing scope for a given file, a request too vague to identify the
primary action and expected outcome, a design conflict, baseline failures, non-converging repairs),
stop and return the question to the caller with the options and a recommendation.

---

## Operating Model

You are the orchestrator: you own scope, architecture, touched modules, phase state, and validation
status. All code changes go through a coding subagent (`@coder`, else the general agent); all test,
lint, and build execution goes through `@validator`, whose results are the ground truth for
advancing. UI changes go through `@designer` first when available.

**Working state.** Before any coding pass, keep a compact, current bundle: working feature brief
(outcome, scope, key behavior); architecture ledger (decisions, invariants, touched modules,
boundaries); context map (likely production/test files, helpers, dependencies, reference patterns);
reuse inventory (existing modules, helpers, components, fixtures, and installed libraries to reuse or
extend, checked against current code); standards index (conventions, config files, applicability
notes); and for UI work a UI direction brief (applicable D06/D07/D08 constraints, proposed doc
updates, unresolved conflicts, `@designer`'s implementation guidance).

**Task packet.** Each coding pass receives only its slice: objective, phase, exact files in scope,
relevant scenario text, relevant design/architecture excerpt, UI direction excerpt if relevant,
standards excerpt, applicable reuse candidates, allowed just-in-time reference files, explicit
out-of-scope boundaries, and concrete success criteria. Never the full conversation, every artifact,
or every standards file.

---

## Steps

### Phase 0 - Prepare Feature Context

- [ ] **Step 1: Resolve feature and scope.** Determine the `F-ID`, slug, feature folder
  `<fid>-<feature-slug>`, and working scope.

- [ ] **Step 2: Load or synthesize feature artifacts.** Check for `overview.md`, `specs.feature`,
  `implementation.md`. Synthesize any missing ones in order via `201`, `202`, `203`, `204`. Any
  scenario creation or material revision routes through `202-spec-design`.

- [ ] **Step 3: Build the working state.** Load `engineering-principles`. Build the reuse inventory
  with `@explore`: confirm `implementation.md`'s reuse assessment still matches the code and list what
  each scenario should reuse or extend.

- [ ] **Step 4: Route UI changes through `@designer`.** If the scope changes layout, interaction flow,
  navigation, visible state handling, visual hierarchy, component usage, or other user-facing
  behavior: load the relevant D06/D07/D08 docs, pass `@designer` only that context plus the reuse
  inventory's existing components, and ask for the governing UI rules, doc conflicts, minimal doc
  updates, and a concise implementation-facing direction brief — not broad creative exploration.
  Code must follow resolved D06/D07/D08 guidance rather than invent patterns. An unresolved conflict
  is a blocking question before coding; an approved one updates the governing doc first or is
  carried explicitly in the UI direction brief.

- [ ] **Step 5: Update feature status** `todo` → `implementing`.

- [ ] **Step 6: Establish the baseline.** `@validator` `mode: test`, `mode: lint`, `mode: build`.
  Record results; pre-existing failures are a blocking question (proceed or not). Previously passing
  tests are part of the acceptance bar from here on.

### Phase 1 - Write Failing Tests

- [ ] **Step 7: Test-only pass.** `@coder`, phase `test-only`: selected scope, relevant scenario text,
  exact test files to create or modify, production files as reference only, explicit no-touch
  production scope. Write only the tests; they must fail cleanly because the behavior doesn't exist.
  No production code is written before failing tests define the target.

- [ ] **Step 8: Verify the right failure.** `@validator` `mode: test` scoped to the new tests: they
  are discovered and fail (not error), and previously passing tests stay green.

### Phase 2 - Implement Minimum Production Code

- [ ] **Step 9: Production-only pass.** `@coder`, phase `production-only`: failing test output, exact
  production files in scope, implementation-plan and architecture excerpts, any approved UI direction
  brief, explicit no-touch test scope. Implement only what makes the tests pass, working down the
  reuse ladder with the packet's reuse candidates first. No cleanup or extra scope. Before advancing,
  every new file, export, or dependency must be in the plan or carry a reuse-ladder justification; an
  unplanned new dependency is a blocking question, not a finished pass.

- [ ] **Step 10: Verify.** `@validator` `mode: test`: targeted scenarios pass, nothing regressed.

### Phase 3 - Clean Up Tests

- [ ] **Step 11: Test-cleanup pass.** `@coder`, phase `test-cleanup-only`, exact test files only —
  never production files. Improve clarity, naming, and deduplication without changing coverage or
  assertions.

- [ ] **Step 12: Verify.** `@validator` `mode: test`.

### Phase 4 - Clean Up Production Code

- [ ] **Step 13: Production-cleanup pass.** First check Phase 2's changes for logic duplicating
  existing modules. Then `@coder`, phase `production-cleanup-only`, with the Phase 2 production files
  and any existing owner files named for consolidation — never test files. Improve clarity, naming,
  and structure without changing behavior, folding duplicated logic into its existing owner.

- [ ] **Step 14: Verify.** `@validator` `mode: test`.

### Phase 5 - Final Validation

- [ ] **Step 15: Full validation** — `mode: test`, `mode: lint`, `mode: build`. The change isn't done
  until all three are clean. On failure, a focused `@coder` repair pass fixes only the reported
  failure, then rerun all three. If repairs stop converging, stop and return the blocker.

- [ ] **Step 16: Flag high-risk changes.** Clean validation isn't enough for changes to architecture,
  public interfaces, data boundaries, or other high-impact behavior — recommend human review.

- [ ] **Step 17: Update feature status** `implementing` → `done`.

- [ ] **Step 18: Summarize.** Implemented scope and scenarios; production and test files changed;
  reuse report (files created vs extended, new dependencies, lines added vs removed); internally
  generated artifacts; whether `@designer` was used and which UI docs mattered; baseline issues;
  final validation result; key design or architecture decisions.
