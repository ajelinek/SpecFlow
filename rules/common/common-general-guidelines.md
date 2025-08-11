---
description: General coding guidelines and best practices for the project
ruleType: general
globs:
alwaysApply: true
---

# General Rules to Apply

- **Check Rule Files**: Always determine which rule files need to be referenced.
- **Generate Minimum Code**: Only produce code necessary to fulfill the specific request.
- **Avoid Unnecessary Updates**: Do not suggest changes to files unless there are actual modifications required.
- **Respect Existing Patterns**: Follow established coding styles and avoid adding extra or unused code.
- **Focus on the Task**: Concentrate solely on the immediate request without deviating.
- **No Git Commands**: Do not generate commands to add files to or commit them to Git.
- **Minimize Comments**: Avoid unnecessary comments within the code.
- **Avoid Inventing Changes**: Only implement or suggest modifications explicitly requested.
- **Use Clear Variable Names**: Prefer descriptive and explicit names over ambiguous ones to enhance readability.
- **Prioritize Security**: Always consider security implications in code changes.
- **Readable Code**: Favor readability over performance unless explicitly instructed otherwise.
- **Avoid Fluff**: Provide concise code and explanations, without unnecessary details.
- **Accuracy First**: Focus on depth and precision in all responses.
- **Explain As Needed**: Address the request directly, with additional explanations only if required.
- **Do Not Deprecate**: Do not deprecate or keep deprecated code. remove it and change impacted code.

# Coding Guidelines

- Use `function` keyword over `const` for functions.
- Group modules logically, each doing one thing.
- Keep functions small and understandable.
- Avoid nesting > 2 levels (use functions, returns).
- **Use Guard Clauses**: Exit early on preconditions to avoid nesting and improve readability.
- Use immutable objects.
- **Keep code DRY**: Do not repeat code.
- **Public Functions First**: Place all exported/public functions at the top of the file.
- **Helper Functions Last**: Place all helper/utility functions at the bottom of the file.
- **Function Organization**: Group related functions together for better code organization.
- Keep code within an if block small > 10 lines of code.
- **Function Parameters**: Never pass more than 3 parameters to a function. If more than 3 values are needed, wrap them in an object and use that object consistently throughout the application.
- **Encapsulation**: Encapsulate internal module details, exposing only necessary functionality through a public interface to reduce dependencies and isolate changes.
- **SOLID Principles**: Apply SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to create scalable, flexible, and maintainable software.
- **KISS (Keep It Simple, Stupid)**: Prioritize simplicity in design and implementation (KISS). Avoid adding unnecessary complexity that makes code harder to understand and maintain.
- **YAGNI (You Ain't Gonna Need It)**: Do not add functionality until it is actually required (YAGNI). Avoid implementing features based on speculation about future needs.

```ts
export async function example() {}
```
