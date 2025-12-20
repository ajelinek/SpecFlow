# OpenCode Configuration Setup Guide

**You are an intelligent configuration assistant** responsible for generating comprehensive `opencode.json` files that properly configure OpenCode for any project. Your goal is to create a complete configuration that includes all custom agents and sets up the root AGENTS.md file as part of the global context.

## Purpose

This guide provides a detailed prompt for creating `opencode.json` files that implement a **Dual Reference System** supporting both OpenCode subagents and Cursor full path references simultaneously:

1. Define all custom sub-agents with their configurations for OpenCode
2. Load the root `AGENTS.md` file into the global context
3. Set appropriate temperature values for different agent types
4. Follow OpenCode best practices for agent configuration
5. **Maintain backward compatibility** with Cursor by keeping full path references alongside OpenCode short format
6. **Enable simultaneous usage** of both reference formats in all documentation

## Configuration Structure

The `opencode.json` file must include:

- **`$schema`**: Reference to OpenCode's JSON schema for validation
- **`prompt`**: File reference to load the root AGENTS.md into global context
- **`agent`**: Object defining all custom agents with their configurations
  - **Subagents**: Most agents are configured with `"mode": "subagent"` for delegation and task execution
  - **Primary Agents**: Some agents (like `research-agent`) are configured with `"mode": "primary"` and may have additional restrictions (e.g., `"readOnly": true` for read-only access)

## Agent Temperature Guidelines

Different agent types require different temperature settings for optimal performance:

| Agent Type                   | Temperature | Reasoning                                                                    |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------- |
| **Implementation Engineers** | 0.2         | Low creativity needed; focus on precise code generation                      |
| **Test Engineers**           | 0.15        | Very precise; test code must be exact and predictable                        |
| **Analysts**                 | 0.1         | Minimal creativity; analytical work requires consistency                     |
| **Architects**               | 0.3         | Moderate creativity; design decisions need some flexibility                  |
| **Product/Business**         | 0.5         | Higher creativity; feature planning benefits from exploration                |
| **Domain Experts**           | 0.8         | High creativity; domain knowledge application is exploratory                 |
| **Designers**                | 0.7         | High creativity; design work benefits from creative thinking                 |
| **Research Agents**          | 0.4         | Moderate creativity; research requires exploration with analytical precision |
| **Specialists**              | 0.15-0.2    | Low creativity; specialized tasks require precision                          |

## Standard Agent Definitions

Based on the OpenCode agent system, these are the standard agents to include:

### Core Engineering Agents

1. **backend-engineer**

   - **Description**: Backend service implementation, API development, and server-side coding
   - **Temperature**: 0.2
   - **Mode**: subagent

2. **frontend-engineer**

   - **Description**: Frontend component implementation, UI development, and client-side coding
   - **Temperature**: 0.2
   - **Mode**: subagent

3. **data-engineer**

   - **Description**: Data layer implementation, database operations, and data service development
   - **Temperature**: 0.2
   - **Mode**: subagent

4. **test-automation-engineer**
   - **Description**: Test automation implementation, Playwright E2E testing, and test framework development
   - **Temperature**: 0.2
   - **Mode**: subagent

### Architecture Agents

5. **system-architect**

   - **Description**: Overall system architecture, technology stack decisions, and high-level design patterns
   - **Temperature**: 0.3
   - **Mode**: subagent

6. **backend-architect**

   - **Description**: Backend service architecture, API design patterns, and server-side implementation strategies
   - **Temperature**: 0.3
   - **Mode**: subagent

7. **frontend-architect**

   - **Description**: Frontend architecture, component patterns, and user interface design strategies
   - **Temperature**: 0.3
   - **Mode**: subagent

8. **data-architect**
   - **Description**: Data modeling, database design, and data flow architecture
   - **Temperature**: 0.3
   - **Mode**: subagent

### Analysis & Validation Agents

9. **technical-architect**

   - **Description**: Technical implementation validation, code quality assurance, and architectural compliance
   - **Temperature**: 0.1
   - **Mode**: subagent

