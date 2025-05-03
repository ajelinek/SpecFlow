---
description: Apply for all component creation, accessibility, and dynamic UI logic
ruleType: component
globs:
alwaysApply: false
---
## When to Use
Apply these rules for all component creation, accessibility, and dynamic UI logic in React projects.

# General Component Guidelines
- Leverage foundation components as building blocks
- Foundational components include (input, icons, alerts, etc)
- Ensure consistency, composability, and use of foundational building blocks
- Keep components small and single purpose

# Accessibility and Semantic HTML Guidelines
- Follow all A11y practices
- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`, etc.) instead of generic `<div>` with classes
- Add ARIA attributes to sections: `<section aria-label="hero">` instead of `<section class="hero">`
- Ensure all interactive elements have accessible names

# Component Rules

## File Structure
PascalCase/
├── index.tsx      # Main component
└── styles.module.css  # Styles for the component

## Component Definition
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
  return <div className={styles.container}>{props.title}</div>
}
```

## State and Hooks
- Use React useState/useReducer for state
- useMemo for computed values
- useEffect for side effects and cleanup
- Batch updates using React batching

```tsx
function Example() {
  const [count, setCount] = useState(0)
  const doubleCount = useMemo(() => count * 2, [count])

  useEffect(() => {
    // Side effects here
    console.log('Count changed:', count)
  }, [count])

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count} Double: {doubleCount}
    </button>
  )
}
```

## Control Flow
- Use standard React conditional rendering (`&&`, ternary outside JSX, etc)
- Use .map for lists

## Error Handling
- Use React error boundaries for error handling
- Display errors using Alert foundation component

## Required Patterns
- Use foundation components for base UI
- Type all props and events
- Use CSS modules for styling
- Follow A11y best practices
- Focus on presentation, delegate to store/services for business logic

## Form Validation
- Input validation is done by the store/service layer
- Errors come from service operations
- Errors are displayed by the Alert component within the foundation

## Anti-Patterns to Avoid
- No prop drilling beyond one level
- No inline styles
- No direct DOM manipulation
- No default exports except from index.tsx
- No nested state updates
- No untyped components or props
- No ternary statements within JSX
- No multiple return statements within a component

## Performance Requirements
- Lazy load large components
- Use Suspense for async boundaries
- Implement proper cleanup
