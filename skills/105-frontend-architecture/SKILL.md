---
name: 105-frontend-architecture
description: >
  Use this skill when you need to document the frontend architecture for an application: how the
  UI is structured, how components are organized, how state is managed, and what framework
  conventions and development patterns are in play. Triggers on phrases like "frontend
  architecture", "105", "component structure", "state management", "UI architecture", "how the
  frontend works", or when the project needs a concrete specification of frontend patterns before
  implementation begins. Run this after 104-backend-architecture, and before 106-ui-design or
  108-ui-page-design.
---

# 105 — Frontend Architecture

Produce the frontend architecture document for a project. This document specifies how the
client-side of the application is structured: the framework and tooling choices, how components
are organized and composed, how state is managed across local, global, and server boundaries, how
the frontend integrates with the backend API, and what development conventions enforce consistency
across the codebase. It translates the decisions in the system architecture and backend architecture
into concrete frontend patterns that engineers can implement directly.

This document does not repeat what is in D01, D02, D03, or D04. It references those documents for
business requirements, technology choices, data shapes, and API contracts, then adds the
component-level design that is specific to the frontend.

Output path: `.specflow/docs/D05-frontend-architecture.md`

---

## Your Role

Approach this as a frontend architect: your job is to make structural decisions concrete enough
that engineers writing their first component have no ambiguity about where code belongs, how data
flows, or what conventions to follow. Where the system architecture says "React SPA", this document
specifies the directory layout, component hierarchy, state access rules, and styling approach.
Decisions should be specific enough that two engineers asked to build the same feature would
produce structurally consistent code.

---

## Required Inputs

Before writing anything, confirm you have answers to all of the following. If any are missing,
ask for them now — do not invent conventions or assume defaults.

1. **Frontend framework** — React, Astro, SolidJS, Vue, or something else? (Check D02 if it
   exists; confirm or correct.) The framework choice determines which state primitives, libraries,
   and patterns apply in every section below.

2. **Deployment model** — static hosting, CDN, server-side rendering (SSR), or hybrid?

3. **API integration** — REST with SWR/fetch, GraphQL with Apollo, Firebase, or a mix? (Check D04
   if it exists.)

4. **State management approach** — for each of the four state categories below, confirm which
   tool or pattern the project uses. These decisions are framework-dependent and are the primary
   content of D05; do not assume defaults.

   - **Component state** — how ephemeral, local UI state is held within a single component.
     React: `useState` / `useReducer`. SolidJS: `createSignal`. Astro: component-local variables
     or framework island state. Confirm which patterns are in scope and whether any are off-limits.

   - **URL / navigation state** — how shareable or bookmarkable state is encoded in the URL.
     Which parts of application state live in query params, path segments, or hash? What library
     manages URL state (e.g., React Router search params, TanStack Router, SolidJS Router)? What
     is the rule for when state belongs in the URL versus in a store?

   - **Global / application state** — how state shared across routes or unrelated components is
     managed. React: Zustand, Jotai, Context, Redux Toolkit, or none? SolidJS: stores
     (`createStore`), signals promoted to module scope, or a library? Astro: nano-stores or
     framework-specific islands? Confirm the library chosen, what goes into global state, and what
     is explicitly kept out.

   - **Server / remote state** — how data fetched from the backend is cached, revalidated, and
     made available to components. React: TanStack Query (React Query), SWR, Apollo Client, or
     direct fetch in `useEffect`? SolidJS: `createResource`, TanStack Query for Solid, or Apollo?
     Confirm the library, the caching strategy (stale-while-revalidate, cache-first, etc.), and
     where the query/mutation definitions live in the codebase.

5. **Real-time requirements** — WebSockets, Server-Sent Events, polling, or none?

6. **Audience and reach** — single language or multi-language (i18n)? Public-facing with SEO
   requirements, or internal tool?

Optional but useful: existing design system or component library, accessibility compliance level
required, performance targets (e.g., Core Web Vitals thresholds), mobile-first or responsive
requirements, authentication patterns the frontend must implement.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all six required inputs are present, paying particular
      attention to input 4 (state management). Each of the four state categories — component,
      URL, global, and server — must have a confirmed answer before drafting. If the framework has
      not been chosen, stop and ask: every other decision in this document is framework-dependent.
      Do not invent library choices or assume defaults.

- [ ] **Step 2: Load existing context.** Check whether `.specflow/docs/D05-frontend-architecture.md`
      already exists. If it does, treat it as a prior draft and update rather than replace. Read:
  - `.specflow/docs/D01-project-overview.md` — business requirements and intended user workflows
  - `.specflow/docs/D02-system-architecture.md` — technology choices, deployment topology,
    integration points
  - `.specflow/docs/D04-backend-architecture.md` — API contracts, authentication approach, and
    data shapes the frontend will consume

  Reference these documents; do not re-describe their content in D05.

- [ ] **Step 3: Explore if needed.** If the project has an existing frontend codebase, delegate
      discovery to the `@explore` agent. Ask it to locate and return: the top-level directory
      structure under `src/`, existing component organization patterns, state management setup
      (stores, hooks, context), styling approach (CSS modules, Tailwind, styled-components), and
      any shared utilities or type definitions. Use what is found to document existing patterns
      accurately — do not design a new architecture on top of an existing one without flagging the
      divergence.

