---
name: 301-spec-implementation
description: >
  Use `301` to implement a substantial feature or implementation chunk through the main SpecFlow
  workflow. It handles code-grounded design, two independent design reviews, tests-first implementation,
  independent review and refinement, and final validation.
  Trigger it for prompts like "301", "spec implementation", or "implement this feature" when the
  work is large enough to benefit from a disciplined multi-phase delivery flow.
argument-hint: "[change-request-or-spec-reference]"
context: fork
---

# 301 - Spec-Driven System Implementation

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Implement a substantial feature or implementation chunk in strict phase order: prepare context →
design brief → independent design reviews → tests-first implementation → independent review and
refinement → final validation and close. One coding assignment owns the baseline and red → green
cycle; a fresh coding agent reviews and refines the result. Reuse over creation, per
`engineering-principles`, governs design and both coding assignments.

**Output**: Updated source and test files. Existing `overview.md` status becomes `implementing` at
start. Partial scope reports scope complete, not feature done. Only explicit whole-feature delivery
may mark it `done` after all acceptance gates pass; under `901`, the caller owns feature completion.
The design brief and synthesized upstream context stay in memory unless the user asks to persist them.

---

## Required Inputs

1. **Change request or spec reference** — a `.feature` path, scenario title, design/plan reference,
   or plain-language change request
2. **Scope** — for a `.feature` file, exactly one of: a single `@TS###`, a single `TSM###`, or the
   full file. Without a `.feature` file, derive a working scenario set from the request.
3. **Workflow fit** — substantial features or implementation chunks only; not small fixes, one-file
   maintenance, or isolated cleanup

**Blocking questions.** This skill runs in a forked context and can't reach the user. Wherever this
workflow needs a decision (missing scope for a given file, a request too vague to identify the
primary action and expected outcome, a design conflict, baseline failures, non-converging repairs),
stop and return the question to the caller with the options and a recommendation. Design-review cap
exhaustion or an unresolved material design blocker returns a terminal design blocker, not a waiver
request or permission to start coding.

---

## Operating Model

You are the orchestrator: you own scope, architecture, touched modules, phase state, and validation
status. All code changes go through a coding subagent (`@coder`, else the general agent). Use one
implementation coder, then a fresh review/refinement coder; do not split each checkpoint into a new
assignment. Design reviewers are separate, read-only contexts, not coders. Coders run the baseline
and development checks explicitly named in their packets. Final test, lint, and build execution goes
through one `@validator` assignment; actual command results are the ground truth for advancing. UI
changes go through `@designer` first when available.

