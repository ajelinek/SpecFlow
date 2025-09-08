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

test('should display welcome message', async ({ page, ctx }) => {
  const { dashboardPage, authUser } = await setUp(page, ctx)
  await expect(dashboardPage.welcomeMessage).toHaveText(`Welcome, ${authUser.firstName}!`)
})
```

## Page Object Pattern

```typescript
class LoginPage {
  constructor(private page: Page) {}
  private usernameInput = () => this.page.getByLabel('Username')
  private passwordInput = () => this.page.getByLabel('Password')
  private submitButton = () => this.page.getByRole('button', { name: 'Sign in' })

  async login(credentials) {
    await this.usernameInput().fill(credentials.username)
    await this.passwordInput().fill(credentials.password)
    await this.submitButton().click()
    return new DashboardPage(this.page)
  }
}
```

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
