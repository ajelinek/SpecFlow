# D04 — Backend Architecture

> **References**: See D01 for product goals and D02 for the system-level structure. This project intentionally has no application backend in v1.

---

## 1. API Layer

### Style and Conventions

**Style**: No runtime application API in v1.

**Versioning**: Not applicable. The site is built from repository content and published as static assets.

**URL naming** (REST only): Not applicable.

**Payload conventions**:
- Field naming: Not applicable
- Date format: Not applicable
- Pagination: Not applicable

**Error response format**:
```json
{
  "status": "not-applicable"
}
```

**API boundary concerns**:
- CORS: Not applicable for the public site build
- Rate limiting: Not applicable
- Request logging: Not applicable

---

## 2. Service Layer

### Layering

```
Authoring files -> Astro content loading -> Static build output
```

There is no server-side service layer in this version. Content validation and rendering happen at build time.

### Layer responsibilities

| Layer | Owns | Does not own |
|-------|------|--------------|
| Content files | Product and docs content | Rendering shell implementation |
| Content loading | Schema validation and typed access | Runtime request handling |
| Static build | Rendering final HTML, CSS, and assets | Dynamic per-request behavior |

### Dependency flow

Content files feed the content collection layer, which feeds layouts and pages during the static build.

### Input validation

Astro content collection schemas validate required frontmatter and route metadata at build time.

### Error propagation

Schema or build errors fail the build and are surfaced through `astro check` or `astro build` rather than through a runtime error envelope.

---

## 3. Data Access

**Approach**: Build-time file loading through Astro content collections.

**Transactions**: Not applicable.

**Connection pooling**: Not applicable.

**Caching**: GitHub Pages serves generated static assets. No application-level cache exists in v1.

---

## 4. Security

### Authentication

No authenticated product area exists in v1.

### Authorization

No user-level authorization rules apply to the published site.

### Input security

- Injection: Not applicable at runtime; source content is repository-managed.
- Payload size: Not applicable.
- Malformed input: Invalid frontmatter or malformed content fails the build.

### Sensitive data

- PII at rest: None expected in public docs content.
- PII in logs: Build logs should avoid secrets or private repository values.
- Secrets: Deployment secrets stay in GitHub repository settings if needed in the future.

### Compliance

No specific backend compliance requirements were identified for this release.

---

## 5. Operations

### Logging

**Framework**: GitHub Actions logs and local CLI output.

**Always logged**:
- Dependency installation
- Type and build failures
- Deployment job status

**Never logged**:
- Secret values
- Private tokens

### Error tracking

No production error tracking service is required for the static site in v1.

### Background processing

No background jobs required in v1.

---

## Open Questions

- [ ] Whether future site search or analytics features justify a lightweight runtime service.
