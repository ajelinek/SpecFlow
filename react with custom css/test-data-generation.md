---
description: Apply when generating, composing, or accessing test data for any automated tests, including unit, integration, and E2E.
ruleType: test-data-generation
globs:
alwaysApply: false
---
## When to Use
Apply these rules when generating, composing, or accessing test data for any automated tests, including unit, integration, and E2E.

# Test Data Generation Rules

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
