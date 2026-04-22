---
name: 107-ui-experience
description: >
  Use this skill when you need to define the UX architecture for a project: navigation
  patterns, cross-platform interaction strategies, accessibility standards, error handling
  flows, and the full page inventory with routes. Triggers on phrases like "ux experience",
  "user experience", "navigation design", "107", "interaction patterns", "page structure",
  "information architecture", or when the project needs a UX foundation before per-page
  design work begins. Run this after 106-ui-design and before 108-ui-page-design.
---

# 107 — UI Experience Overview

Produce the UX experience overview for a project. This document defines the strategic UX
decisions that govern how users move through the product: navigation philosophy, cross-platform
interaction patterns, accessibility commitments, error handling approaches, and a complete page
inventory with routes and purpose. It is a decision record — the *why* behind navigation choices
and interaction conventions — not a per-page layout spec (that is 108).

This document draws on the project overview for user goals and workflows, the system architecture
for structural constraints, the frontend architecture for component and routing boundaries, and
the UI design system for established visual conventions. Everything in D07 must trace to one of
those sources or to a validated UX principle.

Output path: `.specflow/docs/D07-ui-experience.md`

---

## Your Role

Approach this as a UX architect: your job is to make navigation and interaction decisions
concrete enough that any designer or engineer working on the product arrives at consistent user
flows without negotiating each choice. Where the project overview describes user goals, this
document specifies what navigation paths and interaction patterns serve those goals.

---

## Required Inputs

Before generating UX directions or writing any output, confirm you have answers to all of the
following. If any are missing, ask now — do not infer navigation philosophy or assume default
interaction patterns.

1. **User roles** — Who are the distinct user types, and do they need different navigation
   structures or access patterns? (e.g., admin vs. end user, authenticated vs. anonymous)

2. **Device targets** — Which platforms and form factors must be supported?
   (e.g., desktop-first, mobile-first, responsive, native app constraints)

3. **Page inventory (initial)** — What are the known pages or major sections of the product?
   A rough list is sufficient; this skill will refine and formalize it.

4. **Accessibility requirements** — Are there specific accessibility standards beyond WCAG 2.1 AA,
   or user population needs that require additional consideration?

5. **Navigation constraints** — Are there existing routing decisions, deep-link requirements, or
   structural constraints from D02/D04/D05 that restrict the navigation model?

Optional but useful: existing user research, competitor navigation patterns to differentiate from,
onboarding flow requirements, and any design conventions already committed to in D06.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs are present. If user roles or
      device targets are missing, stop and ask — these drive every downstream navigation decision.
      Do not invent a user model or assume a single user type.

- [ ] **Step 2: Load existing context.** Check whether `.specflow/docs/D07-ui-experience.md`
      already exists. If it does, treat it as a prior draft and update rather than replace. Read:
  - `.specflow/docs/D01-project-overview.md` — user workflows, success metrics, and user goals
    that establish what navigation must support
  - `.specflow/docs/D02-system-architecture.md` — structural constraints that affect routing
    and page boundaries
  - `.specflow/docs/D05-frontend-architecture.md` — routing approach, component library in use,
    any client-side navigation patterns already committed to
  - `.specflow/docs/D06-ui-design.md` — design system and visual conventions already established;
    UX patterns must be consistent with this foundation
  - `.specflow/context/domain-knowledge.md` — if it exists, read it for domain-specific user
    mental models, terminology, and any industry-specific navigation conventions

  Use `@explore` to retrieve these files if they exist in the user's project. Ask `@explore`
  for the full contents of each file listed above. Reference these documents; do not re-describe
  their content in D07.

- [ ] **Step 3: Generate multiple UX directions using `@designer`.** Delegate to the `@designer`
      agent. Pass the following context in the prompt — do not ask `@designer` to fetch these
      itself:

  - **User roles and their navigation needs** — from Step 1 confirmed inputs and D01
  - **Device targets and form factor constraints** — from Step 1 confirmed inputs
  - **Structural and routing constraints** — from D02 and D05
  - **Visual conventions already established** — from D06 (design system, motion philosophy)
  - **Domain user mental models** — from `domain-knowledge.md` if it exists
  - **Relevant excerpts from D01** — user workflows and goals that navigation must serve;
    do not paste the entire document

  Ask `@designer` to produce **three distinct UX directions**, each differing in navigation
  model, interaction density, and cross-platform adaptation strategy.

  **If `@designer` is not available**, use `@explore` to search for UX patterns relevant to
  the product's domain and user type. Ask `@explore`: "Search for UX navigation patterns for
  [product type and user type]. Return a concise summary of three distinct approaches that
  differ in navigation model, interaction density, and mobile adaptation." Use those findings
  as the three directions to evaluate.

  **Handling `@designer` clarifying questions**: If `@designer` returns clarifying questions
  before generating directions, answer each from the documents loaded in Step 2. For any
  question you cannot answer from context, present it to the user and wait for their answer
  before continuing. Do not pass unanswered questions back to `@designer`.

  **Handling D07/D06 conflicts**: If `@designer` flags a conflict between a proposed UX
  direction and an existing decision in D06 or another SpecFlow doc, do not override the
  existing decision silently. Present the conflict and proposed change to the user. If the
  user approves, update the relevant document first, then continue. If the user rejects,
  adjust the brief and re-invoke.

