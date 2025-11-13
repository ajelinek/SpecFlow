# Workflow: 110 - Feature Overview Generation

**Objective**: Create the `D10 - Feature Overview.md` document that provides a clear, actionable, and trackable plan for implementation by listing small, cross-cutting features that deliver end-to-end user value in vertical slices, following agile best practices while respecting foundational framework dependencies.

## Validation Questions

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

## Agents to Invoke

- [ ] Activate @vibing/agents/product-manager.md persona
- [ ] Consult with @vibing/agents/domain-expert.md for business domain knowledge and requirements validation
- [ ] Consult with @vibing/agents/system-architect.md for technical feasibility and architecture constraints
- [ ] Consult with @vibing/agents/frontend-architect.md for UI/UX implementation dependencies
- [ ] Consult with @vibing/agents/backend-architect.md for API and service implementation dependencies

## Design Context

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

## Execute Checklist

**Analysis Phase**

- [ ] Extract business requirements from Project Overview document
- [ ] Identify user journeys and user stories from UI Experience Overview and UI Page Design
- [ ] Review UI flows to identify smallest possible user interactions
- [ ] Identify foundational frameworks that must be built first (not features)

**Feature Definition**

- [ ] Break down large features into small, cross-cutting vertical slices
- [ ] Ensure each feature delivers end-to-end value (UI → API → Data → Response)
- [ ] Define clear user stories for each vertical slice feature

**Prioritization**

- [ ] Apply WSJF methodology to prioritize vertical slices by business value and implementation effort
- [ ] Evaluate features based on business value, user impact, and implementation complexity
- [ ] Prioritize high-impact, low-complexity vertical slices for early delivery
- [ ] Order features from foundational frameworks to vertical slice features

**Content Creation**

- [ ] Use @vibing/templates/T10 - Feature Overview.md template structure
- [ ] Include a single, concise Feature Overview table at the top (no detailed stories/descriptions in any table)
- [ ] Populate exactly two sections: (1) Feature Build Order (overview table only), (2) Feature Details (H3 subheaders per feature with narrative details and bullet user stories)
- [ ] Apply WSJF scoring to rank vertical slices by business value and implementation effort; show only the WSJF Score in the overview table
- [ ] Ensure features are listed in WSJF priority order (highest value/effort ratio first)

**Quality Assurance**

- [ ] Validate WSJF methodology was applied consistently across all vertical slices
- [ ] Confirm high-impact, low-effort vertical slices are prioritized early
- [ ] Ensure feature ordering follows WSJF priority ranking
- [ ] Verify all features trace back to business requirements and user needs
- [ ] Document aligns with all design documents and business requirements
- [ ] Confirm no feature details (stories, descriptions, acceptance criteria) appear in tables; details belong only under per-feature H3 sections
- [ ] Ensure user stories are business-focused and avoid implementation details
- [ ] Ensure per-feature details include only: Scope (what it is and the scope of capability) and Dependencies (feature IDs only)

**Completion**

- [ ] Store completed document in `_docs/design/D10 - Feature Overview.md`

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
