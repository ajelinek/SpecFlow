# Workflow: 107 - UI Experience Overview Generation

**Objective**: Create the `D07 - UI Experience Overview.md` document that establishes high-level user experience architecture and cross-cutting interaction patterns for the application.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @vibing/fragments/user-clarification.md

## Validation Questions

1. **Application Structure**: What are the primary purpose, user roles, and main functional areas?
2. **Navigation Philosophy**: What navigation approach, cross-platform patterns, and contextual navigation are needed?
3. **Information Architecture**: How should content hierarchy, discovery, and progressive disclosure work?
4. **Interaction Patterns**: What core interactions, accessibility, and error handling patterns are required?
5. **Page Structure**: What pages exist and what are their routes and purposes?

## Agents to Invoke

- [ ] Activate @vibing/agents/ux-designer.md persona
- [ ] Consult with @vibing/agents/ui-designer.md for visual design integration
- [ ] Consult with @vibing/agents/frontend-architect.md for implementation feasibility
- [ ] Consult with @vibing/agents/product-manager.md for user experience requirements

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business context and user goals
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture constraints
- [ ] Review `_docs/design/D06 - UI Design.md` for established design system

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T07 - UI Experience Overview.md structure
- [ ] Populate all template sections with strategic UX decisions

**Research & Analysis**

- [ ] Verify current UX trends and interaction design patterns
- [ ] Research information architecture and navigation design principles

**Quality Assurance**

- [ ] Keep content concise and actionable
- [ ] Verify accessibility compliance and user experience rationale
- [ ] Ensure navigation patterns work across target devices and user roles

**Completion**

- [ ] Store completed document in `_docs/design/D07 - UI Experience Overview.md`

**Note**: All responses should follow @vibing/fragments/response-formatting.md
