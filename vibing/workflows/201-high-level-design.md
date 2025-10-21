# Workflow: 201 - High-Level Feature Design

**Objective**: Create the `D11 - Technical Design.md` document that defines the high-level business goals, user value proposition, and system flow for a new feature, establishing the foundation for detailed implementation planning.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/general-rules.md for foundational implementation standards

### Required Input

**MUST STOP** if the specific feature is not provided. Ask for the exact feature ID from the Feature Overview before proceeding.

### Validation Questions

1. **Business Purpose**: What business problem does this specific feature solve and what value does it provide?
2. **User Value**: How will this specific feature improve the user experience or solve user pain points?
3. **User Scenarios**: What are the primary user scenarios and workflows for this specific feature?
4. **User Stories**: What are the key user stories that define this specific feature's scope?
5. **Business Impact**: What is the expected business impact and ROI of this specific feature?
6. **User Journey**: How does this specific feature fit into the overall user journey?
7. **Acceptance Criteria**: What are the high-level acceptance criteria for this specific feature?

---

## Execution Checklist

### 1. Invoke Product Manager Agent

- [ ] Activate @agents/product-manager.md persona
- [ ] Confirm the specific feature name and ID from Feature Overview
- [ ] Review `_docs/design/D01 - Project Overview.md` for business context and success metrics
- [ ] Review `_docs/design/D10 - Feature Overview.md` for the specific feature requirements and user stories
- [ ] Validate business requirements and user value proposition for the specific feature

### 2. Generate High-Level Design

- [ ] Use @templates/T11 - Technical Design.md structure
- [ ] Replace `[F#] - [Feature Name]` with the specific feature name and ID
- [ ] Populate Feature Overview section with business purpose and user value for the specific feature
- [ ] Create System/User Flow section with Mermaid diagram showing user journey for the specific feature
- [ ] Focus on business outcomes and user experience for the specific feature rather than technical implementation

---

## Post-Validation Checklist

- [ ] Specific feature name and ID clearly identified and used throughout document
- [ ] All 2 template sections populated with business-focused details for the specific feature
- [ ] Feature overview clearly describes business purpose and user value for the specific feature
- [ ] System/User flow diagram accurately represents user journey and business workflow for the specific feature
- [ ] Focus on business outcomes for the specific feature rather than technical implementation
- [ ] Store completed document in `_docs/features/in-progress/[specific-feature-name]-technical-design.md`

---

**Note**: All responses should follow @fragments/response-formatting.md
