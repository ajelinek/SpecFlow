<!-- INSTRUCTION BLOCK — remove before committing
- Fill every section with project-specific decisions. No placeholder labels.
- Sections marked "(if applicable)" must be removed entirely if they do not apply.
- Reference D01–D04 for prior decisions; do not repeat their content here.
- Keep each bullet to one line where possible. Reviewers scan this document — brevity is a feature.
-->

# D05 — Frontend Architecture

_Frontend structure, state model, and development conventions for [Project Name]. Technology choices and API contracts are in D02 and D04; this document does not repeat them._

---

## 1. Core Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | React 18 | SPA; server components disabled |
| Language | TypeScript 5.x | Strict mode |
| Build | Vite | Chunked production build |
| Component state | `useState` / `useReducer` | Ephemeral, local only |
| URL state | TanStack Router search params | Shareable filters and pagination |
| Global state | Zustand | Session, workspace, notifications |
| Server state | TanStack Query | REST; stale-while-revalidate |
| Styling | CSS Modules + design tokens | No inline styles |
| Forms | React Hook Form | Service-layer validation |
| Testing | Playwright (E2E), Vitest (unit) | — |

---

## 2. Directory Structure

```text
src/
├── components/
│   ├── foundation/      # Primitives — no business logic (Button, Input, Icon)
│   ├── layout/          # Page structure (Header, Sidebar, PageShell)
│   └── features/        # Domain composites — data via service hooks only
├── pages/               # One per route; composes features
├── services/            # Service hooks — sole access point for state and API
├── store/               # Zustand stores — never imported by components directly
├── api/                 # Fetch client and type-safe request helpers
├── styles/
│   └── tokens/          # CSS custom properties for color, spacing, type
└── types/               # Shared TypeScript interfaces
```

_Add framework-specific directories here (e.g., `/hooks`, `/routes`) if applicable._

---

## 3. Component Architecture

| Level | Location | Owns | Must not |
|---|---|---|---|
| Foundation | `components/foundation/` | Rendering, a11y, local UI state | Business logic, API calls |
| Layout | `components/layout/` | Page structure, nav state | Domain data fetching |
| Feature | `components/features/` | Domain composition via service hooks | Direct store or API access |
| Page | `pages/` | Route composition, top-level routing state | Business logic |

**Conventions:** `PascalCase/index.tsx` + `styles.module.css` per component. Props interface exported as `[Name]Props`. WCAG 2.1 AA required on all interactive elements.

---

## 4. State Management

**Component state** — `useState` for ephemeral UI (toggle, hover, draft input). Not shared. Not persisted.

**URL state** — shareable state (active filters, pagination, selected tab) lives in query params via TanStack Router. Rule: if a user refreshing the page should land in the same state, it belongs in the URL.

**Global state** — Zustand stores in `src/store/`. Holds: current user session, active workspace, notification queue. Components never import stores directly; all access is through service hooks in `src/services/`.

**Server state** — TanStack Query via service hooks. The hook owns the query key, fetcher, and cache config. Components receive `{ data, error, isPending }`. Mutations go through service hooks; cache is invalidated explicitly after write.

**Access rule:** components import from `src/services/` only — never from `src/store/` or `src/api/` directly.

---

## 5. API Integration

_Per D04, the backend exposes a [REST / GraphQL] API._

- `src/api/client.ts` — fetch wrapper; attaches JWT, maps HTTP errors to typed objects
- Auth token lifecycle: read from session store on init; refreshed on 401; cleared on logout
- Error shape surfaced to components: `{ code, message }` — normalized by the service hook

---

## 6. Styling

- CSS Modules — component-scoped; no global class collisions
- Design tokens (`src/styles/tokens/`) — all color, spacing, and type values; no hardcoded values in CSS
- Theming: `data-theme` attribute on `<html>` swaps token values; component CSS unchanged
- A11y: WCAG 2.1 AA. Contrast and focus verified at design review, not post-implementation

---

## 7. Testing

| Level | Tool | Scope |
|---|---|---|
| E2E | Playwright | Critical journeys: [list 2–3 key flows] |
| Integration | Playwright component | Feature components with mocked service hooks |
| Unit | Vitest | Service hook logic, store reducers, utilities |

Not covered by automation: foundation component appearance (design review); third-party internals.

---

## 8. Real-Time Features _(if applicable — remove if not)_

- Protocol: WebSocket via [library]; managed in `src/services/useRealtimeService.ts`
- Lifecycle: connect on auth, disconnect on logout
- Events: dispatched to Zustand stores; components react via service hooks
- Reconnection: exponential backoff, max 5 retries, then surface disconnection banner

---

## 9. Internationalization _(if applicable — remove if not)_

- Library: [e.g., react-i18next]
- Translations: `public/locales/[lang]/[namespace].json`
- Locale detection: browser preference → URL prefix → `en`
- Formatting: `Intl` APIs only; no hardcoded locale assumptions in components

---

## 10. SEO _(if applicable — remove if not)_

- Rendering: [SSR / static generation / client-side with prerender]
- Meta tags: [library]
- Structured data: JSON-LD for [content types]
- Sitemap: generated at build from [source]

---

## Open Questions

- [ ] _State any unresolved decisions here rather than leaving sections incomplete._
