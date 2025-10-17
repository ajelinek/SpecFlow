# Workflow: 110 - Feature Overview Generation

**Objective**: Create the `10 - Feature Overview.md` document that provides a clear, actionable, and trackable plan for implementation by listing all features and their required user stories in a logical build order based on business requirements and technical architecture.

## Agents

- @agents/product-manager.md
- @agents/domain-expert.md
- @agents/system-architect.md
- @agents/frontend-architect.md
- @agents/backend-architect.md

## Template

- @templates/10 - Feature Overview.md

## Rules

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md
- @rules/common/general-rules.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/03 - Data Model.md`
- `_docs/design/04 - Backend Architecture.md`
- `_docs/design/05 - Frontend Architecture.md`
- `_docs/design/06 - UI Design.md`
- `_docs/design/07 - UI Experience Overview.md`
- `_docs/design/08 - UI Page Design.md`
- `_docs/design/09 - Data Access Patterns and Objects.md`
- `_docs/ui-flows/*.md` (all UI flow markdown documents)

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Validation Questions

1. **Foundational Features**: What are the core foundational features that must be built first (authentication, data models, basic UI)?
2. **App Differentiation**: What features differentiate this app from existing solutions in the market?
3. **User Journey**: What is the primary user journey that delivers the most value?
4. **Business Value**: What features provide the highest business value and user impact?
5. **Implementation Complexity**: Which features are easiest to implement with current team and technology?
6. **WSJF Scoring**: How would you rank features using Weighted Shortest Job First (business value ÷ implementation effort)?
7. **User Stories**: Do you have specific user stories or acceptance criteria for any features?
8. **Quick Wins**: What are the high-impact, low-effort features that can deliver early value?

---

## Execution Checklist

### 1. Invoke Product Manager Agent

- [ ] Activate @agents/product-manager.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business requirements and success metrics
- [ ] Review `_docs/design/02 - System Architecture.md` for technical constraints and dependencies
- [ ] Review `_docs/design/03 - Data Model.md` for data requirements and relationships
- [ ] Review `_docs/design/04 - Backend Architecture.md` for API and service dependencies
- [ ] Review `_docs/design/05 - Frontend Architecture.md` for component and UI dependencies
- [ ] Review `_docs/design/06 - UI Design.md` for design system and user experience requirements
- [ ] Review `_docs/design/07 - UI Experience Overview.md` for user journey and interaction patterns
- [ ] Review `_docs/design/08 - UI Page Design.md` for page-specific requirements and functionality
- [ ] Review `_docs/design/09 - Data Access Patterns and Objects.md` for data access requirements
- [ ] Review all UI flow documents in `_docs/ui-flows/` for user interaction requirements
- [ ] Consult with @agents/domain-expert.md for business domain knowledge and requirements validation
- [ ] Consult with @agents/system-architect.md for technical feasibility and architecture constraints
- [ ] Consult with @agents/frontend-architect.md for UI/UX implementation dependencies
- [ ] Consult with @agents/backend-architect.md for API and service implementation dependencies

### 2. Analyze Business Requirements and Feature Prioritization

- [ ] Extract business requirements from Project Overview document
- [ ] Identify user journeys and user stories from UI Experience Overview and UI Page Design
- [ ] Review UI flows to identify feature requirements and user interactions
- [ ] Identify foundational features that must be built first
- [ ] Determine features that differentiate the app from existing solutions
- [ ] Apply WSJF (Weighted Shortest Job First) methodology to prioritize features
- [ ] Evaluate features based on business value, user impact, and implementation complexity
- [ ] Prioritize high-impact, low-complexity features for early delivery
- [ ] Order features from foundational to advanced functionality

### 3. Generate Feature Overview Document

- [ ] Use @templates/10 - Feature Overview.md template structure
- [ ] Populate all 2 sections with specific feature details and user stories
- [ ] Apply WSJF scoring to rank features by business value and implementation effort
- [ ] Ensure features are listed in WSJF priority order (highest value/effort ratio first)
- [ ] Define clear user stories for each feature
- [ ] Validate that foundational features appear first
- [ ] Ensure high-impact, low-effort features are prioritized early
- [ ] Focus on features that deliver the most business value with least implementation complexity

### 4. Apply Quality Standards

- [ ] Verify all features trace back to business requirements and user needs
- [ ] Ensure user stories are specific and actionable
- [ ] Validate WSJF scoring methodology was applied consistently
- [ ] Confirm high-impact, low-effort features are prioritized early
- [ ] Ensure feature ordering follows WSJF priority ranking
- [ ] Verify foundational features are prioritized appropriately within WSJF framework

---

## Post-Validation Checklist

- [ ] All 2 template sections populated with specific feature details
- [ ] Features listed in WSJF priority order (highest value/effort ratio first)
- [ ] Each feature has clear user stories
- [ ] WSJF scoring methodology applied consistently across all features
- [ ] High-impact, low-effort features prioritized early
- [ ] User stories are specific and actionable
- [ ] Feature ordering follows WSJF priority ranking
- [ ] Document aligns with all design documents and business requirements
- [ ] Store completed document in `_docs/design/10 - Feature Overview.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, Product Manager agent has generated complete feature overview with logical build order, and document is stored in `_docs/design/10 - Feature Overview.md`.
