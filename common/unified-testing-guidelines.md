---
description: Unified testing guidelines for all projects, covering unit, integration, and E2E testing
---

# Unified Testing Guidelines

## Core Principles
- **Test behavior, not implementation** - Focus on what the code does, not how it does it
- **Use real services** - Prefer real databases, file systems, and external services over mocks
- **Keep tests independent** - Each test should be able to run in isolation
- **Be explicit** - Make test intentions clear through descriptive names and structure
- **Minimize test setup** - Only set up what's necessary for each test case

## Test Types

### Unit/Integration Tests (Combined)
- No strict separation between unit and integration tests
- Test individual functions and their integration in the same test file
- Use real services (database, filesystem) instead of mocks
- Focus on testing behavior and outcomes
- Group related tests by feature or module

### End-to-End (E2E) Tests
- Use Playwright for browser automation
- Test complete user flows
- Follow Page Object Model pattern
- Keep tests focused on user interactions and outcomes
- Run against a production-like environment

## Test Structure

### File Organization
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── __tests__/
│   │       └── Button.test.tsx
│   └── Form/
│       ├── Form.tsx
│       └── __tests__/
│           └── Form.test.tsx
├── services/
│   ├── user-service.ts
│   └── __tests__/
│       └── user-service.test.ts
└── utils/
    ├── validation.ts
    └── __tests__/
        └── validation.test.ts

tests/
└── e2e/                # End-to-end tests
    ├── auth/
    │   └── login.flow.ts
    └── dashboard/
        └── navigation.flow.ts
```

- Unit/Integration tests live in `__tests__` folders next to the code they test
- E2E tests live in the top-level `tests/e2e` directory
- Each test file should be named after the module it tests with a `.test.ts` or `.test.tsx` suffix

### Test File Structure
```typescript
// Import test utilities and dependencies
import { createTestDatabase } from '../../test-utils/database';
import { UserService } from './user-service';

// Test data generators
function createTestUser(overrides = {}) {
  return {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    ...overrides,
  };
}

// Test suite for UserService
test('UserService', () => {
  let db;
  let userService;

  // Shared test setup
  async function setUp(initialData = {}) {
    db = await createTestDatabase();
    await db.seed(initialData);
    userService = new UserService({ db });
    return { db, userService };
  }

  // Cleanup after each test
  async function tearDown() {
    if (db) await db.close();
  }

  test('creates a new user', async () => {
    const { userService } = await setUp();
    const userData = { name: 'New User', email: 'new@example.com' };
    
    const user = await userService.create(userData);
    
    expect(user).toMatchObject({
      id: expect.any(String),
      ...userData,
    });
    
    await tearDown();
  });

  test('finds existing user by email', async () => {
    const testUser = createTestUser();
    const { userService } = await setUp({ users: [testUser] });
    
    const foundUser = await userService.findByEmail(testUser.email);
    
    expect(foundUser).toEqual(testUser);
    await tearDown();
  });
});
```

## Test Utilities

### Database Helpers
```typescript
// test-utils/database.ts
export async function createTestDatabase() {
  const db = new Database({ inMemory: true });
  await db.migrate();
  return db;
}
```

### API Helpers
```typescript
// test-utils/api.ts
export function createTestClient(baseURL) {
  return {
    async get(endpoint) {
      const response = await fetch(`${baseURL}${endpoint}`);
      return response.json();
    },
    // Add other HTTP methods as needed
  };
}
```

## E2E Testing with Playwright

### Page Object Pattern
```typescript
// tests/e2e/pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  private emailInput = () => this.page.getByLabel('Email');
  private passwordInput = () => this.page.getByLabel('Password');
  private submitButton = () => this.page.getByRole('button', { name: 'Sign in' });
  private errorMessage = () => this.page.getByRole('alert');

  // Actions
  async goto() {
    await this.page.goto('/login');
    return this;
  }

  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.submitButton().click();
    return new DashboardPage(this.page);
  }
}
```

### E2E Test Example
```typescript
// tests/e2e/auth/login.flow.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { createTestUser } from '../../test-utils/database';

