---
name: 107-ui-experience
description: >
  Use `107` to define the UX architecture: navigation, interaction patterns, accessibility,
  error handling, and the page inventory. Trigger it for prompts like "107", "user experience",
  "navigation design", "interaction patterns", or "information architecture" before per-page
  design work begins.
---

# 107 - UI Experience Overview

Produce the UX experience overview for a project. This document defines how users move through the
product: navigation model, cross-platform interaction patterns, accessibility commitments, error
handling approach, and a complete page inventory with routes and role access.

It is the UX architecture for the product, not a per-page layout spec.

**Output path**: `.specflow/docs/D07-ui-experience.md`

---

## Required Inputs

Before generating directions or writing output, confirm:

1. **User roles** — including whether roles need different navigation structures or access scopes
2. **Device targets** — platforms and form factors to support
3. **Initial page inventory** — rough list is enough
4. **Accessibility requirements** — anything beyond WCAG 2.1 AA
5. **Navigation constraints** — routing, deep-linking, or structural constraints from prior docs

Optional but useful: existing research, competitor navigation patterns, onboarding needs, and UI
conventions already fixed in D06.

If user roles or device targets are missing, stop and ask.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs.

- [ ] **Step 2: Load existing context.** If D07 already exists, treat it as a draft to update. Read
  D01, D02, D05, D06, and `.specflow/context/domain-knowledge.md` when present. If helpful,
  delegate file retrieval to `@explore` to keep the main context tight.

- [ ] **Step 3: Generate three UX directions.** Use `@designer` when available. Pass only the
  relevant context:
  - user roles and workflows from Step 1 and D01
  - device targets and form-factor constraints
  - routing and structural constraints from D02/D05
  - visual conventions from D06
  - domain user mental models when they materially affect navigation

  Ask for **three distinct UX directions** that differ in navigation model, interaction density,
  and cross-platform adaptation.

  Handling rules:
  - answer `@designer` clarifying questions from loaded context first
  - ask the user only when the context cannot answer them
  - surface conflicts with D06 or other established docs instead of overriding silently
  - if `@designer` is unavailable, use `@explore` to research three plausible UX/navigation
    approaches for the product type and evaluate those instead

- [ ] **Step 4: Evaluate the directions.** Score them against:
  - user-goal alignment
  - role differentiation
  - device feasibility
  - technical feasibility within D05
  - accessibility
  - cognitive load

  Choose one direction as the recommendation. If the runner-up has elements worth preserving, note
  them.

- [ ] **Step 5: Build the page inventory.** Using the selected direction and known workflows,
  produce a complete page inventory with:
  - page/view name
  - route path
  - one-line purpose and primary action
  - user roles with access

  Do not list component states such as modals or drawers as pages.

- [ ] **Step 6: Draft the document.** Use `./templates/T07 - UI Experience Overview.md` and fill
  in:
  - **Navigation & Interaction Patterns**
  - **Page Summary**
  - **Alternatives Considered**

- [ ] **Step 7: Quality check.** Confirm:
  - navigation decisions trace to confirmed inputs, prior docs, or explicit UX/accessibility
    principles
  - the navigation model is concrete enough to implement
  - the page inventory covers the workflows in D01
  - the result stays consistent with D06 and D05
  - no placeholder or filler text remains

- [ ] **Step 8: Write the file and summarize.** Write `.specflow/docs/D07-ui-experience.md`, report
  the selected direction, why the others lost, any deferred questions, and suggest
  `108-ui-page-design` next.

---

## Guidance

- Three directions are required.
- Domain conventions can eliminate bad UX directions early; use them.
- The page inventory should reflect route-level views only. Keep transient component states out of
  it.
