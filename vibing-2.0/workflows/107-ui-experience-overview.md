# Workflow: 107 - UI Experience Overview Generation

**Objective**: Create the `07 - UI Experience Overview.md` document that establishes comprehensive user experience architecture, navigation patterns, and user journey mapping for the application.

## Agents

- @agents/ux-designer.md
- @agents/ui-designer.md
- @agents/frontend-architect.md
- @agents/product-manager.md

## Template

- @templates/07 - UI Experience Overview.md

## Rules

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md
- @rules/common/ui-styling-guidelines.md
- @rules/common/ui-theme.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/05 - Frontend Architecture.md`
- `_docs/design/06 - UI Design.md`

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/ui-styling-guidelines.md for design system patterns
- [ ] Review @rules/common/ui-theme.md for theme and visual consistency patterns

### Business Requirements

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

1. **User Roles**: What are the primary user roles and their different access patterns?
2. **Application Structure**: What are the main functional areas or sections of the application?
3. **User Journeys**: What are the primary user journeys and tasks that need to be supported?
4. **Navigation Patterns**: What navigation patterns should be consistent across all pages?
5. **Entry Points**: What are the entry and exit points for each major user flow?
6. **Accessibility Requirements**: What accessibility standards need to be met for navigation and user flows?
7. **Device Support**: What devices and screen sizes need to be supported for user experience?
8. **Performance Requirements**: What are the performance requirements for user interactions and navigation?
9. **Search and Discovery**: Do you need search functionality and how should content be discoverable?
10. **User Feedback**: How should users understand their current location and progress through the application?

---

## Execution Checklist

### 1. Invoke UX Designer Agent

- [ ] Activate @agents/ux-designer.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business context and user goals
- [ ] Review `_docs/design/02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/05 - Frontend Architecture.md` for component architecture constraints
- [ ] Review `_docs/design/06 - UI Design.md` for established design system
- [ ] Consult with @agents/ui-designer.md for visual design integration
- [ ] Consult with @agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @agents/product-manager.md for user experience requirements

### 2. Research UX Patterns & Best Practices

- [ ] Use web search for latest UX design patterns and user journey mapping techniques
- [ ] Research accessibility best practices for navigation and user flows
- [ ] Verify current UX trends and interaction design patterns
- [ ] Research information architecture and navigation design principles

### 3. Generate UI Experience Overview

- [ ] Use @templates/07 - UI Experience Overview.md structure
- [ ] Populate all 8 sections with comprehensive UX strategy
- [ ] Ensure user experience decisions align with business requirements and design system
- [ ] Create user journey maps and navigation flow diagrams
- [ ] Create page inventory table with all application pages and routes
- [ ] Generate mermaid diagram showing screen flow and navigation paths

### 4. Apply Quality Standards

- [ ] Verify accessibility compliance and user experience rationale
- [ ] Validate UX strategy supports success metrics and user goals
- [ ] Ensure navigation patterns work across target devices and user roles
- [ ] Confirm user journey mapping covers all critical user paths

---

## Post-Validation Checklist

- [ ] All 8 template sections populated with comprehensive UX strategy
- [ ] User experience decisions trace back to business requirements and user goals
- [ ] Page inventory table includes all application pages with routes and descriptions
- [ ] Navigation flow diagram shows clear paths between screens with action labels
- [ ] Navigation architecture clearly defined with consistent patterns
- [ ] User journey mapping covers all critical paths and user roles
- [ ] Accessibility requirements addressed for navigation and user flows
- [ ] Store completed document in `_docs/design/07 - UI Experience Overview.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, UX Designer agent has generated comprehensive user experience overview, and document is stored in `_docs/design/07 - UI Experience Overview.md`.
