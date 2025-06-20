---
description: Apply when implementing component or application state, data fetching, or signal-based reactivity
globs: *
alwaysApply: false
---

# State Management

- Solid.js Stores for global state (by domain)
- Signals for local component state
- Query/mutate state via store services
- Use solid `createStore` when storing objects

## CreateStore usage

- Use createStore for complex data objects and within services

### Solid.js CreateStore Update Rules

- Use path notation (`setState('path', 'to', 'property', newValue)`) for simple updates
- Use `produce` from solid-js/store for complex multi-property updates
- Always use the setter function returned by createStore
- For reactive objects in arrays, include the index in the path
- Convert input values to the proper type (use + for numbers)
- Avoid direct mutation of store properties
- Handle signal values when used in store paths: `setState('data', 'items', signalValue(), 'property', newValue)`

## State Requirements

- Use signals for simple local state
- CreateMemo for derived values
- No nested signal updates
- Cleanup subscriptions in onCleanup
- Batch updates when modifying multiple signals

## Store Integration

- Components must not directly access the repository or store
- Use store/services for all data operations
- Handle all status states (isProcessing, isError, isDone)
- Follow store service response pattern:

```tsx
// Component using store service
import { authService } from '@/store'

function AuthDisplay() {
  const userStore = authService.useActiveUser()
  return (
    <div>
      <Alert error={userOperation.error} />
      <Show
        when={userStore.status.isDone && !userStore.status.isError}
        fallback={<LoadingState isProcessing={userStore.status.isProcessing} />}>
        <UserDisplay user={userStore.data} />
      </Show>
    </div>
  )
}
```

## Anti-Patterns

- No nested signal updates
- No untyped state
- No direct DOM manipulation

```

```