10. **test-analyst**
    - **Description**: Test strategy, scenario analysis, and test coverage planning
    - **Temperature**: 0.1
    - **Mode**: subagent

### Product & Domain Agents

11. **product-manager**

    - **Description**: Product strategy, feature planning, and business requirements
    - **Temperature**: 0.5
    - **Mode**: subagent

12. **domain-expert**
    - **Description**: Domain knowledge, business logic, and specialized expertise
    - **Temperature**: 0.8
    - **Mode**: subagent

### Design Agents

13. **ui-designer**

    - **Description**: User interface design, component design, and visual design patterns
    - **Temperature**: 0.7
    - **Mode**: subagent

14. **ux-designer**
    - **Description**: User experience design, interaction patterns, and usability strategies
    - **Temperature**: 0.7
    - **Mode**: subagent

### Research Agents

15. **research-agent**
    - **Description**: Comprehensive research, technology evaluation, and solution analysis using codebase, internet, Context7, and documentation
    - **Temperature**: 0.4
    - **Mode**: primary (not a subagent; read-only access; no file modification permissions)
    - **Note**: This is a primary agent configured at the root level, not a subagent. It has read-only access and focuses exclusively on research and analysis.

### Specialist Agents

16. **seo-specialist**

    - **Description**: SEO optimization, search engine strategies, and content optimization
    - **Temperature**: 0.2
    - **Mode**: subagent

17. **code-cleanup-specialist**

    - **Description**: Code cleanup, refactoring, and code quality improvement
    - **Temperature**: 0.15
    - **Mode**: subagent

18. **test-cleanup-specialist**
    - **Description**: Test cleanup, maintenance, and test optimization
    - **Temperature**: 0.15
    - **Mode**: subagent

## Complete Configuration Template

```json
{
  "$schema": "https://opencode.ai/config.json",
  "prompt": "{file:./AGENTS.md}",
  "agent": {
    "backend-engineer": {
      "description": "Backend service implementation, API development, and server-side coding",
      "mode": "subagent",
      "temperature": 0.2,
      "prompt": "{file:./vibing/agents/backend-engineer.md}"
    },
    "frontend-engineer": {
      "description": "Frontend component implementation, UI development, and client-side coding",
      "mode": "subagent",
      "temperature": 0.2,
      "prompt": "{file:./vibing/agents/frontend-engineer.md}"
    },
    "data-engineer": {
      "description": "Data layer implementation, database operations, and data service development",
      "mode": "subagent",
      "temperature": 0.2,
      "prompt": "{file:./vibing/agents/data-engineer.md}"
    },
    "test-automation-engineer": {
      "description": "Test automation implementation, Playwright E2E testing, and test framework development",
      "mode": "subagent",
      "temperature": 0.2,
      "prompt": "{file:./vibing/agents/test-automation-engineer.md}"
    },
    "system-architect": {
      "description": "Overall system architecture, technology stack decisions, and high-level design patterns",
      "mode": "subagent",
      "temperature": 0.3,
      "prompt": "{file:./vibing/agents/system-architect.md}"
    },
    "backend-architect": {
      "description": "Backend service architecture, API design patterns, and server-side implementation strategies",
      "mode": "subagent",
      "temperature": 0.3,
      "prompt": "{file:./vibing/agents/backend-architect.md}"
    },
    "frontend-architect": {
      "description": "Frontend architecture, component patterns, and user interface design strategies",
      "mode": "subagent",
      "temperature": 0.3,
      "prompt": "{file:./vibing/agents/frontend-architect.md}"
    },
    "data-architect": {
      "description": "Data modeling, database design, and data flow architecture",
      "mode": "subagent",
      "temperature": 0.3,
      "prompt": "{file:./vibing/agents/data-architect.md}"
    },
    "technical-architect": {
      "description": "Technical implementation validation, code quality assurance, and architectural compliance",
      "mode": "subagent",
      "temperature": 0.1,
      "prompt": "{file:./vibing/agents/technical-architect.md}"
    },
    "test-analyst": {
      "description": "Test strategy, scenario analysis, and test coverage planning",
      "mode": "subagent",
      "temperature": 0.1,
      "prompt": "{file:./vibing/agents/test-analyst.md}"
    },
    "product-manager": {
      "description": "Product strategy, feature planning, and business requirements",
      "mode": "subagent",
      "temperature": 0.5,
      "prompt": "{file:./vibing/agents/product-manager.md}"
    },
    "domain-expert": {
      "description": "Domain knowledge, business logic, and specialized expertise",
      "mode": "subagent",
      "temperature": 0.8,
      "prompt": "{file:./vibing/agents/domain-expert.md}"
    },
    "ui-designer": {
      "description": "User interface design, component design, and visual design patterns",
      "mode": "subagent",
      "temperature": 0.7,
      "prompt": "{file:./vibing/agents/ui-designer.md}"
    },
    "ux-designer": {
      "description": "User experience design, interaction patterns, and usability strategies",
      "mode": "subagent",
      "temperature": 0.7,
      "prompt": "{file:./vibing/agents/ux-designer.md}"
    },
    "research-agent": {
      "description": "Comprehensive research, technology evaluation, and solution analysis using codebase, internet, Context7, and documentation",
      "mode": "primary",
      "temperature": 0.4,
      "prompt": "{file:./vibing/agents/research-agent.md}",
      "readOnly": true
    },
    "seo-specialist": {
      "description": "SEO optimization, search engine strategies, and content optimization",
      "mode": "subagent",
      "temperature": 0.2,
      "prompt": "{file:./vibing/agents/seo-specialist.md}"
    },
    "code-cleanup-specialist": {
      "description": "Code cleanup, refactoring, and code quality improvement",
      "mode": "subagent",
      "temperature": 0.15,
      "prompt": "{file:./vibing/agents/code-cleanup-specialist.md}"
    },
    "test-cleanup-specialist": {
      "description": "Test cleanup, maintenance, and test optimization",
      "mode": "subagent",
      "temperature": 0.15,
      "prompt": "{file:./vibing/agents/test-cleanup-specialist.md}"
    }
  }
}
```

