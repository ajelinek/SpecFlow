# Existing Project Context Generator

**Purpose**: Generates all AGENT.md context files for brownfield projects by scanning existing code and analyzing the complete vibing rules and agents directory.

## Overview

This modifier performs deep analysis of existing codebase to understand patterns, technologies, and architectural decisions, then generates focused AGENT.md context files following the standardized AGENT.md specification. Each AGENT.md file focuses on a single agent responsibility with deep analysis of the specific patterns and needs in that area, rather than superficial directory scanning.

## Inputs

- **Project Root Path**: The root directory of the project
- **Optional Design Documents**: Existing design documents in `_docs/design/` (used as supplementary source)
- **Rules Directory**: Complete analysis of `vibing/rules/` directory
- **Agents Directory**: Complete analysis of `vibing/agents/` directory

## Deep Analysis Strategy

The generator uses a comprehensive multi-phase approach to perform deep analysis of the codebase, understanding not just directory structure but the actual patterns, technologies, and architectural decisions within each area:

### Phase 1: Deep Codebase Analysis

1. **Technology Stack Detection**:

   - **Package.json Deep Analysis**: Read dependencies, devDependencies, scripts, and peerDependencies
   - **Framework Detection**: Identify React, SolidJS, Astro, Vue, Svelte, etc. through imports and usage patterns
   - **Backend Framework Detection**: Identify Express, Fastify, NestJS, Next.js API routes, etc.
   - **State Management Detection**: Identify Redux, Zustand, MobX, Apollo Client, SWR, React Query, Solid stores
   - **Database Detection**: Identify Firebase, PostgreSQL, MongoDB, Prisma, TypeORM, etc.
   - **Testing Framework Detection**: Identify Jest, Vitest, Playwright, Cypress, Testing Library
   - **Build Tool Detection**: Identify Vite, Webpack, Rollup, esbuild, Parcel
   - **Language Detection**: Identify TypeScript, JavaScript, and their configurations

2. **Directory Structure Deep Analysis**:

   - **Backend Directories**: Analyze `api/`, `backend/`, `server/`, `src/api/` for:

     - API route patterns and conventions
     - Service layer organization
     - Repository/data access patterns
     - Authentication middleware
     - Error handling approaches
     - Logging patterns

   - **Frontend Directories**: Analyze `ui/`, `frontend/`, `client/`, `src/` for:

     - Component organization (foundation/feature/utility)
     - State management patterns
     - Styling approaches (CSS, Tailwind, styled-components)
     - Routing patterns
     - Form handling libraries
     - Testing patterns

   - **Store Directories**: Analyze `store/`, `state/`, `data/` for:

     - Service-repository pattern implementation
     - GraphQL/REST client setup
     - Data fetching conventions
     - Cache management
     - Hook patterns

   - **E2E Directories**: Analyze `e2e/`, `tests/e2e/`, `playwright/` for:

     - Testing framework setup and configuration
     - Page object patterns and organization
     - Selector conventions and strategies
     - Test data management
     - Test organization

   - **Page Objects Directories**: Analyze `pages/`, `page-objects/` for:

     - Page object structure and patterns
     - Selector naming conventions
     - Interaction patterns
     - Element definitions

   - **Data Directories**: Analyze `data/`, `database/`, `db/` for:
     - Schema definitions and migrations
     - ORM/query builder usage
     - Seed data patterns
     - Test data utilities

3. **Code Pattern Analysis**:

   - **File Content Analysis**: Read and analyze actual file contents, not just directory names
   - **Import/Export Analysis**: Understand module dependencies and relationships
   - **Configuration Analysis**: Parse tsconfig.json, vite.config.js, etc. for project setup
   - **Architecture Pattern Detection**: Identify MVC, MVVM, Clean Architecture, etc. patterns
   - **Code Quality Analysis**: Detect linting rules, formatting standards, code organization

4. **Design Document Integration**:

   - **Design Doc Analysis**: Parse existing design documents for architectural context
   - **Code vs Design Alignment**: Compare code patterns with documented architecture
   - **Gap Analysis**: Identify discrepancies between design and implementation

