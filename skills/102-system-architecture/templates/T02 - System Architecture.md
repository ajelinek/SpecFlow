# T02 — System Architecture

> **Purpose**: Define the high-level structure of the system: architectural style, major components,
> technology stack, and testing strategy. Every technology choice should include a one-line rationale.
>
> Instructions: Replace all `[placeholder]` text with specific content. Remove this instruction block before committing.

---

## 1. Architectural Style & Patterns

- **Primary Architecture**: [e.g., Monolithic / Microservices / Serverless / Hybrid — name the style and one sentence on why it fits this project's scale and team size]
- **Core Patterns**: [e.g., MVC, Event-Driven, CQRS, Layered — list patterns that materially shape implementation]
- **Communication**: [How services and layers communicate — REST, GraphQL, tRPC, message queues, event streaming]
- **Infrastructure Highlights**: [Deployment model, scaling approach, CDN/edge, security posture summary]
- **Key Drivers**: [The 2–3 constraints or goals that most influenced these choices — e.g., "small team favors monolith", "compliance requires on-prem database"]

---

## 2. Major System Components

[List each component with its specific responsibility. Avoid generic labels — name what it actually does.]

1. **[Component Name]**: [Specific responsibility and key functions — e.g., "API Gateway: handles authentication, request routing, and rate limiting for all client requests"]
2. **[Component Name]**: [Specific responsibility and key functions]
3. **[Component Name]**: [Specific responsibility and key functions]
4. **[Component Name]** *(if applicable)*: [Specific responsibility and key functions]
5. **[Component Name]** *(if applicable)*: [Specific responsibility and key functions]

---

## 3. Technology Stack

[Every layer filled in. Every choice includes a one-line rationale tied to a project requirement, installed standards skill, or explicit decision.]

- **Frontend**: [Framework/library + key supporting tech — rationale]
- **Backend**: [Runtime/framework + key supporting tech — rationale]
- **Database**: [Primary database + caching layer if applicable — rationale]
- **API Style**: [REST / GraphQL / tRPC / other — rationale]
- **Infrastructure**: [Deployment platform + supporting services — rationale]
- **Development Tooling**: [Build tools, linting, testing frameworks — rationale]

---

## 4. Testing Strategy

- **Philosophy**: [Testing approach and layer priorities — e.g., "E2E tests cover critical user paths; integration tests cover API contracts; unit tests cover complex business logic only"]
- **Unit Testing**: [Tool + what it covers]
- **Integration Testing**: [Tool + what it covers]
- **End-to-End Testing**: [Tool + what it covers]
- **Additional**: [Performance, accessibility, security scanning — if applicable]

---

## 5. Open Questions

[List any architecture decisions that are unresolved or assumptions that need validation. Remove this section once all questions are answered.]

- [ ] [Open question or unresolved technology decision]
- [ ] [Open question or unresolved technology decision]