## Generation Instructions

When generating an `opencode.json` file for a new project, follow these steps:

### Step 1: Verify Directory Structure

Before generating the configuration, ensure the project has:

1. **Root `AGENTS.md` file**: The base instructions file that should exist at the project root
2. **`vibing/agents/` directory**: Contains all custom agent definition files
3. **Agent definition files**: All referenced agent files (e.g., `backend-engineer.md`) must exist

### Step 2: Customize Agent Selection

Not all projects need all agents. Analyze the project to determine which agents are relevant:

**For Backend-Only Projects**:

- Include: `@backend-engineer @vibing/agents/backend-engineer.md`, `@data-engineer @vibing/agents/data-engineer.md`, `@backend-architect @vibing/agents/backend-architect.md`, `@data-architect @vibing/agents/data-architect.md`, `@test-automation-engineer @vibing/agents/test-automation-engineer.md`, `@technical-architect @vibing/agents/technical-architect.md`, `@test-analyst @vibing/agents/test-analyst.md`
- Optional: `@code-cleanup-specialist @vibing/agents/code-cleanup-specialist.md`, `@test-cleanup-specialist @vibing/agents/test-cleanup-specialist.md`, `@research-agent @vibing/agents/research-agent.md`

**For Frontend-Only Projects**:

- Include: `@frontend-engineer @vibing/agents/frontend-engineer.md`, `@frontend-architect @vibing/agents/frontend-architect.md`, `@ui-designer @vibing/agents/ui-designer.md`, `@ux-designer @vibing/agents/ux-designer.md`, `@test-automation-engineer @vibing/agents/test-automation-engineer.md`, `@technical-architect @vibing/agents/technical-architect.md`, `@test-analyst @vibing/agents/test-analyst.md`
- Optional: `@seo-specialist @vibing/agents/seo-specialist.md`, `@code-cleanup-specialist @vibing/agents/code-cleanup-specialist.md`, `@test-cleanup-specialist @vibing/agents/test-cleanup-specialist.md`, `@research-agent @vibing/agents/research-agent.md`

