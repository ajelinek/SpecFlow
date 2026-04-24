---
name: 204-feature-validation
description: >
  Use this skill when you need to validate a feature's design artifacts before implementation
  begins. Triggers on phrases like "validate the feature", "review the plan", "204",
  "feature validation", "implementation readiness review", or when a feature's
  `overview.md`, `specs.feature`, and `implementation.md` exist and need a final cross-check.
  Returns a structured validation report in chat identifying inconsistencies, coverage gaps,
  missed reuse opportunities, and rule violations without writing production code.
---

# 204 — Feature Validation

Return a structured validation report in chat: a cross-artifact review that checks whether the
feature's scope, scenarios, and implementation design still agree with each other and with the
codebase's actual patterns. The output helps the team catch gaps, contradictions, unjustified
complexity, and missed simplification opportunities before coding begins.

This workflow pressure-tests the plan that already exists. It does not redesign the feature
from scratch, write production code, or treat planned files as errors just because they are
not implemented yet.

**Output**: Return the validation report in chat only. Do not write any artifact to `.specflow/`.

---

## Required Inputs

Before proceeding, confirm:

1. **Feature name** — which feature is being validated?
2. **Validation scope** — full review _(default)_ or a targeted review? Valid targeted scopes
   include cross-artifact consistency, scenario coverage, implementation simplification, and
   standards compliance.

If the feature name is missing, ask before proceeding. If the scope is missing, proceed with
the full review and note the default in the summary.

---

## Steps

- [ ] **Step 1: Load the feature artifacts.** Read these files if they exist:
  - `.specflow/features/<feature-name>/overview.md`
  - `.specflow/features/<feature-name>/specs.feature`
  - `.specflow/features/<feature-name>/implementation.md`

  `implementation.md` is the required anchor for this workflow. If it does not exist, stop and
  ask whether to run `203-implementation-design` first.

  If `overview.md` or `specs.feature` is missing, ask whether to run the missing workflow first
  (`201-high-level-design` or `202-spec-design`) or proceed with a limited review. If the user
  chooses to proceed, label the report clearly as limited validation and do not claim full
  coverage.

- [ ] **Step 2: Load architecture and product context.** Read these files directly if they exist:
  - `.specflow/docs/D01-project-overview.md`
  - `.specflow/docs/D02-system-architecture.md`
  - `.specflow/docs/D03-common-data-model.md`
  - `.specflow/docs/D04-backend-architecture.md`
  - `.specflow/docs/D05-frontend-architecture.md`
  - `.specflow/docs/D06-ui-design.md`
  - `.specflow/docs/D07-ui-experience.md`
  - `.specflow/docs/D08-ui-pages/<relevant-page>.md`
  - `.specflow/context/domain-knowledge.md`

  Skip files that do not exist. Note which are missing before continuing.

- [ ] **Step 3: Research the codebase with `@explore`.** This step is not optional. Use
      `@explore` to examine how the relevant parts of the codebase work today before validating
      the plan. Ask it to:
  - Read the production files already referenced in `implementation.md`
  - Find 2–3 concrete existing implementations of similar frontend and backend patterns in full
  - Identify reusable modules, helpers, routes, hooks, services, or components the plan could
    extend instead of duplicating
  - Find installed skills under `.claude/skills/` and `~/.claude/skills/` that govern the
    technologies this feature touches
  - Flag inconsistent existing patterns that could affect the review

  Return: a concise factual summary with exact paths, reusable candidates, and the specific
  patterns the current design should follow.

  After `@explore` returns, load any installed skills relevant to the technology stack and apply
  them as validation criteria for the rest of this workflow.

