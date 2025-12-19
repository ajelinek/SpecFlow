# Styling Architecture Guidelines

## Design Token System

### Two-Layer Token Architecture (with Optional Component Tokens)

1. **Global Tokens**

   - Base values (colors, spacing, typography, etc.)
   - Defined in `:root` or theme-specific selectors
   - Example: `--color-brand-teal: #008080;`

2. **Semantic Tokens**

   - Contextual values that reference global tokens
   - Define usage (e.g., `--color-text-primary`, `--spacing-md`)
   - Example: `--color-text-primary: var(--color-neutral-grey900);`

3. **Component Tokens (Optional)**
   - **Only create component tokens if values are reused across multiple component CSS files**
   - If a value is only used in one component, use semantic/global tokens directly in that component's CSS
   - Component tokens reference semantic tokens, not global tokens
   - Example (only if reused): `--card-padding: var(--spacing-md);` used by both Card and Modal components
   - **Do not create component tokens for single-component use** - put values directly in component CSS files

### When to Use Component Tokens

**Create component tokens only when:**
- A value is used in 2+ component CSS files
- The value represents a shared pattern (e.g., card padding, modal overlay opacity)
- The value might need to be themed or overridden globally

**Use semantic/global tokens directly when:**
- A value is only used in one component
- The value is component-specific (e.g., button min-height, input box height)
- The value doesn't need to be shared or overridden

**Example - Component CSS (Button):**
```css
.button {
  /* Use semantic tokens directly - no component token needed */
  min-height: 44px;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}
```

**Example - Component Token (only if reused):**
```css
/* tokens/_card.css - only if used by Card AND Modal components */
:root {
  --card-padding: var(--spacing-md);
  --card-border-radius: var(--radius-lg);
}
```

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
- **Use semantic/global tokens directly** - don't create component-specific tokens unless values are reused across multiple components
- Component-specific values (e.g., `min-height: 44px`, `padding: var(--spacing-sm) var(--spacing-md)`) belong directly in component CSS files

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
- Use semantic/global tokens directly in component CSS files
- Only create component tokens when values are reused across multiple component CSS files

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
- NO component tokens for single-component use - use semantic/global tokens directly in component CSS files
- NO component token files unless tokens are reused across multiple component CSS files

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
