# Workflow: 105 - Frontend Architecture Generation

**Objective**: Create the `D05 - Frontend Architecture.md` document that describes frontend component structure, state management strategy, UI framework conventions, and development patterns required to deliver optimal user experience.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

## Validation Questions

1. **Frontend Framework**: What frontend framework/library do you prefer (React, Astro, SolidJS, Mix)?
2. **Deployment Target**: Where will the frontend be deployed (static hosting, CDN, server-side rendering)?
3. **Real-Time Features**: Do you need real-time features (WebSockets, Server-Sent Events, polling)?
4. **Internationalization**: Do you need multi-language support (i18n libraries, translation management)?
5. **SEO Requirements**: What SEO features are needed (meta tags, structured data, server-side rendering)?
6. **Design System**: Do you have an existing design system or need to create one?

## Agents to Invoke

- [ ] Activate @vibing/agents/frontend-architect.md persona
- [ ] Consult with @vibing/agents/system-architect.md for system integration patterns
- [ ] Consult with @vibing/agents/product-manager.md for user experience requirements
- [ ] Consult with @vibing/agents/seo-specialist.md for SEO requirements and technical implementation

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data structure requirements

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T05 - Frontend Architecture.md structure
- [ ] Populate all 4 sections with specific technical details
- [ ] Define component hierarchy and state management patterns
- [ ] Establish styling approach and design system integration (merged into Section 1)

**Quality Assurance**

- [ ] Ensure architecture decisions align with business requirements and system architecture
- [ ] Verify all technology choices have clear rationale
- [ ] Validate architecture supports stated success metrics and user experience goals
- [ ] Confirm testing strategy covers all architectural components
- [ ] Frontend architecture decisions trace back to business requirements
- [ ] Technology stack choices justified with clear rationale
- [ ] Component architecture clearly defined with hierarchy
- [ ] State management strategy addresses all state types
- [ ] Testing strategy covers unit, integration, and E2E testing
- [ ] Performance and accessibility requirements explicitly addressed

**Completion**

- [ ] Store completed document in `_docs/design/D05 - Frontend Architecture.md`

**Note**: All responses should follow the response formatting guidelines in AGENT.md
