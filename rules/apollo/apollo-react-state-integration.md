---
description: 'Use when implementing React service patterns with Apollo Client for GraphQL: service-first hooks, query/mutation mapping, cache updates, and precedence with SWR rules.'
ruleType: react-state
applyTo:
  - 'src/**/services/**/*.{ts,tsx}'
  - 'src/**/store/**/*.{ts,tsx}'
alwaysApply: false
---

> Project standard: Apollo Client is the only data layer for server data. Do not use SWR. For UI state, prefer URL-first with optional local storage fallback (see `react-state-management.mdc`).

# Service-First Pattern

- Services own Apollo usage; components never import Apollo hooks.
- Services expose hooks: `useEntity`, `useMutateEntity` with consistent shapes.
- Use Apollo Client SDK with generated types for GraphQL data.

# Query Hooks

- Implement with Apollo `useQuery` and generated documents internally; map to `{ data, error, isLoading, refetch }`.
- Co-locate minimal transformation; keep domain logic in services, not components.
- Use cache-first defaults; override per use case.

# Mutation Hooks

- Implement with Apollo `useMutation` and generated documents internally; map to `{ trigger, error, isMutating, reset }`.
- Update Apollo cache in `update` or via `refetchQueries` within the service.

# Local/UI State

- Prefer URL-first state; use local storage only when URL encoding is not appropriate.
- Do not mirror or cache server-derived data in local/UI state; Apollo cache is the source of truth.

# Prohibited

- No `gql` or Apollo hooks in component files.
- No direct GraphQL document imports from components.
