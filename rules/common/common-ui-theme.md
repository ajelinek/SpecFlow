---
description: Guidelines for UI theming, explaining how to leverage the project's theming system.
ruleType: styles
---

# UI Theming Guidelines

## Core Concept

Theming in this project is achieved by:

1.  **CSS Custom Properties (Variables):** Themes define a set of CSS custom properties for colors, and potentially other style aspects (e.g., spacing, typography if theme-dependent).
2.  **`data-theme` Attribute:** A `data-theme` attribute on the `<html>` element (e.g., `data-theme="light"` or `data-theme="dark"`) is used to switch between different theme definitions.

## Implementation Details

The specific CSS definitions for theme variables (e.g., for light and dark modes) and the JavaScript utilities required for toggling themes and persisting user preferences are detailed in the main **[Common Styling Guidelines](common-styling-guidelines.md#theming)**.

Please refer to that document for:

- Examples of CSS for `:root` (default theme) and `[data-theme='dark']` (alternative themes).
- JavaScript functions for `toggleTheme()` and `initTheme()`.
- Recommended file organization for theme files (e.g., `styles/themes/light.css`, `styles/themes/dark.css`).

By centralizing the detailed implementation in `common-styling-guidelines.md`, we maintain a single source of truth for our styling and theming rules, ensuring consistency across the application.

## Theming

### Theme Implementation

```css
/* themes/light.css */
:root {
  --color-background: var(--color-white);
  --color-text: var(--color-gray-900);
  /* ... */
}

/* themes/dark.css */
[data-theme='dark'] {
  --color-background: var(--color-gray-900);
  --color-text: var(--color-white);
  /* ... */
}
```

### Theme Toggle

```typescript
// Toggle between light/dark theme
function toggleTheme() {
  const html = document.documentElement
  const currentTheme = html.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
}
```
