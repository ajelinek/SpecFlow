# Workflow: 106 - UI Design Generation

**Objective**: Create the `D06 - UI Design.md` document that establishes strategic design decisions and visual system principles for the application, focusing on design philosophy rather than implementation details.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

## Validation Questions

1. **Brand Identity**: What is the brand personality, tone, and visual identity (professional, playful, minimalist, bold)?
2. **Target Audience**: What are the primary user demographics and accessibility requirements?
3. **Device Support**: What devices and screen sizes need to be supported (mobile-first, desktop-first, responsive)?
4. **Theme Support**: Do you need light/dark theme support or single theme?
5. **Design System**: Do you have an existing design system or need to create one from scratch?
6. **Competitive Landscape**: Who are the main competitors and how should the design differentiate?

## Agents to Invoke

- [ ] Activate @agents/ui-designer.md persona
- [ ] Consult with @agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @agents/product-manager.md for user experience requirements

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business context and user goals
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture constraints

## Execute Checklist

- [ ] Verify typography choices for readability and brand alignment
- [ ] Research animation and interaction design best practices
- [ ] Use @templates/T06 - UI Design.md structure
- [ ] Populate all 7 sections with strategic design decisions
- [ ] Research design system trends and accessibility best practices
- [ ] Ensure design philosophy aligns with business requirements and frontend architecture
- [ ] Verify accessibility compliance and design rationale
- [ ] Validate design strategy supports success metrics and user goals
- [ ] Ensure responsive design works across target devices
- [ ] All 7 template sections populated with strategic design decisions
- [ ] Design philosophy traces back to business requirements and user goals
- [ ] Accessibility compliance verified and design rationale clear
- [ ] Design strategy integrates with frontend framework architecture
- [ ] Store completed document in `_docs/design/D06 - UI Design.md`

**Note**: All responses should follow @fragments/response-formatting.md
