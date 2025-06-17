---
description: General testing guidelines for all test types and assertions
ruleType: testing
globs:
alwaysApply: false
---

## When to Use

Apply these guidelines when writing tests of any type (unit, integration, e2e).

# General Testing Principles

- Write tests as you code, not after
- Test business requirements, not implementation details
- Avoid testing third-party code
- Keep tests independent and atomic
- Tests should be deterministic
- Cover happy paths, edge cases, and error cases
- Readable test descriptions (should/when/then pattern)
- Prioritize critical paths first
- Use realistic test data
- Aim for high coverage of business logic
- Avoid mocking whenever possible

# Test Structure

- Use describe/it (or test) with clear naming
- Setup/execute/verify pattern in tests
- Minimal, relevant test setup
- Arrange/Act/Assert pattern
- One assertion per test when practical
- Independent test cases
- Separate test files for different concerns

# Test Organization

```
├── unit/                 # Unit tests (focused on pure logic)
├── integration/          # Integration tests (multiple units)
└── e2e/                  # End-to-end tests (full user flows)
```

# Performance Guidelines

- Keep tests fast, especially unit tests
- Avoid unnecessary test setups and teardowns
- Use testing environment variables
- Consider using in-memory databases for test data
- Don't overuse beforeEach/afterEach hooks

# Anti-patterns to Avoid

- Brittle tests
- Testing implementation details
- Multiple assertions per test without reason
- Shared mutable state between tests
- Time-dependent tests
- Overcomplicated test setup
- Testing third-party code
