---
description: 'Use when building or modifying Apollo Client usage in the frontend: cache policies, links, persisted queries, SSR, conventions, and testing.'
ruleType: frontend
applyTo:
  - 'src/**/store/**/*.{ts,tsx}'
  - 'src/**/services/**/*.{ts,tsx}'
  - 'src/**/graphql/**/*.{ts,tsx}'
alwaysApply: false
---

## When to Use

Apply when creating or modifying clients with `@apollo/client`.

# Cache Policies

- Define `keyFields` for all entities; disable normalization only when necessary.
- Use helpers for pagination: `offsetLimitPagination`, `relayStylePagination`.
- Add `possibleTypes` for unions/interfaces; generate via schema introspection in CI.
- Expect server responses to be object wrappers (envelopes), not bare fields/scalars. Co-locate fragments on the wrapper type for forward compatibility.

# Component Integration

- See `rules/apollo/apollo-store-architecture.md` (Component Usage) and `rules/apollo/apollo-react-state-integration.md` for service-hook patterns.

# Performance

- Prefer `cache-first` for reads, `network-only` for admin/critical freshness, and `no-cache` for rare cases.
- Minimize fragments overfetch; co-locate queries within the store.
- Batch queries and enable HTTP/2/3 where available.

# Conventions

- Colocate `*.graphql` documents under `graphql/` alongside operation folders.
- Operation names: `Feature_Action` (unique and stable). Keep variables minimal.
