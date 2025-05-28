---
description: General styling guidelines and best practices for all projects
ruleType: styling
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when implementing styles in any project.

# Styling Principles

## General Guidelines
- Use CSS custom properties (variables) for theming and consistency
- Follow a consistent naming convention (BEM recommended)
- Keep styles modular and scoped to components
- Avoid overly specific selectors
- Use relative units (rem, em) for better accessibility
- Implement responsive design with mobile-first approach

## CSS Architecture
- Organize styles following the ITCSS methodology:
  1. Settings: Global variables, config switches
  2. Tools: Default mixins and functions
  3. Generic: Ground-zero styles (Normalize.css, resets, box-sizing)
  4. Elements: Unclassed HTML elements (type selectors)
  5. Objects: Class-based selectors which define undecorated design patterns
  6. Components: Designed components, chunks of UI
  7. Utilities: Helpers and overrides

## Performance
- Minimize CSS size through minification and purging
- Use `will-change` sparingly
- Avoid `@import` in favor of link tags or build-time imports
- Use `content-visibility` for performance optimization
- Implement critical CSS for above-the-fold content

## Accessibility
- Ensure sufficient color contrast (WCAG AA minimum)
- Support keyboard navigation
- Use semantic HTML elements
- Implement proper focus states
- Test with screen readers

## Naming Conventions
- Use kebab-case for class names
- Follow BEM (Block__Element--Modifier) methodology
- Use meaningful names that describe purpose, not appearance
- Prefix utility classes with `u-`
- Prefix JavaScript hooks with `js-`

## CSS-in-JS (When Applicable)
- Co-locate styles with components
- Use theme variables for consistent theming
- Extract repeated styles into shared utilities
- Consider performance implications of dynamic styles

## Preprocessor Features (When Using SASS/SCSS)
- Use nesting judiciously (max 3 levels deep)
- Leverage mixins for repeated patterns
- Use functions for calculations
- Organize partials by component/feature
- Use `@extend` with caution

## Animation Guidelines
- Prefer CSS animations over JavaScript for performance
- Use `transform` and `opacity` for smooth animations
- Implement `prefers-reduced-motion` for accessibility
- Keep animations subtle and purposeful
- Test performance impact on lower-end devices
