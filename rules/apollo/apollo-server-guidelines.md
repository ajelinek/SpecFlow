---
description: Apollo Server v4 best practices for updating APIs, schema evolution, caching, errors, security, and testing
ruleType: backend
globs:
alwaysApply: false
---

## When to Use

Apply when creating or modifying GraphQL servers with `@apollo/server` v4.

# Schema & Types

- Keep `Query/Mutation/Subscription` flat and cohesive; compose via modules.
- Use `graphql-codegen` with `typescript` and `typescript-resolvers`.
- Set `config.contextType` to shared context interface.
- Never return naked scalars from Query/Mutation. Always return an object wrapper for forward-compatible expansion.
- Naming: `{Entity}Result` for queries, `{Action}Result` for mutations. Include optional `meta` fields when useful. Do not include `errors` inside payloads; rely on GraphQL's top-level `errors` per spec.

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

- Throw `GraphQLError` with `extensions.code` and `extensions.http.status`.
- Use a stable code set: `UNAUTHENTICATED`, `FORBIDDEN`, `BAD_USER_INPUT`, `NOT_FOUND`, `CONFLICT`, `RATE_LIMITED`, `INTERNAL_SERVER_ERROR`.
- Do not include domain errors inside payload objects; rely on GraphQL top-level `errors`.
- Mask internal details in production (no stack traces or PII in messages). Log full diagnostics server-side.
- Normalize validation failures to `BAD_USER_INPUT` with structured `extensions.fields` when applicable.
- Map HTTP status consistently (e.g., 400, 401, 403, 404, 409, 429, 500) via `extensions.http.status`.
- Optionally implement `formatError` to standardize outbound messages and strip internals in prod.

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
