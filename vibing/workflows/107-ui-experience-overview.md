# Workflow: 107 - UI Experience Overview Generation

**Objective**: Create the `D07 - UI Experience Overview.md` document that establishes comprehensive user experience architecture and navigation patterns for the application.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/ui-styling-guidelines.md for design system patterns
- [ ] Review @rules/common/ui-theme.md for theme and visual consistency patterns

### Validation Questions

1. **User Roles**: What are the primary user roles and their different access patterns?
2. **Application Structure**: What are the main functional areas or sections of the application?
3. **Navigation Patterns**: What navigation patterns should be consistent across all pages?
4. **Entry Points**: What are the entry and exit points for each major user flow?
5. **Accessibility Requirements**: What accessibility standards need to be met for navigation and user flows?
6. **Device Support**: What devices and screen sizes need to be supported for user experience?
7. **Performance Requirements**: What are the performance requirements for user interactions and navigation?
8. **Search and Discovery**: Do you need search functionality and how should content be discoverable?
9. **User Feedback**: How should users understand their current location and progress through the application?

---

## Execution Checklist

### 1. Invoke UX Designer Agent

- [ ] Activate @agents/ux-designer.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business context and user goals
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture constraints
- [ ] Review `_docs/design/D06 - UI Design.md` for established design system
- [ ] Consult with @agents/ui-designer.md for visual design integration
- [ ] Consult with @agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @agents/product-manager.md for user experience requirements

### 2. Research UX Patterns & Best Practices

- [ ] Verify current UX trends and interaction design patterns
- [ ] Research information architecture and navigation design principles

### 3. Generate UI Experience Overview

- [ ] Use @templates/T07 - UI Experience Overview.md structure
- [ ] Populate all 8 sections with comprehensive UX strategy
- [ ] Ensure user experience decisions align with business requirements and design system
- [ ] Create navigation flow diagrams
- [ ] Create page inventory table with all application pages and routes
- [ ] Generate mermaid diagram showing screen flow and navigation paths

### 4. Apply Quality Standards

- [ ] Verify accessibility compliance and user experience rationale
- [ ] Validate UX strategy supports success metrics and user goals
- [ ] Ensure navigation patterns work across target devices and user roles
- [ ] Confirm navigation patterns cover all critical user paths

---

## Post-Validation Checklist

- [ ] All 8 template sections populated with comprehensive UX strategy
- [ ] User experience decisions trace back to business requirements and user goals
- [ ] Page inventory table includes all application pages with routes and descriptions
- [ ] Navigation flow diagram shows clear paths between screens with action labels
- [ ] Navigation architecture clearly defined with consistent patterns
- [ ] Navigation patterns cover all critical paths and user roles
- [ ] Accessibility requirements addressed for navigation and user flows
- [ ] Store completed document in `_docs/design/D07 - UI Experience Overview.md`

---

**Note**: All responses should follow @fragments/response-formatting.md
