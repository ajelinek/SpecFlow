# Workflow: 108 - UI Page Design Generation

**Objective**: Create detailed page design specifications and wireframes for individual application pages, building upon the established UI design system and navigation architecture to create user-centered page designs.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

## Validation Questions

1. **Page Purpose & Goals**: What is the primary purpose, business objective, and main user goals for this page?
2. **User Journey Context**: How does this page fit into the overall user journey and navigation flow?
3. **Content & Interactions**: What content needs to be displayed and what user interactions are possible?
4. **Responsive Design**: How should the page adapt fluidly across all screen sizes and performance requirements?
5. **User Permissions**: What user roles and permissions affect this page's content and functionality?

## Agents to Invoke

- [ ] Activate @vibing/agents/ui-designer.md persona
- [ ] Consult with @vibing/agents/ux-designer.md for user experience flow
- [ ] Consult with @vibing/agents/product-manager.md for business requirements

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business context
- [ ] Review `_docs/design/D06 - UI Design.md` for design system guidelines
- [ ] Review `_docs/design/D07 - UI Experience Overview.md` for navigation context

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T08 - UI Page Design.md structure
- [ ] Keep document concise - focus on data attributes and essential context not visible in wireframe
- [ ] Create ONE primary high-fidelity SVG wireframe showing complete page layout
- [ ] Include major interactions (menus, modals, alerts) and responsive states within the primary wireframe
- [ ] Wireframe is the primary design reference - document should be minimal supporting text

**Design Consistency**

- [ ] Ensure page design aligns with established UI design system and component patterns
- [ ] Establish fluid responsive behavior and interaction patterns
- [ ] Review existing page designs in `_docs/ui-flows/` for consistent patterns
- [ ] Identify reusable components and layouts from existing pages
- [ ] Check for opportunities to extend existing component patterns rather than creating new ones

**Quality Assurance**

- [ ] Ensure navigation patterns match established user flows
- [ ] Verify accessibility compliance and user experience standards
- [ ] Validate page design supports user goals and business objectives
- [ ] Confirm integration with established design system and consistency with existing patterns
- [ ] Page design traces back to user goals and business requirements
- [ ] Design patterns follow established design system and accessibility standards
- [ ] Fluid responsive behavior and interaction patterns support all screen sizes
- [ ] Design consistency with existing page patterns and visual language
- [ ] Navigation integration aligns with established user flows

**Completion**

- [ ] Store ONE overview.md document and ONE primary wireframe.svg in `_docs/ui-flows/[PageName]/` directory
- [ ] Only create additional files if specifically requested for complex interactions

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
