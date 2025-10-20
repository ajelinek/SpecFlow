# Agent Path Updater Modifier

**Purpose**: Automatically finds and updates all AGENT.md file references in workflows and agents to use the correct paths within the vibing-2.0 framework.

## Overview

This modifier scans the entire vibing-2.0 directory structure to:

1. Find all references to agent files (both `@agents/` and `@context/` patterns)
2. Update incorrect or outdated paths
3. Ensure all agent references point to the correct files in the current structure

## Agent File Structure

### Current Agent Locations

- **Individual Agents**: `vibing-2.0/agents/`

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

- **Global Context**: `vibing-2.0/context/`
  - `global.AGENT.md`

## Reference Patterns to Update

### 1. Agent References in Workflows

**Pattern**: `@agents/{agent-name}.md`
**Correct Path**: `@vibing-2.0/agents/{agent-name}.md`

**Examples**:

- `@agents/product-manager.md` → `@vibing-2.0/agents/product-manager.md`
- `@agents/frontend-architect.md` → `@vibing-2.0/agents/frontend-architect.md`

### 2. Agent References in Other Agents

**Pattern**: `@agents/{agent-name}.md`
**Correct Path**: `@vibing-2.0/agents/{agent-name}.md`

### 3. Global Agent Context References

**Pattern**: `@context/global.AGENT.md`
**Correct Path**: `@vibing-2.0/context/global.AGENT.md`

## Execution Instructions

### Step 1: Scan for All Agent References

```bash
# Find all @agents/ references
grep -r "@agents/" vibing-2.0/ --include="*.md"

# Find all @context/ references
grep -r "@context/" vibing-2.0/ --include="*.md"
```

### Step 2: Update Workflow Files

For each workflow file in `vibing-2.0/workflows/`:

1. **Agent Section References**:

   - Update `@agents/{name}.md` → `@vibing-2.0/agents/{name}.md`

2. **Workflow Step References**:
   - Update `@agents/{name}.md` → `@vibing-2.0/agents/{name}.md`

### Step 3: Update Agent Files

For each agent file in `vibing-2.0/agents/`:

1. **Collaboration References**:
   - Update `@agents/{name}.md` → `@vibing-2.0/agents/{name}.md`

### Step 4: Update Context References

For any files referencing global context:

1. **Global Agent Context**:
   - Update `@context/global.AGENT.md` → `@vibing-2.0/context/global.AGENT.md`

## Validation Checklist

After updating all references, verify:

- [ ] All `@agents/` references now use `@vibing-2.0/agents/`
- [ ] All `@context/` references now use `@vibing-2.0/context/`
- [ ] No broken or missing agent references
- [ ] All workflow files can properly reference their required agents
- [ ] All agent files can properly reference their collaboration agents

## Files to Update

### Workflow Files (13 files)

- `vibing-2.0/workflows/101-project-overview.md`
- `vibing-2.0/workflows/102-system-architecture.md`
- `vibing-2.0/workflows/103-data-model.md`
- `vibing-2.0/workflows/104-backend-architecture.md`
- `vibing-2.0/workflows/105-frontend-architecture.md`
- `vibing-2.0/workflows/106-ui-design.md`
- `vibing-2.0/workflows/107-ui-experience-overview.md`
- `vibing-2.0/workflows/108-ui-page-design.md`
- `vibing-2.0/workflows/109-data-access-patterns.md`
- `vibing-2.0/workflows/110-feature-overview.md`
- `vibing-2.0/workflows/201-high-level-design.md`
- `vibing-2.0/workflows/202-test-scenario-design.md`
- `vibing-2.0/workflows/203-implementation-design.md`

### Agent Files (14 files)

- `vibing-2.0/agents/backend-architect.md`
- `vibing-2.0/agents/backend-engineer.md`
- `vibing-2.0/agents/data-architect.md`
- `vibing-2.0/agents/data-engineer.md`
- `vibing-2.0/agents/domain-expert.md`
- `vibing-2.0/agents/frontend-architect.md`
- `vibing-2.0/agents/frontend-engineer.md`
- `vibing-2.0/agents/product-manager.md`
- `vibing-2.0/agents/seo-specialist.md`
- `vibing-2.0/agents/system-architect.md`
- `vibing-2.0/agents/technical-architect.md`
- `vibing-2.0/agents/test-analyst.md`
- `vibing-2.0/agents/ui-designer.md`
- `vibing-2.0/agents/ux-designer.md`

### Modifier Files (1 file)

- `vibing-2.0/modifiers/technology-stack-analyzer.md`

## Expected Results

After execution, all agent references should follow the pattern:

- `@vibing-2.0/agents/{agent-name}.md` for individual agents
- `@vibing-2.0/context/global.AGENT.md` for global context

This ensures that:

1. All agent references are properly scoped to the vibing-2.0 framework
2. File paths are consistent and unambiguous
3. The framework can be easily moved or reorganized without breaking references
4. All workflows and agents can properly locate their dependencies

## Usage

Execute this modifier whenever:

- Agent files are moved or renamed
- The framework structure is reorganized
- New agents are added and need proper referencing
- Path inconsistencies are discovered in the codebase

The modifier provides a systematic approach to maintaining correct agent references across the entire vibing-2.0 framework.
