# Workflow: 105 - Frontend Architecture Generation

**Objective**: Create the `05 - Frontend Architecture.md` document that describes frontend component structure, state management strategy, UI framework conventions, and development patterns required to deliver optimal user experience.

## Agents

- @agents/frontend-architect.md
- @agents/system-architect.md
- @agents/product-manager.md
- @agents/seo-specialist.md

## Template

- @templates/05 - Frontend Architecture.md

## Rules

- @rules/common/typescript-guidelines.md
- @rules/common/ui-component-guidelines.md
- @rules/common/ui-styling-guidelines.md
- @rules/common/ui-project-structure.md
- @rules/common/error-handling-guidelines.md
- @rules/common/test-general.md
- @rules/common/test-e2e.md
- @rules/apollo/apollo-client-guidelines.md
- @rules/apollo/apollo-react-state-integration.md
- @rules/apollo/apollo-store-architecture.md
- @rules/react/react-component-guidelines.md
- @rules/react/react-state-management.md
- @rules/react/react-testing-guidelines.md
- @rules/solid.js/solidjs-component-guidelines.md
- @rules/solid.js/solid-state-management.md
- @rules/solid.js/solid-testing-guidelines.md
- @rules/astro.js/astro-component-guidelines.md
- @rules/astro.js/astro-project-structure.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/03 - Data Model.md`

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/typescript-guidelines.md for TypeScript standards
- [ ] Review @rules/common/ui-component-guidelines.md for component patterns
- [ ] Review @rules/common/ui-styling-guidelines.md for CSS and design token approach
- [ ] Review @rules/common/ui-project-structure.md for directory organization
- [ ] Review @rules/common/error-handling-guidelines.md for error management patterns
- [ ] Review @rules/common/test-general.md for testing strategy
- [ ] Review framework-specific state management rules based on chosen framework
- [ ] Review @rules/apollo/apollo-client-guidelines.md if using GraphQL
- [ ] Review @agents/seo-specialist.md for SEO requirements and implementation patterns

### Validation Questions

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

---

## Execution Checklist

### 1. Invoke Frontend Architect Agent

- [ ] Activate @agents/frontend-architect.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business requirements
- [ ] Review `_docs/design/02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/03 - Data Model.md` for data structure requirements
- [ ] Consult with @agents/system-architect.md for system integration patterns
- [ ] Consult with @agents/product-manager.md for user experience requirements
- [ ] Consult with @agents/seo-specialist.md for SEO requirements and technical implementation

### 3. Generate Frontend Architecture

- [ ] Use @templates/05 - Frontend Architecture.md structure
- [ ] Populate all 8 sections with specific technical details
- [ ] Ensure architecture decisions align with business requirements and system architecture
- [ ] Define component hierarchy and state management patterns
- [ ] Establish styling approach and design system integration

### 4. Apply Quality Standards

- [ ] Verify all technology choices have clear rationale
- [ ] Validate architecture supports stated success metrics and user experience goals
- [ ] Ensure accessibility and performance requirements are addressed
- [ ] Confirm testing strategy covers all architectural components

---

## Post-Validation Checklist

- [ ] All 8 template sections populated with specific technical details
- [ ] Frontend architecture decisions trace back to business requirements
- [ ] Technology stack choices justified with clear rationale
- [ ] Component architecture clearly defined with hierarchy
- [ ] State management strategy addresses all state types
- [ ] Testing strategy covers unit, integration, and E2E testing
- [ ] Performance and accessibility requirements explicitly addressed
- [ ] Store completed document in `_docs/design/05 - Frontend Architecture.md`

---

**Note**: All responses should follow @fragments/response-formatting.md
