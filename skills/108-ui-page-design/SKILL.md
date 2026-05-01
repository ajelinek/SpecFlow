---
name: 108-ui-page-design
description: >
  Use `108` to design a specific page or view in detail, including layout, mockup, interactions,
  and responsive behavior. Trigger it for prompts like "108", "page design", "wireframe", or
  "design the [page] page" when a single route or view needs a detailed design spec.
---

# 108 - UI Page Design

Produce the design specification and HTML mockup for a single application page. This workflow runs
once per page and writes two files:

- `overview.md` — page context, data requirements, interaction flows, alternatives considered
- `mockup.html` — the primary visual reference

The HTML mockup is a design artifact, not production code. It must not be treated as an
implementation reference.

**Output path**: `.specflow/docs/D08-ui-pages/<page-name>/`

---

## Required Inputs

Before proceeding, confirm:

1. **Page name** — it should match D07's page inventory, or the user must confirm that D07 needs a
   new page
2. **Page purpose and primary user action**
3. **User roles with access** — including role-specific differences
4. **Key data** — rough list is sufficient
5. **Responsive priority** — primary form factor and what must degrade gracefully

If any input cannot be resolved from D01/D06/D07, stop and ask.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm the page exists in D07 or the user explicitly approves
  adding it. Do not design an untracked page silently.

- [ ] **Step 2: Load existing context.** If a page design already exists, treat it as a draft to
  update. Load the relevant context from D01, D06, D07, existing D08 page docs, and
  `domain-knowledge.md` when present. Reuse existing D08 patterns unless there is a good reason not
  to.

- [ ] **Step 3: Generate three layout directions.** Use `@designer` when available. Pass only the
  relevant page context:
  - page purpose and primary action
  - role-specific differences
  - responsive priority
  - relevant D06 design rules
  - D07 entry/exit routes and interaction conventions
  - key data to display or collect
  - reusable patterns already established in D08
  - domain conventions that affect data density, display rules, or hierarchy

  Ask for **three distinct layout directions** that differ in information hierarchy, content
  density, and primary action placement.

  Handling rules:
  - answer `@designer` clarifying questions from loaded context first
  - ask the user only when the context cannot answer them
  - surface conflicts with D06/D07 instead of overriding silently
  - if the user approves a conflicting direction, update the relevant governing doc first before
    treating that direction as resolved
  - if `@designer` is unavailable, use `@explore` to research three plausible layout patterns for
    the page type and evaluate those instead

- [ ] **Step 4: Evaluate the directions.** Score them against:
  - user goal alignment
  - D06 design-system compliance
  - D07 navigation consistency
  - role differentiation
  - responsive viability
  - pattern reuse
  - accessibility

  Choose one direction and note any elements worth borrowing from the runner-up.

- [ ] **Step 5: Formalize the data and interaction inventory.** Produce:
  - **Key data attributes** — name, source, and display format when relevant
  - **Interaction flows** — each named flow, how the user enters it, step sequence, and expected
    outcome

- [ ] **Step 6: Produce `mockup.html`.** Use `@designer` when available; otherwise create it
  directly. The file must:
  - be self-contained with inline styles or one `<style>` block
  - show the full primary layout
  - show a secondary responsive state via media query or clearly separated callout section
  - show major interactive states that materially affect layout
  - annotate role-differentiated areas
  - use realistic placeholder content, not lorem ipsum
  - use semantic HTML structure where possible
  - include this exact comment immediately after the opening `<html>` tag:

  ```html
  <!-- DESIGN MOCKUP ONLY: This file is a static layout prototype. It does not reflect
       production code structure, component architecture, or engineering best practices.
       Do not use as a code reference or parse for implementation patterns. -->
  ```

- [ ] **Step 7: Produce `overview.md`.** Use `./templates/T08 - UI Page Design.md`. Keep only the
  context that is not obvious from the mockup:
  - page purpose and role rules
  - key data inventory
  - interaction flows
  - alternatives considered
  - open questions

  Do not duplicate what the HTML already shows.

- [ ] **Step 8: Quality check.** Confirm:
  - the mockup covers every primary user action in the interaction inventory
  - the page follows D06 and D07
  - role-differentiated areas are explicit
  - the disclaimer comment is in the required location
  - the page is consistent with existing D08 patterns unless a new pattern is explicitly justified

- [ ] **Step 9: Write the output files and summarize.** Create
  `.specflow/docs/D08-ui-pages/<page-name>/` if needed, write both files, report the selected
  direction, why the others lost, any open questions, and the best next page to design.

---

## Guidance

- This skill runs once per page. Do not design multiple pages in one run.
- The mockup is the primary artifact, but it is still a design-only artifact.
- Reuse proven D08 patterns before inventing new ones.
- Three directions are required even when the page seems straightforward.
- When a D06/D07 conflict is approved, reconcile the governing doc first so D08 does not become a
  silent fork of the design system or UX architecture.
