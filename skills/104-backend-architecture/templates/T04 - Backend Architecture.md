&lt;!--
INSTRUCTION BLOCK — remove before committing
This template is filled in by the 104-backend-architecture skill.
Every section maps to a step in SKILL.md. Do not add, remove, or rename sections.
Use concrete, specific placeholder text — not "[describe here]" labels.
Replace all content between &lt;!-- example: ... --&gt; markers with project-specific details.
Remove this instruction block and all example comments before writing the final file.
--&gt;

# D04 — Backend Architecture

> **References**: See D01 for business requirements, D02 for technology choices and deployment
> topology, D03 for entity definitions. This document does not repeat that content.

---

## 1. API Layer

### Style and Conventions

<!-- example: REST over HTTP/1.1. All routes prefixed with /api/v1. -->
**Style**: [e.g., REST | GraphQL | gRPC | tRPC]

**Versioning**: [e.g., URL path prefix — `/api/v1/...`. A breaking change increments the version; the prior version is deprecated with a sunset date communicated via `Deprecation` response header.]

**URL naming** (REST only): [e.g., Plural nouns for collections (`/users`, `/orders`). Nested routes for owned sub-resources (`/users/:id/sessions`). Actions that do not map to CRUD use verb phrases under the resource (`/orders/:id/cancel`).]

**Payload conventions**:
- Field naming: [e.g., camelCase JSON for request and response bodies]
- Date format: [e.g., ISO 8601 strings (`2024-03-15T14:30:00Z`)]
- Pagination: [e.g., cursor-based — `{ data: [...], nextCursor: "abc123", hasMore: true }`]

**Error response format**:
```json
{
  "type": "https://example.com/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The 'email' field is required.",
  "instance": "/api/v1/users"
}
```
[Replace with actual error envelope. Specify which HTTP status codes map to which error conditions.]

**API boundary concerns**:
- CORS: [e.g., Allowed origins configured per environment via `CORS_ORIGIN` env var]
- Rate limiting: [e.g., 100 req/min per authenticated user; 20 req/min unauthenticated. Returns 429 with `Retry-After` header.]
- Request logging: [e.g., Every request logged at INFO: method, path, status, duration, user ID (if authenticated)]

---

## 2. Service Layer

### Layering

```
Request → Route handler (HTTP parsing, input validation)
        → Service (business logic, authorization checks)
        → Repository (queries, transactions)
        → Database
```

[Replace with the actual layer diagram for this project. Name each layer and describe what it owns.]

### Layer responsibilities

| Layer | Owns | Does not own |
|-------|------|--------------|
| Route handler | HTTP parsing, input validation, response serialization | Business logic, database access |
| Service | Business rules, orchestration, authorization | HTTP concerns, direct database queries |
| Repository | Database queries, transactions, connection management | Business rules, HTTP concerns |

[Adjust rows to match the actual layers used.]

### Dependency flow

[e.g., Constructor injection throughout. Services receive repositories as constructor arguments. No service-locator or global singletons.]

### Input validation

[e.g., Zod schemas defined alongside each route. Validation runs in the route handler before the service is called. Invalid input returns 422 with field-level error detail. Zod schemas are also used to parse environment variables at startup.]

### Error propagation

[e.g., Repositories throw typed domain errors (e.g., `NotFoundError`, `ConflictError`). Services let domain errors propagate. Route handlers catch domain errors and map them to HTTP status codes. Unhandled errors are caught by the global error middleware and return 500.]

---

## 3. Data Access

**Approach**: [e.g., Raw SQL via `node-postgres`. No ORM. SQL strings are colocated with the repository methods that use them.]

**Transactions**: [e.g., Passed as an optional parameter to repository methods. The service layer opens and commits transactions; repositories participate if a transaction is provided.]

**Connection pooling**: [e.g., Managed by `node-postgres` pool. Pool size configured via `DB_POOL_MAX` env var, defaulting to 10.]

**Caching**: [e.g., No application-level cache in v1. Redis added as a cache layer if read latency becomes a measured problem.]

> D09-data-access-patterns.md will specify the query patterns and data objects for each entity.

---

## 4. Security

### Authentication

[e.g., JWT-based. HS256 algorithm. Access tokens expire after 15 minutes. Refresh tokens expire after 7 days and are stored in HttpOnly, Secure, SameSite=Strict cookies.]

- Issue endpoint: `POST /api/v1/auth/login`
- Refresh endpoint: `POST /api/v1/auth/refresh`
- Logout endpoint: `POST /api/v1/auth/logout` (clears refresh token cookie)
- Token payload: `{ sub: userId, role: "user" | "admin", iat, exp }`

### Authorization

[e.g., Role-based (RBAC). Roles: `user`, `admin`. Role is embedded in the JWT payload. Authorization checks run in the service layer before any data is accessed or modified.]

- `user`: Can read and modify their own resources
- `admin`: Can read and modify all resources; can manage other users

[Add rows for each role. If ownership-based rules exist, specify them here.]

### Input security

- Injection: [e.g., All database queries use parameterized statements. No string interpolation into SQL.]
- Payload size: [e.g., Request body limited to 1 MB via `express.json({ limit: '1mb' })`]
- Malformed input: [e.g., Invalid JSON returns 400 before reaching route handler]

### Sensitive data

- PII at rest: [e.g., Email and name stored in plaintext in the database. Passwords hashed with bcrypt, cost factor 12.]
- PII in logs: [e.g., User ID logged; email, name, and all token values never logged.]
- Secrets: [e.g., All secrets loaded from environment variables. No secrets in source control. Env vars validated at startup with Zod.]

### Compliance

[State each compliance requirement from Required Input 4 and the specific backend behaviors it requires. If none, write "No specific compliance requirements identified."]

---

## 5. Operations

### Logging

**Framework**: [e.g., Winston with JSON output in production, pretty-print in development]

**Always logged**:
- Incoming request: method, path, query params (redacted if sensitive), user ID
- Outgoing response: status code, duration in ms
- Unhandled errors: stack trace, request context

**Never logged**:
- Passwords, tokens, session cookies
- Full request/response bodies (field-level logging only where needed)
- PII fields (email, name, phone)

### Error tracking

[e.g., Sentry. All unhandled exceptions and promise rejections are captured with request context, user ID (if authenticated), and environment. Alerts on error spike configured in Sentry dashboard.]

### Background processing

[Either: "No background jobs required in v1."
Or: describe the framework (e.g., BullMQ with Redis), the job types, the retry policy, and how failed jobs are surfaced for investigation.]

---

## Open Questions

[List any unresolved decisions. Each entry should name the question and, where possible, the person or event that will resolve it. Remove this section if there are no open questions.]

- [e.g., Rate limiting: thresholds above are provisional. Confirm with the team after load testing.]
- [e.g., Background jobs: the notification dispatch feature may require async processing; decision deferred until feature scoping in 110-feature-overview.]
