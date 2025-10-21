# AGENT.md Updator

**Purpose**: Automatically update and fix AGENT.md files to ensure compliance with structure guidelines, reference integrity, and content standards.

**Execution Context**: This is an LLM-executable modifier that performs systematic updates to AGENT.md files in the project, fixing issues and maintaining proper structure.

## Required Execution Steps

Execute the following update workflow:

### Phase 1: Discovery & Analysis

1. **Scan project** recursively for all `**/AGENT.md` files
2. **Analyze hierarchy** - determine parent/child relationships and directory depth
3. **Categorize files**:
   - **Higher-level**: src/, api/, ui/, backend/, frontend/, data/
   - **Lower-level**: components/, services/, utils/, features/, specific modules

### Phase 2: Structure Updates

For each AGENT.md file discovered:

**Update higher-level files** to ensure they have:

- Purpose & Scope section
- Structure (folder organization) section
- Agents (responsible agent) section
- Rules (applicable rules) section
- Key Interfaces section
- Conventions section
- Remove any detailed agent/rule sections that belong in lower-level files

**Update lower-level files** to ensure they have all 9 sections:

1. Project Overview & Purpose
2. Core Technologies & Stack
3. Architecture and Design Patterns
4. Code Style and Conventions
5. Component/Module Responsibilities
6. Testing Guidelines
7. Security Considerations
8. Configuration
9. Common Tasks

**Update all files** to ensure they have proper generation metadata.

### Phase 3: Reference Updates

1. **Extract references** from each file content
2. **Fix rule references** - ensure `@vibing/rules/` paths exist and are correct
3. **Fix agent references** - ensure `@vibing/agents/` paths exist and are correct
4. **Fix internal references** - ensure cross-references between AGENT.md files are valid
5. **Add missing references** where appropriate based on file context

### Phase 4: Content Quality Updates

1. **Remove rule duplication** - replace any copied rule content with proper references
2. **Fix placeholders** - replace generic placeholders like `[Brief description...]` with specific content
3. **Enhance specificity** - ensure content is project/directory-specific
4. **Fix formatting** - ensure consistent markdown structure throughout

### Phase 5: File System Updates

1. **Fix file naming** - rename any incorrectly named files to `AGENT.md`
2. **Fix file locations** - move misplaced files to appropriate directories
3. **Optimize file sizes** - ensure files are appropriately sized for their level
4. **Fix directory placement** - ensure files are in logical locations

### Phase 6: Maintenance Updates

1. **Update timestamps** - refresh modification metadata
2. **Update technology references** - ensure current technology versions
3. **Update rule references** - reflect any changes in vibing rules
4. **Update agent assignments** - ensure current team assignments

### Phase 7: Summary Generation

Generate update summary showing:

- Files processed and updated
- Issues found and fixed
- Files that required manual intervention
- Overall update status

## Update Scope

**This updator performs these actions**:

- **Structure Updates**: Ensures proper sections based on file level
- **Reference Fixes**: Corrects and validates @vibing/rules/ and @vibing/agents/ paths
- **Content Improvements**: Removes rule duplication, enhances specificity, fixes formatting
- **File System Corrections**: Renames files, moves to correct locations, optimizes sizes
- **Maintenance Updates**: Refreshes metadata, updates technology references

**This updator does NOT perform**:

- Rule file content modifications
- Code compliance validation
- Technical implementation changes
- Creation of new rule files

**Rule Authority**: vibing/rules/ files remain authoritative for technical standards.

## Update Rules

### Structure Updates

**Higher-level files** (src/, api/, ui/, backend/, frontend/, data/):

- Ensure sections: Purpose & Scope, Structure, Agents, Rules, Key Interfaces, Conventions
- Remove any detailed agent/rule sections that belong in lower-level files
- Add missing required sections

**Lower-level files** (components/, services/, utils/, features/):

- Ensure all 9 standard sections are present
- Add missing sections with appropriate content
- Maintain detailed agent and rule assignments

### Reference Updates

- `@vibing/rules/` paths must exist in vibing/rules/ - fix broken paths
- `@vibing/agents/` paths must exist in vibing/agents/ - fix broken paths
- Internal AGENT.md references must be valid - fix cross-references
- Add missing rule/agent references where contextually appropriate

### Content Updates

- Remove any duplication of rule file content
- Replace generic placeholders (`[Brief description...]`) with specific content
- Enhance content to be project/directory-specific
- Fix markdown formatting inconsistencies

### File System Updates

- Rename files to exactly `AGENT.md` if needed
- Move misplaced files to appropriate directories
- Ensure files are in logical locations
- Optimize file sizes (higher-level < 100 lines, lower-level < 200 lines)

## Maintenance Mode

For periodic maintenance, also perform:

- **Refresh timestamps** with current metadata
- **Update technology references** to current versions
- **Update rule references** to reflect vibing rules changes
- **Update agent assignments** for current team structure

## Output Format

Generate update summary in this format:

```
# AGENT.md Update Summary

## Summary
- Files Processed: [number]
- Files Updated: [number]
- Files Unchanged: [number]
- Issues Fixed: [number]
- Manual Intervention Needed: [number]

## Files Updated
1. **[File path]**
   - Actions: [list of fixes applied]
   - Status: [Updated/Fixed]

## Files Needing Manual Review
1. **[File path]**
   - Issue: [description of issue requiring human judgment]
   - Recommendation: [suggested manual action]

## Update Statistics
- Structure fixes: [number]
- Reference fixes: [number]
- Content improvements: [number]
- File system corrections: [number]
```

## Execution Notes

- **Focus on AGENT.md file updates only** - do not modify rule file content
- **Preserve existing content** where possible, only fix identified issues
- **Add contextual content** where sections are missing but contextually appropriate
- **Maintain file structure** while applying fixes
- **Log all changes** for transparency and rollback capability

## End of Execution Instructions
