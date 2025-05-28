---
description: Apply when creating or modifying dynamic interactive UI components with client-side reactivity or state
globs: *
alwaysApply: false
---
# File Structure
PascalCase/
├── index.tsx      # Main component
├── types.ts       # Type definitions
└── styles.module.css

# Component Definition
```tsx
// types.ts
type ExampleProps = {
  title: string
  onAction: () => void
}

// index.tsx
import styles from './styles.module.css'
import type { ExampleProps } from './types'

export function Example(props: ExampleProps) {
  return <div class={styles.container}>{props.title}</div>
}
```

# State and Signals
- Use createSignal for local state
- Use createMemo for computed values
- Use createEffect for side effects and cleanup
- Batch updates using batch()

```tsx
function Example() {
  const [count, setCount] = createSignal(0)
  const doubleCount = createMemo(() => count() * 2)

  createEffect(() => {
    // Side effects here
    console.log('Count changed:', count())
  })

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count()} Double: {doubleCount()}
    </button>
  )
}
```

# Control Flow
- Use solid `Switch` and `Show` for conditional display
- Use solid `For` for lists

# Error Handling
- Use ErrorBoundary for error handling
- Display errors using Alert foundation component

# Required Patterns
- Use foundation components for base UI
- Proper cleanup in onCleanup
- Type all props and events
- Use CSS modules for styling
- Follow A11y best practices
- Focus on presentation, delegate to store/services for business logic

# Form Validation
- Input validation is done by the store/service layer
- Errors come from service operations
- Errors are displayed by the Alert component within the foundation

# Anti-Patterns to Avoid
- No prop drilling beyond one level
- No inline styles
- No direct DOM manipulation
- No mixing of Solid and Astro reactivity
- No default exports except from index.tsx
- No nested signal updates
- No untyped components or props
- No ternary statements within JSX
- No multiple return statements within a component

# Performance Requirements
- Lazy load large components
- Routes are managed by Astro.js
- Use createResource for data fetching
- Implement proper cleanup