5. **Rules and Agents Deep Mapping**:

   - **Technology-Specific Rule Analysis**: Map detected technologies to relevant rules
   - **Pattern-Specific Agent Assignment**: Assign agents based on detected patterns
   - **Responsibility Mapping**: Create focused single-responsibility agent assignments
   - **Rule Relevance Scoring**: Prioritize rules based on actual codebase patterns

### Phase 2: Focused Agent Responsibility Analysis

This phase creates focused, single-responsibility AGENT.md files for each detected pattern area, rather than trying to create comprehensive files for entire directories.

#### Pattern-Specific Agent Creation

1. **Backend API Agent** (if API patterns detected):

   - **Focus**: API route patterns, request/response handling
   - **Analysis**: Deep analysis of API structure, error handling, authentication patterns
   - **Responsible Agent**: backend-engineer.md
   - **Rules**: backend, foundation, error-handling

2. **Service Layer Agent** (if service layer detected):

   - **Focus**: Business logic organization, service patterns
   - **Analysis**: Service layer structure, dependency injection, business logic patterns
   - **Responsible Agent**: backend-engineer.md
   - **Rules**: backend, foundation

3. **Repository Agent** (if repository pattern detected):

   - **Focus**: Data access patterns, repository implementations
   - **Analysis**: Repository structure, query patterns, data transformation
   - **Responsible Agent**: data-engineer.md
   - **Rules**: data/persistence, foundation

4. **Component Architecture Agent** (if component patterns detected):

   - **Focus**: Component organization, reusability patterns
   - **Analysis**: Component structure, prop patterns, composition strategies
   - **Responsible Agent**: frontend-engineer.md
   - **Rules**: ui/component-guidelines, foundation

5. **State Management Agent** (if state management detected):

   - **Focus**: State patterns, data flow, caching strategies
   - **Analysis**: State management approach, data fetching, cache patterns
   - **Responsible Agent**: frontend-engineer.md
   - **Rules**: framework-specific state rules, foundation

6. **Styling Agent** (if styling patterns detected):

   - **Focus**: Styling approach, design system, responsive patterns
   - **Analysis**: CSS methodology, component styling, design tokens
   - **Responsible Agent**: ui-designer.md
   - **Rules**: ui/styling, foundation

7. **Testing Agent** (if testing patterns detected):

   - **Focus**: Testing strategy, test organization, coverage patterns
   - **Analysis**: Testing framework, test structure, mocking strategies
   - **Responsible Agent**: test-analyst.md
   - **Rules**: testing/general, framework-specific testing

8. **E2E Testing Agent** (if E2E testing detected):

   - **Focus**: End-to-end testing strategy, user journey testing
   - **Analysis**: E2E framework setup, page object patterns, test data
   - **Responsible Agent**: test-automation-engineer.md
   - **Rules**: testing/e2e, testing/page-objects

9. **Database Agent** (if database patterns detected):

   - **Focus**: Database schema, migrations, query patterns
   - **Analysis**: Database structure, ORM usage, migration patterns
   - **Responsible Agent**: data-engineer.md
   - **Rules**: data/persistence, foundation

10. **Authentication Agent** (if auth patterns detected):
    - **Focus**: Authentication, authorization, security patterns
    - **Analysis**: Auth implementation, security measures, user management
    - **Responsible Agent**: backend-engineer.md
    - **Rules**: backend, foundation, security

#### Agent File Structure

Each AGENT.md file follows this focused structure:

- **Single Responsibility**: One agent, one specific area of concern
- **Deep Pattern Analysis**: Detailed understanding of patterns in that specific area
- **Contextual Rules**: Only rules relevant to this specific responsibility
- **Implementation Guidance**: Specific guidance for this area of the codebase

### Phase 3: Focused AGENT.md Generation

#### Global Context (Pre-created)

**Note**: The global `vibing/context/AGENT.md` file should be pre-created and will not be generated by this modifier.

#### Pattern-Specific AGENT.md Creation

The generator creates multiple focused AGENT.md files, each addressing a specific pattern or responsibility area:

