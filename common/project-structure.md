---
description: Project technology stack and folder structure guidelines
ruleType: project-structure
globs: 
alwaysApply: false
---
## When to Use
Refer to this document when setting up new projects or when adding new features to understand where files should be placed.

# Technology Stack
- React (latest)
- TypeScript
- pnpm

# Folder Structure

## Root Level
```
├── src/                    # Main frontend source code
├── data/                   # Shared static or generated data
└── e2e/                    # Playwright End-to-End tests
```

## Source Directory (`src/`)
```
src/
├── components/             # All UI components (all are dynamic in React)
│   ├── foundation/        # Base UI building blocks
│   └── index.ts           # Component exports
├── pages/                  # Full pages and route components
├── store/                  # State management and data access
│   ├── repository/         # External system interaction (one file per domain)
│   ├── service/           # Store integration and business logic
│   ├── utilities/         # Shared store helper functions
│   ├── config.ts          # Store configuration
│   └── index.ts           # Store module exports
├── styles/                 # Styling files
│   ├── global.css         # Global base styles
│   ├── tokens.css         # Design tokens (CSS variables)
│   └── animations.css    # Global animation definitions
└── types/                  # TypeScript type definitions
    ├── index.d.ts         # Generic types and re-exports
    ├── store.d.ts         # Store-related types
    ├── data.d.ts          # Data models
    ├── components.d.ts    # Component prop types
    └── env.d.ts           # Environment type definitions
```

## Testing (`e2e/`)
```
e2e/
├── specs/                # Test files (Playwright tests)
├── pages/                # Page Object Model classes
├── utilities/            # E2E test helper functions
└── tsconfig.json         # TypeScript configuration for E2E tests
```

## File Naming Conventions
- Use `kebab-case` for file and folder names
- Component files: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Test files: `*.test.ts` or `*.spec.ts`
- Utility files: `kebab-case.ts` (e.g., `date-utils.ts`)
- Type definitions: `*.d.ts`

## Import Paths
- Use absolute imports from `src/` for all project files
- Example: `import { Button } from 'components/foundation/Button'`
- Avoid relative path imports that go more than one level up (e.g., `../../..`)

## Environment Variables
- Store environment variables in `.env` files
- Prefix all custom environment variables with `VITE_` for Vite compatibility
- Document all required environment variables in `.env.example`
