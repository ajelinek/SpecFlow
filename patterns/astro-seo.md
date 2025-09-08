You are implementing end-to-end SEO for an Astro 5 app. Deliver production-grade edits with minimal JS, no comments, and current best practices.

Goals:

- Technical SEO: canonicalization, metadata, social previews, structured data, indexing control, sitemaps/robots, hreflang (if multi-lingual), 404/redirects, accessibility.
- Performance SEO: images, fonts, CSS/JS delivery, preload/preconnect, Core Web Vitals safeguards.
- Content SEO: headings, internal links, breadcrumbs, FAQs/HowTo where relevant.
- IndexNow: submit updated URLs on deploy and optionally on content change events.

Constraints:

- Astro 5.x, `astro:assets` for images (no legacy image integration).
- Use the `site` config for absolute URLs.
- Use absolute OG/Twitter images based on `Astro.site`.
- Keep runtime JS minimal (Astro islands only where necessary).
- Use built-in Node fetch (Node 18+)—no external fetch libs.

Implement:

1. Base config

- In `astro.config.mjs`:
  - Set `site` to the public origin.
  - Enable `@astrojs/sitemap` with default options.
  - Keep `exclude` for non-public files.
- Ensure `public/robots.txt` includes:
  - `User-agent: *` and `Allow: /`
  - `Sitemap: https://<site>/sitemap.xml`

2. Global SEO layout

- Create a layout used by all pages that renders:
  - <title>, meta description (unique per page).
  - Canonical `<link rel="canonical" href={Astro.url.href} />`.
  - Open Graph + Twitter Card (title, description, absolute image, url).
  - Meta robots tag per page needs (index/noindex, follow/nofollow).
  - `html lang` set on document root.
- Provide page-level `title`, `description`, `ogImage`, and `type` props; default to site-wide fallbacks.

3. Structured data (JSON-LD)

- Create reusable components to emit JSON-LD for:
  - WebSite and WebPage defaults (name, url, image).
  - Article for MDX/learn pages (headline, description, image, datePublished, dateModified, author, publisher).
  - BreadcrumbList where the page has a hierarchy.
  - FAQPage for pages with FAQs.
- Ensure all JSON-LD uses absolute URLs via `new URL(path, Astro.site)`.
- Only include markup relevant to the page.

4. Sitemaps and canonicalization

- Rely on `@astrojs/sitemap` to generate `sitemap.xml`.
- Avoid duplicate content: one canonical per content page.
- If multi-lingual, add `hreflang` links and localized alternates in sitemap.

5. Images and media

- Use `astro:assets` for build-time optimized images:
  - Generate responsive sizes and WebP/AVIF where appropriate.
  - Set descriptive `alt` always.
  - Lazy-load non-critical images.
- For social images, ensure absolute URL and correct aspect (1200x630).

6. Performance/crawling

- Fonts: self-host WOFF2, `font-display: swap`, preload critical fonts with correct `as="font"` and `crossorigin`.
- Preload only truly critical assets (fonts, hero image, above-the-fold CSS).
- Preconnect to critical third-parties (e.g., analytics) if any.
- Defer non-critical JS; hydrate islands sparingly (`client:visible|idle`).
- Eliminate layout shifts: explicit width/height for images; stable font metrics.
- Include a custom 404 page.
- If staging, ensure `noindex` at the environment level.

7. Content hygiene

- Semantic headings (one H1), concise titles (<60 chars), meta descriptions (~150–160 chars).
- Clean, descriptive slugs; kebab-case; avoid dates unless necessary.
- Internal linking: related content, previous/next learn pages, breadcrumbs.
- Avoid thin/duplicate content; consolidate where needed.

8. IndexNow

- Host key file at site root: `/<INDEXNOW_KEY>.txt` with the key as content.
- On deploy, submit all public HTML pages found in `dist` to `https://api.indexnow.org/indexnow` using POST with batches of up to 10k URLs:
  - body: `{ host, key, urlList }`
- Optionally, add an incremental flow:
  - In CI, compute changed URLs (e.g., from git diff of `dist/**/*.html`) and submit only changed paths.
  - Provide a tiny serverless endpoint/webhook to accept a page URL and forward to IndexNow on content changes.

9. CI/CD integration

- Add a script for full-site submission post-deploy, and wire it into the deploy job.
- Add a separate script for incremental submission (takes a list of URLs).
- Ensure failures don’t block deploy; log errors with response body/status.

10. Validation

- Validate pages with Google’s Rich Results Test and Schema.org validator.
- Check core pages with PageSpeed Insights/Lighthouse.
- Inspect `sitemap.xml` and `robots.txt` in production.
- Spot-check `og:image` and meta with social debuggers.

Deliverables:

- Updated `astro.config.mjs` with `site` and `@astrojs/sitemap`.
- Global SEO layout used by all pages.
- JSON-LD components (WebSite, WebPage, Article, BreadcrumbList, FAQPage).
- `public/robots.txt` with sitemap line.
- IndexNow key file in `public`.
- Two Node scripts:
  1. full submit: scans `dist` for `.html`, maps to URLs, batches POST to IndexNow.
  2. incremental submit: accepts a list of URLs and submits.
- CI wiring to call full submit after deploy, and optional incremental submit on content changes.

Code references to implement:

astro.config.mjs

- ensure:
  site: 'https://<site>'
  integrations: [sitemap()]

Node script (full submit, Node 18+):

- scan dist for .html
- map to URLs, convert `index.html` to directory URLs
- POST JSON to https://api.indexnow.org/indexnow with { host, key, urlList } in 10k batches

Key file:

- public/<INDEXNOW_KEY>.txt with file content equal to the key
