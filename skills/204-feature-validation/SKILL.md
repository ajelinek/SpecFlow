---
name: 204-feature-validation
description: >
  Use `204` to validate a feature's design artifacts before implementation begins. It reviews
  `overview.md`, `specs.feature`, and `implementation.md` for gaps, inconsistencies, and missed
  reuse. Trigger it for prompts like "204", "validate the feature", or "implementation readiness
  review" before coding starts.
---

# 204 - Feature Validation

Return a structured validation report in chat that checks whether a feature's scope, scenarios, and
implementation plan still agree with each other and with the actual codebase.

This is a review pass, not a redesign pass.

**Output**: Validation report in chat only. Do not write to `.specflow/`.

---

## Required Inputs

Before proceeding, confirm:

1. **Feature name**
2. **Validation scope** — full review *(default)* or targeted review: cross-artifact consistency,
   scenario coverage, implementation simplification, or standards compliance

If the feature name is missing, ask. If scope is omitted, use full review.

---

## Decision Precedence

Resolve validation criteria in this order:

1. Loaded standards guidance relevant to the concern
2. Existing SpecFlow or project documentation
3. Existing codebase patterns confirmed via `@explore`
4. Explicit user decisions in this session

Use the project's concrete technology terms once the stack is known.

---

## Steps

- [ ] **Step 1: Load feature artifacts.** Read these if they exist:
  - `.specflow/features/<feature-name>/overview.md`
  - `.specflow/features/<feature-name>/specs.feature`
  - `.specflow/features/<feature-name>/implementation.md`

  `implementation.md` is required. If it is missing, stop and ask whether to run
  `203-implementation-design` first.

  If `overview.md` or `specs.feature` is missing, ask whether to run the missing upstream workflow
  first or continue with limited validation. If continuing, label the report as limited.

- [ ] **Step 2: Load architecture and product context.** Read relevant existing D01-D08 docs and
  `domain-knowledge.md` when present. Note missing context.

- [ ] **Step 3: Research the codebase with `@explore`.** This step is required. Ask `@explore` to:
  - read the production files referenced in `implementation.md`
  - find a few concrete similar implementations
  - identify reusable modules/helpers/routes/hooks/components the plan could extend
  - identify repo conventions and inconsistent existing patterns that matter to the review

  Load any relevant skills before continuing.

- [ ] **Step 4: Validate cross-artifact consistency.** Confirm:
  - `overview.md` scope matches `specs.feature`
  - acceptance criteria are covered by scenarios or called out as gaps
  - the primary journey is represented in the scenarios and supported by the implementation plan
  - the implementation does not introduce behavior the feature definition and scenarios do not
    justify
  - names, terminology, routes, entities, statuses, and state transitions are consistent

- [ ] **Step 5: Validate implementation quality.** Pressure-test the plan against the repo and
  loaded standards. Look for:
  - missed reuse opportunities
  - weak justification for new files or abstractions
  - missing integration points, error states, or boundary validation
  - implementation details that do not satisfy a scenario or acceptance criterion
  - rule violations, over-engineering, or premature optimization

- [ ] **Step 6: Turn issues into findings.** For each actionable finding include:
  - severity: `🔴 High`, `🟡 Medium`, or `🔵 Low`
  - category: `Cross-artifact inconsistency`, `Coverage gap`, `Missed reuse opportunity`,
    `Rule violation`, or `Open question`
  - exact evidence
  - why it matters
  - the smallest recommended fix

  Do not create findings just because planned files are not implemented yet or because 203 ran at a
  less detailed level.

- [ ] **Step 7: Check the report before responding.** Confirm findings are grounded in evidence,
  that `🔴 High` findings are real blockers or correctness risks, and that the overall assessment
  matches the findings.

- [ ] **Step 8: Return the report in chat.** Use these sections in order:
  - `Executive Summary`
  - `Overall Assessment`
  - `Findings`
  - `Open Questions and Assumptions` *(only if needed)*
  - `Readiness Decision`

- [ ] **Step 9: Summarize.** Report:
  - overall assessment: `Ready`, `Needs Work`, or `Not Ready`
  - findings count by severity
  - missing artifacts or context that limited the review
  - the most important next action before `301-spec-implementation`

---

## Rules

1. Validate the plan that exists; do not quietly redesign it.
2. Prefer evidence over taste.
3. Keep the report lean and delta-focused.
4. Judge `203` at its selected detail level.
