---
description: Apply when implementing component or application state, data fetching, or signal-based reactivity
globs: 
alwaysApply: false
---
---
description: Apply when implementing component or application state, data fetching, or signal-based reactivity
---
# State Management
- Solid.js Stores for global state (by domain).
- Signals for local component state.
- Query/mutate state via store services.
- Use solid `createStore` when storying objects

## Signal Usage
```tsx
// Local Component State
function Example() {
  // Single value signals
  const [count, setCount] = createSignal(0)
  
  // Computed values always use createMemo
  const doubleCount = createMemo(() => count() * 2)
  
  // Batch updates for multiple signals
  const updateValues = () => {
    batch(() => {
      setCount(c => c + 1)
      setOtherValue(v => v + 1)
    })
  }
}
```

## CreateStore useage
- Use createStore for complex data objects and within services

### Solid.js CreateStore Updates
// Updating nested values - path syntax
<input 
  type="number"
  value={state.data.cardiacCycles[cycleIndex].waves[waveIndex].amplitude}
  onInput={(e) => 
    setState('data', 'cardiacCycles', cycleIndex, 'waves', waveIndex, 'amplitude', +e.target.value)
  }
/>

// Can also use produce for more complex updates
<button onClick={() => 
  setState(produce((s) => {
    const wave = s.data.cardiacCycles[cycleIndex].waves[waveIndex];
    wave.amplitude += 10;
    wave.duration *= 1.5;
  }))
}/>
```

### Solid.js CreateStore Update Rules
- Use path notation (`setState('path', 'to', 'property', newValue)`) for simple updates
- Use `produce` from solid-js/store for complex multi-property updates
- Always use the setter function returned by createStore
- For reactive objects in arrays, include the index in the path
- Convert input values to the proper type (use + for numbers)
- Avoid direct mutation of store properties
- Handle signal values when used in store paths: `setState('data', 'items', signalValue(), 'property', newValue)`

## State Requirements

### Component State
- Use signals for simple local state
- CreateMemo for derived values
- No nested signal updates
- Cleanup subscriptions in onCleanup
- Batch updates when modifying multiple signals

### Store Integration
- Components must not directly access Firebase
- Use `store\services` for all data operations
- Handle all status states (isProcessing, isError, isDone)
- Follow store service response pattern:

```tsx
// Component using store service
import { authService } from '@/store'

function AuthDisplay() {
  const userStore = authService.useActiveUser()
  
  // Direct store access pattern
  return (
    <div>
      <Alert error={authOperation.error} />

      <Show 
        when={userStore.status.isDone && !userStore.status.isError} 
        fallback={<LoadingState isProcessing={userStore.status.isProcessing} />}
      >
        <UserDisplay user={userStore.data} />
      </Show>
    <div>
  )
}
```

## anti-patterns

### avoid: direct store access
```tsx
// ❌ bad
function badcomponent() {
  const data = firestore.collection('items').get()
}

// ✅ good
function goodcomponent() {
  const { data } = useitemstore()
}
```

### avoid: nested signal updates
```tsx
// ❌ bad
const [outer, setouter] = createsignal(0)
createeffect(() => {
  setouter(prev => {
    const [inner, setinner] = createsignal(prev)
    return inner()
  })
})

// ✅ good
const [state, setstate] = createsignal({ count: 0, value: 0 })
createeffect(() => {
  setstate(prev => ({ ...prev, count: prev.count + 1 }))
})
```