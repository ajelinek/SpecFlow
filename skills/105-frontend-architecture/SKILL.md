---
name: 105-frontend-architecture
description: >
  Use `105` to define the frontend architecture: UI structure, component boundaries, state, and
  development patterns. Trigger it for prompts like "105", "frontend architecture", "component
  structure", or "state management" when frontend patterns need to be specified before UI design.
---

# 105 - Frontend Architecture

Produce the frontend architecture document for a project. This document turns D02 and D04 into
concrete frontend structure: framework conventions, directory layout, component boundaries, state
rules, API integration patterns, styling approach, and test strategy.

Do not repeat D01-D04. Reference them and add frontend-specific decisions only.

**Output path**: `.specflow/docs/D05-frontend-architecture.md`

---

## Required Inputs

Before drafting, confirm:

1. **Frontend framework** — React, Astro, SolidJS, Vue, etc.
2. **Deployment model** — static, SSR, hybrid, CDN-hosted, etc.
3. **API integration** — REST, GraphQL, Firebase, or mixed
4. **State management approach** — confirm a specific tool or pattern for each category:
   - **Component state**
   - **URL / navigation state**
   - **Global / application state**
   - **Server / remote state**
5. **Real-time requirements** — WebSockets, SSE, polling, or none
6. **Audience and reach** — public vs internal, SEO needs, single-language vs i18n

Optional but useful: design system or component library, accessibility target, performance goals,
mobile-first requirements, frontend auth constraints.

If the framework or any state category is unresolved, stop and ask before proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all six inputs, especially the four state categories.
  Do not assume default libraries or patterns.

- [ ] **Step 2: Load existing context.** If D05 already exists, treat it as a draft to update. Read
  D01, D02, D04, and any other directly relevant docs. Reference them; do not re-describe them.

- [ ] **Step 3: Explore the existing frontend if needed.** If the project already has frontend code,
  use `@explore` to identify:
  - top-level directory structure under `src/`
  - component organization patterns
  - current state setup
  - styling approach
  - shared utilities and types

  Follow established patterns unless they conflict with explicit project requirements.

- [ ] **Step 4: Decide which optional sections apply.** Include only sections that the project
  actually needs, such as:
  - real-time features
  - internationalization
  - SEO
  - mobile/PWA concerns
  - security patterns the frontend owns
  - third-party integrations

  Omit irrelevant sections entirely.

- [ ] **Step 5: Draft the document.** Use `./templates/T05 - Frontend Architecture.md` and cover:
  - **Core stack** — framework, build tooling, key libraries, and each library's role
  - **Directory structure** — annotated tree showing where new code belongs
  - **Component architecture** — component levels, ownership boundaries, naming/file conventions
  - **State management** — for all four state categories, name the tool/pattern, what belongs in
    it, what is excluded, and how the boundary is enforced
  - **API integration** — client/service layer, auth attachment, error handling, caching strategy
  - **Styling approach** — CSS methodology, token usage, theming, accessibility baseline
  - **Testing strategy** — what is tested at each level and with which tools
  - **Optional sections** — only those approved in Step 4

- [ ] **Step 6: Quality check.** Confirm:
  - every decision traces to D01, D02, D04, existing codebase evidence, or explicit user input
  - all four state categories are documented with specific tools or patterns
  - API integration matches D04
  - no placeholder or duplicate sections remain
  - the document is scannable and uses concrete framework terms

- [ ] **Step 7: Write the file and summarize.** Write
  `.specflow/docs/D05-frontend-architecture.md` and report key decisions, open questions, omitted
  sections, and the most natural next step.

---

## Guidance

- D05 must use the real stack vocabulary once the framework is known.
- “Use hooks for state” is not architecture; name the actual boundary and tool for each state type.
- If an existing codebase already establishes a pattern, prefer documenting that pattern over
  inventing a replacement without calling out the divergence.
