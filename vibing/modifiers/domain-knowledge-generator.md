# Domain Knowledge Generator

**Purpose**: Generate comprehensive domain knowledge file from user input, web research, and deep analysis.

## When to Use

- **New Projects**: Before or After project overview (101) but before system architecture (102)
- **Existing Projects**: When domain context is missing or outdated
- **Feature Development**: Before designing domain-specific features

## Prerequisites

- Project overview completed (T01 - Project Overview.md)
- Clear understanding of target domain and industry
- Access to research tools (web search, deep research capabilities)

## Instructions

### Step 1: Gather Domain Information

**Prompt**: "I need to generate comprehensive domain knowledge for this project. Please provide:

1. **Project Domain**: What industry/domain is this project targeting?
2. **Target Users**: Who are the primary users and their roles?
3. **Business Context**: What business problems are we solving?
4. **Regulatory Requirements**: Any industry-specific regulations or compliance needs?
5. **Key Workflows**: What are the primary user workflows in this domain?
6. **Success Metrics**: How do we measure success in this domain?"

### Step 2: Conduct Deep Research

**Research Sources**:

- Web search for latest industry trends and best practices
- Industry reports and white papers
- Regulatory documentation
- Competitor analysis
- User research and case studies

**Research Focus Areas**:

- Industry standards and best practices
- Common pain points and solutions
- Regulatory compliance requirements
- Technology trends in the domain
- User behavior patterns
- Success metrics and KPIs

### Step 3: Generate Domain Knowledge File

**File Location**: `vibing/context/domain-knowledge.md`

**Template Structure**:

```markdown
# Domain Knowledge

**Project**: [Project Name]
**Domain**: [Industry/Domain]
**Last Updated**: [Date]
**Research Sources**: [List of sources used]

## Domain Overview

### Industry Context

- Industry description and current state
- Key trends and challenges
- Market size and growth projections

### Target Users

- Primary user personas
- User roles and responsibilities
- User pain points and needs

## Business Requirements

### Core Business Problems

- Primary problems being solved
- Business value proposition
- Success criteria

### Regulatory & Compliance

- Industry regulations
- Compliance requirements
- Data protection needs

## Domain Workflows

### Primary User Journeys

- Key user workflows
- Decision points and branching
- Integration touchpoints

### Business Processes

- Core business processes
- Process dependencies
- Optimization opportunities

## Domain-Specific Considerations

### Technical Requirements

- Domain-specific technical needs
- Integration requirements
- Performance expectations

### Risk Factors

- Domain-specific risks
- Mitigation strategies
- Contingency planning

## Success Metrics

### Key Performance Indicators

- Primary success metrics
- Measurement methods
- Target values

### User Experience Metrics

- User satisfaction indicators
- Usability metrics
- Adoption metrics

## Research Sources

- [List all research sources]
- [Include links and references]
- [Note any assumptions made]
```

### Step 4: Validate and Refine

**Validation Questions**:

1. Does the domain knowledge align with project objectives?
2. Are all key stakeholders and user types covered?
3. Are regulatory requirements clearly identified?
4. Do workflows match real-world domain practices?
5. Are success metrics measurable and relevant?

**Refinement Process**:

- Review with domain experts if available
- Cross-reference with project requirements
- Update based on additional research
- Ensure consistency with project scope

## Output

**Primary Output**: `vibing/context/domain-knowledge.md`

## Best Practices

### Research Quality

- Use multiple sources for validation
- Prioritize recent and authoritative sources
- Include both quantitative and qualitative data
- Document assumptions and limitations

### Content Organization

- Structure information logically
- Use clear headings and sections
- Include specific examples and use cases
- Maintain consistent formatting
