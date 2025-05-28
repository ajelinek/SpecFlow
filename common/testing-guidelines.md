---
description: Apply when implementing or modifying tests, test setup functions, page objects, or end-to-end test scenarios
ruleType: testing
globs:
alwaysApply: false
---
## When to Use
Apply these rules when implementing or modifying tests, test setup functions, page objects, or end-to-end test scenarios.

# Testing
- Vitest for utility unit tests.
- Playwright for E2E tests.
- Avoid mocking
- Generate data required for each test
- Use a setUp function to setup the test and return created/shared object
- Avoid before* blocks (use a setUp function)
- Avoid describe blocks
- No comments within the tests

## e2e tests
- All features must have E2E tests
- Use Page Object Pattern
- No local or private attributes
- Allow nesting selectors (pass higher-level context)
- Focus on outcome-based testing
- Tests should be flexible to layout changes
- Only test what user sees/hears (no style/attribute verification)
- New code/features require matching tests
- Use data generation utilities for test data
- Use an async setUp function to setup test vs BeforeEach or BeforeAll

## Selectors / Locators
- Prefer accessibility selectors (`getBy*`) when the HTML contains proper semantic elements and ARIA attributes
- When HTML lacks ARIA roles, update the source HTML to include semantic elements (e.g., `<section aria-label="hero">` instead of `<div class="hero">`)
- If HTML cannot be updated immediately, use locator() with semantic CSS selectors as a temporary solution
- Avoid getByTestId selections; prefer meaningful semantic selectors that relate to content
- Follow this priority for selectors:
  1. `getByRole()` with name - best semantic approach
  2. `getByText()` - based on visible content
  3. `locator()` with semantic CSS selectors - when elements lack proper ARIA roles
- Avoid selectors for individual attributes (use `getByText`)
- Locators in page objects should be functions defined on the class

## Test setUp Function
- Function should be unique per test file and contain only setup logic
- Function should accept test context parameters directly
- Additional parameters can be passed in as needed for the tests
- Example:
  ```typescript
  async function setUp(page: Page) {
    const somePage = new SomePage(page)
    await somePage.goto()
    return { somePage, otherContext }
  }

  test('test description', async ({ page }) => {
    const { somePage } = await setUp(page)
    // test assertions
  })
  ```
- Example with custom parameters and data generation
  ```typescript
  async function setUp(page: Page, user: User) {
    const somePage = new SomePage(page)
    await createTestUser(user)
    await somePage.goto()
    return { somePage, otherContext }
  }

  test('test description', async ({ page }) => {
    const user = createTestUser()
    const { somePage } = await setUp(page, user)
    // test assertions
  })

## Test data generation
- Utilities per table/object
- Allow overriding specific fields
- Only specify needed attributes for assertions
- Ability to pre-populate backend
- Ability for tests to select generated data
- Use Faker.js to generate test data