1. **API Routes AGENT.md** (if API patterns detected):

   - **Location**: `{detected-backend-dir}/AGENT.md` (API routes focus)
   - **Focus**: API endpoint patterns, request/response handling, error responses
   - **Deep Analysis**: Route structure, parameter validation, response formatting
   - **Responsible Agent**: @vibing/agents/backend-engineer.md
   - **Rules**: @vibing/rules/common/backend/, @vibing/rules/common/foundation/error-handling-guidelines.md

2. **Service Layer AGENT.md** (if service layer detected):

   - **Location**: `{detected-backend-dir}/services/AGENT.md`
   - **Focus**: Business logic organization, service patterns, dependency injection
   - **Deep Analysis**: Service interfaces, business rules, error handling patterns
   - **Responsible Agent**: @vibing/agents/backend-engineer.md
   - **Rules**: @vibing/rules/common/backend/, @vibing/rules/common/foundation/general-rules.md

3. **Repository AGENT.md** (if repository pattern detected):

   - **Location**: `{detected-data-dir}/repositories/AGENT.md` (or `{detected-backend-dir}/repositories/AGENT.md`)
   - **Focus**: Data access patterns, query optimization, data transformation
   - **Deep Analysis**: Repository interfaces, query patterns, caching strategies
   - **Responsible Agent**: @vibing/agents/data-engineer.md
   - **Rules**: @vibing/rules/common/data/, @vibing/rules/common/foundation/typescript-guidelines.md

4. **Component Architecture AGENT.md** (if component patterns detected):

   - **Location**: `{detected-frontend-dir}/components/AGENT.md`
   - **Focus**: Component organization, reusability, composition patterns
   - **Deep Analysis**: Component structure, prop patterns, lifecycle management
   - **Responsible Agent**: @vibing/agents/frontend-engineer.md
   - **Rules**: @vibing/rules/common/ui/component-guidelines.md, @vibing/rules/common/foundation/general-rules.md

5. **State Management AGENT.md** (if state management detected):

   - **Location**: `{detected-store-dir}/AGENT.md`
   - **Focus**: State patterns, data flow, caching, synchronization
   - **Deep Analysis**: State structure, update patterns, side effect management
   - **Responsible Agent**: @vibing/agents/frontend-engineer.md
   - **Rules**: @vibing/rules/react/react-state-management.md (or framework-specific state rules)

6. **Styling AGENT.md** (if styling patterns detected):

   - **Location**: `{detected-frontend-dir}/styles/AGENT.md` (or alongside components)
   - **Focus**: Styling methodology, design system, responsive patterns
   - **Deep Analysis**: CSS architecture, component styling, theme management
   - **Responsible Agent**: @vibing/agents/ui-designer.md
   - **Rules**: @vibing/rules/common/ui/styling-guidelines.md

7. **Testing Strategy AGENT.md** (if testing patterns detected):

   - **Location**: `{detected-test-dir}/AGENT.md` (unit tests) or `{detected-e2e-dir}/AGENT.md` (E2E)
   - **Focus**: Testing approach, coverage strategy, mocking patterns
   - **Deep Analysis**: Test structure, assertion patterns, test data management
   - **Responsible Agent**: @vibing/agents/test-analyst.md
   - **Rules**: @vibing/rules/common/testing/test-general.md, @vibing/rules/common/testing/test-context.md

8. **E2E Testing AGENT.md** (if E2E testing detected):

   - **Location**: `{detected-e2e-dir}/AGENT.md`
   - **Focus**: End-to-end testing, user journey validation, integration testing
   - **Deep Analysis**: E2E framework setup, page object patterns, test data strategies
   - **Responsible Agent**: @vibing/agents/test-automation-engineer.md
   - **Rules**: @vibing/rules/common/testing/test-e2e.md, @vibing/rules/common/testing/test-e2e-page-object.md

9. **Database Schema AGENT.md** (if database patterns detected):

   - **Location**: `{detected-data-dir}/AGENT.md`
   - **Focus**: Database design, schema patterns, migration strategies
   - **Deep Analysis**: Entity relationships, indexing strategies, migration patterns
   - **Responsible Agent**: @vibing/agents/data-engineer.md
   - **Rules**: @vibing/rules/common/data/data-relational-persistent.md (or appropriate data rules)

