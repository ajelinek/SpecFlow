# Existing Project Context Generator

**Purpose**: Generates all AGENT.md context files for brownfield projects by scanning existing code and analyzing the complete vibing rules and agents directory.

## Overview

This modifier scans existing codebase to detect patterns, technologies, and architectural decisions, then generates comprehensive AGENT.md context files following the standardized AGENT.md specification. It analyzes all rules and agents to assign appropriate responsibilities and rule references.

## Inputs

- **Project Root Path**: The root directory of the project
- **Optional Design Documents**: Existing design documents in `_docs/design/` (used as supplementary source)
- **Rules Directory**: Complete analysis of `vibing/rules/` directory
- **Agents Directory**: Complete analysis of `vibing/agents/` directory

## Detection Strategy

The generator uses a multi-phase approach to discover project structure and patterns:

### Phase 1: Project Discovery

1. **Package.json Analysis**:

   - Read `package.json` for dependencies and scripts
   - Detect frontend framework (React, SolidJS, Astro)
   - Detect backend framework (Express, Fastify, etc.)
   - Detect GraphQL/Apollo usage
   - Detect testing frameworks (Playwright, Vitest, Jest)
   - Detect build tools (Vite, Webpack)
   - Detect package manager (npm/pnpm/yarn)
   - Extract all scripts for commands section

2. **Directory Structure Analysis**:

   - Scan for backend/API directory (`api/`, `backend/`, `server/`, `src/api/`)
   - Scan for frontend directory (`ui/`, `frontend/`, `client/`, `src/`)
   - Scan for store directory (`store/`, `data/`, `state/`)
   - Scan for E2E tests directory (`e2e/`, `tests/e2e/`, `playwright/`)
   - Scan for page objects directory (`pages/`, `page-objects/`)
   - Scan for data layer directory (`data/`, `database/`, `db/`)

3. **Design Document Check**:

   - Check for existing design documents in `_docs/design/`
   - Use design docs to supplement code scanning when available
   - Prefer code patterns over design docs (code is truth)

4. **Rules and Agents Analysis**:

- Scan all files in `vibing/rules/` directory recursively
- Scan all files in `vibing/agents/` directory recursively
  - Categorize rules by technology and component type
  - Map agents to component responsibilities
    **Note**: No new rules should be created and all referenced rules and agents must already exist.

### Phase 2: Pattern Detection

#### Backend Analysis

- **Route/Controller Files**: Scan for API patterns and conventions
- **Service Layer**: Detect service layer organization and patterns
- **Repository Pattern**: Identify repository/data access patterns
- **Authentication**: Find authentication middleware and patterns
- **Error Handling**: Analyze error handling approach and conventions
- **Logging**: Detect logging patterns and frameworks
- **Technology Detection**: Identify backend frameworks and libraries
- **Rule Mapping**: Identify which backend rules apply
- **Agent Assignment**: Assign backend-engineer agent

#### Frontend Analysis

- **Component Structure**: Scan component directories for organization
- **Component Patterns**: Detect foundation/common/feature component patterns
- **State Management**: Identify state management solutions (Zustand, Redux, SolidJS stores, Apollo Client, SWR)
- **Styling Approach**: Find styling solutions (Tailwind, CSS Modules, styled-components)
- **Routing**: Analyze routing patterns and frameworks
- **Form Handling**: Detect form handling libraries and patterns
- **Technology Detection**: Identify frontend frameworks and libraries
- **Rule Mapping**: Identify which framework-specific rules apply
- **Agent Assignment**: Assign frontend-engineer agent

#### Store Analysis

- **Service-Repository Pattern**: Scan store files for service/repository pattern
- **GraphQL/REST Client**: Detect GraphQL/REST client setup (Apollo, SWR, Firebase SDK)
- **Data Fetching**: Identify data fetching patterns and conventions
- **Cache Management**: Find cache management approach and patterns
- **Hook Patterns**: Analyze hook patterns and usage
- **Technology Detection**: Identify data management solutions
- **Rule Mapping**: Identify which data management rules apply
- **Agent Assignment**: Assign frontend-engineer agent

#### E2E Analysis

- **Testing Framework**: Scan test files for framework (Playwright/Cypress)
- **Page Object Patterns**: Detect page object patterns and organization
- **Selector Conventions**: Identify selector conventions and patterns
- **Test Data Patterns**: Find test data patterns and management
- **Test Organization**: Analyze test organization and structure
- **Technology Detection**: Identify E2E testing frameworks
- **Rule Mapping**: Identify which testing rules apply
- **Agent Assignment**: Assign test-automation-engineer agent

#### Data Analysis

- **Schema Files**: Scan schema files for entity definitions
- **Migration Patterns**: Detect migration patterns and conventions
- **ORM/Query Builder**: Identify ORM/query builder usage (Firestore, SQL, etc.)
- **Seed Data**: Find seed data patterns and utilities
- **Test Data**: Analyze test data utilities and patterns
- **Technology Detection**: Identify data persistence solutions
- **Rule Mapping**: Identify which data persistence rules apply
- **Agent Assignment**: Assign data-engineer agent

### Phase 3: Context Generation

