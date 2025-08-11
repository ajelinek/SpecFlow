---
description: Apollo Client best practices for updating features, cache policies, links, persisted queries, SSR, and testing
ruleType: frontend
globs:
alwaysApply: false
---

## When to Use

Apply when creating or modifying clients with `@apollo/client`.

# Setup

- For setup and integration patterns, see `utilities/apollo-client-setup.md`.

# Cache Policies

- Define `keyFields` for all entities; disable normalization only when necessary.
- Use helpers for pagination: `offsetLimitPagination`, `relayStylePagination`.
- Add `possibleTypes` for unions/interfaces; generate via schema introspection in CI.
- Expect server responses to be object wrappers (envelopes), not bare fields/scalars. Co-locate fragments on the wrapper type for forward compatibility.

# Component Integration

- Components must consume data via service hooks only; never import Apollo hooks or `gql`.
- Services map Apollo responses to stable shapes; components receive framework-agnostic data.

# Performance

- Prefer `cache-first` for reads, `network-only` for admin/critical freshness, and `no-cache` for rare cases.
- Minimize fragments overfetch; co-locate queries within the store.
- Batch queries and enable HTTP/2/3 where available.

# Conventions

- colocate `*.graphql` documents with in the `graphql/` with operation folders.
- Operation names: `Feature_Action` (unique and stable). Keep variables minimal.
