---
description: Apply when implementing component or application state, data fetching, or hook-based reactivity
ruleType: state-management
globs: 
alwaysApply: false
---
## When to Use
Apply these rules when implementing component or application state, data fetching, or hook-based reactivity.

# State Management
- React context for global state (by domain)
- useState/useReducer for local component state
- Query/mutate state via store services

## State Usage
```tsx
// Local Component State
function Example() {
  const [count, setCount] = useState(0)
  const doubleCount = useMemo(() => count * 2, [count])

  // Batch updates for multiple state changes
  const updateValues = () => {
    setCount(c => c + 1)
    // ...other state updates
  }
}
```

## Store Usage
- Use context/provider pattern for global state
- Use custom hooks for store access
- No direct Firebase calls from components
- Handle all status states (isProcessing, isError, isDone)
- Proper unsubscribe and cleanup in useEffect
- Batch updates using React batching
- Error propagation and loading indicators
- Offline handling

## State Requirements
- useState/useReducer for simple local state
- useMemo for derived values
- No nested state updates
- Cleanup subscriptions in useEffect
- Batch updates when modifying multiple state values

## Store Integration
- Components must not directly access Firebase
- Use store/services for all data operations
- Handle all status states (isProcessing, isError, isDone)
- Follow store service response pattern:

```tsx
// Component using store service
import { useAuthService } from '@/store'

function AuthDisplay() {
  const userStore = useAuthService()

  return (
    <div>
      <Alert error={userStore.error} />
      {userStore.status.isDone && !userStore.status.isError ? (
        <UserDisplay user={userStore.data} />
      ) : (
        <LoadingState isProcessing={userStore.status.isProcessing} />
      )}
    </div>
  )
}
```

## Anti-Patterns
- No direct store access to Firebase
- No nested state updates
- No untyped state
- No direct DOM manipulation

