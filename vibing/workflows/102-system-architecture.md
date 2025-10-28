# Workflow: 102 - System Architecture Generation

**Objective**: Create the `D02 - System Architecture.md` document that describes high-level system structure, technology choices, and architectural patterns required to meet business needs.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

## Validation Questions

1. **Application Components**: What are the major components (web UI, mobile app, API backend, admin interface, background workers, scheduled tasks)?
2. **Frontend Preference**: What frontend framework/library do you prefer (React, Vue, Svelte, Astro, SolidJS)?
3. **Backend Preference**: What backend technology do you prefer (Node.js, Python, Go, .NET)?
4. **Database Requirements**: What type of data storage fits your needs (relational, document, graph, key-value)?
5. **API Style**: How should frontend and backend communicate (REST, GraphQL, tRPC)?
6. **Traffic Patterns**: What are expected traffic patterns and peak load requirements?
7. **Deployment Environment**: What's the preferred deployment environment (cloud provider, on-premises, hybrid)?
8. **Architecture Drivers**: What are the primary drivers for architectural choices (performance, scalability, team size, timeline, cost)?
9. **Testing Approach**: What's the testing strategy for different components (unit, integration, E2E)?

## Agents to Invoke

- [ ] Activate @vibing/agents/system-architect.md persona
- [ ] Consult with @vibing/agents/product-manager.md for business context

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T02 - System Architecture.md structure
- [ ] Populate all 4 sections with specific technical details
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

**Note**: All responses should follow the response formatting guidelines in AGENT.md
