# Workflow: 102 - System Architecture Generation

**Objective**: Create the `D02 - System Architecture.md` document that describes high-level system structure, technology choices, and architectural patterns required to meet business needs.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

## Validation Questions

1. **Application Components**: What are the major components (web UI, mobile app, API backend, admin interface, background workers, scheduled tasks)?
2. **Platform Targets**: What platforms need to be supported (web browsers, iOS, Android, desktop)?
3. **Real-Time Requirements**: Do you need real-time features (live updates, notifications, collaborative editing)?
4. **Background Processing**: Do you need background job processing, scheduled tasks, or event-driven workflows?
5. **Frontend Preference**: What frontend framework/library do you prefer (React, Vue, Svelte, Astro, SolidJS)?
6. **Backend Preference**: What backend technology do you prefer (Node.js, Python, Go, .NET)?
7. **Database Requirements**: What type of data storage fits your needs (relational, document, graph, key-value)?
8. **Team Expertise**: What are your team's technology expertise and constraints?
9. **API Style**: How should frontend and backend communicate (REST, GraphQL, tRPC)?
10. **External Integrations**: What third-party services or APIs need integration (auth providers, payment, analytics)?
11. **Third-Party Failures**: How should the system handle third-party service failures or downtime?
12. **Traffic Patterns**: What are expected traffic patterns and peak load requirements?
13. **Data Growth**: How will you handle data growth over time (storage, query performance)?
14. **Caching Strategy**: What data needs caching for performance?
15. **Authentication/Authorization**: What are authentication and authorization requirements (OAuth, SSO, RBAC)?
16. **Compliance**: Are there specific compliance requirements (GDPR, HIPAA, SOC 2)?
17. **Sensitive Data**: How will sensitive data be stored and transmitted?
18. **Deployment Environment**: What's the preferred deployment environment (cloud provider, on-premises, hybrid)?
19. **Environment Management**: How many environments needed (dev, staging, production, preview)?
20. **Monitoring Strategy**: What monitoring, logging, and alerting approach will you use?
21. **Architecture Drivers**: What are the primary drivers for architectural choices (performance, scalability, team size, timeline, cost)?
22. **Testing Approach**: What's the testing strategy for different components (unit, integration, E2E)?

## Agents to Invoke

- [ ] Activate @agents/system-architect.md persona
- [ ] Consult with @agents/product-manager.md for business context

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements

## Execute Checklist

**Content Creation**

- [ ] Use @templates/T02 - System Architecture.md structure
- [ ] Populate all 6 sections with specific technical details
- [ ] Component interactions clearly defined

**Quality Assurance**

- [ ] Ensure architecture decisions align with business requirements
- [ ] Verify all technology choices have clear rationale
- [ ] Validate architecture supports stated success metrics
- [ ] Technology stack choices justified with clear rationale
- [ ] Single points of failure identified and mitigated
- [ ] Security measures defined at all layers

**Completion**

- [ ] Store completed document in `_docs/design/D02 - System Architecture.md`

**Note**: All responses should follow @fragments/response-formatting.md
