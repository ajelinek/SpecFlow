# Workflow: 105 - Frontend Architecture Generation

**Objective**: Create the `D05 - Frontend Architecture.md` document that describes frontend component structure, state management strategy, UI framework conventions, and development patterns required to deliver optimal user experience.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

## Validation Questions

**Required Decisions** (template pre-populated with rule defaults):

1. **Frontend Framework**: What frontend framework/library do you prefer (React, Astro, SolidJS, Mix)?
2. **Deployment Target**: Where will the frontend be deployed (static hosting, CDN, server-side rendering)?
3. **API Integration**: What type of API integration (GraphQL with Apollo, REST with SWR, Firebase, or mixed)?
4. **Real-Time Features**: Do you need real-time features (WebSockets, Server-Sent Events, polling)?
5. **Internationalization**: Do you need multi-language support (i18n libraries, translation management)?
6. **SEO Requirements**: What SEO features are needed (meta tags, structured data, server-side rendering)?
7. **Design System**: Do you have an existing design system or need to create one?
8. **Styling Approach**: Any specific styling requirements beyond CSS Modules + design tokens?

**Pre-Configured Defaults** (from @vibing/rules):

- TypeScript 5.0+ (enforced)
- Foundation component architecture
- Service-Repository state management pattern
- CSS Modules with design token system
- E2E > Integration > Unit testing strategy
- WCAG 2.1 AA accessibility compliance

**Section Inclusion Decision Matrix**:

| Section              | Include If                                    | Remove If                     |
| -------------------- | --------------------------------------------- | ----------------------------- |
| Real-Time Features   | WebSockets, live updates, chat, notifications | Static content, simple CRUD   |
| Internationalization | Multiple languages, global audience           | Single language, local market |
| SEO Requirements     | Public website, marketing pages               | Internal tools, admin panels  |
| Mobile/PWA           | Mobile-first, offline needs                   | Desktop-only, always online   |
| Performance          | Specific targets, large datasets              | Simple apps, small user base  |
| Security             | Sensitive data, compliance needs              | Public content, basic auth    |
| Integration Patterns | Third-party services, complex workflows       | Standalone application        |

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

- [ ] Use @vibing/templates/T05 - Frontend Architecture.md structure (pre-populated with rule defaults)
- [ ] **Remove unnecessary sections** based on project requirements:
  - [ ] Remove real-time features section if not needed
  - [ ] Remove internationalization section if not needed
  - [ ] Remove SEO section if not applicable
  - [ ] Remove specific framework sections not being used
- [ ] **Add project-specific sections** as needed:
  - [ ] Add mobile app considerations if building mobile-first or hybrid app
  - [ ] Add PWA requirements if building Progressive Web App
  - [ ] Add specific integration patterns (e.g., payment systems, analytics, CRM)
  - [ ] Add performance requirements if specific targets (e.g., <2s load time)
  - [ ] Add security considerations if handling sensitive data
  - [ ] Add offline capabilities if needed
  - [ ] Add specific deployment patterns (e.g., multi-tenant, white-label)
  - [ ] Add monitoring and observability requirements
- [ ] **Customize core sections** based on project needs:
  - [ ] Simplify component architecture if simple project
  - [ ] Expand state management if complex data flows
  - [ ] Add framework-specific patterns if using multiple frameworks
  - [ ] Detail specific testing strategies if complex requirements
- [ ] Customize framework-specific sections based on validation answers
- [ ] Add project-specific technology choices and rationale
- [ ] Define any deviations from standard rule patterns
- [ ] Specify deployment and integration requirements

**Quality Assurance**

- [ ] Verify framework choice aligns with project requirements
- [ ] Confirm API integration strategy matches backend architecture
- [ ] Validate real-time features implementation approach (if applicable)
- [ ] Ensure i18n/SEO requirements are properly addressed (if applicable)
- [ ] Check that customizations don't violate rule patterns
- [ ] Verify all technology choices have clear rationale
- [ ] Confirm testing strategy covers all architectural components
- [ ] Performance and accessibility requirements explicitly addressed
- [ ] All project-specific additions are necessary and well-justified

**Completion**

- [ ] Store completed document in `_docs/design/D05 - Frontend Architecture.md`

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
