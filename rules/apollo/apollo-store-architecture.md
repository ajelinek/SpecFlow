---
description: 'Use when structuring GraphQL-backed repositories and services with Apollo Client: repo/service boundaries, graphql documents layout, caching, and testing.'
ruleType: store
applyTo:
  - 'src/**/store/**/*.{ts,tsx}'
  - 'src/**/store/graphql/**/*.{ts,tsx}'
alwaysApply: false
---

## When to Use

Apply when implementing or modifying GraphQL-backed repositories and services with Apollo Client.

# Store Layout Mapping

/store
├── repository/ # Apollo-powered GraphQL operations per domain entity
├── service/ # React-facing hooks; hides Apollo details
├── graphql/ # All GraphQL documents
│ └── queries/ # Query documents (optionally mutations/, fragments/)
├── utilities/ # Shared helpers (error mapping, type guards)
└── config.ts # Apollo client factory wiring if needed

# Repository Rules (Apollo)

- One file per domain entity. Group operations by entity.
- Use generated types (graphql-codegen) for operations and models.
- Export pure async functions using `client.query` / `client.mutate`.
- No UI mapping, no React usage, no side effects.
- Accept typed variables; return typed data shaped by response envelopes.
- Centralize GraphQL documents under `store/graphql/` (place queries in `store/graphql/queries/`) and import into repositories.
- Error mapping at repository boundary; throw typed domain errors.

# Service Rules (React)

- Expose hooks to components (e.g., `useUserById`, `useUpdateUser`).
- Implement with Apollo React hooks or imperative calls, but never leak Apollo types.
- Normalize return shape: `{ data, error, isLoading, refetch }` for queries; `{ trigger, error, isMutating, reset }` for mutations.
- Map repository/domain errors to UI-safe errors.
- Co-locate minimal view-model mapping here; keep repository pure.

# Component Usage

- Components must use service hooks only.
- Components must not import `gql`, Apollo documents, or Apollo hooks directly.

# Caching & Keys

- Define `typePolicies` in Apollo cache for entities and pagination.
- Align service hook keys and naming with operations; do not duplicate cache layers.
- Invalidate/update cache in service mutation handlers using Apollo cache APIs.

# Testing

- Repository: unit test with mocked Apollo Client (or MSW).
- Service: test hooks with Jest/RTL using `MockedProvider` or MSW.
