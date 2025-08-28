---
description: 'Use when structuring GraphQL-backed repositories and services with Apollo Client: repo/service boundaries, graphql documents layout, caching, and testing.'
ruleType: store
applyTo:
  - 'src/**/store/**/*.{ts,tsx}'
  - 'src/**/store/graphql/**/*.{ts,tsx}'
alwaysApply: false
---

# Store Layout Mapping

/store
├── service/ # React-facing hooks; uses Apollo Client SDK directly
├── graphql/ # All GraphQL documents
│ ├── queries/
│ ├── mutations/
│ └── fragments/
├── generated/ # Generated types and hooks from GraphQL Code Generator
└── config.ts # Apollo client factory wiring if needed

# Service Layer Rules (Apollo SDK)

- Expose hooks to components (e.g., `useUserById`, `useUpdateUser`).
- Use Apollo Client's generated hooks directly (e.g., `useQuery`, `useMutation`).
- Normalize return shape: `{ data, error, isLoading, refetch }` for queries; `{ trigger, error, isMutating, reset }` for mutations.
- Map Apollo errors to UI-safe errors and transform data into UI-friendly shapes only here.
- Co-locate minimal view-model mapping here; keep business logic focused.

# GraphQL Documents

- Centralize GraphQL documents under `store/graphql/` (place queries in `store/graphql/queries/`).
- Use GraphQL Code Generator to generate types and hooks from these documents.
- No manual type definitions - all types come from the schema.

# Component Usage

- Components must use service hooks only.
- Components must not import `gql`, Apollo documents, or Apollo hooks directly.

# Caching & Keys

- Define `typePolicies` in Apollo cache for entities and pagination.
- Align service hook keys and naming with operations; do not duplicate cache layers.
- Invalidate/update cache in service mutation handlers using Apollo cache APIs.

# Code Generation

- Use GraphQL Code Generator with client preset for type generation.
- Run `pnpm run codegen:watch` during development for automatic regeneration.
- Generated files go in `store/generated/` and are automatically updated when GraphQL documents change.

# Testing

- Test service hooks with Jest/RTL using `MockedProvider` or MSW.
- Mock the generated GraphQL documents, not the service layer.

---

See also: `apollo-client-guidelines.mdc`, `common-data-store-architecture.mdc`

- Service: test hooks with Jest/RTL using `MockedProvider` or MSW.

---

See also: `apollo-client-guidelines.mdc`, `common-data-store-architecture.mdc`
