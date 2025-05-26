---
description: Apply when implementing or modifying tests, test setup functions, page objects, or end-to-end test scenarios
---

# Testing

- Vitest for utility unit tests.
- Playwright for E2E tests.
- Avoid mocking
- Generate data required for each test
- Use a SetUp function to setup the test and return created / shared object.
- Avoid before\* blocks (use a setUp function)
- Avoid describe blocks
- No comments within the tests

## e2e tests

- All features must have E2E tests.
- Use Page Object Pattern.
- No local or private attributes.
- Allow nesting selectors (pass higher-level context).
- Focus on outcome-based testing.
- Tests should be flexible to layout changes.
- Only test what user sees/hears (no style/attribute verification).
- New code/features require matching tests.
- Use data generation utilities for test data.

## Selectors / Locators

- Use an async setUp function to setup test vs BeforeEach or BeforeAll.## Selectors / Locators
- Prefer accessibility selectors (`getBy*`) when the HTML contains proper semantic elements and ARIA attributes.
- When HTML lacks ARIA roles, update the source HTML to include semantic elements (e.g., `<section aria-label="hero">` instead of `<div class="hero">`)
- If HTML cannot be updated immediately, use locator() with semantic CSS selectors as a temporary solution.
- Avoid getByTestId selections; prefer meaningful semantic selectors that relate to content
- Follow this priority for selectors:
  1. `getByRole()` with name - best semantic approach
  2. `getByText()` - based on visible content
  3. `locator()` with semantic CSS selectors - when elements lack proper ARIA roles
- Avoid selectors for individual attributes (use `getByText`).
- Locators in page objects should be functions defined on the class.

## Page Object Pattern

- Define page objects as classes that extend from a base page when appropriate
- Use component composition for reusable UI elements (like headers, footers, etc.)
- Define locators as arrow functions that return Playwright locators (lazy evaluation)
- Group related actions and assertions within the page object
- Follow naming conventions: `elementName = () => this.page.getByRole("role", { name: "text" })`
- Implement page-specific actions that combine multiple steps
- Include reusable assertions that validate page state

## Locator Pattern

- Define locators as arrow functions that return fresh locators: `elementName = () => this.page.locator(selector)`
- This pattern ensures locators are evaluated at runtime, preventing stale references
- Group related locators together in the class definition
- Follow the priority for selectors as previously defined
- For component locators, consider passing parent context: `childElement = (parent) => parent.getByRole("button")`

## Component Composition

- Create component classes for reusable UI elements (headers, forms, modals)
- Instantiate components in the page object constructor
- Pass the page object to component constructors
- Components should follow the same locator patterns as page objects

## Fixtures

- Create custom fixtures for common test prerequisites (authenticated users, data setup)
- Use the Playwright test.extend() pattern for fixtures
- Return created test data from fixtures for use in tests
- Clean up created test data after tests when necessary

## Test setUp Function

- Function should be unique per test file and contain only setup logic
- Function should accept test context parameters directly
- Additional parametters can be passed in as needed for the tests
- Simple Example function.

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
  ```

## Test data generation

- Utilities per table/object.
- Allow overriding specific fields.
- Only specify needed attributes for assertions.
- Ability to pre-populate backend.
- Ability for tests to select generated data.
- Use Faker.js to generate test data.
- Use only the generators and scenario utilities provided in the `data` folder for all test data creation.
- Always use the generator's `options` argument to override fields as needed for your test case.
- Use the shared IdProvider from the `data` folder to ensure unique and consistent IDs across all generated entities in a scenario.
- Compose related data using the Scenario builder; do not manually construct entity relationships.
- Access generated data in tests only through the Selector utility, not by directly accessing arrays or objects.
- Use short, human-readable keys for IDs in test setup for clarity and maintainability.
- When adding new entity types, follow the established generator and scenario patterns in the `data` folder.
- Use partial types for generator options so only needed fields must be specified.
- Test data should be realistic and unique unless explicitly overridden for a specific test case.
- Do not duplicate generator logic in test files; centralize all data generation in the `data` folder.
- Review and follow the documentation in the `data` folder for advanced usage, custom overrides, and troubleshooting.
