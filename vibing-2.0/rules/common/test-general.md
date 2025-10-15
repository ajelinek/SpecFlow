# Unit and Integration Testing Guidelines

## Testing Philosophy

**Prefer E2E > Integration > Unit Tests**

Favor end-to-end tests over integration tests, and integration tests over unit tests. This approach ensures we test real user workflows and system behavior rather than isolated components.

**Avoid Mocks - They Are Anti-Patterns**

Mocks should be avoided whenever possible, Instead:

- Use real implementations and dependencies
- Test against actual databases and services
- Only mock external services that are truly uncontrollable (payment gateways, third-party APIs) and do not have a test endpoint.

## Test Types and Data Management

### Unit Tests (Vitest)

- **Purpose**: Test individual units of code in isolation
- **When to write**:
  - Complex business logic
  - Utility/helper functions
  - Edge cases not easily tested via E2E
  - Pure functions with clear inputs/outputs
- **Data Management**: Use direct generators and factory functions (no TestContext needed)

### Integration Tests (Vitest)

- **Purpose**: Test component interactions and database integration
- **When to write**:
  - Service layer interactions
  - Database operations
  - API integrations
  - Cross-component data flow
- **Data Management**: Use TestContext for database integration (see @rules/common/test-context.md)

### E2E Tests (Playwright)

- **Purpose**: Test complete user flows and system integration
- **When to write**:
  - Critical user journeys
  - Core application workflows
  - Cross-component interactions
  - Authentication and authorization flows
  - Features spanning multiple layers
- **Data Management**: Use TestContext for all data management (see @rules/common/test-context.md)

# Testing Principles

## Test Structure

- Follow Given-When-Then pattern
- Use descriptive test names following should/when/then pattern
- Keep tests focused on a single behavior
- Structure tests with clear sections:

## Test Data Management

### For Unit Tests

- Generate fresh, realistic test data for each test
- Use factory functions for complex objects
- Keep test data minimal and relevant
- Prefer inline data over shared fixtures when possible

### For Integration Tests

- Use TestContext for all data management (see @rules/common/test-context.md)
- Follow standardized setup patterns with `ctx.setupEnv()`
- Use shorthand ID conventions (U1, O1, G1, etc.)

## Test Organization

- Place unit/integration tests in `__tests__` folders next to the code they test
- Name test files as `[module-name].test.ts` or `[module-name].test.tsx`
- For E2E tests, see @rules/common/e2e-testing-guidelines.md

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
- **Conditional Logic**: No conditional logic in tests for any reason, be specific in what is tests

## Test Maintenance

- **Commented-out Tests**: Do not comment out tests, fix failing tests
- **Test Ignoring**: Do not use test.only or test.skip in committed code
- **Test Data Pollution**: For unit tests, generate fresh data. For integration tests, TestContext handles cleanup
- **Oversharing**: Do not share test data between unrelated tests
