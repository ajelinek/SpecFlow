# Workflow: 201 - High-Level Feature Design

**Objective**: Create the `D11 - Technical Design.md` document that defines the high-level business goals, user value proposition, and system flow for a new feature, establishing the foundation for detailed implementation planning.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- Specific feature ID from the Feature Overview document

## Validation Questions

1. **Business Purpose**: What business problem does this specific feature solve and what value does it provide?
2. **User Value**: How will this specific feature improve the user experience or solve user pain points?
3. **User Scenarios**: What are the primary user scenarios and workflows for this specific feature?
4. **User Journey**: How does this specific feature fit into the overall user journey?
5. **Acceptance Criteria**: What are the high-level acceptance criteria for this specific feature?

## Agents to Invoke

- [ ] Activate @vibing/agents/product-manager.md persona

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business context, user goals, and success metrics
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data access patterns
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for API design patterns
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture
- [ ] Review `_docs/design/D06 - UI Design.md` for design system guidelines
- [ ] Review `_docs/design/D07 - UI Experience Overview.md` for user journey architecture and navigation patterns
- [ ] Review relevant `_docs/ui-flows/[page-name].md` files for impacted screens
- [ ] Review `_docs/features/[feature-name]-Overview.md` for feature-specific business requirements

## Execute Checklist

**Content Creation**

- [ ] Use @vibing/templates/T11a - High-Level Design.md structure
- [ ] Replace `[F#] - [Feature Name]` with the specific feature name and ID
- [ ] **ONLY populate sections 1-2**: Feature Overview and User Journey
- [ ] **Leave sections 3-5 as TODO placeholders** - do not populate Change Summary Table, Implementation Details, or Test Scenarios
- [ ] Populate Feature Overview section with business purpose and user value for the specific feature
- [ ] Create User Journey diagram (section 2) showing user experience stages, emotions, and business outcomes

**Quality Assurance**

- [ ] Focus on business outcomes and user experience for the specific feature rather than technical implementation
- [ ] Specific feature name and ID clearly identified and used throughout document
- [ ] Feature overview clearly describes business purpose and user value for the specific feature
- [ ] User Journey diagram (section 2) accurately represents user experience stages, emotions, and business outcomes
- [ ] **VERIFY**: Only sections 1-2 are populated, sections 3-5 remain as TODO placeholders

**Completion**

- [ ] Store completed document in `_docs/features/in-progress/[specific-feature-name]-technical-design.md`

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
