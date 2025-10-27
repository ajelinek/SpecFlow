# Workflow: 108 - UI Page Design Generation

**Objective**: Create detailed page design specifications and wireframes for individual application pages, building upon the established UI design system and navigation architecture to create user-centered page designs.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @vibing/fragments/user-clarification.md

## Validation Questions

1. **Page Purpose & Goals**: What is the primary purpose, business objective, and main user goals for this page?
2. **User Journey Context**: How does this page fit into the overall user journey and navigation flow?
3. **Content & Interactions**: What content needs to be displayed and what user interactions are possible?
4. **Success Criteria**: What defines success (conversion, engagement, task completion) and page priority?
5. **Responsive Design**: How should the page adapt fluidly across all screen sizes and performance requirements?
6. **Integration Points**: How does this page connect to other parts of the application and data dependencies?
7. **User Permissions**: What user roles and permissions affect this page's content and functionality?
8. **Error & Loading States**: What error scenarios, edge cases, and loading states need to be handled?
9. **Design Consistency**: What existing pages and components should this page be consistent with for reuse?

## Agents to Invoke

- [ ] Activate @vibing/agents/ui-designer.md persona
- [ ] Consult with @vibing/agents/ux-designer.md for user experience flow
- [ ] Consult with @vibing/agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @vibing/agents/product-manager.md for business requirements

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business context
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture
- [ ] Review `_docs/design/D06 - UI Design.md` for design system guidelines
- [ ] Review `_docs/design/D07 - UI Experience Overview.md` for navigation context

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T08 - UI Page Design.md structure
- [ ] Populate all 5 sections with core page design details
- [ ] Create high-fidelity SVG wireframes for major interactions (menus, modals, alerts, complex components)
- [ ] Create Mermaid user journey diagrams and flow diagrams showing mobile-first and desktop enhancement patterns

**Design Consistency**

- [ ] Ensure page design aligns with established UI design system and component patterns
- [ ] Establish fluid responsive behavior and interaction patterns
- [ ] Review existing page designs in `_docs/ui-flows/` for consistent patterns
- [ ] Identify reusable components and layouts from existing pages
- [ ] Check for opportunities to extend existing component patterns rather than creating new ones

**Quality Assurance**

- [ ] Ensure navigation patterns match established user flows
- [ ] Verify component usage aligns with existing page implementations
- [ ] Verify accessibility compliance and component usage
- [ ] Validate page design supports user goals and business objectives
- [ ] Confirm integration with established design system and consistency with existing patterns
- [ ] Page design traces back to user goals and business requirements
- [ ] Component usage follows established design system and accessibility standards
- [ ] Fluid responsive behavior and interaction patterns support all screen sizes
- [ ] Design consistency with existing page patterns and component reuse opportunities
- [ ] Navigation integration aligns with established user flows

**Completion**

- [ ] Store completed document and assets in `_docs/ui-flows/[PageName]/` directory

**Note**: All responses should follow @vibing/fragments/response-formatting.md
