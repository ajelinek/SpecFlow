# Agent Path Updater Modifier

**Purpose**: Automatically finds and updates all AGENT.md file references in workflows and agents to use the correct paths within the vibing framework.

## Overview

This modifier scans the entire vibing directory structure to:

1. Find all references to agent files (both `@agents/` and `@context/` patterns)
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
  - `global.AGENT.md`

## Reference Patterns to Update

### 1. Agent References in Workflows

**Pattern**: `@agents/{agent-name}.md`
**Correct Path**: `@vibing/agents/{agent-name}.md`

**Examples**:

- `@agents/product-manager.md` → `@vibing/agents/product-manager.md`
- `@agents/frontend-architect.md` → `@vibing/agents/frontend-architect.md`

### 2. Agent References in Other Agents

**Pattern**: `@agents/{agent-name}.md`
**Correct Path**: `@vibing/agents/{agent-name}.md`

### 3. Global Agent Context References

**Pattern**: `@context/global.AGENT.md`
**Correct Path**: `@vibing/context/global.AGENT.md`

## Execution Instructions

### Step 1: Scan for All Agent References

```bash
# Find all @agents/ references
grep -r "@agents/" vibing/ --include="*.md"

# Find all @context/ references
grep -r "@context/" vibing/ --include="*.md"
```

### Step 2: Update Workflow Files

For each workflow file in `vibing/workflows/`:

1. **Agent Section References**:

   - Update `@agents/{name}.md` → `@vibing/agents/{name}.md`

2. **Workflow Step References**:
   - Update `@agents/{name}.md` → `@vibing/agents/{name}.md`

### Step 3: Update Agent Files

For each agent file in `vibing/agents/`:

1. **Collaboration References**:
   - Update `@agents/{name}.md` → `@vibing/agents/{name}.md`

### Step 4: Update Context References

For any files referencing global context:

1. **Global Agent Context**:
   - Update `@context/global.AGENT.md` → `@vibing/context/global.AGENT.md`

## Validation Checklist

After updating all references, verify:

- [ ] All `@agents/` references now use `@vibing/agents/`
- [ ] All `@context/` references now use `@vibing/context/`
- [ ] No broken or missing agent references
- [ ] All workflow files can properly reference their required agents
- [ ] All agent files can properly reference their collaboration agents

## Files to Update

### Workflow Files (13 files)

- `vibing/workflows/101-project-overview.md`
- `vibing/workflows/102-system-architecture.md`
- `vibing/workflows/103-data-model.md`
- `vibing/workflows/104-backend-architecture.md`
- `vibing/workflows/105-frontend-architecture.md`
- `vibing/workflows/106-ui-design.md`
- `vibing/workflows/107-ui-experience-overview.md`
- `vibing/workflows/108-ui-page-design.md`
- `vibing/workflows/109-data-access-patterns.md`
- `vibing/workflows/110-feature-overview.md`
- `vibing/workflows/201-high-level-design.md`
- `vibing/workflows/202-test-scenario-design.md`
- `vibing/workflows/203-implementation-design.md`

### Agent Files (14 files)

- `vibing/agents/backend-architect.md`
- `vibing/agents/backend-engineer.md`
- `vibing/agents/data-architect.md`
- `vibing/agents/data-engineer.md`
- `vibing/agents/domain-expert.md`
- `vibing/agents/frontend-architect.md`
- `vibing/agents/frontend-engineer.md`
- `vibing/agents/product-manager.md`
- `vibing/agents/seo-specialist.md`
- `vibing/agents/system-architect.md`
- `vibing/agents/technical-architect.md`
- `vibing/agents/test-analyst.md`
- `vibing/agents/ui-designer.md`
- `vibing/agents/ux-designer.md`

### Modifier Files (1 file)

- `vibing/modifiers/technology-stack-analyzer.md`

## Expected Results

After execution, all agent references should follow the pattern:

- `@vibing/agents/{agent-name}.md` for individual agents
- `@vibing/context/global.AGENT.md` for global context

This ensures that:

1. All agent references are properly scoped to the vibing framework
2. File paths are consistent and unambiguous
3. The framework can be easily moved or reorganized without breaking references
4. All workflows and agents can properly locate their dependencies

## Usage

Execute this modifier whenever:

- Agent files are moved or renamed
- The framework structure is reorganized
- New agents are added and need proper referencing
- Path inconsistencies are discovered in the codebase

The modifier provides a systematic approach to maintaining correct agent references across the entire vibing framework.
