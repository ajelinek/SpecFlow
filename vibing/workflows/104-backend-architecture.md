# Workflow: 104 - Backend Architecture Generation

**Objective**: Create the `D04 - Backend Architecture.md` document that details backend service architecture, API design patterns, data access strategies, and security implementation required to support the system architecture.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Validation Questions

1. **API Style**: What API style will be used (REST, GraphQL, gRPC, tRPC)?
2. **Authentication Method**: How will users authenticate (JWT, OAuth, session-based, API keys)?
3. **Authorization Model**: What authorization approach (RBAC, ABAC, custom permissions)?
4. **Data Access Pattern**: What data access pattern (Repository, Active Record, Data Mapper)?
5. **ORM/Query Builder**: What technology for database interactions (Prisma, TypeORM, Knex, raw SQL)?
6. **Background Processing**: Do you need background job processing (queues, workers, scheduled tasks)?
7. **Caching Strategy**: What caching approach (Redis, in-memory, database-level)?
8. **Logging Framework**: What logging solution (Winston, Pino, Bunyan, custom)?
9. **Error Tracking**: How will errors be tracked (Sentry, Bugsnag, custom)?
10. **Monitoring**: What monitoring approach (Prometheus, DataDog, New Relic, custom)?
11. **Rate Limiting**: Do you need API rate limiting and what approach?
12. **Input Validation**: What validation approach (Joi, Yup, Zod, custom)?
13. **File Uploads**: Do you need file upload handling and where will files be stored?
14. **Email Service**: Do you need email functionality and what service (SendGrid, SES, SMTP)?
15. **External APIs**: What third-party APIs need integration and how will failures be handled?
16. **Database Transactions**: How will multi-step operations be handled (transactions, saga pattern)?
17. **API Versioning**: What API versioning strategy (URL path, headers, query params)?
18. **CORS Configuration**: What CORS policy is needed for frontend integration?
19. **Environment Management**: How will environment variables and secrets be managed?
20. **Health Checks**: What health check endpoints are needed for monitoring?
21. **Performance Requirements**: What are the performance requirements (response times, throughput)?
22. **Security Compliance**: Are there specific security compliance requirements (GDPR, HIPAA, SOC 2)?

---

## Execution Checklist

### 1. Invoke Backend Architect Agent

- [ ] Activate @agents/backend-architect.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data access patterns
- [ ] Consult with @agents/system-architect.md for architecture alignment
- [ ] Consult with @agents/data-architect.md for data layer coordination

### 3. Generate Backend Architecture

- [ ] Use @templates/T04 - Backend Architecture.md structure
- [ ] Populate all 7 sections with specific technical details
- [ ] Ensure backend decisions align with system architecture and business requirements
- [ ] Validate security measures are comprehensive and current

### 4. Apply Quality Standards

- [ ] Verify all technology choices have clear rationale and security considerations
- [ ] Validate architecture supports stated performance and scalability requirements
- [ ] Ensure error handling and monitoring strategies are comprehensive

---

## Post-Validation Checklist

- [ ] All 7 template sections populated with specific technical details
- [ ] Backend architecture decisions trace back to system architecture and business requirements
- [ ] API design patterns clearly defined with examples
- [ ] Security measures comprehensive and current
- [ ] Data access patterns align with data model requirements
- [ ] Background processing strategy defined if needed
- [ ] Logging and monitoring strategy comprehensive
- [ ] Performance and scalability considerations addressed
- [ ] Store completed document in `_docs/design/D04 - Backend Architecture.md`

---

**Note**: All responses should follow @fragments/response-formatting.md