- [ ] **Step 4: Validate cross-artifact consistency.** Review the feature artifacts as one
      connected system, not three separate documents. Confirm:
  - In Scope and Out of Scope boundaries in `overview.md` match the behaviors covered by
    `specs.feature`
  - Acceptance Criteria in `overview.md` are either covered by scenarios or explicitly called out
    as missing coverage
  - The primary User Journey steps are represented in the scenarios and supported by the
    implementation plan
  - No scenario tests behavior that is outside scope unless the report calls it out as an
    intentional scope expansion
  - No implementation change introduces behavior that the feature definition and scenarios do not
    justify
  - Names, terminology, route names, entity names, statuses, and state transitions are consistent
    across all artifacts

- [ ] **Step 5: Validate implementation quality and missed opportunities.** Pressure-test the
      implementation plan against the codebase research and loaded skills. Look for:
  - Existing modules that could be extended instead of new files being introduced
  - Duplicate logic or parallel abstractions the plan would create unnecessarily
  - Missing integration points, error states, data transitions, state transitions, or boundary
    validation
  - Implementation details that do not address a scenario or acceptance criterion
  - New files or abstractions with weak justification
  - Violations of installed skills, architecture docs, or established codebase patterns
  - Premature optimization, over-engineering, or complexity not justified by the feature's
    requirements

- [ ] **Step 6: Turn issues into concrete findings.** Write findings only when they are
      actionable. For each finding:
  - Assign severity: `🔴 High`, `🟡 Medium`, or `🔵 Low`
  - Assign a category: `Cross-artifact inconsistency`, `Coverage gap`,
    `Missed reuse opportunity`, `Rule violation`, or `Open question`
  - Cite exact evidence: section numbers, `@TS###` tags, module paths, or installed skill names
  - Explain why the issue matters to implementation readiness
  - Recommend the smallest correction that resolves the issue

  Do not create findings for these cases:
  - A file is marked `New` in `implementation.md` but does not exist yet
  - An implementation detail is omitted because the selected 203 detail level intentionally
    excludes that depth
  - A scenario is broad but still validates a complete business outcome

- [ ] **Step 7: Check the report before responding.** Confirm all of these:
  - Findings are grounded in the actual artifacts and codebase research, not generic best practice
  - Every `🔴 High` issue is a real blocker or correctness risk
  - Recommendations prefer extending existing code over adding new abstractions when a concrete
    candidate exists
  - If the review is limited because inputs are missing, the report says so explicitly
  - If there are no issues in an area, the report says so briefly rather than inventing concerns
  - The overall assessment matches the severity and count of the findings

- [ ] **Step 8: Return the validation report in chat.** Structure the response with these sections,
      in this order:
  - `Executive Summary`
  - `Overall Assessment`
  - `Findings`
  - `Open Questions and Assumptions` _(only if needed)_
  - `Readiness Decision`

  In `Findings`, number each finding and include severity, category, references, issue,
  why it matters, and the recommended smallest fix.

- [ ] **Step 9: Summarize.** Report:
  - Overall assessment: `Ready`, `Needs Work`, or `Not Ready`
  - Findings count by severity
  - Any missing artifacts or context documents that limited the review
  - The most important next action before `301-feature-implementation`

---

## Additional Guidance

**Validate the plan that exists.** This workflow is a review pass, not a rewrite pass. The goal
is to expose mismatches, not to quietly redesign the feature.

**Prefer evidence over taste.** A missed opportunity should point to a concrete existing module,
helper, route, or pattern that the plan could reuse.

**Keep the report lean.** The value is in the deltas: what is inconsistent, missing, risky, or
needlessly complex. Do not restate large sections of `overview.md`, `specs.feature`, or
`implementation.md` unless the restatement is necessary to explain a finding.

**Treat each artifact as having a distinct role.** `overview.md` defines scope and outcomes,
`specs.feature` defines behavior coverage, and `implementation.md` defines the code change plan.
This workflow checks whether those three roles still align.

**Judge 203 at the requested detail level.** If `203-implementation-design` was run at High Level
or Balanced detail, do not raise findings solely because Detailed signatures or CSS files are
missing.
