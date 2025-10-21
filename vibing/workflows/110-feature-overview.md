# Workflow: 110 - Feature Overview Generation

**Objective**: Create the `D10 - Feature Overview.md` document that provides a clear, actionable, and trackable plan for implementation by listing small, cross-cutting features that deliver end-to-end user value in vertical slices, following agile best practices while respecting foundational framework dependencies.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/general-rules.md for foundational implementation standards

### Validation Questions

1. **Foundational Frameworks**: What foundational frameworks must be built first (authentication, data models, basic UI components, API structure)?
2. **Vertical Slices**: What are the smallest possible user interactions that deliver end-to-end value (single user operation from UI to data)?
3. **User Journey**: What is the primary user journey that delivers the most value?
4. **Business Value**: What features provide the highest business value and user impact?
5. **Implementation Complexity**: Which features are easiest to implement with current team and technology?
6. **WSJF Scoring**: How would you rank features using Weighted Shortest Job First (business value ÷ implementation effort)?
7. **User Stories**: Do you have specific user stories or acceptance criteria for any features?
8. **Quick Wins**: What are the high-impact, low-effort features that can deliver early value?
9. **Cross-Cutting Features**: What features cut across all system layers (UI, API, data) to deliver complete user capabilities?
10. **End-to-End Value**: Which features deliver complete user value from frontend to backend in a single iteration?
11. **Foundation Dependencies**: Which features require foundational frameworks to be built first?

---

## Execution Checklist

### 1. Invoke Product Manager Agent

- [ ] Activate @agents/product-manager.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements and success metrics
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints and dependencies
- [ ] Review `_docs/design/D03 - Data Model.md` for data requirements and relationships
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for API and service dependencies
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component and UI dependencies
- [ ] Review `_docs/design/D06 - UI Design.md` for design system and user experience requirements
- [ ] Review `_docs/design/D07 - UI Experience Overview.md` for user journey and interaction patterns
- [ ] Review `_docs/design/D08 - UI Page Design.md` for page-specific requirements and functionality
- [ ] Review `_docs/design/D09 - Data Access Patterns and Objects.md` for data access requirements
- [ ] Review all UI flow documents in `_docs/ui-flows/` for user interaction requirements
- [ ] Consult with @agents/domain-expert.md for business domain knowledge and requirements validation
- [ ] Consult with @agents/system-architect.md for technical feasibility and architecture constraints
- [ ] Consult with @agents/frontend-architect.md for UI/UX implementation dependencies
- [ ] Consult with @agents/backend-architect.md for API and service implementation dependencies

### 2. Analyze Business Requirements and Vertical Slice Prioritization

- [ ] Extract business requirements from Project Overview document
- [ ] Identify user journeys and user stories from UI Experience Overview and UI Page Design
- [ ] Review UI flows to identify smallest possible user interactions
- [ ] Identify foundational frameworks that must be built first (not features)
- [ ] Break down large features into small, cross-cutting vertical slices
- [ ] Ensure each feature delivers end-to-end value (UI → API → Data → Response)
- [ ] Apply WSJF (Weighted Shortest Job First) methodology to prioritize vertical slices
- [ ] Evaluate features based on business value, user impact, and implementation complexity
- [ ] Prioritize high-impact, low-complexity vertical slices for early delivery
- [ ] Order features from foundational frameworks to vertical slice features

### 3. Generate Feature Overview Document

- [ ] Use @templates/T10 - Feature Overview.md template structure
- [ ] Populate all 2 sections with specific vertical slice features and user stories
- [ ] Apply WSJF scoring to rank vertical slices by business value and implementation effort
- [ ] Ensure features are listed in WSJF priority order (highest value/effort ratio first)
- [ ] Define clear user stories for each vertical slice feature
- [ ] Validate that foundational frameworks appear first (if needed)
- [ ] Ensure each feature is a small, cross-cutting vertical slice
- [ ] Focus on features that deliver complete end-to-end user value in single iterations
- [ ] Verify features cut across all system layers (UI, API, data) to deliver user capabilities

### 4. Apply Quality Standards

- [ ] Verify all features trace back to business requirements and user needs
- [ ] Ensure user stories are specific and actionable for vertical slices
- [ ] Validate WSJF scoring methodology was applied consistently
- [ ] Confirm high-impact, low-effort vertical slices are prioritized early
- [ ] Ensure feature ordering follows WSJF priority ranking
- [ ] Verify foundational frameworks are prioritized appropriately within WSJF framework
- [ ] Validate each feature is a small, cross-cutting vertical slice
- [ ] Confirm features deliver end-to-end user value from UI to data
- [ ] Ensure features are not layered but sliced across system layers

---

## Post-Validation Checklist

- [ ] All 2 template sections populated with specific vertical slice feature details
- [ ] Features listed in WSJF priority order (highest value/effort ratio first)
- [ ] Each feature is a small, cross-cutting vertical slice
- [ ] Each feature delivers end-to-end user value (UI → API → Data → Response)
- [ ] Each feature has clear user stories for complete user interactions
- [ ] WSJF scoring methodology applied consistently across all vertical slices
- [ ] High-impact, low-effort vertical slices prioritized early
- [ ] User stories are specific and actionable for single user operations
- [ ] Feature ordering follows WSJF priority ranking
- [ ] Foundational frameworks identified and prioritized appropriately
- [ ] Features cut across all system layers rather than being layered
- [ ] Document aligns with all design documents and business requirements
- [ ] Store completed document in `_docs/design/D10 - Feature Overview.md`

---

**Note**: All responses should follow @fragments/response-formatting.md
