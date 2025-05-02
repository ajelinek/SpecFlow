---
description: Apply when creating or modifying dynamic interactive UI components with client-side reactivity or state
globs: 
alwaysApply: false
---
---
description: Apply when creating or modifying dynamic interactive UI components with client-side reactivity or state
---
# File Structure
PascalCase/
├── index.tsx      # Main component
├── types.ts       # Type definitions
└── styles.module.css

# Component Definition
```tsx
// types.ts
export interface ExampleProps {
  title: string
  onAction: () => void
}

// index.tsx
import { type Component } from 'solid-js'
import styles from './styles.module.css'
import type { ExampleProps } from './types'

export default function Example: Component<ExampleProps> = (props) => {
  return <div class={styles.container}>{props.title}</div>
}
```

# State and Signals
- Use CreateMemo for computed values
- Use computed values for simpler JSX
```tsx
function Example() {
  const [count, setCount] = createSignal(0)
  const doubleCount = createMemo(() => count() * 2)
  
  createEffect(() => {
    // Side effects here
    console.log("Count changed:", count())
  })

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count()} Double: {doubleCount()}
    </button>
  )
}
```

# Control Flow
- Use solid `Switch` and `Show` for conditionaln display
- Use solid `For` for loops
```tsx
function Example() {
  const [items, setItems] = createSignal([1, 2, 3])
  const [visible, setVisible] = createSignal(true)

  return (
    <>
      <Show when={visible()} fallback={<div>Hidden</div>}>
        <For each={items()}>
          {(item) => <div>{item}</div>}
        </For>
      </Show>
      
      <Switch>
        <Match when={condition1()}>
          <Component1 />
        </Match>
        <Match when={condition2()}>
          <Component2 />
        </Match>
      </Switch>
    </>
  )
}
```

# Error Handling
```tsx
function Example() {
  return (
    <ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
      <SuspenseContent />
    </ErrorBoundary>
  )
}
```

# Required Patterns
- Use foundation components for base UI
- Proper cleanup in onCleanup
- Type all props and events
- Use CSS modules for styling
- Follow A11y best practices
- Focus on presentation, delegate to store services for business logic

# Form Validaton
- Input validation will done by the store and service layer
- Errors will come from the service operations
- Errors are displayed by the Alert componetn within the foundaton. 

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

