---
description: General testing guidelines for all test types and assertions
ruleType: testing
globs:
alwaysApply: false
---

# Testing Strategy

## Test Types

- Prefer e2e tests over unit/integration tests

### Unit/Integration Tests (Vitest)

- **Purpose**: Test individual units of code in isolation
- **When to write**:
  - Complex business logic
  - Utility/helper functions
  - Edge cases not easily tested via E2E
  - Performance-critical code paths
  - Pure functions with clear inputs/outputs

### E2E Tests (Playwright) (refer to E2E testing documentation)

- **Purpose**: Test complete user flows and system integration
- **When to write**:
  - Critical user journeys
  - Core application workflows
  - Cross-component interactions
  - Authentication and authorization flows
  - Features spanning multiple layers

# Testing Principles

## Test Structure

- Follow Given-When-Then pattern
- Use descriptive test names following should/when/then pattern
- Keep tests focused on a single behavior
- Structure tests with clear sections:

  ```typescript
  // 1. Given - Setup test data and environment
  const { service, dependencies } = await setupTest()

  // 2. When - Perform the action being tested
  const result = await service.performAction()

  // 3. Then - Verify the outcome
  expect(result).toMatchExpectedBehavior()
  ```

## Test Data Management

- Generate fresh, realistic test data for each test
- Use factory functions for complex objects
- Keep test data minimal and relevant
- Prefer inline data over shared fixtures when possible

## Test Organization

- Place unit/integration tests in `__tests__` folders next to the code they test
- Place E2E tests in `e2e` directory
- Name test files as `[module-name].test.ts` or `[module-name].test.tsx`

## Test Performance

- Keep individual tests fast (<100ms)
- Minimize setup/teardown overhead
- Use testing environment variables for configuration

# Anti-patterns

## Test Structure

- **Global State**: Avoid shared state between tests
- **Nested Tests**: Avoid nesting tests within `describe` blocks. Nested tests with `beforeEach` hooks can create implicit dependencies and make it difficult to understand the state of any given test. Prefer flatter test structures and organize test suites by feature into separate files.
- **`beforeEach` for Setup**: Do not use `beforeEach` to set up test-specific data or state. Instead, use setup helper functions that are called at the beginning of each test. `beforeEach` and `afterEach` should primarily be reserved for global cleanup tasks.
- **Over-engineering**: Keep test setup simple and focused
- **Test Interdependence**: Ensure tests can run in isolation
- **Implementation Testing**: Focus on behavior, not implementation details

## Test Code Quality

- **Brittle Tests**: Avoid tests that break with unrelated changes
- **Over-mocking**: Prefer real implementations over mocks
- **Test Duplication**: Extract common test utilities into common modules
- **Overspecification**: Don't test what you don't own (e.g., third-party code)
- **Time Dependencies**: Avoid tests that depend on timing without proper handling

## Test Maintenance

- **Commented-out Tests**: Do not comment out tests, fix failing tests
- **Test Ignoring**: Do not use test.only or test.skip in committed code
- **Test Data Pollution**: Clean up test data BEFORE not after each tests
- **Oversharing**: Do not share test data between unrelated tests

# Example Test File

```typescript
// user-service.test.ts
import { createTestDatabase } from '../../test-utils/database'
import { UserService } from './user-service'

// Test data factories
const createTestUser = (overrides = {}) => ({
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
})

// Test setup
async function setupTest(initialData = {}) {
  const db = await createTestDatabase()
  await db.seed(initialData)
  const userService = new UserService({ db })
  return { db, userService }
}

// Each test is self-contained and sets up its own state, avoiding shared mutable variables.
test('creates a new user with valid data', async () => {
  const { userService } = await setupTest()
  const userData = { name: 'New User', email: 'new@example.com' }

  const user = await userService.create(userData)

  expect(user).toMatchObject({
    id: expect.any(String),
    name: userData.name,
    email: userData.email.toLowerCase(),
  })
})

test('finds existing user by email (case-insensitive)', async () => {
  const testUser = createTestUser({ email: 'test@example.com' })
  const { userService } = await setupTest({ users: [testUser] })

  const foundUser = await userService.findByEmail('TEST@example.com')

  expect(foundUser).toEqual(testUser)
})
```
