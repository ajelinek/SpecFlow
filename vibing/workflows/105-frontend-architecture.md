# Workflow: 105 - Frontend Architecture Generation

**Objective**: Create the `D05 - Frontend Architecture.md` document that describes frontend component structure, state management strategy, UI framework conventions, and development patterns required to deliver optimal user experience.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

## Validation Questions

1. **Frontend Framework**: What frontend framework/library do you prefer (React, Astro, SolidJS, Mix)?
2. **Performance Requirements**: What are the performance requirements (Core Web Vitals targets, bundle size limits)?
3. **Mobile Support**: What mobile support is needed (responsive design, PWA, native mobile apps)?
4. **Browser Support**: What browsers need to be supported (modern browsers, IE11, specific versions)?
5. **Deployment Target**: Where will the frontend be deployed (static hosting, CDN, server-side rendering)?
6. **Real-Time Features**: Do you need real-time features (WebSockets, Server-Sent Events, polling)?
7. **Internationalization**: Do you need multi-language support (i18n libraries, translation management)?
8. **Analytics**: What analytics and monitoring are needed (Google Analytics, custom tracking, performance monitoring)?
9. **SEO Requirements**: What SEO features are needed (meta tags, structured data, server-side rendering)?
10. **Design System**: Do you have an existing design system or need to create one?

## Agents to Invoke

- [ ] Activate @agents/frontend-architect.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data structure requirements
- [ ] Consult with @agents/system-architect.md for system integration patterns
- [ ] Consult with @agents/product-manager.md for user experience requirements
- [ ] Consult with @agents/seo-specialist.md for SEO requirements and technical implementation

## Execute Checklist

- [ ] Use @templates/T05 - Frontend Architecture.md structure
- [ ] Populate all 8 sections with specific technical details
- [ ] Ensure architecture decisions align with business requirements and system architecture
- [ ] Define component hierarchy and state management patterns
- [ ] Establish styling approach and design system integration
- [ ] Verify all technology choices have clear rationale
- [ ] Validate architecture supports stated success metrics and user experience goals
- [ ] Ensure accessibility and performance requirements are addressed
- [ ] Confirm testing strategy covers all architectural components
- [ ] All 8 template sections populated with specific technical details
- [ ] Frontend architecture decisions trace back to business requirements
- [ ] Technology stack choices justified with clear rationale
- [ ] Component architecture clearly defined with hierarchy
- [ ] State management strategy addresses all state types
- [ ] Testing strategy covers unit, integration, and E2E testing
- [ ] Performance and accessibility requirements explicitly addressed
- [ ] Store completed document in `_docs/design/D05 - Frontend Architecture.md`

**Note**: All responses should follow @fragments/response-formatting.md
