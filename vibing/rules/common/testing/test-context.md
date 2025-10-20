# Test Data Management Rules

**IMPORTANT**: If a TestContext object does not exist then STOP and ask for clarification.

## When to Use TestContext

Use TestContext for tests requiring:

- Database integration (E2E, integration, unit tests with DB)
- Authentication setup
- Complex data relationships

For pure unit tests without database connectivity, use direct generators from `@data/generators`.

## Core Principles

- **Centralized Logic**: All test environment setup, data generation, and user management is handled by the `TestContext` class located in `@data/core/context.ts`. Do not create separate test helpers.
- **Universal Setup Pattern**: All tests should use a standardized `setUp` function that leverages TestContext for cross-cutting concerns.
- **Playwright Fixtures**: E2E tests MUST use the provided Playwright fixtures for accessing the test context.
  - `ctx`: Provides a shared `TestContext` instance for all data setup and authentication.
- **No Direct Instantiation**: Test files should never call `TestContext.create()` directly. Always rely on the `ctx` fixture or setup functions.
- **User Management**:
  - Authentication is handled through the `ctx.setupEnv()` method with optional login functions.
  - User deletion is handled automatically by the test runner's environment cleanup. Do not manually delete users.
- **Test ID Management**: All test data generation MUST use the standardized shorthand ID system and generators from `@data/generators`.
  - Use consistent shorthand IDs across tests: `U1, U2, U3...` for users, `O1, O2, O3...` for organizations, `G1, G2, G3...` for user groups, etc.
  - Always use generators and functions provided in `@data/generators` for data creation.
  - Shorthand IDs can be duplicated across different test files and test cases. The `TestContext` and `IdProvider` manage the creation of unique database IDs from shorthand IDs.
  - Shorthand IDs must be unique within each test's `baseData` and `testData` for a given test case since they are merged together as one object.
- **Centralized Initial Data Setup**: ALL initial test data setup MUST be passed through the `ctx.setupEnv()` function.
  - All base data and test-specific data for initial test setup must be handled in one atomic operation through `setupEnv()`.
  - Additional data creation during test execution (as part of specific test scenarios) can use scenario/builder patterns.
  - This ensures consistent initial data generation and proper ID management.
- **Minimal Data Specification**: Only specify data that is specific to or needed for the test - let generators create random data for everything else.
  - Always specify IDs and relationships (foreign keys) that the test depends on.
  - Allow generators to create random names, descriptions, emails, and other non-critical data.
  - This reduces test maintenance and makes tests more resilient to data changes.
- **Additive Data Pattern**: All test data is always additive in nature - never clean up data between tests or modules.
  - Global setup handles table truncation and schema recreation.
  - Individual test setups only add data.
  - Tests DO NOT clean up the data they generated or modified.
  - This ensures test isolation and prevents data conflicts.

## Anti-Patterns

- **DO NOT** create test helper files - use TestContext
- **DO NOT** call `TestContext.create()` directly - use `ctx` fixture
- **DO NOT** manually delete users - environment handles cleanup
- **DO NOT** use `beforeEach`/`afterEach` for data setup
- **DO NOT** override entities with same shorthand IDs as base data
- **DO NOT** over-specify data - only specify IDs and relationships
- **DO NOT** use mocks - prefer real implementations
- **DO NOT** use hardcoded numeric IDs (e.g., `userId: 12345`)
- **DO NOT** create entities without required relationships
- **DO NOT** manually resolve IDs - use selector methods with shorthand IDs
- **DO NOT** create test data outside of the TestContext system
- **DO NOT** override entities with same shorthand IDs as MODULE_BASE_DATA - this creates duplicate key violations
