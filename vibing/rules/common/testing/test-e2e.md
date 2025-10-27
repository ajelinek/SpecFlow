# Playwright E2E Testing Guidelines

## Core Principles

- Focus on **user behavior** rather than implementation details
- Prefer **semantic selectors** over brittle selectors
- Keep tests **deterministic** and **independent**
- Use **TestContext** for all test data management (see @vibing/rules/common/testing/test-context.md)
- Use application navigation and avoid page refreshes
- Use step decorators within the page objects
- **Viewport Testing**: Only test different viewports when functionality differs, not for visual-only changes

## Test Organization Rules

### MANDATORY File Structure

- **ALL tests must be in `spec/` folder**
- **ALL test files must end with `.spec.ts`**
- **NO locators in test files** - all locators must be in page objects
- **NO direct page interactions** - use page objects only

```
tests/
├── spec/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── dashboard/
│   │   └── navigation.spec.ts
│   └── services/
│       └── management.spec.ts
└── page-objects/
    ├── LoginPage.ts
    ├── DashboardPage.ts
    └── ServicesPage.ts
```

## Test Tagging System

See @vibing/rules/common/testing/test-e2e-tags.md for complete tagging system including:

- Required feature and test type tags
- Tagging rules and conventions
- Usage examples

## Test Setup Pattern

See @vibing/rules/common/testing/test-setup-examples.md

## Page Object Pattern

**MANDATORY**: All E2E tests must use the Page Object Pattern for maintainable, reusable test code.

### Key Requirements

- **Every test must use page objects** - No direct page interactions in test files
- **Step decorators required** - Use `@step` decorators for all page object methods
- **Semantic selectors only** - Use data-testid, role, or text-based selectors
- **Single responsibility** - One page object per page/component

See @vibing/rules/common/testing/test-e2e-page-object.md for complete page object pattern guidelines including step decorators, selector priorities, and implementation examples.

## Anti-Patterns - FORBIDDEN

- **DO NOT** use hardcoded waits (`page.waitForTimeout()`)
- **DO NOT** use flaky selectors (`.button.primary`, `#submit-form`)
- **DO NOT** create test interdependence
- **DO NOT** use mocks - prefer real implementations
- **DO NOT** use `beforeEach`/`afterEach` for test setup
- **DO NOT** use `describe` blocks
- **DO NOT** put locators in test files - use page objects only
- **DO NOT** use conditional logic in page objects
- **DO NOT** use explicit waits in page objects
