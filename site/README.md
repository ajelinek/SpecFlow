# Site

This directory holds the SpecFlow documentation website so the repository root can stay focused on the user-facing workflow, skills, and agents.

## Docs App

The Astro docs app lives directly in `site/`.

## Run Locally

1. `cd site`
2. `pnpm install`
3. `pnpm dev`

Validation commands:

- `pnpm test`
- `pnpm lint`
- `pnpm build`

## Content Organization

- Public docs content lives in `site/src/content/docs/`
- Shared layouts live in `site/src/layouts/`
- Reusable UI components live in `site/src/components/`
- Navigation and shared metadata helpers live in `site/src/lib/`
- Site-wide styling lives in `site/src/styles/global.css`
- Static assets live in `site/public/`
- Internal SpecFlow design artifacts for the site live under `.specflow/`

## Add A New Page

1. Create a new `.md` or `.mdx` file in `site/src/content/docs/`
2. Add frontmatter:

   - `title`
   - `description`
   - `section`
   - `order`

3. If the page belongs in an existing nested section, place it in the matching directory so the route and breadcrumbs stay consistent
4. Run `pnpm lint` and `pnpm build` from `site`

## Deployment

The site is deployed with GitHub Pages through `.github/workflows/deploy.yml`, which builds from `site`.

- `site` is set to `https://ajelinek.github.io`
- `base` is set to `/SpecFlow`
- The GitHub Pages source should be set to **GitHub Actions**

If you later move the site to a custom domain, update `site/astro.config.mjs` and remove the repository `base` path.
