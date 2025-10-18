# General

- Always assume the user is wrong until proven otherwise.
- NEVER make assumptions. ALWAYS ask for clarification / direction.
- NEVER execute git add/commit/checkout/merge commands unless specifically asked.
- ALWAYS read referenced files

# Agents

All changes must be executed within the context of an agent. The agent should be referenced/read in and the specific action that is being taken mused use the agents context. All agents must also read in all rules for the given agent and follow rules exactly.

# Rules

When writing code or documentation always reference the appropriate rule files based on the provided descriptions. Rule files are primarily pulled in via agents, but can be accessed directly when needed.

<!-- PLACEHOLDER
List all rule files with a description of the rule file along with the relevant path using an @ symbol
--->

# Test Commands

## Prerequisites

- Dev/test servers must already be running (Firebase emulators, Astro dev server, Express server, etc)
- Do not start/restart servers - if issues occur, stop and ask user
- Use pnpm for all test commands

## Available Commands

### Unit Tests (All Modules)

```bash
pnpm test:unit
```

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
