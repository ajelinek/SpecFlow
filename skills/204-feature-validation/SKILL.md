---
name: 204-feature-validation
description: >
  Use `204` to validate a feature's design artifacts before implementation begins. It reviews
  `overview.md`, `specs.feature`, and `implementation.md` for gaps, inconsistencies, and missed
  reuse. Trigger it for prompts like "204", "validate the feature", or "implementation readiness
  review" before coding starts.
argument-hint: "[feature-name] [validation-scope]"
context: fork
---

# 204 - Feature Validation

Return a validation report in chat checking whether a feature's scope, scenarios, and implementation
plan agree with each other and with the codebase. Each artifact has a distinct role: `overview.md`
defines scope and outcomes, `specs.feature` behavior coverage, `implementation.md` the code change
plan. Validate the plan that exists — a review pass, not a redesign. Prefer evidence over taste and
keep the report lean and delta-focused.

**Output**: Report in chat only. Do not write to `.specflow/`.

---

## Required Inputs

1. **Feature name**
2. **Validation scope** — full review *(default)* or targeted: cross-artifact consistency, scenario
   coverage, implementation simplification, or standards compliance

This workflow runs in a forked context: it can't see the invoking conversation or reach the user.
Earlier decisions count only if included in the request. If the feature name is missing, return that
as the result rather than asking.

---

## Standards Resolution

Load relevant installed skills first, then resolve validation criteria in this order: (1) loaded
standards guidance, (2) existing SpecFlow or project docs, (3) codebase patterns confirmed via
`@explore`, (4) explicit decisions passed in with the invocation. Judge relevance by concern, not
named technology; once the stack is known, use its real terms.

---

## Steps

- [ ] **Step 1: Load feature artifacts.** `implementation.md` is required — if missing, stop and
  report only that `203-implementation-design` must run first. If `overview.md` or `specs.feature` is
  missing, continue, label the report as limited, and name the missing upstream workflow.

- [ ] **Step 2: Load context.** Relevant D01-D08 and `domain-knowledge.md`; note missing context.

- [ ] **Step 3: Research the codebase with `@explore`** (required). Read the production files
  referenced in `implementation.md`; read a few similar implementations in full; identify reusable
  modules, helpers, routes, hooks, and components the plan could extend; identify relevant
  conventions and inconsistent patterns. Load relevant skills.

- [ ] **Step 4: Validate cross-artifact consistency.** Overview scope matches the scenarios;
  acceptance criteria are covered or called out as gaps; the primary journey is represented in
  scenarios and supported by the plan; the plan introduces no unjustified behavior; names,
  terminology, routes, entities, statuses, and state transitions are consistent.

- [ ] **Step 5: Validate implementation quality.** Look for missed reuse (judged against the
  `engineering-principles` reuse ladder — flag any `New` file, export, or dependency a lower rung
  could satisfy, pointing to the concrete existing module); weak justification for new files or
  abstractions; missing integration points, error states, or boundary validation; details that don't
  satisfy a scenario or criterion; rule violations, over-engineering, premature optimization.

- [ ] **Step 6: Turn issues into findings.** Each has: severity (`🔴 High`, `🟡 Medium`, `🔵 Low`);
  category (`Cross-artifact inconsistency`, `Coverage gap`, `Missed reuse opportunity`,
  `Rule violation`, `Open question`); exact evidence (section numbers, `@TS###` tags, module paths,
  doc sections, or standards guidance); why it matters; the smallest fix. Don't create findings
  because planned files aren't implemented yet, because 203 ran at a less detailed level (judge it at
  its selected level), or because a broad scenario still validates a complete business outcome.

- [ ] **Step 7: Check the report.** Findings are evidence-grounded; `🔴 High` findings are real
  blockers or correctness risks; recommendations name concrete reuse candidates; the overall
  assessment matches the findings.

- [ ] **Step 8: Return the report** with sections in order: `Executive Summary`,
  `Overall Assessment` (`Ready`, `Needs Work`, or `Not Ready`), `Findings`,
  `Open Questions and Assumptions` *(only if needed)*, `Readiness Decision`. Close with findings
  count by severity, missing artifacts or context that limited the review, and the most important
  next action before `301-spec-implementation`.
