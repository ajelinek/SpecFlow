# Agent Context Manager

**Purpose**: Unified management of AGENT.md context files for both new and existing projects, ensuring focused, non-duplicative documentation at appropriate hierarchy levels.

**Execution Context**: This is an LLM-executable modifier that intelligently analyzes projects and generates/maintains AGENT.md files with proper content separation.

## Overview

This consolidated modifier replaces the previous three separate approaches:

- **Smart Detection**: Automatically determines project type (new vs existing) and source material (design docs vs code)
- **Unified Analysis**: Combines code analysis and design document analysis intelligently
- **Dynamic Hierarchy**: Creates focused AGENT.md files at appropriate levels without content duplication
- **Maintenance**: Keeps existing files current and compliant

## Smart Project Detection

The manager intelligently detects project characteristics:

### Project Type Detection

**New Projects (Greenfield)**:

- Presence of `_docs/design/` directory with architecture documents
- Empty or minimal codebase
- Focus on design document analysis

**Existing Projects (Brownfield)**:

- Substantial existing codebase
- May have design docs (supplementary) or rely on code analysis
- Focus on code pattern analysis

### Source Material Detection

**Design Document Analysis** (New Projects):

- Reads from `_docs/design/` directory
- Expected files: `Project_Overview.md`, `System_Architecture.md`, `Data_Model.md`, `Backend_Architecture.md`, `Frontend_Architecture.md`
- Creates AGENT.md files based on documented architecture

**Code Analysis** (Existing Projects):

- Analyzes existing code patterns and structure
- Detects technology stack and architectural patterns
- Creates AGENT.md files based on implemented patterns

**Hybrid Approach**:

- Uses design docs as primary source but validates against code
- Reports discrepancies between design and implementation

## Analysis Engine

### Phase 1: Technology Stack Detection

**Comprehensive Technology Analysis**:

1. **Package Analysis**: Deep scan of `package.json`, dependencies, devDependencies
2. **Framework Detection**: Identify React, SolidJS, Astro, Vue, Svelte through imports and patterns
3. **Backend Detection**: Express, Fastify, NestJS, Next.js API routes
4. **State Management**: Redux, Zustand, MobX, Apollo Client, SWR, React Query
5. **Database**: Firebase, PostgreSQL, MongoDB, Prisma, TypeORM
6. **Testing**: Jest, Vitest, Playwright, Cypress, Testing Library
7. **Build Tools**: Vite, Webpack, Rollup, esbuild

### Phase 2: Directory Structure Analysis

**Pattern Recognition**:

1. **Backend Patterns**: `api/`, `backend/`, `server/`, `src/api/`
2. **Frontend Patterns**: `ui/`, `frontend/`, `client/`, `src/`, `src/ui/`
3. **Store Patterns**: `store/`, `state/`, `data/`, `src/store/`
4. **Testing Patterns**: `e2e/`, `tests/e2e/`, `playwright/`, `cypress/`
5. **Data Patterns**: `data/`, `database/`, `db/`, `src/data/`

### Phase 3: Code Pattern Analysis

**Deep Implementation Analysis**:

1. **File Content Analysis**: Read and analyze actual implementation files
2. **Import/Export Analysis**: Understand module dependencies
3. **Configuration Analysis**: Parse config files for project setup
4. **Architecture Pattern Detection**: MVC, MVVM, Clean Architecture, etc.
5. **Quality Analysis**: Linting rules, formatting standards

## Dynamic Hierarchy Detection

The manager uses intelligent analysis to classify directories and determine appropriate content:

### Detection Algorithm

1. **Protected Path Test**: Never create AGENT.md in protected paths (root, vibing/, node_modules/, .git/, hidden dirs)
2. **Application Root Test**: Directories like `apps/*/src/`, `packages/*/src/` are higher-level organizational points
3. **Feature/Module Test**: Directories like `src/modules/*`, `src/features/*`, `src/components/*` are lower-level implementation
4. **Multi-subdirectory Test**: If directory contains multiple subdirectories with code → Higher-level organizational
5. **Implementation Test**: If directory contains actual implementation files → Lower-level implementation
6. **Leaf Node Test**: If directory is a terminal node in project structure → Lower-level implementation
7. **Depth Analysis**: Directories at depth 2+ are typically lower-level unless they clearly organize multiple feature areas

### Hierarchy Classification

**Higher-Level Files** (Organizational Structure):
- **Content**: Only Purpose & Scope, Structure, Key Interfaces, Conventions
- **Restrictions**: No agent references, no rule references, no implementation details, no task descriptions
- **Examples**:
  - `apps/api/src/` - API application structure
  - `apps/web-app/src/` - Web application structure
  - `src/` - Main source organization (if multiple major areas)
  - `packages/*/src/` - Package structure

