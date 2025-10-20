## React State Management with SWR

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

### 1.3. SWR Configuration

- Configure SWR in service initialization:
  - Set global options in `<SWRConfig>` at app root only
  - Define default fetchers in service modules
  - Use consistent key patterns across services

### 1.4. Key Benefits

- Clear separation of concerns (components ↔ services ↔ data)
- Consistent interface between components and state
- Encapsulated caching and revalidation
- Simpler testing of components and services
- Full SWR features through service layer

## 2. Required Practices

- **DO** use service functions for all global state (`useEntityData`, `useMutateEntity`)
- **DO** contain all SWR usage within service functions only
- **DO** access repositories only via service functions
- **DO** use consistent return patterns across service functions
- **DO** implement error handling in service functions

## 3. Prohibited Practices

- **DON'T** import SWR directly in components
- **DON'T** access repositories directly from components
- **DON'T** duplicate service-managed data elsewhere
