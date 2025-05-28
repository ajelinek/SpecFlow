---
description: Apply when creating or modifying foundation-level UI components used across the application
ruleType: foundation-component
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when creating or modifying foundation-level UI components used across the application.

# Foundational Components
- Leverage foundation components as building blocks
- Foundational components include (input, icons, alerts, etc)
- Ensure consistency, composability, and use of foundational building blocks
- Keep components small and single purpose
- Single responsibility per component
- Composition over inheritance
- Full accessibility compliance
- Mobile-first design
- Performance optimized
- Type-safe interfaces
- Consistent API patterns

# HTML Semantic Guidelines for Testing
- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`, etc.) instead of generic `<div>` with classes
- Add ARIA attributes to sections: `<section aria-label="hero">` instead of `<section class="hero">`
- Ensure all interactive elements have accessible names
- Follow all A11y practices

# Accessibility Requirements
- ARIA roles and states
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance
- Motion reduction support
- Error announcements
- Label associations
- Description text
- Input validation