**Lower-Level Files** (Implementation Details):
- **Content**: All sections with detailed agent and rule assignments, task guidance
- **Requirements**: Agent references, rule references, implementation guidance, specific tasks
- **Examples**:
  - `src/modules/admin/` - Admin feature implementation
  - `src/modules/auth/` - Authentication implementation
  - `src/components/` - Reusable component implementation
  - `src/api/` - API implementation details
  - `src/store/` - State management implementation

## Content Generation Strategy

### Higher-Level File Structure

**Strict Focus**: Higher-level files contain ONLY organizational structure information. No implementation details, no agent assignments, no rule references.

```markdown
# [Application/Section] Structure

<!-- Generated by: agent-context-manager.md -->
<!-- Generated on: [timestamp] -->
<!-- Source: [code-analysis|design-docs|hybrid] -->
<!-- Level: higher-level -->

## Purpose & Scope

[One sentence describing what this application/section contains and its primary responsibility]

## Structure

The [application/section] is organized into the following functional areas:

### [Area 1] (Application Area)

- **Location**: `[path/to/area]`
- **Purpose**: [One sentence describing this area's responsibility]
- **Key Components**: [Main subdirectories or file types]

### [Area 2] (Application Area)

- **Location**: `[path/to/area]`
- **Purpose**: [One sentence describing this area's responsibility]
- **Key Components**: [Main subdirectories or file types]

## Key Interfaces

[Brief list of main external dependencies and contracts - no implementation details]

## Conventions

[High-level coding standards and patterns - no specific implementation guidance]
```

### Lower-Level File Structure

```markdown
# [Component Name] Context

<!-- Generated by: agent-context-manager.md -->
<!-- Generated on: [timestamp] -->
<!-- Source: [code-analysis|design-docs|hybrid] -->
<!-- Level: lower-level -->

## 1. Project Overview & Purpose

[Brief summary specific to this component]

## 2. Core Technologies & Stack

- **Language**: [Detected from analysis]
- **Framework**: [Detected from dependencies and usage]
- **Dependencies**: [Key dependencies used by this component]

## 3. Architecture and Design Patterns

[Brief description of patterns used in this specific component]

## 4. Code Style and Conventions

- **Naming**: @vibing/rules/common/data/data-attribute-naming-conventions.md
- **TypeScript**: @vibing/rules/common/foundation/typescript-guidelines.md
- **General**: @vibing/rules/common/foundation/general-rules.md

## 5. Component/Module Responsibilities

### [Component/Module Name]

- **Responsible Agent**: @vibing/agents/[agent-name].md
- **Purpose**: [Inferred from analysis]
- **Rules**: @vibing/rules/[category]/[rule-file].md

## 6. Testing Guidelines

- **Strategy**: @vibing/rules/common/testing/test-general.md
- **Framework**: @vibing/rules/[framework]/[framework]-testing-guidelines.md

## 7. Security Considerations

- **Error Handling**: @vibing/rules/common/foundation/error-handling-guidelines.md

## 8. Configuration

[Component-specific configuration details]

## 9. Common Tasks

### [Task Category]

- **Agent**: @vibing/agents/[agent-name].md
- **Steps**: [Brief task steps specific to this component]
- **Rules**: @vibing/rules/[category]/[rule-file].md
```

## Agent Responsibility Mapping

The manager maps detected patterns to responsible agents:

| Pattern Area           | Detection Criteria            | Responsible Agent           | Focus Area                           | Primary Rules                       |
| ---------------------- | ----------------------------- | --------------------------- | ------------------------------------ | ----------------------------------- |
| API Routes             | API endpoints, route handlers | backend-engineer.md         | Request/response handling            | backend, foundation, error-handling |
| Service Layer          | Business logic, services      | backend-engineer.md         | Business rules, dependency injection | backend, foundation                 |
| Repository Pattern     | Data access, repositories     | data-engineer.md            | Query patterns, data transformation  | data/persistence, foundation        |
| Component Architecture | Component organization        | frontend-engineer.md        | Reusability, composition             | ui/component-guidelines, foundation |
| State Management       | State stores, data flow       | frontend-engineer.md        | State patterns, caching              | framework-specific state rules      |
| Database Schema        | Database design, migrations   | data-engineer.md            | Entity relationships, indexing       | data/persistence, foundation        |
| E2E Testing            | End-to-end tests              | test-automation-engineer.md | User journey validation              | testing/e2e, testing/page-objects   |
| Authentication         | Auth flows, security          | backend-engineer.md         | Authentication, authorization        | backend, foundation, security       |

## Rule Mapping Strategy

### Always Include (All Projects)