#### Global Context (Pre-created)

**Note**: The global `vibing/context/AGENT.md` file should be pre-created and will not be generated by this modifier.

#### Component-Specific Context Generation

1. **Backend Context**:

   - Backend overview inferred from code patterns
   - Backend technology stack from detected frameworks
   - API design patterns with agent assignments
   - Service layer structure with responsibilities
   - Data access patterns with agent assignments
   - Authentication approach from detected patterns
   - Error handling conventions from code analysis
   - Backend-specific rule references

- **Responsible Agent**: @vibing/agents/backend-engineer.md

2. **Frontend Context**:

   - Frontend overview inferred from component analysis
   - Frontend technology stack from detected frameworks
   - Component architecture with agent assignments
   - Directory structure with responsibilities
   - State management strategy from detected patterns
   - Styling approach from detected frameworks
   - Testing patterns from test file analysis
   - Framework-specific rule references

- **Responsible Agent**: @vibing/agents/frontend-engineer.md

3. **Store Context**:

   - Store overview inferred from store file analysis
   - Data management technology from detected patterns
   - Service-Repository pattern with responsibilities
   - GraphQL/REST client setup from detected usage
   - Data fetching conventions from code patterns
   - Hook patterns from detected usage
   - Data management rule references
   - TypeScript guidelines for store components

- **Responsible Agent**: @vibing/agents/frontend-engineer.md

4. **E2E Context**:

   - E2E testing overview from test file analysis
   - Testing framework setup from detected frameworks
   - Page object patterns from detected usage
   - Selector conventions from test file analysis
   - Test data management from detected patterns
   - Testing rule references

- **Responsible Agent**: @vibing/agents/test-automation-engineer.md

5. **Page Objects Context**:

   - Page objects overview from page object file analysis
   - Page object structure with responsibilities
   - Selector naming conventions from detected patterns
   - Interaction patterns from page object analysis
   - Page object pattern rule references

- **Responsible Agent**: @vibing/agents/test-automation-engineer.md

6. **Data Context**:
   - Data layer overview from schema and migration analysis
   - Database technology from detected usage
   - Entity definitions with responsibilities
   - Schema overview from detected patterns
   - Migration patterns from detected usage
   - Test data utilities from detected patterns
   - Data persistence rule references

- **Responsible Agent**: @vibing/agents/data-engineer.md

### Phase 4: Validation and Reporting

1. **Validate Generated Files**:

   - Verify all generated files are valid markdown

- Check that all rule references exist in vibing/rules/
- Check that all agent references exist in vibing/agents/
  - Validate cross-references between context files

2. **Generate Summary Report**:
   - List all generated files
   - Report confidence level for each detected pattern
   - Suggest manual review for low-confidence detections
   - Report any discrepancies between design docs and code
   - Provide guidance on missing information

## Agent Responsibility Matrix

The generator uses this matrix to assign agents to detected components:

| Component Type        | Directory Pattern             | Responsible Agent           | Primary Rules                                  |
| --------------------- | ----------------------------- | --------------------------- | ---------------------------------------------- |
| Backend API           | `api/`, `backend/`, `server/` | backend-engineer.md         | backend, foundation, error-handling            |
| Frontend UI           | `ui/`, `frontend/`, `client/` | frontend-engineer.md        | framework-specific, ui, foundation             |
| Data Store            | `store/`, `state/`, `data/`   | frontend-engineer.md        | framework-specific, ui, foundation, typescript |
| E2E Tests             | `e2e/`, `tests/e2e/`          | test-automation-engineer.md | testing/e2e, test-context                      |
| Page Objects          | `pages/`, `page-objects/`     | test-automation-engineer.md | testing/page-objects                           |
| Database              | `data/`, `database/`, `db/`   | data-engineer.md            | data/persistence                               |
| Foundation Components | `components/foundation/`      | frontend-engineer.md        | ui/foundational-components                     |
| Feature Components    | `components/features/`        | frontend-engineer.md        | ui/component-guidelines                        |
| Services              | `services/`                   | backend-engineer.md         | backend, foundation                            |
| Repositories          | `repositories/`               | data-engineer.md            | data, foundation                               |

## Rule Analysis and Mapping

### Rule Discovery Process

1. **Scan Rules Directory**: Read all files in `vibing/rules/` recursively
2. **Categorize Rules**: Group rules by category and technology
3. **Parse Rule Metadata**: Extract technology indicators from rule files
4. **Build Rule Map**: Create mapping of technologies to applicable rules

### Technology-to-Rule Mapping

**Always Include (All Projects)**:

- `@vibing/rules/common/foundation/general-rules.md`
- `@vibing/rules/common/foundation/typescript-guidelines.md`
- `@vibing/rules/common/foundation/error-handling-guidelines.md`
- `@vibing/rules/common/testing/test-general.md`
- `@vibing/rules/common/testing/test-context.md`

**Frontend Framework Rules**:

- **React**: All `@vibing/rules/react/*.md` files
- **Solid.js**: All `@vibing/rules/solid.js/*.md` files
- **Astro**: All `@vibing/rules/astro.js/*.md` files

