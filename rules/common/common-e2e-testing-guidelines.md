---
description: Comprehensive guidelines for writing maintainable and reliable Playwright tests
---

# Playwright Testing Guidelines

## Core Principles

- Write tests that are **reliable**, **maintainable**, and **readable**
- Focus on **user behavior** rather than implementation details
- Prefer **semantic selectors** over brittle selectors
- Keep tests **deterministic** and **independent**
- Follow the **Page Object Pattern** for better maintainability

## Test Structure

### Test File Organization

- Group related tests by feature or user flow
- Place test files in a `e2e` directory mirroring the app's structure
- Use `.spec.ts` suffix for test files
- Keep test files focused and single-responsibility

### Test Setup

- Use a `setUp` function for test initialization
- Avoid `beforeEach`/`afterEach` unless absolutely necessary
- No `describe` blocks
- Clean up test data before each test
- Return only the necessary context from setup functions

```typescript
// Good
async function setUp(page: Page, user: TestUser) {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(user)
  return { dashboardPage: new DashboardPage(page) }
}

// Usage
test('should display welcome message', async ({ page }) => {
  const user = createTestUser()
  const { dashboardPage } = await setUp(page, user)
  await expect(dashboardPage.welcomeMessage).toHaveText(`Welcome, ${user.name}!`)
})
```

## Page Object Pattern

### Page Object Structure

- One class per page/component
- Locators are private anonymous functions
- Group related actions in methods
- Return new page objects for navigation

```typescript
class LoginPage {
  constructor(private page: Page) {}

  // Locators
  private usernameInput = () => this.page.getByLabel('Username')
  private passwordInput = () => this.page.getByLabel('Password')
  private submitButton = () => this.page.getByRole('button', { name: 'Sign in' })
  private errorMessage = () => this.page.getByRole('alert')

  // Actions
  async goto() {
    await this.page.goto('/login')
    return this
  }

  async login(credentials: { username: string; password: string }) {
    await this.usernameInput().fill(credentials.username)
    await this.passwordInput().fill(credentials.password)
    await this.submitButton().click()
    return new DashboardPage(this.page)
  }

  // Assertions
  async expectErrorMessage(message: string) {
    await expect(this.errorMessage()).toContainText(message)
  }
}
```

## Selectors

### Selector Priority

1. `getByRole()` - Best for accessibility
2. `getByLabel()` - For form fields
3. `getByText()` - For text content
4. `getByPlaceholder()` - For inputs with placeholder
5. `getByTestId()` - Only as last resort

### Bad Practices

```typescript
// ❌ Avoid
page.locator('div.button.primary')
page.locator('[data-testid="submit-button"]')
page.locator('//button[contains(@class, "btn")]')

// ✅ Prefer
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Username')
page.getByText('Welcome back!')
```

## Test Data

### Data Generation

- Use Faker.js for realistic test data
- Create data factories for complex objects
- Keep test data isolated between tests
- Use unique values to prevent test interference

```typescript
// test-data/user.ts
export function createTestUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    ...overrides,
  }
}
```

## Best Practices

### Test Structure

- Test one behavior at a time
- Use descriptive test names
- Avoid test interdependence
- Apply multiple assertions within a single test

### Performance

- Run tests in parallel when possible
- Reuse browser context between tests

## Anti-Patterns

### ❌ Avoid

- Hardcoded waits (`page.waitForTimeout()`)
- Flaky selectors (`.button.primary`)
- Test interdependence
- Complex test setup
- Testing implementation details
- Unnecessary test data

## Example Test Suite

```typescript
// tests/dashboard.spec.ts
import { test, expect } from '@playwright/test'
import { DashboardPage } from '../pages/dashboard.page'
import { createTestUser } from '../test-data/user'

async function setUp(page: Page) {
  const user = createTestUser({ role: 'admin' })
  await createUserInBackend(user)

  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(user)

  return { dashboardPage: new DashboardPage(page) }
}

test('should display welcome message', async ({ page }) => {
  const user = createTestUser({ name: 'Test User' })
  const { dashboardPage } = await setUp(page)

  await expect(dashboardPage.welcomeMessage).toContainText('Welcome, Test User!')
})

test('should display recent activities', async ({ page }) => {
  const { dashboardPage } = await setUp(page)
  await expect(dashboardPage.recentActivities).toBeVisible()
  await expect(dashboardPage.recentActivitiesItems).toHaveCount(5)
})
```
