---
description: Apply when creating Astro components or island architecture implementations
ruleType: astro-component
globs:
alwaysApply: false
---

## When to Use
Apply these rules when creating Astro components or working with Astro's island architecture.

# Astro Component Guidelines
- Use `.astro` files for page templates and layout components
- Minimize client-side JavaScript with partial hydration
- Use the `client:*` directives appropriately for interactive components
- Leverage Astro's built-in components for SEO
- Keep component-specific styles scoped within the component file

## Component Structure
```astro
---
// Component Script (runs at build time)
import { SomeComponent } from '@/components';
const { title = 'Default Title' } = Astro.props;
---

<!-- Component Template (HTML with expressions) -->
<div class="astro-component">
  <h1>{title}</h1>
  <SomeComponent client:load />
</div>

<style>
  /* Scoped CSS */
  .astro-component {
    padding: 1rem;
  }
</style>
```

## Hydration Directives
- `client:load` - Hydrate component on page load
- `client:idle` - Hydrate after page load when browser is idle
- `client:visible` - Hydrate when component is visible
- `client:media` - Hydrate based on media query
- `client:only` - Skip server-rendering

## Astro API Usage
- Use `Astro.props` for component props
- Use `Astro.params` for dynamic routing
- Leverage `Astro.request` for server-side operations
- Use `getStaticPaths()` for static site generation
