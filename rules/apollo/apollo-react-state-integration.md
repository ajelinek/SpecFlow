---
description: React service pattern alignment when using Apollo Client for GraphQL data
ruleType: react-state
globs:
alwaysApply: false
---

## When to Use

Apply when building React services that consume GraphQL via Apollo Client.

> Precedence: When Apollo Client is used, these rules replace Section 1 (Global State) of `rules/react/react-state-management.md`. Keep using that file's local UI state rules.

# Service-First Pattern

- Use the service/store boundaries defined in `rules/apollo/apollo-store-architecture.md`.
- Services own Apollo usage; components never import Apollo hooks.
- Services expose hooks: `useEntity`, `useMutateEntity` with consistent shapes.
- Prefer Apollo Client cache for GraphQL data; use SWR only for pure UI state if needed.

# Query Hooks

- Implement with Apollo `useQuery` internally; map to `{ data, error, isLoading, refetch }`.
- Co-locate minimal transformation; keep domain logic in services, not components.
- Use cache-first defaults; override per use case.

# Mutation Hooks

- Implement with Apollo `useMutation` internally; map to `{ trigger, error, isMutating, reset }`.
- Update Apollo cache in `update` or via `refetchQueries` within the service.

# Local/UI State

- Use React state or existing UI-state rules for non-GraphQL state.
- Avoid reactive vars for remote-derived data; keep server truth authoritative.

# Prohibited

- No `gql` or Apollo hooks in component files.
- No repository calls from components.
