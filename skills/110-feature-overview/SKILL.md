---
name: 110-feature-overview
description: >
  Use `110` to define and prioritize the product's feature set as concise, reviewable slices.
  Trigger it for prompts like "110", "feature overview", "feature list", "feature backlog", or
  "what features should we build" after the main project framing is in place.
---

# 110 - Feature Overview

Produce a concise plan organizing work into thin vertical slices grouped under customer-facing
**capabilities** — what to build and why, not how. Keep it scannable; if it reads like a spec, it's
too long.

**Output path**: `.specflow/docs/D10-feature-overview.md`

---

## Required Inputs

1. **Scope** — full product or a bounded product area
2. **Existing architecture docs** — minimum D01 and D02; D03-D08 help when present
3. **Known features or priorities** — anything the user already named or ranked

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve with `gap-check`. Missing architecture docs make the
  overview more speculative; note that rather than blocking.

- [ ] **Step 2: Load context.** D01, D02, and any D03/D07 context that helps define natural feature
  boundaries.

- [ ] **Step 3: Identify capabilities.** Typically 3-7, each named in product language (not technical
  layers), a coherent area of functionality, usually holding 3-8 features. Confirm the capability
  names with the user before decomposing.

- [ ] **Step 4: Decompose into thin vertical slices.** Prefer more small, reviewable features over
  fewer large ones. Each feature traverses the full stack, is one focused behavior, fits a focused
  iteration, and may be a partial user experience as long as it's a genuine vertical slice. Draft a
  short name, a one-sentence description, 3-6 product-level behavior bullets, and dependencies by
  feature ID — real blockers only, not thematic relationships.

- [ ] **Step 5: Assign IDs, status, and ordering.** Capability IDs `C001`, `C002`, …; globally unique
  feature IDs `F001`, `F002`, … that are never reused; default status `🔵 To Do`. Order foundational
  slices before dependents.

- [ ] **Step 6: Quality check.** Each feature is a true vertical slice, not a layer task or chore;
  bullets describe behavior, not implementation; dependencies are real and minimal; capabilities are
  distinct; user-named priorities are represented.

- [ ] **Step 7: Write and summarize.** Use `./templates/T10 - Feature Overview.md`, then report
  capability and feature counts, missing docs that may shift the list, good starting features, and
  suggest `201-high-level-design` for the first one.
