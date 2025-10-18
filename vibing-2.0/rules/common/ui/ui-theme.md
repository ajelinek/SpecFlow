# UI Theming Guidelines

## Theme Architecture

- Use `data-theme` attribute on `<html>` element for theme switching
- Define theme-specific CSS custom properties in theme files
- Store theme preference in localStorage for persistence
- Reference @rules/styling-guidelines.md for design token system

## Theme Implementation

```css
/* themes/light.css */
:root {
  --color-background: var(--color-white);
  --color-text: var(--color-gray-900);
}

/* themes/dark.css */
[data-theme='dark'] {
  --color-background: var(--color-gray-900);
  --color-text: var(--color-white);
}
```

## Theme Management

```typescript
function toggleTheme() {
  const html = document.documentElement
  const currentTheme = html.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
}
```

## Best Practices

- Initialize theme on page load
- Provide theme toggle in UI
- Use semantic color tokens, not direct color values
- Ensure proper contrast ratios in both themes
