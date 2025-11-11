# Common Commands Generator

**Purpose**: Generates a standardized `vibing/context/common-commands.md` file containing project-specific commands, test patterns, and operational procedures.

## Overview

This modifier creates a comprehensive commands reference file that contains all project-specific commands, test patterns, prerequisites, and operational procedures. This file is referenced by `AGENT.md` to provide LLMs with project-specific command knowledge.

## Inputs

- **Project Root Path**: The root directory of the project
- **Package.json Analysis**: Dependencies and scripts from package.json
- **Test Configuration**: Test framework configurations and patterns
- **Build Configuration**: Build tool configurations and scripts

## Detection Strategy

### Phase 1: Package.json Analysis

1. **Script Detection**:

   - Extract all scripts from `package.json`
   - Identify test scripts (test, test:unit, test:e2e, etc.)
   - Identify build scripts (build, dev, start, etc.)
   - Identify linting scripts (lint, lint:fix, etc.)
   - Identify type checking scripts (type-check, tsc, etc.)

2. **Dependency Analysis**:

   - Detect package manager (npm/pnpm/yarn)
   - Detect testing frameworks (Playwright, Vitest, Jest, etc.)
   - Detect build tools (Vite, Webpack, Rollup, etc.)
   - Detect development servers (Express, Astro dev, etc.)

3. **Test Framework Detection**:
   - Playwright configuration and test patterns
   - Vitest configuration and unit test patterns
   - Jest configuration if present
   - Test data management patterns

### Phase 2: Project Structure Analysis

1. **Test Directory Structure**:

   - Scan for test directories (`tests/`, `e2e/`, `playwright/`, `__tests__/`)
   - Identify test file patterns and naming conventions
   - Detect page object patterns
   - Identify test data management patterns

2. **Build and Development Patterns**:
   - Detect development server requirements
   - Identify emulator requirements (Firebase, etc.)
   - Detect database setup requirements
   - Identify environment configuration needs

## Generated Content Structure

The generator creates a concise commands file with:

### Prerequisites Section

- Essential server and environment requirements
- Package manager requirements

### Test Commands Section

- Unit test commands with filtering options
- E2E test commands with filtering options
- Test debugging and UI options

### Build Commands Section

- Development server commands
- Build commands
- Linting and type checking commands

### Important Notes Section

- Critical operational procedures
- Common troubleshooting notes

## Output Files

### Primary Output: `vibing/context/common-commands.md`

**Structure**:

```markdown
# Common Commands

## Prerequisites

[Essential server and environment requirements]

## Test Commands

[Concise unit and E2E test commands with filtering]

## Build Commands

[Development and build commands]

## Important Notes

[Critical operational procedures and troubleshooting]
```

## Usage

This modifier should be run when:

- Setting up a new project context
- Updating project command patterns
- Adding new test or build configurations
- Modifying development workflows

**Validation Steps**:

1. Verify `package.json` exists and is readable
2. Scan for test configuration files
3. Validate project structure for command patterns

## Example Output

The generator will create a `vibing/context/common-commands.md` file:

**Generated `vibing/context/common-commands.md`:**

````markdown
# Common Commands

## Prerequisites

- Dev/test servers must already be running (Firebase emulators, Astro dev server, Express server, etc)
- Do not start/restart servers - if issues occur, stop and ask user
- Use pnpm for all test commands

## Test Commands

### Unit Tests (All Modules)

```bash
pnpm test:unit
```
````

Runs unit tests across entire project (functions + data modules) using Vitest.

**Filtering:**

- Filter by file: `pnpm test:unit path/to/test-file.spec.ts`
- Filter by test name: `pnpm test:unit -t "test name"`
- Filter by module: `pnpm test:unit functions/` or `pnpm test:unit data/`

### E2E Tests (Playwright)

```bash
pnpm test:e2e
```

Runs end-to-end tests for ranking, voting, dashboard, and user management flows.

**Filtering:**

- Filter by file: `pnpm test:e2e ranking-management.spec.ts`
- Filter by test name: `pnpm test:e2e --grep "ranking creation"`
- Filter by module: `pnpm test:e2e dashboard/`
- Debug mode: `pnpm test:e2e --debug`
- UI mode: `pnpm test:e2e --ui`

## Important Notes

- Test data reset happens only at test execution start
- Individual tests do not reset database
- If servers aren't running or tests fail due to server issues, stop and ask user to restart servers
- Tests use Firebase emulators for data operations
- E2E tests use page objects for consistent element interactions

```

```
