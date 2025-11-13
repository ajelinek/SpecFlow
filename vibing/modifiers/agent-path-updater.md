# Agent Path Updater Modifier

**Purpose**: Automatically finds and updates all AGENTS.md file references in workflows and agents to use the correct paths within the vibing framework.

## Overview

This modifier scans the entire vibing directory structure to:

1. Find all references to agent files (both `@vibing/agents/` and `@vibing/context/` patterns)
2. Update incorrect or outdated paths
3. Ensure all agent references point to the correct files in the current structure

## Agent File Structure

### Current Agent Locations

- **Individual Agents**: `vibing/agents/`

  - `backend-architect.md`
  - `backend-engineer.md`
  - `data-architect.md`
  - `data-engineer.md`
  - `domain-expert.md`
  - `frontend-architect.md`
  - `frontend-engineer.md`
  - `product-manager.md`
  - `seo-specialist.md`
  - `system-architect.md`
  - `technical-architect.md`
  - `test-analyst.md`
  - `ui-designer.md`
  - `ux-designer.md`

- **Global Context**: `vibing/context/`
  - `global.AGENTS.md`

## Reference Patterns to Update

### 1. Agent References in Workflows

**Pattern**: `@vibing/agents/{agent-name}.md`
**Correct Path**: `@vibing/agents/{agent-name}.md`

**Examples**:

- `@vibing/agents/product-manager.md` → `@vibing/agents/product-manager.md`
- `@vibing/agents/frontend-architect.md` → `@vibing/agents/frontend-architect.md`

### 2. Agent References in Other Agents

**Pattern**: `@vibing/agents/{agent-name}.md`
**Correct Path**: `@vibing/agents/{agent-name}.md`

### 3. Global Agent Context References

**Pattern**: `@vibing/context/global.AGENTS.md`
**Correct Path**: `@vibing/context/global.AGENTS.md`

## Execution Instructions

### Safety First: File Protection

**CRITICAL**: Never modify these protected files:

- `vibing/context/AGENTS.md` - Contains global execution rules
- Any files in `vibing/rules/` - Authoritative technical standards
- Any files in `vibing/agents/` not explicitly listed in the update list

### Step 1: Dynamic Discovery & Analysis

1. **Build directory tree** - Analyze the complete project structure
2. **Identify AGENTS.md files** - Find all `**/AGENTS.md` files in the project
3. **Dynamic categorization** - Classify each AGENTS.md file as higher-level or lower-level:

**Dynamic Detection Logic**:

- **Higher-level**: Directories that primarily organize other directories (have multiple subdirectories with code)
- **Lower-level**: Directories that contain actual implementation files or are leaf nodes

**Examples**:

- `src/` → Higher-level (organizes components/, store/, etc.)
- `src/components/` → Lower-level (contains actual component files)
- `src/store/` → Lower-level (contains state management code)
- `api/` → Higher-level (organizes routes/, services/, etc.)
- `api/routes/` → Lower-level (contains actual route implementations)

4. **Scan for references** in appropriate files based on their level:
   - **Higher-level files**: Should NOT contain agent/rule references (scan to verify)
   - **Lower-level files**: Should contain appropriate agent/rule references (scan to update)

### Step 2: Update Lower-Level Files (Agent/Rule References)

For each dynamically identified lower-level AGENTS.md file:

1. **Agent Section References**:

   - Update `@vibing/agents/{name}.md` → `@vibing/agents/{name}.md`

2. **Workflow Step References**:

   - Update `@vibing/agents/{name}.md` → `@vibing/agents/{name}.md`

3. **Rule References**:

   - Update `@vibing/rules/{category}/{rule-file}.md` → `@vibing/rules/{category}/{rule-file}.md`
   - Update any other rule reference patterns to use `@vibing/rules/`

4. **Context References**:
   - Update `@vibing/context/global.AGENTS.md` → `@vibing/context/global.AGENTS.md`

### Step 3: Hierarchy Compliance Enforcement

For each dynamically identified AGENTS.md file:

**For Higher-Level Files** (organizational directories):

1. **Verify content appropriateness**:

   - Should contain ONLY: Purpose & Scope, Structure, Key Interfaces, Conventions
   - Should NOT contain: Agent assignments, Rule references, Implementation details (sections 5-9)