- `@vibing/rules/common/foundation/general-rules.md`
- `@vibing/rules/common/foundation/typescript-guidelines.md`
- `@vibing/rules/common/foundation/error-handling-guidelines.md`
- `@vibing/rules/common/testing/test-general.md`

### Technology-Specific Rules

- **React**: All `@vibing/rules/react/*.md` files
- **Solid.js**: All `@vibing/rules/solid.js/*.md` files
- **Astro**: All `@vibing/rules/astro.js/*.md` files
- **Apollo**: All `@vibing/rules/apollo/*.md` files (if detected)

## Execution Modes

### Mode 1: Generate (Auto-Detect)

**Smart Generation**:

```bash
@vibing/modifiers/agent-context-manager.md --mode=generate
```

**Process**:

1. Detect project type (new vs existing)
2. Detect source material (design docs vs code)
3. **Skip protected paths**: Never create AGENT.md in root directory or vibing/ directory
4. Apply appropriate analysis strategy
5. Classify directories by hierarchy (respecting protection rules)
6. Generate focused AGENT.md files only in non-protected paths
7. Validate references and structure

### Mode 2: Maintain

**Maintenance Mode**:

```bash
@vibing/modifiers/agent-context-manager.md --mode=maintain
```

**Process**:

1. Find all existing AGENT.md files (excluding protected paths)
2. **Skip protected files**: Never modify root AGENT.md or vibing/ directory files
3. Re-analyze project structure
4. Re-classify files by current hierarchy (respecting protection rules)
5. Update content for classification changes (only non-protected files)
6. Fix broken references
7. Ensure compliance with current standards

### Mode 3: Fix

**Targeted Repair**:

```bash
@vibing/modifiers/agent-context-manager.md --mode=fix --target=path/to/file
```

**Process**:

1. **Check protected paths**: Refuse to fix files in protected paths (root, vibing/)
2. Analyze specific AGENT.md file
3. Verify hierarchy classification
4. Fix content appropriateness for level
5. Update references
6. Ensure compliance with content strategy

## Protected Files

**Never Created or Modified**:
- **Root AGENT.md**: The project root AGENT.md file should never be created or modified by this modifier. It should be a standalone copy of @AGENT.md
- **`vibing/` Directory**: AGENT.md files should never be created in the vibing/ directory as this contains the agent system itself. If AGENT.md files exist here, they should be copies of @AGENT.md
- `vibing/context/AGENT.md` - Global execution context (standalone)
- `vibing/rules/` - Authoritative technical standards (references only)
- `vibing/agents/` - Agent definitions (references only)

**Protected Paths** (never generate AGENT.md files in):
- Root directory (e.g., `AGENT.md`, `README.md`)
- `vibing/` directory and all subdirectories
- `node_modules/` directory
- `.git/` directory
- Any hidden directories (starting with `.`)

## Cleanup Instructions

**For incorrectly generated files** (like in the sample directory):

1. **Delete root AGENT.md**: `rm AGENT.md` (should be copy of @AGENT.md only)
2. **Delete vibing/AGENT.md**: `rm vibing/AGENT.md` (should be copy of @AGENT.md only)
3. **Regenerate properly**: Run the corrected modifier to create appropriate AGENT.md files

**Expected correct structure**:
- Root directory: No AGENT.md (or copy of @AGENT.md only)
- `vibing/` directory: No AGENT.md files (or copies of @AGENT.md only)
- Application directories: Higher-level AGENT.md files with structure only
- Feature directories: Lower-level AGENT.md files with implementation details

## Output Summary

```
# AGENT.md Context Management Summary

## Mode: [generate|maintain|fix]
## Project Type: [new|existing]
## Source: [design-docs|code-analysis|hybrid]

## Files Processed: [number]
- Generated: [number]
- Updated: [number]
- Maintained: [number]

## Hierarchy Distribution
- Higher-level files: [number]
- Lower-level files: [number]

## Technology Detection
- Frontend: [React|Solid.js|Astro|Vue|etc.]
- Backend: [Express|Fastify|Next.js|etc.]
- Database: [PostgreSQL|MongoDB|Firebase|etc.]
- Testing: [Jest|Vitest|Playwright|Cypress|etc.]

## Issues Found and Fixed
- Broken references: [number]
- Content violations: [number]
- Hierarchy misclassifications: [number]

## Protected Files Status
- Root AGENT.md: ✅ Unchanged
- Rule files: ✅ Unchanged
- Agent files: ✅ Unchanged (references only)
```

## Smart Content Strategy

### Strict Separation of Concerns

