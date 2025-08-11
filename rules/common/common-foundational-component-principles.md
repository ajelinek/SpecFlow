---
description: 'Use when creating or modifying foundational UI components used across the app: consistency, accessibility, API patterns, and testing semantics.'
ruleType: foundation-component
applyTo:
  - 'src/**/components/foundation/**/*.{tsx,astro,ts}'
alwaysApply: false
---

Foundational components are the building blocks of the application, used across the application. They should be consistent and reusable and are stored in components/foundation.

# Foundational Components

- Leverage foundation components as building blocks
- Ensure consistency, composability, and use of foundational building blocks
- Keep components small and single purpose
- Single module per component
- Full accessibility compliance
- Mobile-first design
- Type-safe interfaces
- Consistent API patterns

# Example Foundational Components

- Alert (notifications, errors)
- Button (actions)
- Dialog (modals, popups)
- Dropdown (selection menus)
- Icon (wrapped SVG components)
- Input (form fields)
- List (data display)
- Loading (spinners, skeletons)
- Table (data grids)

## Component Properties

- Must extend BaseProps interface
- Consistent variant patterns
- CSS module classes

# HTML Semantic Guidelines for Testing

- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`, etc.) instead of generic `<div>` with classes
- Add ARIA attributes to sections: `<section aria-label="hero">` instead of `<section class="hero">`
- Ensure all interactive elements have accessible names
- Follow all A11y practices

# Accessibility Requirements

- WCAG 2.1 AA compliance
- ARIA roles and states
- Keyboard navigation
- Focus management
- Screen reader support
- Visible focus indicators and logical tab order
- Color contrast compliance
- Motion reduction support
- Error announcements
- Label associations
- Description text
- Input validation
