# Styling Architecture Guidelines

## Design Token System

### Three-Layer Token Architecture

1. **Global Tokens**

   - Base values (colors, spacing, typography, etc.)
   - Defined in `:root` or theme-specific selectors
   - Example: `--color-primary-500: #0066cc;`

2. **Semantic Tokens**

   - Contextual values that reference global tokens
   - Define usage (e.g., `--color-text-primary`, `--spacing-md`)
   - Example: `--color-text-primary: var(--color-neutral-900);`

3. **Component Tokens**
   - Component-specific variables that reference semantic tokens
   - Scoped to components using CSS modules
   - Example: `--button-bg: var(--color-primary-500);`

## Implementation Strategy

### File Organization

```
styles/
  ├── tokens/
  │   ├── _colors.css     # Color tokens
  │   ├── _spacing.css    # Spacing tokens
  │   ├── _typography.css # Typography tokens
  │   └── _breakpoints.css # Breakpoint tokens (use sparingly)
  ├── animations/        # Reusable animations
  │   ├── _fade.css
  │   ├── _slide.css
  │   └── index.css      # Animation exports
  ├── global.css          # Global styles and resets
  └── themes/            # Theme definitions
      ├── light.css
      └── dark.css
```

## Styling Architecture

### Global vs Component Styles

**Global Styles (styles/global.css)**

- Design tokens and theme variables
- Base element styles (typography, forms, etc.)
- Animation definitions
- CSS resets and normalizations

**Component Styles (ComponentName.module.css)**

- Component-specific styles
- Exactly one class name per element
  - Optional: at most one modifier class (rare, purposeful)
- Use CSS Modules for scoping
- Leverage PostCSS features for maintainability
- Import styles using `import s from './styles.module.css';`

### Philosophy: Not a CSS framework

- We are not building a utility CSS framework.
- Class names live in the HTML and are semantic/stable; reuse is achieved in CSS via tokens and composition, not by stacking many utility classes.
- Do not design styles first and then hunt for places to apply them; define clear, minimal classes in markup and implement them in CSS.

### Reuse via Foundational Components

- Prefer reusable UI components for common styling concerns.
- Primarily provide shared styles in foundational components (e.g., Button, Text, Input, Card, Surface, Stack/Grid primitives).
- Consumers should use these components rather than duplicating classes or adding extra class names.
- Avoid ad-hoc style-only wrappers; if a pattern repeats, promote it into a foundational component.

## Best Practices

### Do:

- Use CSS custom properties for all design tokens
- Use exactly one class per element; add a single modifier only when truly necessary
- Prefer composition over inheritance
- Keep selectors flat (avoid nesting > 2 levels)
- Use logical properties for RTL support
- Leverage CSS Grid for two-dimensional layouts
- Use Flexbox for one-dimensional layouts
- Define animations in global scope, reference in components
- Use semantic HTML elements
- Implement proper focus states and accessibility

### No:

- NO `!important` (except for utility overrides)
- NO complex selectors (e.g., `.parent > div > span`)
- NO ID selectors for styling
- NO inline styles
- NO multiple classes on an element (except a single, approved modifier)
- NO utility-class stacking
- NO fixed units (px) for typography or spacing, use rem
- NO media queries for layout (prefer container queries)
- NO CSS preprocessors (use native CSS features)
- NO deep nesting (keep selectors flat)

## Responsive and Mobile

- Mobile-first styles; progressively enhance for larger viewports.
- Use container queries for layout; avoid viewport-coupled media queries when possible.
- Fluid typography and spacing with `clamp()` and tokens.
- Touch targets: minimum 44x44 logical pixels; provide adequate spacing.
- Prefer logical properties (inline/block) for RTL and responsive layouts.
- Responsive images: `srcset`, `sizes`, and modern formats (AVIF/WebP) where supported.
- Avoid hover-only interactions; provide touch-friendly alternatives.

## Animation Guidelines

1. **Define animations globally** in `styles/animations/`
2. **Use semantic names** (e.g., `fade-in`, `slide-up`)
3. **Keep animations subtle** and purposeful
4. **Respect reduced motion** preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
