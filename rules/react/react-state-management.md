---
description: React state management using SWR for global state (server and UI).
ruleType: react-state
globs:
alwaysApply: false
---

## React State Management Rules

- Use these rules when SWR is your global data layer.
- If using Apollo Client for GraphQL, follow `apollo-react-state-integration.md` for server/global state. Continue to use Section 2 (Local Component State) here for pure UI state.

> Precedence: Apollo rules supersede Section 1 (Global State) when Apollo Client is in use.

## 1. Global State with Service-SWR Pattern

- **Use Services with SWR**: Manage ALL global state through service modules that use SWR internally. Components never use SWR directly.

### 1.1. Core Architecture

- **Component ↔ Service Functions ↔ SWR ↔ Repository** pattern:
  - Components call service functions/hooks only (`useUserById`, `useMutateUser`)
  - Service functions use SWR internally to manage state
  - SWR in service functions calls repository methods
  - Service functions return clean results to components

### 1.2. Service Implementation Requirements

- **Unique SWR Keys**: Each service defines unique keys for data:

  - Server data: Use API endpoints (`/api/users/123`)
  - UI state: Use descriptive keys (`ui/modals/login`)

- **Encapsulated SWR Logic**:

  - Service functions contain all SWR hooks and configurations
  - Data access functions (e.g., `useUserById`) encapsulate SWR data fetching
  - Mutation functions (e.g., `useMutateUser`) encapsulate SWR cache updates
  - Services return clean data without exposing SWR internals

- **State Updates**:
  - Services expose dedicated mutation hooks using `useSWRMutation` (`useUpdateX`, `useDeleteX`)
  - UI state updates: Service hooks return `{ trigger, isMutating, error }` for components
  - Server updates:
    1. Mutation functions call repository methods
    2. Same functions handle cache updates with `mutate`

### 1.3. Service-SWR Example

```typescript
// services/userService.ts
import useSWR, { mutate } from 'swr'
import { userRepository } from '@/repositories/userRepository'

// Private utility functions used within the service
const getUserSWRKey = (userId: string | null) => (userId ? `/api/users/${userId}` : null)
const fetchUserById = (userId: string) => userRepository.getUserById(userId)

// Data access hook - encapsulates SWR usage
export function useUserById(userId: string | null) {
  // SWR is only used within service, never exposed to components
  return useSWR(getUserSWRKey(userId), () => (userId ? fetchUserById(userId) : null))
  // Components receive: { data, error, isLoading, mutate, isValidating }
}

// Update user mutation hook
export function useUpdateUser() {
  return useSWRMutation(
    // Key pattern for specific user updates
    (userId: string) => getUserSWRKey(userId),
    // Mutation function
    (key, { arg: userData }: { arg: any }) => userRepository.updateUser(key.split('/').pop(), userData)
  )
  // Components receive: { trigger, error, isMutating, reset }
}

// Delete user mutation hook
export function useDeleteUser() {
  return useSWRMutation(
    // Key pattern for user deletion
    (userId: string) => getUserSWRKey(userId),
    // Mutation function
    async key => {
      const userId = key.split('/').pop()
      await userRepository.deleteUser(userId)
      // Also invalidate the users list
      mutate('/api/users')
    }
  )
}
```

### 1.4. SWR Configuration

- Configure SWR in service initialization:
  - Set global options in `<SWRConfig>` at app root only
  - Define default fetchers in service modules
  - Use consistent key patterns across services

### 1.5. Key Benefits

- Clear separation of concerns (components ↔ services ↔ data)
- Consistent interface between components and state
- Encapsulated caching and revalidation
- Simpler testing of components and services
- Full SWR features through service layer

## 2. Local Component State

- **Use `useState`** for component-local ephemeral state
- **Use `useMemo`** for derived values when performance requires it
- **Flatten state structures** instead of deeply nesting objects
- **Return cleanup functions** in `useEffect` for subscriptions/timers

## 3. Required Practices

- **DO** use service functions for all global state (`useEntityData`, `useMutateEntity`)
- **DO** contain all SWR usage within service functions only
- **DO** access repositories only via service functions
- **DO** use consistent return patterns across service functions
- **DO** use `useState` for component-local state
- **DO** implement error handling in service functions

## 4. Prohibited Practices

- **DON'T** import SWR directly in components
- **DON'T** access repositories directly from components
- **DON'T** duplicate service-managed data elsewhere
- **DON'T** manipulate DOM directly
