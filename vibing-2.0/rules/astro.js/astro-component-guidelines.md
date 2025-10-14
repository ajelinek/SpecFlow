---
description: 'Use when authoring Astro components and islands: pages/layouts, hydration directives, SEO, scoped styles, and Astro APIs.'
ruleType: astro-component
applyTo:
  - 'src/**/pages/**/*.astro'
  - 'src/**/layouts/**/*.astro'
  - 'src/**/components/**/*.astro'
alwaysApply: false
---

# Astro Component Guidelines

- Use `.astro` for pages and layouts
- Minimize client JS via partial hydration
- Use `client:*` for interactive islands
- Leverage built-in SEO components
- Scope styles in the component

## Hydration Directives

- `client:load`: hydrate on load
- `client:idle`: hydrate when idle
- `client:visible`: hydrate on visibility
- `client:media`: hydrate by media query
- `client:only`: skip SSR

## Astro API Usage

- `Astro.props`: component props
- `Astro.params`: dynamic routing
- `Astro.request`: server-side operations
- `getStaticPaths()`: static site generation