**Working state.** Keep a compact, versioned in-memory design brief, current review findings and repair
count, a context map of scoped source/test paths and reference patterns, a code-checked reuse inventory,
and a standards index. For UI work, include the UI direction brief (D06/D07/D08 constraints, approved
doc changes or exceptions, and `@designer`'s implementation guidance). No extra tracking artifacts.

**Interrupted runs.** Before resuming implementation, rebuild the complete brief from current artifacts
and code and rerun both independent readiness reviews. Carry forward consumed repair rounds; if the
repair history cannot be recovered, stop rather than resetting the cap. An old approval or completion
ledger is not current design approval.

**Task packet.** Each coding assignment receives only its slice: objective, phase, exact files in scope,
relevant scenario text, the accepted brief revision and relevant architecture excerpt, UI direction
excerpt if relevant, standards excerpt, applicable reuse candidates, allowed just-in-time reference
files, explicit out-of-scope boundaries, and concrete success criteria. Never the full conversation,
every artifact, or every standards file. Include authorized check commands and the required evidence.
The fresh review/refinement coder also receives the scoped diff and acceptance criteria, and checks
the actual code rather than relying on the implementation coder's summary.

---

## Steps

### Phase 0 - Prepare Feature Context

- [ ] **Step 1: Resolve feature and scope.** Select the requested scenario set or implementation chunk.
  Resolve existing feature identity and folder when present; no new `F-ID` or folder is required for
  an inline request. Distinguish explicit whole-feature delivery from a selected scenario, module, or
  chunk; completing the selected scope is not automatically completing the feature.

- [ ] **Step 2: Load or synthesize upstream context.** Read existing `overview.md` and `specs.feature`
  when present. For missing context, use `201` and `202` guidance to synthesize scope, primary journey,
  and scenarios inline, not their file-writing workflows: create no folders or artifacts unless
  explicitly requested.
  Implementing existing selected scenarios does not require classifying their coverage level.
  A coverage choice is needed only when synthesizing or materially revising scenarios. Take that
  coverage from existing specs or the request/context. If generation or revision needs a choice not
  supplied by the request or context, return a blocking question with Happy Path Only, Balanced, and
  Comprehensive options, not an inferred default. Route material scenario revisions through
  `202-spec-design` with explicit inline context and a handoff: feature name or working label, scope,
  outcomes, current scenario text/IDs, chosen coverage, constraints, proposed behavior change, and
  whether an existing spec may be updated or output must stay inline. Never rely on that skill
  inheriting this run's memory.

- [ ] **Step 3: Ground the working state in code.** Load `engineering-principles`, relevant installed
  standards skills, project rules, and applicable D01-D08/domain context. Use focused `@explore`
  discovery as needed; read scoped owners and similar implementations in full. Name reusable modules,
  helpers, components, fixtures, installed dependencies, integration points, and the paths checked.
  Resolve standards conflicts explicitly; missing evidence that could change the design blocks readiness.

- [ ] **Step 4: Route UI changes through `@designer`.** If the scope changes layout, interaction flow,
  navigation, visible state handling, visual hierarchy, component usage, or other user-facing
  behavior: load the relevant D06/D07/D08 docs, pass `@designer` only that context plus the reuse
  inventory's existing components, and ask for the governing UI rules, doc conflicts, minimal doc
  updates, and a concise implementation-facing direction brief — not broad creative exploration.
  Code must follow resolved D06/D07/D08 guidance rather than invent patterns. An unresolved conflict
  is a blocking question before coding; an approved one updates the governing doc first or is
  carried explicitly in the UI direction brief.

- [ ] **Step 5: Update feature status.** Set `overview.md` to `status: implementing`, only if the file
  exists, for the selected work. A prior `done` value does not mean this run's scope is complete.

- [ ] **Step 6: Define the checks.** Identify the project's baseline and final test, lint, and build
  commands, plus targeted commands for the selected scenarios. Include the baseline and development
  commands in the implementation packet; do not create a validator assignment for each command.

### Phase 1 - Design Brief

- [ ] **Step 7: Draft the design.** The orchestrator writes a compact, versioned in-memory brief:
  - chosen approach and why; alternatives only for meaningful structural decisions
  - modules/files to extend, create, or remove, with responsibilities and concrete reuse candidates;
    justify each new file, export, abstraction, or dependency against the lower reuse-ladder rungs
  - integration points, boundaries, public contracts, data/state transitions, and applicable failure,
    security, concurrency, and compatibility constraints
  - each scenario → source changes and observable checks, including regression coverage
  - assumptions, evidence/reference paths, resolved decisions, remaining questions, standards, and UI direction

  Include scope and the complete selected scenarios, not just their names. Keep the brief sufficient
  for an independent implementation walkthrough; don't create a second overview or a persisted plan.

### Phase 2 - Independent Design Reviews

- [ ] **Step 8: Freeze and dispatch.** Spawn two fresh, independent, read-only `@reviewer` contexts
  (general agent fallback). Give both the same complete frozen brief revision, full selected scenarios,
  constraints, readiness criteria below, and exact source/doc/standards references with permission to
  read them. Never rely on inherited memory; no sibling conclusions or shared reviewer session.
  Only the role lens differs:
  - **Walkthrough:** trace each scenario end to end for completeness, integration, and reuse.
  - **Adversarial:** challenge applicable failure, security, concurrency, and compatibility assumptions.
    Mark irrelevant concerns not applicable with a reason; don't invent requirements.

  Required readiness criteria for both roles:
  - scope, outcomes, scenarios, and design agree; no missing required behavior or unjustified scope
  - every selected scenario has a feasible end-to-end change path and observable checks
  - module ownership, integration, boundaries, contracts, and state/failure handling are explicit and compatible
  - reuse and new-code justifications are code-grounded; project/standards/UI constraints are satisfied;
    any new dependency is named and explicitly approved
  - material assumptions and questions affecting correctness, safety, or feasibility are resolved by evidence

  Use the existing `## Verdict: CLEAN` / `## Verdict: CHANGES_REQUIRED` contract;
  any unresolved readiness criterion blocks coding, regardless of severity. Findings name severity,
  criterion, exact evidence, consequence, and smallest fix.
  Keep out-of-criteria advisories separate for explicit disposition, never silently ignore them.

- [ ] **Step 9: Resolve and recheck.** The orchestrator resolves findings by evidence, not votes.
  Correct the brief, obtain missing evidence, or challenge a finding with concrete evidence; do not
  override a failing criterion. Record each finding's resolution and each advisory's accepted,
  deferred, or rejected disposition with a reason. A material advisory belongs in the readiness criteria
  and must be rechecked, not relabeled away.

  Allow at most two repair rounds after the initial reviews. Each round freezes a new revision and
  uses fresh contexts for affected roles; recheck both roles when shared assumptions, scope, contracts,
  or scenario mappings change. Each receives the complete current brief and its own prior findings
  with resolution evidence, not the sibling's conclusions. Unaffected reviews remain valid only for
  unchanged criteria and evidence; record that applicability explicitly. Acceptance requires both
  roles' applicable reviews CLEAN and every readiness criterion resolved. Pass the accepted revision
  of the brief to the implementation coder.
  If the cap is exhausted with unresolved criteria, or a material design blocker cannot be resolved,
  stop with a terminal design blocker: revision, rounds used, outstanding evidence/findings, and needed
  decision. No coding, waiver, or re-invocation to reset the cap.

### Phase 3 - Tests-First Implementation

- [ ] **Step 10: Assign implementation.** `@coder`, phase `tests-first-implementation`: selected scope,
  relevant scenario text, exact production and test files, accepted design revision and architecture
  excerpts, approved UI direction, reuse candidates, and authorized check commands. Steps 11–13 are
  checkpoints within this one assignment, not separate worker calls.

- [ ] **Step 11: Establish the baseline.** Before editing, the implementation coder runs the baseline
  test, lint, and build commands and records results. Pre-existing failures are a blocking question
  (proceed or not); return before editing. Previously passing tests remain part of the acceptance bar.

- [ ] **Step 12: Write tests and verify the right failure.** Write the selected tests first, then run
  them: they are discovered and fail for the missing behavior, not setup or harness errors. Record
  the command, exit status, and relevant failure output. No production code is written before failing
  tests define the target; do not weaken assertions to reach green.

- [ ] **Step 13: Implement and verify.** Implement the smallest correct change, working down the
  reuse ladder with the packet's candidates first. Leave clear names, straightforward logic, readable
  tests, and no temporary scaffolding, dead code, or newly introduced duplication. Keep the scope
  fixed; do not defer basic cleanliness to another pass. Run targeted tests and relevant regressions,
  including after refinement, and return red/green evidence. Every new file, export, or dependency
  must match the accepted brief and its reuse-ladder justification; an unplanned new dependency is a
  blocking question, not a finished assignment.

  Material design discoveries invalidate approval: stop, return evidence to the orchestrator, revise
  the brief, and complete applicable Phase 2 rechecks before further implementation. This uses the same
  repair-round budget, never a fresh cap. Apply this rule during refinement and validation repairs too.

### Phase 4 - Independent Review and Refinement

- [ ] **Step 14: Assign a fresh coder.** `@coder`, phase `review-and-refinement`: actual scoped diff,
  accepted design revision, acceptance criteria, allowed source and test files, relevant existing owners
  and patterns, standards, and authorized targeted checks. Use a new context, not the implementation
  coder's session. Review correctness and maintainability against the accepted design and feature intent
  before making bounded improvements.

- [ ] **Step 15: Review tests, then source.** Both checkpoints stay within the same assignment:
  - **Tests:** meaningful assertions, scenario coverage, readable naming, fixture/helper reuse,
    duplication, and brittleness. Preserve assertions and coverage; never weaken tests to match the
    implementation.
  - **Source:** correctness, reuse of existing owners, unnecessary complexity, naming, boundaries,
    and dead code. Refine only within the approved files, preserving intended behavior and public
    contracts. No speculative redesign, new dependencies, or unrelated cleanup.

  Material correctness, coverage, or design gaps return to the orchestrator for focused implementation
  repair or a blocking question, not a disguised cleanup fix. Design changes require the Phase 2
  rechecks before more implementation. Recheck the repaired diff with the fresh coder before final
  validation; do not restart the full workflow.

- [ ] **Step 16: Verify refinement.** The review/refinement coder runs relevant tests after any edits
  and reports findings, changes, unresolved risks, and command results. If no refinement is needed,
  say so; do not manufacture edits. This bounded quality pass does not invoke `401-cleanup`.

### Phase 5 - Final Validation and Close

- [ ] **Step 17: Full validation.** One `@validator` assignment, `modes: [test, lint, build]`, with the
  commands and scopes from Step 6. The change isn't done until all three are clean. On failure, a
  focused implementation-coder repair fixes only the reported failure without weakening assertions;
  review substantive repaired changes with the fresh coder, then rerun all three in one validator
  assignment. If repairs stop converging, stop and return the blocker.

- [ ] **Step 18: Flag high-risk changes.** Clean validation isn't enough for changes to architecture,
  public interfaces, data boundaries, or other high-impact behavior — recommend human review.

- [ ] **Step 19: Update feature status.** Mark an existing `overview.md` `done` only when the explicit
  run scope represents the whole feature and all acceptance gates pass. For partial scope, leave it
  `implementing` and report scope complete, not feature done. Under `901`, the caller owns whole-feature
  completion at its final gate (Step 22); a `301` invocation does not mark the feature `done`.

- [ ] **Step 20: Summarize.** Implemented scope and scenarios; production and test files changed;
  reuse report (files created vs extended, new dependencies, lines added vs removed); internally
  synthesized context; whether `@designer` was used and which UI docs mattered; baseline issues;
  red/green evidence; accepted design revision, design-review findings, repair rounds and advisory
  dispositions; independent diff-review findings and refinements; final validation result; key design
  or architecture decisions. Recommend `401-cleanup` only when the changed set warrants a deeper,
  separately scoped source or test cleanup pass; it is not an automatic next step.
