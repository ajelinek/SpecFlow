# SpecFlow Docs Site — Implementation Design

---

## 2. Implementation Approach

The site should use a custom Astro docs shell instead of Starlight so the homepage and product story stay tightly aligned to SpecFlow's minimal-path framing. The selected approach uses content collections for typed docs metadata, a single catch-all docs route for content rendering, and a small set of reusable components for callouts, prompts, workflow cards, and navigation.

A theme-based implementation was rejected because it would add extra conventions and customization surface without materially improving the core product story. A raw file-import approach was also rejected because content collections provide better schema validation and cleaner navigation metadata.

---

## 3. Frontend Change Summary

| Module/File Path | Item Name | Status | Description |
|:----------------|:----------|:-------|:------------|
| `package.json` | scripts and dependencies | `New` | Defines the Astro project, core integrations, and validation scripts for local development and CI. |
| `astro.config.mjs` | Astro config | `New` | Configures static-site behavior, GitHub Pages base path, and core integrations. |
| `src/content.config.ts` | docs collection | `New` | Defines the typed content collection used by all docs pages. |
| `src/layouts/BaseLayout.astro` | `BaseLayout` | `New` | Provides the global page shell, metadata, and site header/footer. |
| `src/layouts/DocsLayout.astro` | `DocsLayout` | `New` | Provides the docs-specific shell with sidebar, breadcrumbs, TOC, and prev/next navigation. |
| `src/pages/index.astro` | homepage | `New` | Renders the docs-first homepage and the minimal path framing. |
| `src/pages/[...slug].astro` | docs route | `New` | Renders collection-backed markdown and MDX docs pages at static routes. |
| `src/pages/404.astro` | 404 page | `New` | Provides a fallback route with a safe path back into the docs. |
| `src/components/` | shared docs components | `New` | Hosts reusable UI pieces for navigation, callouts, prompts, workflow cards, badges, and theme behavior. |
| `src/lib/docs.ts` | navigation helpers | `New` | Centralizes sorting, breadcrumbs, prev/next logic, base-path handling, and sidebar generation. |
| `src/lib/specflow.ts` | site data | `New` | Stores shared SpecFlow metadata, core workflow data, and skill catalog entries. |
| `src/content/docs/` | docs content | `New` | Hosts the actual published pages for getting started, workflows, examples, concepts, skills, and FAQ. |
| `README.md` | repository readme | `Updated` | Preserves product context while adding docs-site run, content, and deployment guidance. |
| `.github/workflows/deploy.yml` | deploy workflow | `New` | Publishes the built site to GitHub Pages from GitHub Actions. |

## 4. Backend Change Summary

No backend production files are required for this feature because the site is fully static in v1.

---

## 5. Frontend Implementation Details

### 🟢 NEW: `src/content.config.ts`

Defines the `docs` collection schema so every published page has the metadata needed for routing, ordering, and navigation. This keeps the navigation model data-driven instead of hardcoded across multiple route files.

### 🟢 NEW: `src/layouts/BaseLayout.astro`

Provides the global HTML structure, metadata, header, footer, and theme bootstrap script. This avoids duplicating SEO and chrome concerns across the homepage, docs pages, and 404 page.

### 🟢 NEW: `src/layouts/DocsLayout.astro`

Wraps rendered markdown and MDX pages in the shared docs shell. It coordinates sidebar navigation, breadcrumbs, page headings, TOC rendering, and previous/next traversal without pushing that logic into individual content files.

### 🟢 NEW: `src/pages/index.astro`

Renders the homepage as a docs-first product overview with a strong minimal-path emphasis. The page uses reusable workflow cards and section links so the homepage stays consistent with the rest of the site.

### 🟢 NEW: `src/pages/[...slug].astro`

Loads docs entries from the content collection, renders them statically, and passes navigation context into the docs layout. This single route keeps the content system simple while supporting nested docs paths.

### 🟢 NEW: `src/lib/docs.ts`

Owns navigation derivation and repository-base-path logic in one place. This keeps ordering, breadcrumbs, active-state detection, and previous/next behavior consistent across layouts and tests.

### 🟢 NEW: `src/lib/specflow.ts`

Stores the shared product metadata, core workflow sequence, and skill catalog data used across the homepage and catalog view. This avoids repeating core product constants in multiple components and content files.

### 🟢 NEW: `src/components/`

Provides the reusable view primitives needed by the content and layouts: callouts, prompt blocks, workflow cards, tier badges, navigation pieces, footer, top nav, and theme helpers. The component set stays intentionally small so the content model remains the primary organizing structure.

### 🟢 NEW: `src/content/docs/`

Holds the public documentation content in markdown and MDX form. The structure mirrors the planned information architecture so the route layout, sidebar grouping, and content ownership stay easy to understand.

### 🟡 UPDATED: `README.md`

Adds site-specific run, content organization, and deployment guidance while preserving the existing SpecFlow overview as the source of product context. This keeps the repository useful for both end users and site maintainers.

### 🟢 NEW: `.github/workflows/deploy.yml`

Automates the static deployment to GitHub Pages using the official Astro GitHub Action path. This keeps the deployment story aligned with the public hosting guidance documented in the repo.

---

## 6. Backend Implementation Details

No backend implementation details are required for this feature.
