# Workflow: 101 - Project Overview Generation

**Objective**: Create the foundational `01 - Project Overview.md` document that establishes core business purpose, target users, and success criteria for the project.

## Agents

- @agents/product-manager.md
- @agents/domain-expert.md

## Template

- @templates/project-overview.md

## Rules:

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Business Context Requirements

1. **Pain Point Definition**: What specific problem does this application solve that existing solutions don't address well?
2. **Competitive Differentiation**: Who are direct competitors and how will this application differentiate itself?

### User Understanding Requirements

3. **User Workflows**: What are the most common user workflows in your target domain?
4. **User Personas**: Are there different user personas within each user type that have distinct needs?
5. **Platform Access**: What devices/platforms will users primarily access this application from?

### Success Criteria Requirements

6. **Minimum Viable Features**: What's the minimum viable feature set needed to deliver core value?
7. **User Feedback**: How will you measure user satisfaction and gather feedback?

### Technical Context Requirements

8. **System Integration**: Are there existing systems this application needs to integrate with?
9. **Scalability Requirements**: What are your scalability requirements (expected user volume, data size, geographic distribution)?
10. **Security/Compliance**: Are there specific security, compliance, or regulatory requirements?
11. **Deployment Environment**: What's your preferred deployment environment and infrastructure setup?

---

## Execution Checklist

### 1. Invoke Product Manager Agent

- [ ] Activate @agents/product-manager.md persona
- [ ] Apply business context analysis methodology
- [ ] Consult with the @agent/domain-expert.md persona to understand the domain

### 2. Generate Project Overview

- [ ] Use @templates/project-overview.md structure
- [ ] Populate Application Purpose & Value Proposition section
- [ ] Define Target Users & Their Goals with specific personas
- [ ] Create Key Business Scenarios (3-5 critical user journeys)
- [ ] Establish Success Metrics with measurable outcomes
- [ ] List Technology Constraints & Preferences
- [ ] Define High-Level Feature Categories

### 3. Apply Quality Standards

- [ ] Ensure business clarity (no technical jargon)
- [ ] Verify all sections are populated with specific content
- [ ] Validate examples are relevant and helpful
- [ ] Check logical flow and organization

---

## Post-Validation Checklist

### Content Completeness

- [ ] All 6 template sections populated with specific content
- [ ] No generic placeholders or assumptions
- [ ] Each section provides actionable business context

### Business Quality Validation

- [ ] Value proposition clearly differentiates from competitors
- [ ] User goals are specific and measurable
- [ ] Success metrics are quantifiable and relevant
- [ ] Technology constraints are business-justified

### Output Standards

- [ ] Document follows @rules/common/response-formatting.md
- [ ] Professional tone maintained throughout
- [ ] Clear, non-technical language used
- [ ] Logical flow between sections

### Final Delivery

- [ ] Store completed document in `_docs/design/Project_Overview.md`
- [ ] Confirm document is ready for stakeholder review
- [ ] Validate all business requirements are addressed

---

## Success Criteria

The workflow is complete when:

- All pre-flight validation requirements are met
- Product Manager agent has generated complete project overview
- Document meets all quality and formatting standards
- Output is stored in designated location and ready for use

## Final Output

Final output should follow the @rules/common/response-formatting.md