**UI/UX Rules (Frontend Projects)**:

- All `@vibing/rules/common/ui/*.md` files

**GraphQL/Apollo Rules**:

- If Apollo Client detected: All `@vibing/rules/apollo/*.md` files

**Backend Rules**:

- All `@vibing/rules/common/backend/*.md` files

**Data Rules**:

- All `@vibing/rules/common/data/*.md` files

**Testing Rules**:

- All `@vibing/rules/common/testing/*.md` files

## Standardized AGENT.md Structure

All generated files follow this compact specification-compliant structure (under 75 lines):

```markdown
# [Component Name] Context

<!-- Generated by: context-generator-existing-projects.md -->
<!-- Generated on: [timestamp] -->
<!-- Source: code-scan -->

## 1. Project Overview & Purpose

[Brief summary inferred from codebase analysis]

## 2. Core Technologies & Stack

- **Language**: [Detected from package.json and files]
- **Framework**: [Detected from dependencies and usage]
- **State Management**: [Detected from store patterns]
- **Database**: [Detected from data layer]
- **Testing**: [Detected from test files]

## 3. Architecture and Design Patterns

[Brief description inferred from code organization and detected patterns]

## 4. Code Style and Conventions

- **Naming**: @vibing/rules/common/data/data-attribute-naming-conventions.md
- **TypeScript**: @vibing/rules/common/foundation/typescript-guidelines.md
- **General**: @vibing/rules/common/foundation/general-rules.md

## 5. Component/Module Responsibilities

### [Component/Module Name]

- **Responsible Agent**: @vibing/agents/[agent-name].md
- **Purpose**: [Inferred from code analysis]
- **Rules**: @vibing/rules/[category]/[rule-file].md, @vibing/rules/[category]/[rule-file].md

## 6. Testing Guidelines

- **Strategy**: @vibing/rules/common/testing/test-general.md
- **Test Data**: @vibing/rules/common/testing/test-context.md
- **E2E**: @vibing/rules/common/testing/test-e2e.md
- **Framework**: @vibing/rules/[framework]/[framework]-testing-guidelines.md

## 7. Security Considerations

- **Error Handling**: @vibing/rules/common/foundation/error-handling-guidelines.md
- **Authentication**: [Brief security practices inferred from code]
- **Data Protection**: [Brief data handling practices inferred from code]

## 8. Configuration

[Brief environment setup and configuration management inferred from files]

## 9. Common Tasks

### [Task Category]

- **Agent**: @vibing/agents/[agent-name].md
- **Steps**: [Brief task steps inferred from code patterns]
- **Rules**: @vibing/rules/[category]/[rule-file].md
```

## Error Handling

- **Missing Dependencies**: Warn about missing dependencies and suggest alternatives
- **Low Confidence Detections**: Report low-confidence pattern detections and suggest manual review
- **Missing Rules**: Warn if referenced rules don't exist
- **Missing Agents**: Warn if referenced agents don't exist
- **Partial Generation**: Support generating available context files even if some patterns are unclear
- **Design Doc Discrepancies**: Report discrepancies between design docs and code

## Fallback Strategy

- **Design Docs Available**: Use design docs to supplement code scanning
- **Prefer Code Patterns**: Code patterns are considered truth over design docs
- **Design Doc Clarification**: Use design docs to clarify ambiguous patterns
- **Document Discrepancies**: Document discrepancies between docs and code

## Usage

```bash
# Generate all AGENT.md context files by scanning code
@vibing/modifiers/context-generator-existing-projects.md

# Inputs:
# - Project root: /path/to/project
# - Rules: vibing/rules/
# - Agents: vibing/agents/

# Outputs:
# ✓ Generated Backend Context AGENT.md
#   - Responsible Agent: @vibing/agents/backend-engineer.md
#   - Detected Express API patterns
# ✓ Generated Frontend Context AGENT.md
#   - Responsible Agent: @vibing/agents/frontend-engineer.md
#   - Detected React component patterns
# ✓ Generated Store Context AGENT.md
#   - Responsible Agent: @vibing/agents/frontend-engineer.md
#   - Detected framework patterns, TypeScript rules
# ✓ Generated E2E Context AGENT.md
#   - Responsible Agent: @vibing/agents/test-automation-engineer.md
#   - Detected Playwright patterns
# ✓ Generated Page Objects Context AGENT.md
#   - Responsible Agent: @vibing/agents/test-automation-engineer.md
#   - Detected page object patterns
# ⚠ Skipped Data Context AGENT.md (no separate data layer detected)
```

## Integration

This modifier works alongside:

1. **`technology-stack-analyzer.md`**: Use for tech stack detection validation
2. **`test-rules-customization.md`**: Apply entity customization after generation
3. **`agent-path-updater.md`**: Ensure correct rule and agent references

## Next Steps

After generation:

1. Review generated AGENT.md files for accuracy
2. Verify agent responsibility assignments
3. Validate rule references
4. Review low-confidence detections
5. Run `technology-stack-analyzer.md` to validate filtering
6. Run `test-rules-customization.md` to customize test entities
7. Manually enhance with project-specific details
8. Commit to version control
9. Update as architecture evolves
