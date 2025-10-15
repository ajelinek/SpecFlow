# Playwright E2E Testing Guidelines

## Core Principles

- Focus on **user behavior** rather than implementation details
- Prefer **semantic selectors** over brittle selectors
- Keep tests **deterministic** and **independent**
- Use **TestContext** for all test data management (see @rules/common/test-context.md)
- Use application navigation and avoid page refreshes
- Use step decorators within the page objects

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

All E2E tests must use consistent tags for organization, filtering, and execution control.

### Required Tags

Every test must include at least one **feature tag** and one **test type tag**:

#### Feature Tags (Required - Choose One)

- `@auth` - Authentication and authorization flows
- `@dashboard` - Dashboard display and navigation
- `@service-management` - Service creation, editing, deletion
- `@service-entry` - Service entry form and validation
- `@targets` - Target display and progress tracking
- `@user-groups` - User group management and switching
- `@user-settings` - User account settings and preferences
- `@navigation` - Page navigation and routing
- `@services` - Services listing and filtering
- `@sponsors` - Sponsor display and rotation

#### Test Type Tags (Required - Choose One)

- `@happyPath` - Standard user workflow testing
- `@errorPath` - Error handling and edge cases
- `@integration` - Cross-component integration testing
- `@navigation` - Navigation and routing testing
- `@list` - List display and data presentation
- `@filter` - Filtering and search functionality
- `@export` - Data export functionality
- `@empty-state` - Empty state handling
- `@create` - Creation functionality
- `@edit` - Editing functionality
- `@delete` - Deletion functionality
- `@email` - If it uses email capabilities

### Tagging Rules

- **All tags must be at the END of the test description**
- **Test case numbers**: Tags must include a test case number `@TS#` to allow for easy filtering
- **Email Integration Tests**: Add `@email` tag to any test that:

  - Sends actual emails (password reset, welcome emails, etc.)
  - Calls email service APIs (Mailgun, etc.)
  - Tests email delivery or content
  - Tests user group member addition/removal that triggers emails

- **Test Naming**: Use descriptive names that include the feature and test type
- **Multiple Tags**: Use multiple tags when a test covers multiple aspects

## Test Setup Pattern

See @rules/common/test-setup-examples.md

## Page Object Pattern

**MANDATORY**: All E2E tests must use the Page Object Pattern for maintainable, reusable test code.

### Key Requirements

- **Every test must use page objects** - No direct page interactions in test files
- **Step decorators required** - Use `@step` decorators for all page object methods
- **Semantic selectors only** - Use data-testid, role, or text-based selectors
- **Single responsibility** - One page object per page/component

See @rules/common/test-e2e-page-object.md for complete page object pattern guidelines including step decorators, selector priorities, and implementation examples.

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
