---
name: 105-frontend-architecture
description: >
  Use `105` to define the frontend architecture: UI structure, component boundaries, state, and
  development patterns. Trigger it for prompts like "105", "frontend architecture", "component
  structure", or "state management" when frontend patterns need to be specified before UI design.
---

# 105 - Frontend Architecture

Turn D02 and D04 into concrete frontend structure: framework conventions, directory layout,
component boundaries, state rules, API integration, styling, and test strategy. Reference D01-D04;
add only frontend-specific decisions. Once the framework is known, use its real vocabulary.

Specificity is the bar. "Use React hooks for state" is not architecture. "Local ephemeral state uses
`useState`; shared UI state uses Zustand stores in `src/store/`; server state is SWR with a
30-second revalidation window; components never call API endpoints directly — all API access goes
through service hooks in `src/services/`" is.

**Output path**: `.specflow/docs/D05-frontend-architecture.md`

---

## Required Inputs

1. **Frontend framework** — React, Astro, SolidJS, Vue, etc.
2. **Deployment model** — static, SSR, hybrid, CDN-hosted, etc.
3. **API integration** — REST, GraphQL, Firebase, or mixed
4. **State management approach** — a specific tool or pattern for each category:
   - **Component state** — local ephemeral UI state; the primitive in scope and off-limits patterns
   - **URL / navigation state** — shareable/bookmarkable state; what belongs in the URL, what
     doesn't, and what manages it
   - **Global / application state** — state shared across routes or unrelated components; the
     library, what qualifies, and what is kept out
   - **Server / remote state** — fetching, caching, revalidation; the library, caching approach,
     and where query/mutation definitions live
5. **Real-time requirements** — WebSockets, SSE, polling, or none
6. **Audience and reach** — public vs internal, SEO needs, single-language vs i18n

Optional: design system or component library, accessibility target, performance goals, mobile-first
requirements, frontend auth constraints.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve all six inputs with `gap-check` (context: D01, D02, D04,
  repo), especially each of the four state categories. Do not assume default libraries or patterns.

- [ ] **Step 2: Load existing context.** If D05 exists, treat it as a draft to update. Read D01, D02,
  D04, and other directly relevant docs. For existing frontend code, use `@explore` to identify the
  top-level `src/` structure, component organization, state setup, styling approach, and shared
  utilities and types. Prefer documenting an established pattern over inventing a replacement; call
  out any divergence from explicit project requirements.

- [ ] **Step 3: Decide which optional sections apply** — real-time, i18n, SEO, mobile/PWA,
  frontend-owned security patterns, third-party integrations. Every section must earn its place:
  omit irrelevant ones entirely, and when in doubt leave it out with a one-line note under open
  questions if the decision is pending.

- [ ] **Step 4: Draft the document.** Use `./templates/T05 - Frontend Architecture.md`:
  - **Core stack** — framework, build tooling, key libraries and each one's role
  - **Directory structure** — annotated tree showing where new code belongs
  - **Component architecture** — component levels, ownership boundaries, naming/file conventions
  - **State management** — for all four categories: the tool/pattern, what belongs, what is
    excluded, and how the boundary is enforced
  - **API integration** — client/service layer, auth attachment, error handling, caching
  - **Styling approach** — CSS methodology, token usage, theming, accessibility baseline
  - **Testing strategy** — what is tested at each level and with which tools
  - **Optional sections** — only those approved in Step 3

- [ ] **Step 5: Quality check.** Every decision traces to D01, D02, D04, codebase evidence, or
  explicit user input; all four state categories name specific tools or patterns; API integration
  matches D04; no placeholder or duplicate sections; scannable, concrete framework terms.

- [ ] **Step 6: Write and summarize.** Write the file and report key decisions, open questions,
  omitted sections, and the most natural next step.
