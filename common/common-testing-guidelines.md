---
description: General testing guidelines and best practices for all projects
ruleType: testing
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when writing and maintaining tests across all projects.

# Testing Principles

## General Guidelines
- Write tests that are reliable and deterministic
- Tests should be independent and isolated
- Follow the Arrange-Act-Assert pattern
- Test behavior, not implementation
- Keep tests focused and readable

## Test Structure
- Use descriptive test names that explain the expected behavior
- Group related tests in describe blocks
- Set up test data in beforeEach/afterEach when needed
- Keep test files co-located with the code they test

## Test Coverage
- Aim for high test coverage of critical paths
- Focus on testing business logic over implementation details
- Include edge cases and error conditions
- Test both happy paths and error scenarios

## Test Data
- Use factories or builders for test data
- Keep test data realistic but minimal
- Consider using faker libraries for realistic test data
- Clean up test data after tests run

## Performance
- Keep tests fast and efficient
- Mock external dependencies
- Use appropriate test doubles (mocks, stubs, spies)
- Run tests in parallel when possible

## Best Practices
- Tests should be self-documenting
- Avoid test interdependence
- Fix flaky tests immediately
- Review test failures carefully
