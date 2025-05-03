---
description: 
globs: 
alwaysApply: true
---
---
description: Apply for all feature implementations to ensure alignment with project architecture and technology choices
globs: *
alwaysApply: true
---

## When to Use
Apply these rules for all feature implementations to ensure alignment with project architecture and technology choices.

# General Rules to Apply
- **Check Rule Files**: Always determine which rule files need to be referenced.
- **Generate Minimum Code**: Only produce code necessary to fulfill the specific request.
- **Avoid Unnecessary Updates**: Do not suggest changes to files unless there are actual modifications required.
- **Respect Existing Patterns**: Follow established coding styles and avoid adding extra or unused code.
- **Focus on the Task**: Concentrate solely on the immediate request without deviating.
- **Branch Creation Prompt**: In agent mode, prompt for branch creation when modifying more than one file.
- **No Git Commands**: Do not generate commands to add files to or commit them to Git.
- **Minimize Comments**: Avoid unnecessary comments within the code.
- **Preserve Existing Code**: Retain unrelated code and functionalities. Maintain the existing structure.
- **Avoid Inventing Changes**: Only implement or suggest modifications explicitly requested.
- **Use Clear Variable Names**: Prefer descriptive and explicit names over ambiguous ones to enhance readability.
- **Prioritize Security**: Always consider security implications in code changes.
- **Readable Code**: Favor readability over performance unless explicitly instructed otherwise.
- **Avoid Fluff**: Provide concise code and explanations, without unnecessary details.
- **Accuracy First**: Focus on depth and precision in all responses.
- **Explain As Needed**: Address the request directly, with additional explanations only if required.


# Technology Stack
- Astro.js (static components)
- Solid.js (dynamic UI)
- Firebase Firestore (data)
- Firebase Auth (Anonymous, Google, Email/Password, Github)
- Firebase Storage (images)
- Typescript
- pnpm

# Folder Structure
- `src/`: Main frontend source code
  - `pages/`: Astro pages (routes)
  - `layouts/`: Reusable Astro page layouts
  - `components/`: UI components
    - `static/`: Static Astro components
    - `dynamic/`: Dynamic SolidJS components
    - `foundation/`: Base UI building blocks
    - `index.ts`: Component exports
  - `store/`: State management and data access
    - `repository/`: External system interaction (one file per domain)
    - `service/`: Store integration and business logic
    - `utilities/`: Shared store helper functions
    - `firebase.ts`: Firebase initialization and configuration
    - `index.ts`: Store module exports
  - `styles/`: Styling files
    - `global.css`: Global base styles
    - `tokens.css`: Design tokens (CSS variables)
    - `animations.css`: Global animation definitions
  - `types/`: TypeScript type definitions
    - `index.d.ts`: Generic types and re-exports
    - `store.d.ts`: Store-related types
    - `data.d.ts`: Data models
    - `components.d.ts`: Component prop types
    - `env.d.ts`: Environment type definitions
- `data/`: Shared static or generated data for use across the application
- `e2e/`: Playwright End-to-End tests
  - `specs/`: Test files (Playwright tests)
  - `pages/`: Page Object Model classes
  - `utilities/`: E2E test helper functions
  - `data/`: Test data generation utilities
  - `tsconfig.json`: TypeScript configuration for E2E tests
  - `index.ts`: E2E module exports

# Coding Guidelines
- Use `function` keyword over `const` for functions.
- Group modules logically, each doing one thing.
- Keep functions small and understandable.
- Avoid nesting > 2 levels (use functions, returns).
- Keep code DRY.
- Use immutable objects.
- Export functions directly on the function. 
```ts
export async function example() {}
```


## Store Services
- Handle data queries, mutations, calculations, transformations.
- Manage async operation status from repositories.
