---
description: 'React-specific rules for components, including state, hooks, and control flow.'
ruleType: component
globs:
alwaysApply: false
---

These guidelines supplement the `common-component-guidelines.md`. Please review the common guidelines first.

# Component Definition

```tsx
// index.tsx
import s from './styles.module.css'
import type { ExampleProps } from './types'

export function Example(props: ExampleProps) {
  return <div className={s.container}>{props.title}</div>
}
```

# State and Hooks

- Use React's `useState` for component-level state.
- Use `useMemo` for expensive, memoized calculations.
- Use `useEffect` for handling side effects, with proper dependency arrays and cleanup functions.

# Control Flow

- Use standard JavaScript operators for conditional rendering (`&&`, ternary operators outside of complex JSX).
- Use the `.map()` method for rendering lists of elements.

# Error Handling

- Use React Error Boundaries to catch and handle errors in the component tree.

# Anti-Patterns to Avoid

- **Nested State Updates**: Avoid complex or nested state updates that are hard to read. Use reducers for complex state logic.

# Performance Requirements

- **Suspense**: Use `<Suspense>` for declarative loading UI when components or data are being fetched asynchronously.
