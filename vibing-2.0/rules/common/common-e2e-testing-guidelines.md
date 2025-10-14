---
description: 'Playwright E2E testing patterns: page objects, selectors, and setup. For test data management, see common-test-context-data-rules.md'
applyTo:
  - 'e2e/**/*.{ts,tsx}'
  - 'tests/e2e/**/*.{ts,tsx}'
  - 'playwright*.{ts,js}'
---

# Playwright E2E Testing Guidelines

## Core Principles

- Focus on **user behavior** rather than implementation details
- Prefer **semantic selectors** over brittle selectors
- Keep tests **deterministic** and **independent**
- Use **TestContext** for all test data management (see `common-test-context-data-rules.md`)
- Use application navigation and avoid page refreshes.
- Use step decorators within the page objects.

## Test Tagging System

All E2E tests must use consistent tags for organization, filtering, and execution control.

### Test Commands

- `pnpm test:e2e` - Runs all tests except those tagged with `@email`
- `pnpm test:e2e:email` - Runs only tests that have the `@email` tag
- `pnpm test:e2e:all` - Runs both non-email and email tests together

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

Use standardized `setUp` function with TestContext:

```typescript
async function setUp(page: Page, ctx: TestContext, testData: DataGenObject = {}) {
  const baseData = {
    orgs: [{ _id: 'O1' }],
    users: [{ _id: 'U1', orgId: 'O1' }],
    userDetails: [{ _id: 'U1' }],
  }

  const { selector, authUser } = await ctx.setupEnv(baseData, testData, page, 'U1', apiBasedLogin)
  const dashboardPage = new DashboardPage(page)

  return { dashboardPage, authUser, selector }
}

test('should display welcome message @auth @happyPath @TS001', async ({ page, ctx }) => {
  const { dashboardPage, authUser } = await setUp(page, ctx)
  await expect(dashboardPage.welcomeMessage).toHaveText(`Welcome, ${authUser.firstName}!`)
})
```

## Page Object Pattern

### Step Decorator Setup

Install the Cerios Playwright Step Decorator

```bash
pnpm add @cerios/playwright-step-decorator
```

Enable decorators in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Create a step decorator utility:

```typescript
// utils/step.ts
// Re-export the Cerios step decorator for consistency
export { step } from '@cerios/playwright-step-decorator'
```

### Page Object with Steps

Use `@step` decorator for methods with multiple actions or assertions:

```typescript
class LoginPage {
  constructor(private page: Page) {}
  private usernameInput = () => this.page.getByLabel('Username')
  private passwordInput = () => this.page.getByLabel('Password')
  private submitButton = () => this.page.getByRole('button', { name: 'Sign in' })

  @step('Login as user: {{credentials.username}}')
  async login(credentials) {
    await this.usernameInput().fill(credentials.username)
    await this.passwordInput().fill(credentials.password)
    await this.submitButton().click()
    return new DashboardPage(this.page)
  }

  @step('Navigate to user group: {{userGroupName}}')
  async gotoUserGroup(userGroupName: string) {
    await this.userMenu.click()
    await this.userGroupLink(userGroupName).click()
  }

  @step('Verify login form validation')
  async verifyValidation() {
    await expect(this.usernameInput()).toHaveAttribute('required')
    await expect(this.passwordInput()).toHaveAttribute('required')
    await expect(this.submitButton()).toBeDisabled()
  }
}
```

### Dynamic Step Descriptions

The Cerios decorator supports dynamic parameter injection:

- **Named parameters**: `{{paramName}}` - Replaced with parameter value
- **Nested properties**: `{{user.name}}` - Access object properties
- **Index-based**: `[[0]]`, `[[1]]` - Reference arguments by position

Examples:

```typescript
@step('Login as {{user.name}} with role {{user.role}}')
async login(user: { name: string, role: string }) { }

@step('Click button [[0]] times')
async clickButton(times: number) { }
```

### When to Use Steps

- **ALL** page object helper functions, excluding locators.

## Selector Priority

1. `getByRole()` - Best for accessibility
2. `getByLabel()` - For form fields
3. `getByText()` - For text content
4. `getByPlaceholder()` - For inputs with placeholder
5. `getByTestId()` - Only as last resort

```typescript
// ❌ Avoid
page.locator('div.button.primary')
page.locator('[data-testid="submit-button"]')

// ✅ Prefer
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Username')
```

## Anti-Patterns

- **DO NOT** use hardcoded waits (`page.waitForTimeout()`)
- **DO NOT** use flaky selectors (`.button.primary`)
- **DO NOT** create test interdependence
- **DO NOT** use mocks - prefer real implementations
- **DO NOT** use `beforeEach`/`afterEach` for test setup
- **DO NOT** use `describe` blocks