2. **Fix inappropriate content**:

   - Remove any agent references (`@vibing/agents/...`)
   - Remove any rule references (`@vibing/rules/...`)
   - Remove detailed implementation sections (5-9: Component Responsibilities, Testing, Security, Configuration, Common Tasks)
   - Keep only structural sections (1-4, but ensure they're appropriate for higher-level)

3. **Content analysis and potential relocation**:
   - If file has extensive implementation details (sections 5-9), it may be misclassified as higher-level
   - Consider suggesting relocation to appropriate lower-level directory
   - If file lacks implementation details but is classified as lower-level, consider moving to higher-level location

**For Lower-Level Files** (implementation directories):

1. **Verify appropriate references**:

   - Should contain agent and rule assignments
   - Should have detailed implementation sections
   - References should point to existing files

2. **Fix reference issues**:
   - Update broken agent references
   - Update broken rule references
   - Add missing contextual references based on file content

### Step 4: Validate Reference Integrity

1. **Verify all agent references** point to existing files in `vibing/agents/`
2. **Verify all rule references** point to existing files in `vibing/rules/`
3. **Verify all context references** point to existing files in `vibing/context/`
4. **Check for broken internal references** between AGENTS.md files

### Step 5: Hierarchy Enforcement

**CRITICAL**: Ensure proper hierarchy is maintained:

1. **Scan for violations**: Check if any higher-level directories (src/, api/, ui/, etc.) have agent or rule references
2. **Remove inappropriate references**: If found, remove agent and rule references from higher-level AGENTS.md files
3. **Verify lower-level files**: Ensure lower-level files (components/, services/) have appropriate agent and rule references
4. **Maintain structure**: Higher-level files should only describe folder structure, not contain agent assignments

## Validation Checklist

After updating all references, verify:

- [ ] **DYNAMIC HIERARCHY**: All dynamically identified higher-level directories contain ONLY structural content (Purpose & Scope, Structure, Key Interfaces, Conventions)
- [ ] **DYNAMIC HIERARCHY**: Higher-level files have NO agent or rule references
- [ ] **DYNAMIC HIERARCHY**: All dynamically identified lower-level directories have appropriate agent and rule references and implementation details
- [ ] All `@vibing/agents/` references now use `@vibing/agents/` (in lower-level files only)
- [ ] All `@vibing/rules/` references now use `@vibing/rules/` (in lower-level files only)
- [ ] All rule reference patterns use `@vibing/rules/`
- [ ] All `@vibing/context/` references now use `@vibing/context/` (in appropriate files)
- [ ] No broken or missing agent references in updated files
- [ ] All lower-level files can properly reference their required agents and rules
- [ ] **CRITICAL**: Root AGENTS.md file (`vibing/context/AGENTS.md`) was NOT modified
- [ ] **CRITICAL**: Rule files in `vibing/rules/` were NOT modified
- [ ] **CRITICAL**: Only dynamically identified lower-level files were updated for agent/rule references
- [ ] **STRUCTURE**: Higher-level files contain only structural content (Purpose & Scope, Structure, Key Interfaces, Conventions)
- [ ] **STRUCTURE**: Lower-level files contain detailed agent and rule assignments

## Files Updated (Dynamic Discovery)

**Workflow Files** - All files in `vibing/workflows/` that contain AGENTS.md references:

- Dynamically discovered based on content analysis
- Updated for agent and context references

**Agent Files** - All files in `vibing/agents/` that contain collaboration references:

- Dynamically discovered based on content analysis
- Updated for agent and context references

**Modifier Files** - Files in `vibing/modifiers/` that contain agent references:

- Dynamically discovered based on content analysis
- Updated for agent and context references

**Lower-Level AGENTS.md Files** - All dynamically identified lower-level AGENTS.md files:

- Updated for agent and rule references based on their level classification
- References added/updated based on file content and context

### Files to Protect (Never Update)

**Root/Global Context Files** - These contain critical system instructions:

- `vibing/context/AGENTS.md` - **DO NOT MODIFY** - Contains global execution rules
- Any other files in `vibing/context/` that are not project-specific AGENTS.md files

**Rule Files** - These contain authoritative technical standards:

- All files in `vibing/rules/` - **DO NOT MODIFY** - Rule content is authoritative
- All files in `vibing/agents/` that are referenced but not in the update list above

## Expected Results

After execution, the following dynamic hierarchy should be maintained:

**Higher-level directories** (dynamically identified organizational directories):

- AGENTS.md files contain ONLY: Purpose & Scope, Structure, Key Interfaces, Conventions
- **NO agent references** (`@vibing/agents/...`)
- **NO rule references** (`@vibing/rules/...`)
- **NO implementation details** (sections 5-9: Component Responsibilities, Testing, Security, Configuration, Common Tasks)
- These files describe folder organization and high-level patterns, not specific implementations

**Lower-level directories** (dynamically identified implementation directories):

- AGENTS.md files contain detailed agent and rule assignments
- Agent references point to `@vibing/agents/{agent-name}.md`
- Rule references point to `@vibing/rules/{category}/{rule-file}.md`
- Include implementation details (sections 5-9) appropriate for the specific component/service

**Protected Files**: The following files are NEVER modified:

- `vibing/context/AGENTS.md` - Contains critical global execution rules
- All files in `vibing/rules/` - Authoritative technical standards

This ensures that:

1. Agent and rule references only appear in dynamically identified lower-level directories
2. Higher-level files focus on describing folder structure and organization
3. The framework maintains proper separation of concerns using dynamic discovery
4. All workflows and agents can properly locate their dependencies
5. Critical system files remain untouched and authoritative

## Usage

Execute this modifier whenever:

- Agent files are moved or renamed (dynamically discovered files)
- The framework structure is reorganized (dynamic hierarchy detection)
- New agents are added and need proper referencing (dynamic discovery)
- Path inconsistencies are discovered (comprehensive scanning)
- Hierarchy violations are detected (enforcement of proper structure)

**Dynamic Discovery & Enforcement**: The modifier uses intelligent analysis to:

- Discover all AGENTS.md files in the project
- Dynamically classify them as higher-level (organizational) or lower-level (implementation)
- Apply appropriate updates based on file level and content
- **Enforce content compliance** - remove inappropriate content from misclassified files
- **Suggest relocations** for files that don't match their directory level
- Maintain proper separation of concerns with active enforcement

**Safety Note**: This modifier uses dynamic discovery and never modifies:

- `vibing/context/AGENTS.md` (global execution rules)
- `vibing/rules/` files (authoritative technical standards)
- Files not dynamically identified for updates

The modifier provides a systematic approach to maintaining correct agent references across the vibing framework using dynamic discovery and intelligent hierarchy enforcement.
