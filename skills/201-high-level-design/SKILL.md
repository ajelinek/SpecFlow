---
name: 201-high-level-design
description: >
  Use `201` to create a concise high-level design for a specific feature. It produces the feature
  overview and end-to-end user journey without going into test or implementation detail. Trigger
  it for prompts like "201", "high-level design", "feature design", or "HLD" when a feature needs
  a short overview before specs or implementation.
---

# 201 - High-Level Design

Produce `.specflow/features/<feature-name>/overview.md`: a short document that explains what a
feature does and how its primary user journey flows.

This document should cover only:

1. business scope
2. user journey

No test detail and no implementation design.

**Output path**: `.specflow/features/<feature-name>/overview.md`

---

## Required Inputs

Before proceeding, confirm:

1. **Feature description** — a name plus enough context to identify the primary user action and
   outcome

If the request is too vague, ask one clarifying question.

---

## Steps

- [ ] **Step 1: Resolve feature identity.** Read `.specflow/docs/D10-feature-overview.md` if it
  exists.
  - If the feature is in D10, use its `F-ID` and behavior bullets as the scope anchor.
  - If it is not in D10, ask whether to add it there first or continue without updating D10.

- [ ] **Step 2: Load context.** Read relevant existing docs when they exist:
  - D01
  - D02
  - D07
  - `domain-knowledge.md`
  - existing feature `overview.md` draft

  Note missing context.

- [ ] **Step 3: Draft the Feature Overview section.** Include:
  - a 1-2 sentence summary for a non-technical reader
  - an **In Scope** list of 3-6 boundary statements
  - an **Out of Scope** list with explicit exclusions

- [ ] **Step 4: Draft Acceptance Criteria and Key Constraints.**
  - Acceptance Criteria are verifiable outcomes, not restated scope bullets.
  - If a statement would be true the moment the capability exists at all, it belongs in scope,
    not in Acceptance Criteria.
  - Include 3-5 when they add real value.
  - Include **Key Constraints** only when non-obvious constraints matter.

- [ ] **Step 5: Draft the User Journey.** Write the happy path as a plain bullet sequence.
  - top-level bullets should reflect meaningful user-visible steps
  - sub-bullets should add detail only where this feature introduces change
  - unchanged systems should be summarized briefly
  - keep error and edge branches out of this document

- [ ] **Step 6: Quality check.** Confirm:
  - scope is clear without engineering context
  - acceptance criteria are real outcomes, not renamed scope bullets
  - out-of-scope includes explicit exclusions
  - the user journey leads with user-visible flow and stays focused on the primary path

- [ ] **Step 7: Write the file and summarize.** Use `./templates/overview.md`. Set front matter:
  - `feature`: feature slug
  - `fid`: assigned `F-ID` if available
  - `status`: `todo`

  The `status` field is the feature lifecycle source of truth: `todo`, `implementing`, `done`.
  Update status in place as work progresses; do not move the feature file between directories when
  status changes.

  Report the output path, missing context that may affect accuracy, and suggest
  `202-spec-design` next.

---

## Rules

1. In Scope says what is built; Acceptance Criteria says how we know it works correctly.
2. D10 is helpful but not required.
3. The front matter `status` field is the feature lifecycle source of truth: `todo`,
   `implementing`, `done`, and the file path stays stable across status changes.
4. The user journey should show where this feature changes behavior and stay brief elsewhere.

## Additional Guidance

**On scope vs. acceptance criteria**: In Scope answers "what are we building?" Acceptance Criteria
answers "how do we know it works correctly?" A criterion that would be satisfied the moment the
capability exists is a scope bullet in disguise.
