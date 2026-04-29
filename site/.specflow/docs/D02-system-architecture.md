# D02 — System Architecture

## 1. Architectural Style & Patterns

- **Primary Architecture**: Static content-driven site built with Astro. This fits a small-maintenance documentation project where most content is authored at build time.
- **Core Patterns**: File-based routing, content collections, reusable layouts/components, markdown and MDX rendering.
- **Communication**: No runtime service communication in v1; all content is loaded from the repository at build time.
- **Infrastructure Highlights**: GitHub Pages deployment via GitHub Actions; repository-relative base path; sitemap generation for static output.
- **Key Drivers**: Fast onboarding, low operational overhead, maintainability inside the existing SpecFlow repository.

---

## 2. Major System Components

1. **Astro page layer**: Owns route generation for the homepage, docs pages, and the 404 page.
2. **Content collection layer**: Validates page metadata and provides typed access to markdown and MDX docs content.
3. **Layout and component layer**: Provides the shared docs shell, top navigation, sidebar, callouts, prompt blocks, and workflow cards.
4. **Styles layer**: Defines the design tokens, responsive layout rules, and dark mode behavior.
5. **Deployment pipeline**: Builds the site and publishes the static output to GitHub Pages.

---

## 3. Technology Stack

- **Frontend**: Astro with markdown and MDX support — chosen because the site is content-heavy, static, and benefits from Astro's low-JS default.
- **Backend**: None in v1 — the site is prerendered and served as static files.
- **Database**: None — content lives in repository files and is queried through Astro content collections.
- **API Style**: None — there is no application API for the public site in this version.
- **Infrastructure**: GitHub Pages plus GitHub Actions — chosen for low operational cost and a simple deployment story.
- **Development Tooling**: TypeScript, `astro check`, Vitest, and pnpm scripts — chosen to keep validation lightweight but real.

---

## 4. Testing Strategy

- **Philosophy**: Validate the content and shell through build-time checks first, then add lightweight automated tests for navigation helpers and typed behavior.
- **Unit Testing**: Vitest covers route and navigation utility logic.
- **Integration Testing**: `astro check` validates types, content schemas, and Astro compilation behavior.
- **End-to-End Testing**: Not included in v1; the static build and manual review cover the initial release.
- **Additional**: `astro build` confirms production output and GitHub Pages compatibility.

---

## 5. Open Questions

- [ ] Whether a later release should add automated browser-level regression tests.
- [ ] Whether future search or analytics requirements justify a runtime layer.
