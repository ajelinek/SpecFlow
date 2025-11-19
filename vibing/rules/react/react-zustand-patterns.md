## Zustand State Management Patterns

Supplements @vibing/rules/common/ui/ui-data-store-architecture.md - review service-repository architecture patterns first.

## 1. Store Configuration

### 1.1. Single Store Pattern

- **Single store instance**: Create one store using `create<Store>()()` with devtools middleware
- **No actions in store**: Store contains only state shape, no action methods
- **Initial state object**: Define `initialState` separately, spread into store creation
- **State updates**: All mutations use `useStore.setState()` directly, never define actions as store methods
- **Store location**: Store creation lives in `store/config.ts`

```typescript
// store/config.ts
const initialState: Store = {
  user: undefined,
  org: { ... },
  catalog: undefined,
}

export const useStore = create<Store>()(
  devtools(() => ({ ...initialState }))
)

export function resetState() {
  useStore.setState({ ...initialState })
}
```

## 2. Service Layer (Zustand-Specific)

### 2.1. Service Hook Patterns

- **Query hooks**: Use `useState` + `useEffect` for data fetching with loading/error states
- **Mutation hooks**: Use `useState` + callback functions for mutations that update state
- **Subscription hooks**: Use `useEffect` to set up subscriptions with cleanup
- **Selector hooks**: Create hooks that return selected state for reuse
- **Direct setState**: Service hooks call `useStore.setState()` directly after repository operations

```typescript
// store/service/auth.ts
import { login as loginRepo, subscribeToAuthChanges } from '../repository/auth'
import { useStore } from '../config'
import { useState, useCallback, useEffect } from 'react'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const user = await loginRepo(email, password)
      useStore.setState({ user })
      return user
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { login, isLoading, error }
}

export function useAuthorizedUser() {
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(user => {
      useStore.setState({ user })
    })
    return () => unsubscribe()
  }, [])
}

// Selector hook
export function useCatalogItem(itemKey?: ItemKey) {
  if (!itemKey) return
  return useStore(state => state.catalog?.[itemKey.officeId]?.[itemKey.recordId])
}
```

### 2.2. State Updates in Services

- **After repository calls**: Call `useStore.setState()` after successful repository operations
- **In subscription callbacks**: Call `useStore.setState()` in subscription callbacks
- **Read current state**: Use `useStore.getState()` when reading current state for mutations

```typescript
// ✅ CORRECT: Service updates state after repository call
export function useLoadCatalog() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    loadCatalog() // Repository function
      .then(catalog => {
        useStore.setState({ catalog }) // Service updates store
      })
      .catch(err => setError(err instanceof Error ? err : new Error('Failed to load catalog')))
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading, error }
}

// ✅ CORRECT: Service reads state for mutation
export function useLinkItems() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const linkItems = useCallback(async (linkToItemId: ItemKey, linkedItemKeys: ItemKey[]) => {
    setIsLoading(true)
    setError(null)
    try {
      const currentItems =
        useStore.getState().catalog?.[linkToItemId.officeId]?.[linkToItemId.recordId].linkedItems || []
      await linkItemsRepo(linkToItemId, linkedItemKeys, currentItems) // Repository function
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to link items'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { linkItems, isLoading, error }
}
```

## 3. Reading State

### 3.1. Reactive Reads in Components

- **Use selector pattern**: Components use `useStore(state => state.path)` for reactive subscriptions
- **Narrow selectors**: Select only the state slice needed to minimize re-renders
- **Optional chaining**: Use optional chaining for nested state that may be undefined
- **Via service hooks**: Prefer service selector hooks over direct store access when available

```typescript
// ✅ CORRECT: Direct reactive read with selector
const user = useStore(state => state.user)
const offices = useStore(state => state.org?.offices)

// ✅ CORRECT: Via service selector hook
const item = useCatalogItem(itemKey)

// ❌ WRONG: Don't subscribe to entire store
const store = useStore() // Avoid this
```

### 3.2. Non-Reactive Reads

- **getState() for non-reactive**: Use `useStore.getState()` in callbacks, event handlers, or non-component code
- **In service hooks**: Service hooks use `getState()` when reading current state for mutations
- **In repository functions**: Repository functions should NOT use `getState()` (they don't manage state)

## 4. Utilities Layer

- **Pure functions**: Utility selectors are pure functions that read from store
- **getState() usage**: Use `useStore.getState()` for non-reactive reads
- **Transformations**: Utilities can transform or compute derived values
- **Reusable logic**: Extract common selector logic into utilities

```typescript
// store/utilities/selectors.ts
export function getClassificationNames(classId: string, subClassId: string) {
  const classifications = useStore.getState().org?.classifications ?? {}
  return {
    classificationName: classifications[classId]?.name,
    subClassificationName: classifications[classId]?.subClassifications?.[subClassId]?.name || '',
  }
}
```

## 5. Required Practices

- **DO** use a single store instance with no action methods in `store/config.ts`
- **DO** call `useStore.setState()` directly in service hooks after repository operations
- **DO** use `useStore(state => ...)` for reactive reads in components
- **DO** use `useStore.getState()` for non-reactive reads in service hooks
- **DO** define `initialState` separately and use it for reset
- **DO** keep service hooks as the only layer that calls `setState()`

## 6. Prohibited Practices

- **DO NOT** define actions as methods in the store definition
- **DO NOT** call `useStore.setState()` in repository functions
- **DO NOT** use hooks inside repository functions
- **DO NOT** subscribe to entire store in components (`useStore()` without selector)
- **DO NOT** mutate state directly in components (always go through service hooks)
- **DO NOT** mix reactive and non-reactive patterns incorrectly
- **DO NOT** hardcode state values in reset functions (use `initialState`)
- **DO NOT** access zustand store directly from repository layer
