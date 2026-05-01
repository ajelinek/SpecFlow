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

## Standards Resolution

Use standards already loaded into the current session as the authoritative source of project
conventions. These may come from managed instructions, project instructions, or explicitly loaded
skills.

At the start of standards resolution, load any relevant skills available through the environment's
supported skill-loading tools if they are not already active. Prefer supported tooling and managed
instruction sources over manual filesystem discovery.

Resolve validation criteria in this order:

1. Loaded standards guidance relevant to the concern
2. Existing SpecFlow or project documentation
3. Existing codebase patterns confirmed via `@explore`
4. Explicit user decisions in this session

Determine relevance by concern, not by named technology. Stay concern-based while the technical
context is unresolved. Once the feature's concrete stack is known, switch to that stack's real
terms for the rest of the validation.

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
  - find a few concrete similar implementations and read them in full, not just summaries
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
  - exact evidence: section numbers, `@TS###` tags, module paths, architecture doc sections, or
    the loaded standards guidance that applies
  - why it matters
  - the smallest recommended fix

  Do not create findings just because planned files are not implemented yet, because 203 ran at a
  less detailed level, or because a broad scenario still validates a complete business outcome.

- [ ] **Step 7: Check the report before responding.** Confirm findings are grounded in evidence,
  that `🔴 High` findings are real blockers or correctness risks, that recommendations point to
  concrete reuse candidates when relevant, and that the overall assessment matches the findings.

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

## Additional Guidance

**Treat each artifact as having a distinct role.** `overview.md` defines scope and outcomes,
`specs.feature` defines behavior coverage, and `implementation.md` defines the code change plan.

**Prefer evidence over taste.** A missed opportunity should point to a concrete existing module,
helper, route, or pattern that the plan could reuse.
