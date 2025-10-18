# Workflow: 108 - UI Page Design Generation

**Objective**: Create detailed page design specifications and wireframes for individual application pages, building upon the established UI design system and navigation architecture to create user-centered page designs.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/ui-component-guidelines.md for component usage patterns
- [ ] Review @rules/common/ui-styling-guidelines.md for styling approach
- [ ] Review @rules/common/ui-theme.md for theme and color system patterns
- [ ] Review @rules/common/ui-accessibility-guidelines.md for accessibility requirements

### Validation Questions

1. **Page Purpose**: What is the primary purpose and business objective of this specific page?
2. **User Goals**: What are the main user goals and tasks for this page?
3. **User Journey Context**: How does this page fit into the overall user journey and navigation flow?
4. **Content Requirements**: What specific content, data, and information needs to be displayed?
5. **User Interactions**: What user interactions and actions are possible on this page?
6. **Success Criteria**: What defines success for this page (conversion, engagement, task completion)?
7. **Page Priority**: What is the relative importance of this page in the overall application?
8. **Fluid Layout Requirements**: How should the page adapt fluidly across all screen sizes without breakpoints?
9. **Performance Requirements**: Are there specific performance requirements for this page?
10. **Accessibility Requirements**: Are there specific accessibility considerations for this page?
11. **Integration Points**: How does this page connect to other parts of the application?
12. **Data Dependencies**: What data sources and APIs does this page depend on?
13. **User Permissions**: What user roles and permissions affect this page's content and functionality?
14. **Error Scenarios**: What error states and edge cases need to be handled?
15. **Loading States**: What loading and transition states are needed?
16. **Existing Page Patterns**: What existing pages should this page be consistent with?
17. **Component Reuse**: What existing components and patterns can be reused from other pages?

---

## Execution Checklist

### 1. Invoke UI Designer Agent

- [ ] Activate @agents/ui-designer.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business context
- [ ] Review `_docs/design/02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/05 - Frontend Architecture.md` for component architecture
- [ ] Review `_docs/design/06 - UI Design.md` for design system guidelines
- [ ] Review `_docs/design/07 - UI Experience Overview.md` for navigation context
- [ ] Consult with @agents/ux-designer.md for user experience flow
- [ ] Consult with @agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @agents/product-manager.md for business requirements

### 2. Generate Page Design

- [ ] Use @templates/08 - UI Page Design.md structure
- [ ] Create high-fidelity SVG wireframes for major interactions (menus, modals, alerts, complex components)
- [ ] Create Mermaid user journey diagrams and flow diagrams showing mobile-first and desktop enhancement patterns
- [ ] Populate all 5 sections with core page design details
- [ ] Ensure page design aligns with established UI design system
- [ ] Define component usage and interaction patterns
- [ ] Establish fluid responsive behavior without breakpoints

### 3. Validate Against Existing Architecture

- [ ] Review existing page designs in `_docs/ui-flows/` for consistent patterns
- [ ] Identify reusable components and layouts from existing pages
- [ ] Ensure navigation patterns match established user flows
- [ ] Verify component usage aligns with existing page implementations
- [ ] Check for opportunities to extend existing component patterns rather than creating new ones

### 4. Apply Quality Standards

- [ ] Verify accessibility compliance and component usage
- [ ] Validate page design supports user goals and business objectives
- [ ] Ensure fluid responsive design works across all screen sizes
- [ ] Confirm integration with established design system
- [ ] Validate consistency with existing page architecture and patterns

---

## Post-Validation Checklist

- [ ] All 5 template sections populated with core page design details
- [ ] High-fidelity SVG wireframes created for major interactions (menus, modals, alerts, complex components)
- [ ] Mermaid user journey diagrams and flow diagrams created showing mobile-first and desktop enhancement patterns
- [ ] Page design traces back to user goals and business requirements
- [ ] Component usage references established design system components
- [ ] Interaction flow maps complete user journeys with clear feedback
- [ ] Fluid responsive behavior maintains usability across all screen sizes without breakpoints
- [ ] Accessibility requirements addressed with proper component usage
- [ ] Page design integrates with overall navigation and user experience
- [ ] Page design is consistent with existing page patterns and component usage
- [ ] Component reuse opportunities have been identified and implemented
- [ ] Navigation patterns align with established user flows from other pages
- [ ] Store completed document in `_docs/ui-flows/[PageName]/[PageName]-overview.md`
- [ ] Store all wireframes and flow diagrams in `_docs/ui-flows/[PageName]/` directory

---

**Note**: All responses should follow @fragments/response-formatting.md