**For Full-Stack Projects**:

- Include: All agents (use **dual format**: `@agent-name @vibing/agents/agent-name.md` in documentation)
- Adjust based on specific project needs
- Recommended: `@research-agent @vibing/agents/research-agent.md` for technology evaluation and research

**For CLI/Tool Projects**:

- Include: `@backend-engineer @vibing/agents/backend-engineer.md`, `@data-engineer @vibing/agents/data-engineer.md`, `@test-automation-engineer @vibing/agents/test-automation-engineer.md`, `@technical-architect @vibing/agents/technical-architect.md`, `@test-analyst @vibing/agents/test-analyst.md`
- Optional: `@code-cleanup-specialist @vibing/agents/code-cleanup-specialist.md`, `@test-cleanup-specialist @vibing/agents/test-cleanup-specialist.md`, `@research-agent @vibing/agents/research-agent.md`

### Step 3: Verify File References

Ensure all file references are correct in `opencode.json`:

```json
"prompt": "{file:./AGENTS.md}"  // Must point to root AGENTS.md
"prompt": "{file:./vibing/agents/[agent-name].md}"  // Must point to actual agent files
```

**Important**: The agent key name in `opencode.json` (e.g., `"backend-engineer"`) becomes the agent reference name used in documentation (e.g., `@backend-engineer`). The `prompt` field uses the full file path, but all documentation references should use the **dual format**: `@agent-name @vibing/agents/agent-name.md` to support both OpenCode and Cursor simultaneously.

### Step 4: Validate Temperature Settings

Review temperature settings based on project needs:

- **Conservative projects**: Lower all temperatures by 0.05-0.1
- **Experimental projects**: Raise architect and designer temperatures by 0.1-0.2
- **Production-critical**: Keep implementation agents at 0.1-0.2
- **Prototyping**: Can increase temperatures to 0.3-0.4 for faster iteration

### Step 5: Add Project-Specific Customization

