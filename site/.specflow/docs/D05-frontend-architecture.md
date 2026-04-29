# D05 — Frontend Architecture

_Frontend structure, state model, and development conventions for the SpecFlow documentation site. D02 covers the overall stack; this document focuses on the Astro implementation shape._

---

## 1. Core Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Astro 6 | Static docs shell and page generation |
| Language | TypeScript | Strict config for content and utility code |
| Build | Astro build with Vite under the hood | Static output for GitHub Pages |
| Component state | None by default | Most components render from props only |
| URL state | File-based routes and heading anchors | No client router layer |
| Global state | None | Site-wide state is avoided in v1 |
| Server state | Build-time content queries | No runtime fetching |
| Styling | Plain CSS | Global tokens and component classes, minimal dependency surface |
| Forms | None in v1 | No user-submitted forms |
| Testing | Vitest, `astro check` | Utility coverage and build validation |

---

## 2. Directory Structure

```text
src/
├── components/        # Reusable docs UI primitives and navigation pieces
├── content/docs/      # Markdown and MDX docs content
├── layouts/           # Base site shell and docs page shell
├── lib/               # Navigation, metadata, and catalog helpers
├── pages/             # Home page, docs route, and 404 page
└── styles/            # Global theme tokens and layout styling
```

---

## 3. Component Architecture

| Level | Location | Owns | Must not |
|---|---|---|---|
| Layout | `src/layouts/` | Site chrome, SEO, docs shell composition | Page-specific content logic |
| Navigation | `src/components/` | Top nav, sidebar, breadcrumbs, page TOC | Content querying |
| Content UI | `src/components/` | Callouts, prompt blocks, workflow cards, badges | Route orchestration |
| Route page | `src/pages/` | Content loading and page rendering | Visual duplication of shared shell |

**Conventions:** Keep components prop-driven, keep route logic in `src/pages/`, and keep content metadata logic in `src/lib/`.

---

## 4. State Management

**Component state** — Minimal. The only intentional client state in v1 is the theme toggle.

**URL / navigation state** — Route path and heading anchors determine navigation context. If the state should be linkable or bookmarkable, it belongs in the route or hash.

**Global / application state** — None in v1. The site avoids introducing a store until a real need exists.

**Server / remote state** — None in v1. All docs content is loaded at build time through `getCollection()` and `render()`.

**Access rule:** Pages may query collections directly. Components remain presentation-focused and should not fetch or query content on their own.

---

## 5. API Integration

Per D04, there is no runtime application API in this version.

- Content comes from repository files in `src/content/docs/`
- Navigation metadata comes from content frontmatter and helper functions in `src/lib/`
- Deployment relies on GitHub Actions rather than application API calls

---

## 6. Styling

- Plain CSS in `src/styles/global.css`
- Root-level design tokens via CSS custom properties
- Dark mode handled with `prefers-color-scheme` plus a small theme toggle script
- Prose styling, navigation, cards, and callouts all share the same token system
- Accessibility baseline: WCAG 2.1 AA

---

## 7. Testing

| Level | Tool | Scope |
|---|---|---|
| Utility | Vitest | Navigation helpers, route normalization, ordering logic |
| Build/type | `astro check` | Astro, TypeScript, and content schema validation |
| Production output | `astro build` | Static build correctness and deployability |

Not covered by automation in v1: browser-level interaction regression testing and visual snapshot testing.

---

## 8. SEO

- Rendering: static prerendering for all public routes
- Meta tags: generated from layout props and content frontmatter
- Sitemap: generated through `@astrojs/sitemap`
- Canonical URLs: derived from `site` and route path in the base layout

---

## Open Questions

- [ ] Whether future search should remain static or introduce an external index.
- [ ] Whether later contributor docs need a separate layout treatment.
