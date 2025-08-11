---
description: Apollo Server v4 best practices for updating APIs, schema evolution, caching, errors, security, and testing
ruleType: backend
globs:
alwaysApply: false
---

## When to Use

Apply when creating or modifying GraphQL servers with `@apollo/server` v4.

# Setup

- For setup and integration patterns, see `utilities/apollo-server-setup.md`.

# Schema & Types

- Keep `Query/Mutation/Subscription` flat and cohesive; compose via modules.
- Use `graphql-codegen` with `typescript` and `typescript-resolvers`.
- Set `config.contextType` to shared context interface.
- Never return naked scalars from Query/Mutation. Always return an object wrapper for forward-compatible expansion.
- Naming: `{Entity}Result` for queries, `{Action}Result` for mutations. Include optional `meta` fields when useful. Do not include `errors` inside payloads; rely on GraphQL's top-level `errors` per spec.

```graphql
type UserResult {
  user: User
  meta: Meta
}

type UpdateUserResult {
  user: User
}
```

# Context

- Resolve auth in the HTTP middleware context; do not pass `req/res` to resolvers.
- Provide only primitives, services, data sources, and per-request loaders.

# Performance & Caching

- Enable `responseCachePlugin` and annotate cache hints where safe.
- Configure `ApolloServerPluginCacheControl({ calculateHttpHeaders: 'if-cacheable' })`.
- Use APQ or safelisted persisted queries.

# Data Access

- Use `DataLoader` per request to prevent N+1.
- Keep resolvers thin; push domain logic to services.

# Errors & HTTP

- Throw `GraphQLError` with `extensions.code` and `extensions.http.status` for auth/validation.
- Mutate status/headers via `willSendResponse` when needed.

```ts
import { GraphQLError } from 'graphql'
if (!ctx.userId) {
  throw new GraphQLError('Unauthenticated', { extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } } })
}
```

# Security

- Enforce query depth/complexity limits and timeouts.
- Rate limit at the edge/proxy. Disable schema introspection only in locked-down prod environments.
- Validate persisted query manifests in CI.

# Testing

- Unit/integration: `server.executeOperation({ query, variables }, { contextValue })`.
- E2E: start ephemeral port and use `supertest` against HTTP.
- Mocking: wrap schema with `@graphql-tools/mock` for isolated tests.

```ts
const res = await server.executeOperation({ query, variables }, { contextValue: { userId: 'test' } })
```

# Federation (optional)

- Keep subgraph schemas cohesive; avoid cross-subgraph data coupling.
- Use `@key` judiciously; prefer reference resolution over deep joins.

# Operational

- Graceful shutdown: HTTP drain.
- Health checks via your HTTP framework; keep GraphQL layer stateless.