- [ ] **Step 4: Evaluate directions against product goals.** Score each UX direction against
      the criteria below. Use D01 (user goals and workflows), domain knowledge (if present),
      and the confirmed required inputs as the evaluation frame — not personal preference.

  | Criterion | What to assess |
  |---|---|
  | User goal alignment | Does the navigation model directly support the primary user workflows described in D01? |
  | Role differentiation | Does it correctly serve distinct user roles without requiring custom workarounds? |
  | Device feasibility | Does it work well on all required form factors without degrading on any? |
  | Technical feasibility | Can it be implemented within the routing and component approach in D05? |
  | Accessibility | Does it support keyboard navigation and WCAG 2.1 AA without special workarounds? |
  | Cognitive load | Does it minimize the number of decisions users must make to complete core tasks? |

  Select one direction as the recommendation. Document the rationale. If a second direction
  has strengths worth preserving, note which specific elements to borrow and why.

- [ ] **Step 5: Build the page inventory.** Using the initial page list from Step 1 inputs,
      the selected UX direction, and the structural context from D02/D05, produce a complete
      page inventory:
  - List every distinct page or view the product requires
  - Assign each a route path
  - Write a one-line description of its purpose and primary user action
  - Note which user roles have access

  If the routing structure is unclear from context, use `@explore` to check whether routing is
  defined anywhere in the user's project before inventing a structure.

- [ ] **Step 6: Draft the document.** Use the template at `./templates/T07 - UI Experience Overview.md`.
      Populate every section from the selected UX direction and the completed page inventory:

  **Navigation & Interaction Patterns**: Navigation approach in plain language. How it adapts
  across form factors. Role-based navigation differences. Core interaction patterns — how users
  navigate content, submit forms, receive feedback. Error handling approach. Accessibility
  commitments for navigation flows.

  **Page Summary**: The complete page inventory from Step 5 in table form. Every page, its
  route, a one-line description, and its access scope.

- [ ] **Step 7: Quality check.** Before writing the file, verify:
  - Does every navigation decision trace to a confirmed input, a document in D01–D06, or an
    explicit accessibility or UX principle? If not, add the reason or move to Open Questions.
  - Is the navigation model specific enough to implement, or is it still abstract strategy?
    "Persistent top navigation with role-based items" is specific. "Easy to navigate" is not.
  - Does the page inventory cover every user workflow described in D01? Are there gaps?
  - Are the interaction patterns consistent with the design system established in D06?
  - Are there any placeholder sections, empty bullets, or generic filler text? Remove them.

- [ ] **Step 8: Write the output.** Write the completed document to
      `.specflow/docs/D07-ui-experience.md`. Create the `.specflow/docs/` directory if it does
      not exist.

- [ ] **Step 9: Summarize.** Report what was written, which UX direction was selected and why
      the others were set aside, any open questions deferred, and suggest running
      `108-ui-page-design` (per-page layouts using this UX foundation) as the next step.

---

## Additional Guidance

**On multi-direction exploration**: The three-direction exercise in Step 3 is not optional even
if the navigation direction seems obvious. Comparing directions exposes hidden assumptions and
often surfaces a clearly superior approach. Document the rejected directions briefly in the
output under an "Alternatives Considered" section so the decision is traceable.

**On domain knowledge**: If `.specflow/context/domain-knowledge.md` exists, read it before
generating directions. Domain-specific conventions can eliminate entire UX directions before
you spend time on them — healthcare apps may require strict information hierarchy, financial
tools may need high data density patterns, consumer apps may prioritize gesture-first navigation.

**On the page inventory**: A page is a distinct view with its own route. Do not list component
states (modal, drawer, tooltip) as pages. If the routing structure is complex or role-dependent,
note the variation — do not flatten it.

**On the `@designer` agent**: `@designer` honors established design decisions. If D06 already
exists, UX directions will be consistent with it. Pass only what is relevant and confirmed —
do not dump entire documents. The synthesis, evaluation, and final document are your responsibility.

**On `@explore` as fallback**: When `@designer` is not available, `@explore` provides a
research-grounded fallback. The output will be less creative but grounded in known patterns.
Apply the same evaluation criteria from Step 4 regardless of which path produced the directions.