test.describe('Login Flow', () => {
  test('successful login', async ({ page }) => {
    // Setup test data
    const testUser = await createTestUser({
      email: 'test@example.com',
      password: 'secure123',
    });

    // Test execution
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const dashboardPage = await loginPage.login(testUser.email, testUser.password);

    // Assertions
    await expect(dashboardPage.welcomeMessage).toContainText(`Welcome, ${testUser.name}`);
  });
});
```

## Test Isolation

### No Shared State
- Each test must be completely independent
- Never rely on state from previous tests
- Create fresh test data for each test case
- Use `afterEach` or `afterAll` for cleanup if needed
- Reset any global state between tests

### Test Data Management
- Pass all required test data into the `setUp` function
- The `setUp` function is responsible for creating and managing test data
- Each test should explicitly declare its data requirements
- Avoid using module-level variables for test data

### Example: Isolated Test with Setup

```typescript
// user-service.test.ts
import { UserService } from '../user-service';
import { createTestDatabase } from '../../test-utils/database';

// No module-level variables!

test('UserService', () => {
  // Each test gets its own fresh setup
  async function setUp(testData = {}) {
    const db = await createTestDatabase();
    await db.seed(testData);
    return {
      userService: new UserService({ db }),
      teardown: () => db.close()
    };
  }

  test('creates user with valid data', async () => {
    const { userService, teardown } = await setUp();
    
    const result = await userService.create({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    expect(result).toHaveProperty('id');
    await teardown();
  });

  test('rejects duplicate email', async () => {
    const existingUser = { email: 'exists@example.com' };
    const { userService, teardown } = await setUp({
      users: [existingUser]
    });
    
    await expect(
      userService.create({ email: existingUser.email })
    ).rejects.toThrow('Email already in use');
    
    await teardown();
  });
});
```

## Best Practices

### Test Data
- Use factories for creating test data
- Keep test data realistic and minimal
- Generate unique values to prevent test interference
- Pass required data explicitly to test functions
- Clean up all test data in teardown
- Each test should declare its data requirements explicitly
- Avoid sharing test data between tests
- Make assertions specific and meaningful
- Test one thing per test case
- Include both positive and negative test cases
- Verify side effects when necessary

### Assertions
- Make assertions specific and meaningful
- Test one thing per test case
- Include both positive and negative test cases
- Verify side effects when necessary

### Performance
- Run tests in parallel when possible
- Share expensive setup between tests when appropriate
- Use in-memory databases for faster tests
- Keep individual tests focused and fast

## Anti-Patterns to Avoid

### ❌ Bad
```typescript
// Overly complex setup
beforeEach(() => {
  // Complex setup that's hard to follow
});

// Testing implementation details
test('should call saveUser with correct data', () => {
  // Implementation-focused test
});

// Multiple assertions in one test
test('user registration', () => {
  // Tests multiple unrelated behaviors
});
```

### ✅ Good
```typescript
// Clear setup function
async function setUp() {
  const db = await createTestDatabase();
  return { userService: new UserService({ db }) };
}

// Behavior-focused test
test('successfully registers a new user', async () => {
  const { userService } = await setUp();
  const result = await userService.register(testUserData);
  expect(result.success).toBe(true);
});

// Clear test case separation
test('rejects duplicate email', async () => {
  const { userService } = await setUp();
  await userService.register(testUserData);
  
  await expect(
    userService.register(testUserData)
  ).rejects.toThrow('Email already in use');
});
```

## Continuous Integration

### Sample GitHub Actions Workflow
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - run: npm ci
    - run: npm test
      env:
        DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
        NODE_ENV: test
```

## Framework-Specific Notes

### React Components
- Use `@testing-library/react`
- Test component behavior, not implementation
- Use `user-event` for interactions
- Mock only external dependencies

### Solid.js Components
- Use `solid-testing-library`
- Test reactivity and effects
- Verify proper cleanup
- Test component composition

### Astro Components
- Test static output
- Verify proper props passing
- Test client-side hydration when needed

## Version Control
- Keep test files alongside source files
- Use `.test.ts` or `.spec.ts` suffix
- Include test files in code reviews
- Document complex test scenarios

## Maintenance
- Regularly update test dependencies
- Remove or update flaky tests
- Refactor tests when implementation changes
- Monitor test execution time