**Higher-Level Files** (Application Structure):
- **ONLY**: Purpose & Scope, Structure, Key Interfaces, Conventions
- **NEVER**: Agent assignments, rule references, implementation details, task descriptions
- **Purpose**: Show how the application/section is organized into functional areas
- **Content Limit**: One sentence per area, no deep technical details

**Lower-Level Files** (Implementation Details):
- **ALL**: Agent assignments, rule references, implementation guidance, specific tasks
- **NEVER**: Organizational overview or structural relationships (covered in parent)
- **Purpose**: Provide detailed implementation context for developers
- **Content**: Full technical detail with agent and rule assignments

### Avoiding Duplication

1. **Parent Files**: Focus ONLY on "what" and "how organized" - no technical implementation details
2. **Child Files**: Focus ONLY on "how to implement" - no organizational context
3. **No Overlap**: Each file has a completely distinct, non-overlapping purpose
4. **Progressive Disclosure**: Structure first, then implementation details

### Content Appropriateness Rules

**Higher-Level Files**:
- ✅ One-sentence purpose descriptions
- ✅ Directory organization and relationships
- ✅ Main external dependencies only
- ✅ High-level coding standards only
- ❌ File-specific implementation details
- ❌ Agent assignments or responsibilities
- ❌ Rule references or technical guidelines
- ❌ Task descriptions or procedures
- ❌ Technology stack details (beyond external dependencies)

**Lower-Level Files**:
- ✅ Complete implementation guidance
- ✅ Agent responsibilities and assignments
- ✅ Rule references and technical standards
- ✅ Task descriptions and procedures
- ✅ Technology stack and configuration details
- ❌ Organizational structure (covered in parent)
- ❌ Directory relationship descriptions (covered in parent)

## Error Handling

- **Missing Source Material**: Reports missing design docs or insufficient code
- **Low Confidence Detections**: Reports uncertain pattern detections
- **Broken References**: Automatically fixes invalid rule/agent references
- **Hierarchy Conflicts**: Resolves classification conflicts intelligently
- **Partial Success**: Generates available context even if some areas are unclear

## Integration Benefits

- **Single Entry Point**: One modifier handles all AGENT.md operations
- **Intelligent Adaptation**: Automatically adapts to project type and structure
- **Non-Duplicative Content**: Ensures focused, relevant documentation
- **Maintenance Automation**: Keeps files current as projects evolve
- **Quality Assurance**: Validates structure and references automatically

## Migration Path

**Replace these calls**:

```bash
# Old approach - three separate modifiers
@vibing/modifiers/agent-md-manager.md --mode=generate
@vibing/modifiers/context-generator-existing-projects.md
@vibing/modifiers/context-generator-new-projects.md
@vibing/modifiers/agent-path-updater.md --mode=maintain
```

**With this unified call**:

```bash
# New approach - single intelligent modifier
@vibing/modifiers/agent-context-manager.md --mode=generate  # Auto-detects and handles appropriately
@vibing/modifiers/agent-context-manager.md --mode=maintain  # Keeps everything current
```

## Key Fixes for Sample Directory Issues

**Problems Identified and Fixed**:

1. **Root AGENT.md Protection**: The modifier now explicitly never creates or modifies root AGENT.md files. They should be standalone copies of @AGENT.md only.

2. **Vibing Directory Protection**: Never creates AGENT.md files in the vibing/ directory since this contains the agent system itself.

3. **Eliminated Duplication**: Strict separation of concerns prevents higher-level files from repeating implementation details that belong in lower-level files.

4. **Fixed Hierarchy Detection**: Better algorithm distinguishes between application structure (higher-level) and implementation details (lower-level).

5. **Content Strategy Enforcement**: Higher-level files contain only organizational structure, lower-level files contain only implementation details.

**Before (Problems)**:
- Root AGENT.md was created (should be protected)
- vibing/AGENT.md contained project-specific content (should be @AGENT.md copy only)
- `apps/api/src/AGENT.md` repeated database details already in root file
- Content was duplicated across hierarchy levels

**After (Fixed)**:
- Root AGENT.md is never created or modified
- vibing/ directory has no project-specific AGENT.md files
- Higher-level files focus only on structure and organization
- Lower-level files contain only implementation details and agent assignments
- No duplication between parent and child files

## Benefits of Unification

- **Intelligent Detection**: Automatically determines the right approach
- **Focused Content**: Creates appropriate documentation without duplication
- **Maintenance Automation**: Keeps files current and compliant
- **Quality Assurance**: Validates structure and references
- **Future-Proof**: Adapts to evolving project structures
- **Single Responsibility**: Each AGENT.md file has a clear, focused purpose
- **Progressive Disclosure**: Information revealed at appropriate hierarchy levels
- **Protected Hierarchy**: Respects standalone nature of root and vibing/ directories