10. **Authentication AGENT.md** (if auth patterns detected):
    - **Location**: `{detected-backend-dir}/auth/AGENT.md` (or `{detected-frontend-dir}/auth/AGENT.md`)
    - **Focus**: Authentication, authorization, security patterns
    - **Deep Analysis**: Auth flow, token management, security measures
    - **Responsible Agent**: @vibing/agents/backend-engineer.md
    - **Rules**: @vibing/rules/common/backend/, @vibing/rules/common/foundation/error-handling-guidelines.md

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

The generator creates focused, single-responsibility AGENT.md files for each detected pattern area:

| Pattern Area           | Detection Criteria              | Responsible Agent           | Focus Area                                   | Primary Rules                               |
| ---------------------- | ------------------------------- | --------------------------- | -------------------------------------------- | ------------------------------------------- |
| API Routes             | API endpoints, routes, handlers | backend-engineer.md         | Request/response handling, error responses   | backend, foundation, error-handling         |
| Service Layer          | Business logic, services        | backend-engineer.md         | Business rules, dependency injection         | backend, foundation                         |
| Repository Pattern     | Data access, repositories       | data-engineer.md            | Query patterns, data transformation          | data/persistence, foundation                |
| Component Architecture | Component organization          | frontend-engineer.md        | Reusability, composition patterns            | ui/component-guidelines, foundation         |
| State Management       | State stores, data flow         | frontend-engineer.md        | State patterns, caching strategies           | framework-specific state rules, foundation  |
| Styling System         | CSS, design system              | ui-designer.md              | Styling methodology, responsive patterns     | ui/styling, foundation                      |
| Testing Strategy       | Unit tests, test organization   | test-analyst.md             | Testing approach, coverage patterns          | testing/general, framework-specific testing |
| E2E Testing            | End-to-end tests                | test-automation-engineer.md | User journey validation, integration testing | testing/e2e, testing/page-objects           |
| Database Schema        | Database design, migrations     | data-engineer.md            | Entity relationships, indexing strategies    | data/persistence, foundation                |
| Authentication         | Auth flows, security            | backend-engineer.md         | Authentication, authorization patterns       | backend, foundation, security               |

**Note**: Each pattern creates a separate focused AGENT.md file with deep analysis of that specific area, rather than trying to cover entire directories comprehensively.

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
# ✓ Generated src/api/AGENT.md (API Routes Agent)
#   - Focus: API endpoint patterns, request/response handling
#   - Deep Analysis: Route structure, parameter validation, error responses
#   - Responsible Agent: @vibing/agents/backend-engineer.md
# ✓ Generated src/api/services/AGENT.md (Service Layer Agent)
#   - Focus: Business logic organization, service patterns
#   - Deep Analysis: Service interfaces, business rules, error handling
#   - Responsible Agent: @vibing/agents/backend-engineer.md
# ✓ Generated src/components/AGENT.md (Component Architecture Agent)
#   - Focus: Component organization, reusability patterns
#   - Deep Analysis: Component structure, prop patterns, composition
#   - Responsible Agent: @vibing/agents/frontend-engineer.md
# ✓ Generated src/store/AGENT.md (State Management Agent)
#   - Focus: State patterns, data flow, caching strategies
#   - Deep Analysis: State structure, update patterns, side effects
#   - Responsible Agent: @vibing/agents/frontend-engineer.md
# ✓ Generated e2e/AGENT.md (E2E Testing Agent)
#   - Focus: End-to-end testing, user journey validation
#   - Deep Analysis: E2E framework setup, page object patterns
#   - Responsible Agent: @vibing/agents/test-automation-engineer.md
# ✓ Generated data/AGENT.md (Database Schema Agent)
#   - Focus: Database design, schema patterns, migrations
#   - Deep Analysis: Entity relationships, indexing strategies
#   - Responsible Agent: @vibing/agents/data-engineer.md
# ⚠ Skipped Authentication Agent (no auth patterns detected)
# ⚠ Skipped Styling Agent (no styling patterns detected)
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
