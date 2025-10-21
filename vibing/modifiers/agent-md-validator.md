# AGENT.md Validator

**Purpose**: Execute comprehensive validation of AGENT.md files for compliance with structure guidelines, reference integrity, and content standards.

**Execution Context**: This is an LLM-executable modifier that performs systematic validation of AGENT.md files in the project.

## Required Execution Steps

Execute the following validation workflow:

### Phase 1: Discovery & Analysis

1. **Scan project** recursively for all `**/AGENT.md` files
2. **Analyze hierarchy** - determine parent/child relationships and directory depth
3. **Categorize files**:
   - **Higher-level**: src/, api/, ui/, backend/, frontend/, data/
   - **Lower-level**: components/, services/, utils/, features/, specific modules

### Phase 2: Structure Validation

For each AGENT.md file:

**Higher-level files** must have:

- Purpose & Scope
- Structure (folder organization)
- Agents (responsible agent)
- Rules (applicable rules)
- Key Interfaces
- Conventions

**Lower-level files** must have all 9 sections:

1. Project Overview & Purpose
2. Core Technologies & Stack
3. Architecture and Design Patterns
4. Code Style and Conventions
5. Component/Module Responsibilities
6. Testing Guidelines
7. Security Considerations
8. Configuration
9. Common Tasks

**All files** must have generation metadata.

### Phase 3: Reference Validation

1. **Extract references** from each file content
2. **Verify rule references** - `@vibing/rules/` paths must exist in vibing/rules/
3. **Verify agent references** - `@vibing/agents/` paths must exist in vibing/agents/
4. **Check internal references** - cross-references between AGENT.md files must be valid

### Phase 4: Content Quality Validation

1. **Check for rule duplication** - no copying of rule file content
2. **Validate placeholders** - no generic placeholders like `[Brief description...]`
3. **Assess specificity** - content must be project/directory-specific
4. **Verify formatting** - consistent markdown structure

### Phase 5: File System Validation

1. **File naming** - must be exactly `AGENT.md`
2. **File location** - appropriate directory placement
3. **File size** - higher-level < 100 lines, lower-level < 200 lines preferred
4. **Directory logic** - files in appropriate locations

### Phase 6: Output Generation

Generate validation report with:

- Files scanned and categorization
- Issues found with specific locations
- Critical vs warning classifications
- Fix recommendations for each issue
- Overall compliance percentage

## Validation Scope

**This validator ONLY checks**:

- AGENT.md file structure compliance
- Reference validity (@vibing/rules/, @vibing/agents/)
- Content quality (no rule duplication, specificity)
- File system standards (naming, location, size)

**This validator does NOT check**:

- Rule file content accuracy
- Code compliance with rules
- Technical implementation details
- Rule file modifications

**Rule Authority**: vibing/rules/ files are authoritative for technical standards.

## Validation Rules

### Structure Requirements

**Higher-level files** (src/, api/, ui/, backend/, frontend/, data/):

- Sections: Purpose & Scope, Structure, Agents, Rules, Key Interfaces, Conventions
- No detailed agent/rule sections

**Lower-level files** (components/, services/, utils/, features/):

- All 9 standard sections required
- Detailed agent and rule assignments allowed

### Reference Standards

- `@vibing/rules/` paths must exist in vibing/rules/
- `@vibing/agents/` paths must exist in vibing/agents/
- Internal AGENT.md references must be valid

### Content Standards

- No duplication of rule file content
- No generic placeholders (`[Brief description...]`)
- Project/directory-specific content only
- Consistent markdown formatting

### File Standards

- Exact naming: `AGENT.md` only
- Appropriate directory placement
- Size guidelines: higher-level < 100 lines, lower-level < 200 lines

## Maintenance Mode (Optional)

For periodic maintenance checks, also validate:

- **File freshness**: Recent modification timestamps
- **Technology currency**: Current technology references
- **Rule evolution**: vibing rules changes affecting AGENT.md files
- **Team updates**: Agent assignment changes needed

## Output Format

Generate report in this exact format:

```
# AGENT.md Validation Report

## Summary
- Files Scanned: [number]
- Higher-Level Files: [number]
- Lower-Level Files: [number]
- Critical Issues: [number]
- Warning Issues: [number]
- Overall Compliance: [percentage]%

## Critical Issues (Must Fix)
1. **[Issue description]**
   - File: [file path]
   - Details: [specific problem]
   - Fix: [recommended action]

## Warning Issues (Should Fix)
1. **[Issue description]**
   - File: [file path]
   - Details: [specific problem]
   - Fix: [recommended action]

## Maintenance Recommendations
- [List specific maintenance actions needed]
- [Prioritized by urgency and impact]
```

## Execution Notes

- **Focus on AGENT.md files only** - do not validate rule file content
- **Reference validation** - ensure @vibing/rules/ and @vibing/agents/ paths exist
- **Structure compliance** - verify correct sections based on file level
- **No rule duplication** - AGENT.md files must reference, not copy rule content

## End of Execution Instructions
