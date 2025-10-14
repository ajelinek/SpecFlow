---
description: 'Use when authoring or modifying React components (.tsx): props, state, hooks, control flow, error boundaries, and performance. Applies to component/page implementation and refactors.'
ruleType: component
applyTo:
  - 'src/**/components/**/*.tsx'
  - 'src/**/pages/**/*.tsx'
alwaysApply: false
---

Supplements `common-component-guidelines.md`; review that first.

# Component Definition

```tsx
// index.tsx
import s from './styles.module.css'
import type { ExampleProps } from './types'

export function Example({ title }: ExampleProps) {
  return <div className={s.container}>{title}</div>
}
```

# State and Hooks

- Use React's `useState` for component-level state.
- Use `useMemo` for expensive, memoized calculations.
- Use `useEffect` for handling side effects, with proper dependency arrays and cleanup functions.

# Control Flow

- Use standard JavaScript operators for conditional rendering (`&&`, ternary operators outside of complex JSX).
- Use the `.map()` method for rendering lists of elements.

# Props

- Destructure props in the function signature; avoid accessing via `props.` inside the component body.

# Error Handling

- Use React Error Boundaries to catch and handle errors in the component tree.

# Anti-Patterns to Avoid

- **Nested State Updates**: Avoid complex or nested state updates that are hard to read. Use reducers for complex state logic.

# Performance Requirements

- Keep components focused and composable.
