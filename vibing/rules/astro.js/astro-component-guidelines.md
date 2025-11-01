---
description: 'Use when authoring Astro components and islands: pages/layouts, hydration directives, SEO, scoped styles, and Astro APIs.'
ruleType: astro-component
applyTo:
  - 'src/**/pages/**/index.astro'
  - 'src/**/layouts/**/index.astro'
  - 'src/**/components/**/index.astro'
alwaysApply: false
---

# Astro Component Guidelines

- Use `.astro` for pages and layouts
- Minimize client JS via partial hydration
- Use `client:*` for interactive islands
- Leverage built-in SEO components
- Use CSS Modules (`*.module.css`) for component-scoped styles
- Organize components and pages in folders with `index.astro`

## File Structure

```
ComponentName/
├── index.astro      # Main component file
└── styles.module.css # CSS Modules for component-scoped styles
```

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

## Styling

- Import CSS Modules: `import styles from './styles.module.css'`
- Use `class:list` or `className` directive with CSS Module classes
- Example: `<div class:list={[styles.container, styles.active]}>`