- [ ] **Step 4: Determine section scope.** Before drafting, decide which optional sections apply
      to this project using the inputs confirmed in Step 1:

  | Section | Include when |
  |---|---|
  | Real-time features | WebSockets, live updates, push notifications confirmed in input 5 |
  | Internationalization | Multi-language audience confirmed in input 6 |
  | SEO | Public-facing site with SEO requirements confirmed in input 6 |
  | Mobile / PWA | Mobile-first requirements or offline capability needed |
  | Security patterns | Sensitive data, compliance obligations, or auth the frontend owns |
  | Third-party integrations | Payment systems, analytics, CRM, or other external services |

  Remove any section that does not apply. Do not include placeholder sections.

- [ ] **Step 5: Draft the document.** Use the template at `./templates/T05 - Frontend Architecture.md`.
      Populate every section with specific decisions:

  **Core stack**: Framework and version; language (TypeScript assumed unless stated otherwise);
  build tooling; key libraries with their roles stated explicitly (e.g., "SWR — server state
  caching and revalidation"); any deviations from standard framework conventions and the reason
  for each.

  **Directory structure**: Annotated directory tree showing where components, pages, state,
  styles, types, and utilities live. Framework-specific directories included. Enough detail that
  a new engineer knows where to create a new feature file.

  **Component architecture**: The component hierarchy from foundation elements up to page
  components; what each level owns and is not allowed to do; how data flows from page down to
  leaf components; naming and file conventions enforced across the codebase.

  **State management**: Document all four state categories confirmed in Required Input 4.
  Each category must name the specific tool or pattern in use, what belongs in it, what is
  explicitly excluded, and the access rules that enforce the boundary.

  - *Component state* — the primitive used (e.g., `useState`, `createSignal`), when it is the
    right choice, and when state has grown too large for a single component and should be promoted.
  - *URL / navigation state* — which data lives in the URL (query params, path segments), the
    library managing it, rules for when URL state is preferred over store state, and how URL
    changes trigger data fetches or UI transitions.
  - *Global / application state* — the library (e.g., Zustand, Jotai, SolidJS `createStore`,
    nano-stores), what qualifies as global state, the store structure, and the rule prohibiting
    components from importing stores directly (if that pattern is in use).
  - *Server / remote state* — the library (e.g., TanStack Query, SWR, Apollo Client, SolidJS
    `createResource`), caching strategy, stale-while-revalidate or cache-first behavior, where
    query and mutation definitions live, and how loading and error states are surfaced.

  **API integration**: How the frontend calls the backend (fetch wrapper, SDK, Apollo client,
  etc.); how authentication tokens are attached to requests; how errors are surfaced from API
  calls to the UI; caching and revalidation strategy.

  **Styling approach**: CSS methodology (CSS Modules, utility classes, CSS-in-JS); design token
  usage; theming if applicable; accessibility baseline (WCAG level).

  **Testing strategy**: What is tested at each level (unit, integration, E2E); tools; what is
  explicitly out of scope for automated testing and why.

  **Optional sections**: Include only the sections determined in Step 4. Each must contain
  specific patterns, not placeholder text.

- [ ] **Step 6: Quality check.** Before writing the file, verify:
  - Does every decision trace back to a requirement in D01, a constraint in D02, or an API
    contract in D04? If not, add the reason or move it to Open Questions.
  - Are all four state categories documented with a specific library or pattern — not a generic
    description?
  - Does the API integration section match the backend API style documented in D04?
  - Are optional sections removed if they do not apply? No placeholder text, no empty sections.
  - Is there any content that duplicates D01, D02, D03, or D04 without adding frontend-specific
    detail? Remove it.
  - Can each section be understood by scanning bullet points and table rows, without reading
    prose paragraphs? If a bullet runs longer than two lines, tighten it. The document is a
    reference, not an explanation.

- [ ] **Step 7: Write the output.** Write the completed document to
      `.specflow/docs/D05-frontend-architecture.md`. Create the `.specflow/docs/` directory if it
      does not exist.

- [ ] **Step 8: Summarize.** Report what was written, list the key decisions documented, call
      out any open questions or sections that were intentionally omitted, and suggest running
      `106-ui-design`, `107-ui-experience`, or `109-data-access-patterns` as the next step
      depending on what the project needs.

---

## Additional Guidance

**On not repeating prior documents**: D05 references D01–D04; it does not summarize them.
If the API style was documented in D04, write "per D04, the frontend uses Apollo Client for
GraphQL" — do not re-explain the API design. If a technology choice is genuinely unresolved,
name it as an explicit open question rather than omitting the section or making an assumption.

**On optional sections**: Every section in D05 must earn its place. A real-time section for an
app with no real-time requirements, or an i18n section for a single-language internal tool, adds
noise and makes the document harder to use. When in doubt, leave the section out and add a
one-line note under "open questions" if the decision is still pending.

**On specificity**: "Use React hooks for state" is not architecture. "Local ephemeral state uses
`useState`; shared UI state uses Zustand stores in `src/store/`; server state is managed by SWR
with a 30-second revalidation window; components never call API endpoints directly — all API
access goes through service hooks in `src/services/`" is architecture.
