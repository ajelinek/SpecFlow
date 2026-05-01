---
name: 110-feature-overview
description: >
  Use `110` to define and prioritize the product's feature set as concise, reviewable slices.
  Trigger it for prompts like "110", "feature overview", "feature list", "feature backlog", or
  "what features should we build" after the main project framing is in place.
---

# 110 - Feature Overview

Produce `D10-feature-overview.md`: a concise plan that organizes work into thin vertical slices
grouped under customer-facing **capabilities**.

This document captures what needs to be built and why it matters, not how to build it.

**Output path**: `.specflow/docs/D10-feature-overview.md`

---

## Required Inputs

Before proceeding, confirm:

1. **Scope** — full product or a bounded product area
2. **Existing architecture docs** — minimum D01 and D02; D03-D08 help when present
3. **Known features or priorities** — anything already named or ranked by the user

If any required input is missing, ask before proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** If architecture docs are missing, note that the overview will be
  more speculative.

- [ ] **Step 2: Load context.** Retrieve D01, D02, and any useful D03/D07 context that helps define
  natural feature boundaries.

- [ ] **Step 3: Identify capabilities.** Define the top-level customer-facing capability groups.
  Each capability should:
  - be named in product language, not technical layer language
  - represent a coherent area of product functionality
  - usually contain 3-8 features

  Aim for 3-7 capabilities for a typical product. Present the proposed capability names to the user
  for confirmation before decomposing features.

- [ ] **Step 4: Decompose each capability into thin vertical slices.** Each feature must:
  - traverse the full stack
  - represent one focused behavior
  - be small enough to design and implement in a focused iteration
  - not require being a complete user experience on its own

  For each feature, draft:
  - a short name
  - a one-sentence description
  - 3-6 product-level behavior bullets
  - dependencies by feature ID, if real dependencies exist

- [ ] **Step 5: Assign IDs, status, and ordering.** Use:
  - capability IDs: `C001`, `C002`, ...
  - globally unique feature IDs: `F001`, `F002`, ...
  - default status for new items: `🔵 To Do`

  Order features so foundational slices come before dependents.

- [ ] **Step 6: Quality check.** Confirm:
  - each feature is a true vertical slice, not a layer task or implementation chore
  - bullets describe behavior, not implementation details
  - dependencies are real and minimal
  - capabilities are distinct
  - user-named priorities are represented

- [ ] **Step 7: Write the file and summarize.** Use `./templates/T10 - Feature Overview.md`, then
  report capability and feature counts, missing docs that may shift the list later, good starting
  features, and suggest `201-high-level-design` for the first feature to build.

---

## Rules

1. Prefer more small, reviewable features over fewer oversized ones.
2. A feature can be a partial user experience as long as it is a genuine vertical slice.
3. Feature IDs are globally unique and never reused.
4. Dependencies should be real blockers, not loose thematic relationships.
5. Keep the document scannable; if it reads like a spec, it is too long.
