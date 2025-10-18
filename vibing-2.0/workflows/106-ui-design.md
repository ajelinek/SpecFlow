# Workflow: 106 - UI Design Generation

**Objective**: Create the `06 - UI Design.md` document that establishes strategic design decisions and visual system principles for the application, focusing on design philosophy rather than implementation details.

## Agents

- @agents/ui-designer.md
- @agents/frontend-architect.md
- @agents/product-manager.md

## Template

- @templates/06 - UI Design.md

## Rules

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md

- @rules/common/ui-styling-guidelines.md
- @rules/common/ui-theme.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/05 - Frontend Architecture.md`

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/ui-styling-guidelines.md for CSS and design token approach
- [ ] Review @rules/common/ui-theme.md for theme and color system patterns

### Validation Questions

1. **Brand Identity**: What is the brand personality, tone, and visual identity (professional, playful, minimalist, bold)?
2. **Target Audience**: What are the primary user demographics and accessibility requirements?
3. **Device Support**: What devices and screen sizes need to be supported (mobile-first, desktop-first, responsive)?
4. **Theme Support**: Do you need light/dark theme support or single theme?
5. **Accessibility**: What accessibility standards need to be met (WCAG 2.1 AA, specific requirements)?
6. **Design System**: Do you have an existing design system or need to create one from scratch?
7. **Competitive Landscape**: Who are the main competitors and how should the design differentiate?

---

## Execution Checklist

### 1. Invoke UI Designer Agent

- [ ] Activate @agents/ui-designer.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business context and user goals
- [ ] Review `_docs/design/02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/05 - Frontend Architecture.md` for component architecture constraints
- [ ] Consult with @agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @agents/product-manager.md for user experience requirements

### 2. Research Design Systems & Patterns

- [ ] Verify typography choices for readability and brand alignment
- [ ] Research animation and interaction design best practices

### 3. Generate Strategic UI Design

- [ ] Use @templates/06 - UI Design.md structure
- [ ] Populate all 7 sections with strategic design decisions
- [ ] Research design system trends and accessibility best practices
- [ ] Ensure design philosophy aligns with business requirements and frontend architecture

### 3. Apply Quality Standards

- [ ] Verify accessibility compliance and design rationale
- [ ] Validate design strategy supports success metrics and user goals
- [ ] Ensure responsive design works across target devices

---

## Post-Validation Checklist

- [ ] All 7 template sections populated with strategic design decisions
- [ ] Design philosophy traces back to business requirements and user goals
- [ ] Accessibility compliance verified and design rationale clear
- [ ] Design strategy integrates with frontend framework architecture
- [ ] Store completed document in `_docs/design/06 - UI Design.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, UI Designer agent has generated strategic design philosophy, and document is stored in `_docs/design/06 - UI Design.md`.
