---
description: Guidelines for generating and managing test data
ruleType: testing
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when creating or managing test data for automated tests.

# Test Data Principles

## General Guidelines
- Generate realistic but non-sensitive test data
- Ensure test data is deterministic and repeatable
- Isolate test data between test runs
- Clean up test data after test completion
- Use factories or builders for complex data structures

## Data Generation Strategies

### Factories
```typescript
// Example using a factory function
const createUser = (overrides = {}) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  isActive: true,
  createdAt: new Date(),
  ...overrides
});
```

### Fixtures
- Store complex or commonly used data structures as fixtures
- Use JSON files for static test data
- Keep fixtures minimal and focused

### Faker Library
- Use faker.js or similar libraries for realistic test data
- Seed the random number generator for deterministic results
- Create custom fakers for domain-specific data

## Data Management

### Test Isolation
- Each test should create its own test data
- Use unique identifiers to prevent conflicts
- Implement setup/teardown hooks for data cleanup

### Performance
- Generate only the data needed for each test
- Reuse expensive-to-create data when possible
- Consider using snapshots for complex data structures

## Best Practices

### Naming Conventions
- Use descriptive names for test data
- Prefix test data with `mock` or `test` when appropriate
- Include the test case in the data name

### Data Validation
- Validate test data against schemas when possible
- Include edge cases in test data
- Test with both valid and invalid data

### Documentation
- Document the purpose of test data
- Include examples of how to use test data
- Document any assumptions made in the test data