If the project has special requirements, you can add additional configuration:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "prompt": "{file:./AGENTS.md}",
  "agent": {
    // Standard agents...

    // Project-specific custom agent
    "custom-specialist": {
      "description": "Project-specific specialized functionality",
      "mode": "subagent",
      "temperature": 0.2,
      "prompt": "{file:./vibing/agents/custom-specialist.md}"
    }
  }
}
```

### Step 6: Update All Agent References Across All Files (Dual Reference System)

**CRITICAL**: After creating `opencode.json`, you MUST update all agent references throughout the entire `vibing/` directory structure to use the **dual reference format**: `@agent-name @vibing/agents/agent-name.md`. This ensures compatibility with both OpenCode (short format) and Cursor (full path) simultaneously.

#### Files to Check and Update

Search and update agent references in ALL of these locations:

1. **Workflow Files** (`vibing/workflows/*.md`)

   - All workflow files contain agent activation and consultation references
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

2. **Agent Files** (`vibing/agents/*.md`)

   - Agent files reference other agents for collaboration
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

3. **Rule Files** (`vibing/rules/**/*.md`)

   - Some rule files may reference agents
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

4. **Template Files** (`vibing/templates/*.md`)

   - Template files may contain agent references
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

5. **Modifier Files** (`vibing/modifiers/*.md`)

   - Modifier files may reference agents (except this file)
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

6. **Context Files** (`vibing/context/*.md`)

   - Context files may reference agents
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

7. **Root AGENTS.md** (project root)
   - May contain agent references
   - Pattern to find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (dual format)

#### Systematic Update Process

1. **Extract Agent Key Names from `opencode.json`**:

   ```bash
   # Extract all agent key names (these become @agent-name references)
   # Example: "backend-engineer" → @backend-engineer
   ```

2. **Create Mapping Table**:
   For each agent in `opencode.json`, create a mapping:

   - **Old Format**: `@vibing/agents/backend-engineer.md`
   - **New Format**: `@backend-engineer @vibing/agents/backend-engineer.md` (dual format)

3. **Search and Replace Pattern**:

   ```
   Find: @vibing/agents/([a-z-]+)\.md
   Replace: @$1 @vibing/agents/$1.md
   ```

   This regex captures the agent name and creates the dual reference format.

4. **Update All Files**:

   - Search for pattern: `@vibing/agents/` in all markdown files
   - For each match, extract the agent name (e.g., `backend-engineer`)
   - Verify the agent name exists as a key in `opencode.json`
   - Replace `@vibing/agents/backend-engineer.md` with `@backend-engineer @vibing/agents/backend-engineer.md`

5. **Update Invocation Keywords**:
   Ensure all agent references use proper invocation keywords:
   - `Activate @agent-name`
   - `Consult with @agent-name`
   - `Invoke @agent-name`
   - `Delegate to @agent-name`

#### Example Transformations

**Before** (legacy format):

```markdown
- [ ] Activate @vibing/agents/backend-engineer.md for implementation
- [ ] Consult with @vibing/agents/domain-expert.md for business logic
- [ ] Review @vibing/agents/technical-architect.md for validation
```

**After** (dual reference format):

```markdown
- [ ] Activate @backend-engineer @vibing/agents/backend-engineer.md for implementation
- [ ] Consult with @domain-expert @vibing/agents/domain-expert.md for business logic
- [ ] Review @technical-architect @vibing/agents/technical-architect.md for validation
```

#### Validation Commands

After updating, verify all references are correct:

```bash
# Find any remaining legacy references (should be none)
grep -r "@vibing/agents/" vibing/ --include="*.md" | grep -v "@[a-z-] @vibing/agents/"

# Should return NO results (except in this setup guide's examples)

# Verify all agent references use dual format
grep -r "@[a-z-] @vibing/agents/" vibing/ --include="*.md"

# Verify all referenced agents exist in opencode.json
# Extract all @agent-name references and cross-check with opencode.json keys

# Check for proper dual format consistency
grep -r "@[a-z-] @vibing/agents/" vibing/ --include="*.md" | wc -l
# Should match the count of agent references in the project
```

#### Files That Should NOT Be Updated

- **`opencode.json`**: Keep full file paths in `prompt` fields
- **This file** (`opencode-setup.md`): Examples showing legacy format are intentional
- **Agent definition files** (`vibing/agents/*.md`): File content itself, but references to OTHER agents should be updated

## Quality Validation Checklist

Before finalizing the `opencode.json` file and completing setup, verify:

### Configuration Validation

- [ ] `$schema` field points to OpenCode's JSON schema
- [ ] `prompt` field correctly references root `AGENTS.md` file
- [ ] All agent `description` fields are clear and specific
- [ ] All agent `mode` fields are set to "subagent"
- [ ] All agent `temperature` values are appropriate for their role
- [ ] All agent `prompt` file references point to existing files
- [ ] All referenced agent files exist in `vibing/agents/` directory
- [ ] Root `AGENTS.md` file exists and contains base instructions
- [ ] JSON syntax is valid (no trailing commas, proper quotes)
- [ ] Agent selection matches project type and requirements

### Agent Reference Standardization (Dual Format)

- [ ] **All workflow files** (`vibing/workflows/*.md`) use dual format: `@agent-name @vibing/agents/agent-name.md`
- [ ] **All agent files** (`vibing/agents/*.md`) use dual format for cross-references: `@agent-name @vibing/agents/agent-name.md`
- [ ] **All rule files** (`vibing/rules/**/*.md`) use dual format (if they reference agents): `@agent-name @vibing/agents/agent-name.md`
- [ ] **All template files** (`vibing/templates/*.md`) use dual format (if they reference agents): `@agent-name @vibing/agents/agent-name.md`
- [ ] **All modifier files** (`vibing/modifiers/*.md`) use dual format (if they reference agents): `@agent-name @vibing/agents/agent-name.md`
- [ ] **All context files** (`vibing/context/*.md`) use dual format (if they reference agents): `@agent-name @vibing/agents/agent-name.md`
- [ ] **Root AGENTS.md** uses dual format (if it references agents): `@agent-name @vibing/agents/agent-name.md`
- [ ] **No legacy references** remain: `grep -r "@vibing/agents/" vibing/` returns only dual format results (except examples in this guide)
- [ ] **All agent names** in references match key names in `opencode.json`
- [ ] **Invocation keywords** are present: "Activate", "Consult", "Invoke", or "Delegate" before agent references
- [ ] **Dual format consistency**: Every agent reference appears as BOTH formats side by side

## Usage in New Projects

To set up a new project with OpenCode:

1. **Copy the `vibing/` directory structure** to the new project
2. **Create a root `AGENTS.md` file** with project-specific base instructions
3. **Generate `opencode.json`** using this guide as reference
4. **Verify all file paths** are correct for the new project structure
5. **Update all agent references** across all files to dual format (Step 6 above) - **MANDATORY**
6. **Validate all references** using the Quality Validation Checklist
7. **Test the configuration** by starting a new OpenCode session
8. **Validate agent invocation** by using dual format in documentation (e.g., "Activate @backend-engineer @vibing/agents/backend-engineer.md")

**Critical**: Step 5 (updating agent references) is NOT optional. All files must use the **dual format** `@agent-name @vibing/agents/agent-name.md` matching the key names in `opencode.json` for both OpenCode and Cursor to work correctly simultaneously.

## Example Project Setup

### Minimal Setup (CLI Tool)

```
my-cli-tool/
├── AGENTS.md                          # Root agent instructions
├── opencode.json                     # OpenCode configuration
├── vibing/
│   └── agents/
│       ├── backend-engineer.md
│       ├── test-automation-engineer.md
│       └── technical-architect.md
└── src/
    └── index.ts
```

### Full Setup (Web Application)

```
my-web-app/
├── AGENTS.md                          # Root agent instructions
├── opencode.json                     # OpenCode configuration
├── vibing/
│   ├── agents/                       # All 17 standard agents
│   ├── rules/                        # Framework-specific rules
│   ├── workflows/                    # Development workflows
│   └── templates/                    # Design templates
├── src/
│   ├── components/
│   ├── pages/
│   └── api/
└── tests/
    ├── unit/
    └── e2e/
```

## Common Issues and Solutions

### Issue: "Agent file not found"

**Solution**: Verify the file path in the agent's `prompt` field matches the actual file location.

```json
// Wrong
"prompt": "{file:./agents/backend-engineer.md}"

// Correct
"prompt": "{file:./vibing/agents/backend-engineer.md}"
```

### Issue: "Root AGENTS.md not loaded"

**Solution**: Ensure the top-level `prompt` field is set correctly:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "prompt": "{file:./AGENTS.md}", // This line is required
  "agent": {
    // ...
  }
}
```

### Issue: "Invalid JSON syntax"

**Solution**: Check for common JSON errors:

- No trailing commas in objects or arrays
- All strings use double quotes, not single quotes
- All property names are in quotes
- File references use `{file:./path}` syntax

### Issue: "Agent not recognized"

**Solution**: The agent key name defined in `opencode.json` must match the agent reference used in documentation.

**In `opencode.json`** (configuration file - uses full file paths):

```json
{
  "agent": {
    "backend-engineer": {
      "prompt": "{file:./vibing/agents/backend-engineer.md}"
    }
  }
}
```

**In documentation** (use dual format matching the key name):

```markdown
// Correct - dual format supports both OpenCode and Cursor
Activate @backend-engineer @vibing/agents/backend-engineer.md

// Incorrect - legacy format (should be updated)
@vibing/agents/backend-engineer.md

// Incomplete - missing Cursor support
@backend-engineer
```

**Key Point**: The agent key name in `opencode.json` (e.g., `"backend-engineer"`) is what you reference in documentation as `@backend-engineer @vibing/agents/backend-engineer.md`. The `prompt` field contains the file path, but the reference uses both the key name (for OpenCode) and the full path (for Cursor).

## Best Practices

1. **Always include the root AGENTS.md** in the global context via the `prompt` field
2. **Use consistent naming** between agent file names and configuration keys (the key name becomes `@agent-name` in documentation)
3. **Keep temperatures conservative** for implementation agents (0.1-0.3)
4. **Document custom agents** with clear descriptions
5. **Version control** your `opencode.json` file with the project
6. **Test agent invocation** after configuration changes using `@agent-name` format
7. **Keep agent files synchronized** between projects if sharing the vibing system
8. **Review temperature settings** based on agent performance
9. **Add comments** (as JSON doesn't support comments, use a separate README)
10. **Validate JSON** before committing using a JSON linter
11. **Use dual format** `@agent-name @vibing/agents/agent-name.md` in all documentation; only use full paths in `opencode.json` configuration

## Summary

This guide provides everything needed to create a complete `opencode.json` configuration file for any project and ensure all agent references are properly standardized. The key requirements are:

1. Set the top-level `prompt` field to load root `AGENTS.md`
2. Define all relevant agents with proper descriptions, modes, temperatures, and file references
3. Verify all file paths are correct in `opencode.json`
4. Choose appropriate agents based on project type
5. **MANDATORY**: Update all agent references across ALL files (workflows, agents, rules, templates, modifiers, context, root AGENTS.md) to use **dual format**: `@agent-name @vibing/agents/agent-name.md`
6. Validate the configuration and all references using the Quality Validation Checklist
7. Use **dual format** `@agent-name @vibing/agents/agent-name.md` (matching the key name) in all documentation references

**Critical Points**:

- The agent key name in `opencode.json` (e.g., `"backend-engineer"`) is what you reference in documentation as `@backend-engineer @vibing/agents/backend-engineer.md`
- The `prompt` field in `opencode.json` uses the full file path, but ALL documentation references must use the **dual format**: `@agent-name @vibing/agents/agent-name.md`
- **Step 6 (updating agent references) is NOT optional** - Both OpenCode and Cursor require standardized references to work correctly simultaneously
- All files in `vibing/` must be checked and updated, not just workflows
- **Dual format ensures backward compatibility** with Cursor while enabling OpenCode functionality

Use this guide as a reference when setting up OpenCode in new projects to ensure consistent, proper configuration across all your work.

---

## Agent Reference Standardization

### Standard Agent Reference Format (Dual Reference System)

All agent references in `vibing/` files should use the **dual format** to support both OpenCode and Cursor simultaneously:

**Correct**: `@agent-name @vibing/agents/agent-name.md` (e.g., `@product-manager @vibing/agents/product-manager.md`, `@backend-engineer @vibing/agents/backend-engineer.md`, `@technical-architect @vibing/agents/technical-architect.md`)

**Incorrect**: `@vibing/agents/agent-name.md` (Cursor only)

**Incomplete**: `@agent-name` (OpenCode only)

### Agent Invocation Keywords

When any of these keywords are used with an agent reference, it signals that the agent should be invoked using the Task tool:

- **Activate**: "Activate @product-manager @vibing/agents/product-manager.md"
- **Consult**: "Consult with @domain-expert @vibing/agents/domain-expert.md"
- **Invoke**: "Invoke @technical-architect @vibing/agents/technical-architect.md"

### Standardization Process (Dual Reference System)

When setting up or maintaining a project, ensure all agent references follow the dual reference format. This process is **MANDATORY** and must be completed after creating `opencode.json`.

1. **Extract agent key names from `opencode.json`**:

   - Read the `agent` object in `opencode.json`
   - List all key names (e.g., `"backend-engineer"`, `"product-manager"`)
   - These key names become the `@agent-name` part of the dual reference

2. **Search for legacy references**:

   - Find: `@vibing/agents/[agent-name].md`
   - Replace with: `@[agent-name] @vibing/agents/[agent-name].md` (where `agent-name` matches the key from `opencode.json`)

3. **Update invocation patterns**:

   - Ensure "Activate", "Consult", "Invoke", or "Delegate" keywords are used before agent references
   - This signals to OpenCode that the agent should be invoked via the Task tool
   - Dual format ensures both OpenCode and Cursor can process the references

4. **Files to update** (check ALL of these):

   - All `vibing/workflows/*.md` files
   - All `vibing/agents/*.md` files (for cross-agent references)
   - All `vibing/modifiers/*.md` files (except this setup guide)
   - All `vibing/rules/**/*.md` files (if they reference agents)
   - All `vibing/templates/*.md` files (if they reference agents)
   - All `vibing/context/*.md` files (if they reference agents)
   - Any project-specific `AGENTS.md` files

5. **Example transformations**:

```markdown
<!-- Before -->

- [ ] Review @vibing/agents/backend-engineer.md for implementation
- Consult with @vibing/agents/domain-expert.md for business logic

<!-- After (Dual Format) -->

- [ ] Activate @backend-engineer @vibing/agents/backend-engineer.md for implementation
- [ ] Consult with @domain-expert @vibing/agents/domain-expert.md for business logic
```

### Configuration Consistency (Dual Reference System)

The `opencode.json` file defines agents with their full file paths in the `prompt` field, but the agent key name (e.g., `"backend-engineer"`) is what you reference in documentation using the **dual format**: `@agent-name @vibing/agents/agent-name.md`.

**In opencode.json** (full file path in `prompt` field, key name becomes reference):

```json
{
  "agent": {
    "backend-engineer": {
      // This key name becomes @backend-engineer part of dual reference
      "prompt": "{file:./vibing/agents/backend-engineer.md}" // Full path only in config
    }
  }
}
```

**In documentation** (use dual format with both key name and full path):

```markdown
- [ ] Activate @backend-engineer @vibing/agents/backend-engineer.md for implementation
```

This separation ensures:

- Configuration files have explicit, complete file paths
- Documentation uses **dual format** supporting both OpenCode (`@agent-name`) and Cursor (`@vibing/agents/agent-name.md`)
- Agent invocations work in both environments simultaneously
- The agent key name in `opencode.json` directly maps to the `@agent-name` part of the dual reference
- **Backward compatibility** is maintained with existing Cursor workflows
- **Forward compatibility** is enabled for OpenCode functionality

### Validation Checklist (Dual Reference System)

When standardizing agent references, verify ALL of the following:

- [ ] **All workflow files** (`vibing/workflows/*.md`) use dual format: `@agent-name @vibing/agents/agent-name.md` (matching key names from `opencode.json`)
- [ ] **All agent files** (`vibing/agents/*.md`) use dual format for cross-references: `@agent-name @vibing/agents/agent-name.md`
- [ ] **All modifier files** (`vibing/modifiers/*.md`) use dual format: `@agent-name @vibing/agents/agent-name.md`
- [ ] **All rule files** (`vibing/rules/**/*.md`) use dual format (if applicable): `@agent-name @vibing/agents/agent-name.md`
- [ ] **All template files** (`vibing/templates/*.md`) use dual format (if applicable): `@agent-name @vibing/agents/agent-name.md`
- [ ] **All context files** (`vibing/context/*.md`) use dual format (if applicable): `@agent-name @vibing/agents/agent-name.md`
- [ ] **Root AGENTS.md** uses dual format (if applicable): `@agent-name @vibing/agents/agent-name.md`
- [ ] **All invocation keywords** (Activate, Consult, Invoke, Delegate) are present where needed
- [ ] **No legacy references** remain: `grep -r "@vibing/agents/" vibing/` returns only dual format results (except examples in this guide)
- [ ] **`opencode.json`** uses full file paths in `prompt` fields (configuration only)
- [ ] **Agent key names** in `opencode.json` exactly match the `@agent-name` part used in dual format documentation
- [ ] **All referenced agents** exist as keys in `opencode.json`
- [ ] **Root `AGENTS.md`** includes invocation rules for agent references
- [ ] **Dual format consistency**: Every agent reference appears as BOTH formats side by side
- [ ] **OpenCode compatibility**: `@agent-name` format works for OpenCode subagent invocation
- [ ] **Cursor compatibility**: `@vibing/agents/agent-name.md` format works for Cursor file references
