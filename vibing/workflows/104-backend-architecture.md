# Workflow: 104 - Backend Architecture Generation

**Objective**: Create the `D04 - Backend Architecture.md` document that details backend service architecture, API design patterns, data access strategies, and security implementation required to support the system architecture.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

## Validation Questions

1. **API Style**: What API style will be used (REST, GraphQL, gRPC, tRPC)?
2. **Authentication Method**: How will users authenticate (JWT, OAuth, session-based, API keys)?
3. **Authorization Model**: What authorization approach (RBAC, ABAC, custom permissions)?
4. **Security Compliance**: Are there specific security compliance requirements (GDPR, HIPAA, SOC 2)?

## Agents to Invoke

- [ ] Activate @vibing/agents/backend-architect.md persona
- [ ] Consult with @vibing/agents/system-architect.md for architecture alignment
- [ ] Consult with @vibing/agents/data-architect.md for data layer coordination

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data access patterns

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T04 - Backend Architecture.md structure
- [ ] Populate all 3 sections with specific technical details
- [ ] API design patterns clearly defined with examples
- [ ] Incorporate documented defaults: API versioning via URL path, input validation with Zod, logging with Winston, raw SQL for relational databases

**Quality Assurance**

- [ ] Verify all technology choices have clear rationale and security considerations
- [ ] Validate architecture supports stated performance and scalability requirements
- [ ] Ensure error handling and monitoring strategies are comprehensive
- [ ] Backend architecture decisions trace back to system architecture and business requirements
- [ ] Security measures comprehensive and current
- [ ] Data access patterns align with data model requirements
- [ ] Background processing strategy defined if needed
- [ ] Logging and monitoring strategy comprehensive
- [ ] Performance and scalability considerations addressed
- [ ] Documented defaults clearly referenced for versioning, validation, logging, and query approach

**Completion**

- [ ] Store completed document in `_docs/design/D04 - Backend Architecture.md`

**Note**: All responses should follow the response formatting guidelines in AGENT.md
