---
description: Project structure and organization for React applications with custom CSS
ruleType: project-structure
globs: 
alwaysApply: false
---
## When to Use
Refer to this document when setting up or working on React applications with custom CSS.

# Technology Stack
- React (latest)
- TypeScript
- pnpm
- CSS Modules (for component-scoped styles)

# React-Specific Structure

## Source Directory (`src/`)
```
src/
├── components/             # All React components
│   ├── foundation/        # Base UI building blocks
│   └── index.ts           # Component exports
├── pages/                  # Page components and route components
├── store/                  # State management
│   ├── repository/         # API clients and data fetching
│   ├── service/           # Business logic and store integration
│   ├── utilities/         # Store helpers
│   ├── config.ts          # Store configuration
│   └── index.ts           # Store exports
├── styles/                 # Global styles
│   ├── global.css         # Global base styles
│   ├── tokens.css         # Design tokens (CSS variables)
│   └── animations.css    # Animation definitions
└── types/                  # TypeScript type definitions
    ├── index.d.ts         # Generic types
    ├── store.d.ts         # Store-related types
    ├── data.d.ts          # Data models
    ├── components.d.ts    # Component prop types
    └── env.d.ts           # Environment variables
```

## Component Structure
```
components/
├── feature-name/         # Feature-specific components
│   ├── ComponentName.tsx  # Main component
│   ├── ComponentName.module.css  # Component styles
│   ├── SubComponent/      # Sub-components
│   └── index.ts          # Exports
└── ui/                    # Reusable UI components
    └── Button/           # Example component
        ├── Button.tsx
        ├── Button.module.css
        └── index.ts
```

## Naming Conventions
- Component files: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- CSS Modules: `[name].module.css`
- Test files: `ComponentName.test.tsx`
- Utility files: `kebab-case.ts`

## Import Paths
- Use absolute imports from `src/`
- Example: `import { Button } from 'components/ui/Button'`
- Avoid relative paths with multiple `../`

## Styling Approach
- Use CSS Modules for component-scoped styles
- Leverage CSS variables for theming
- Follow BEM naming convention for CSS classes
- Keep styles co-located with components
