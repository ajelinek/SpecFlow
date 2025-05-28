---
description: Project structure and organization for Astro with SolidJS applications
ruleType: project-structure
globs: 
alwaysApply: false
---
## When to Use
Refer to this document when setting up or working on Astro projects with SolidJS components.

# Technology Stack
- Astro.js (static components)
- Solid.js (dynamic UI)
- TypeScript
- pnpm
- Firebase (optional)

# Project Structure

## Root Level
```
├── src/                    # Main source code
│   ├── assets/            # Static assets (images, fonts, etc.)
│   ├── components/        # UI components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Astro pages (routes)
│   ├── stores/           # State management
│   ├── styles/            # Global styles
│   └── utils/            # Utility functions
├── public/                # Static files to be served as-is
└── astro.config.mjs       # Astro configuration
```

## Component Organization
```
src/
├── components/
│   ├── ui/               # Reusable UI components (SolidJS)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   └── ...
│   ├── layout/          # Layout components
│   └── shared/          # Shared components across features
├── features/             # Feature-based components
│   └── feature-name/
│       ├── components/   # Feature-specific components
│       └── index.tsx     # Feature entry point
└── pages/                # Astro pages (routes)
    ├── index.astro
    └── [...pages]/
        └── page.astro
```

## State Management
```
src/stores/
├── auth/               # Authentication state
├── ui/                 # UI state (theme, modals, etc.)
├── feature-stores/     # Feature-specific stores
└── index.ts            # Store exports
```

## Styling
```
src/styles/
├── base/              # Base styles (reset, typography)
├── components/        # Global component styles
├── layouts/           # Layout-specific styles
├── themes/            # Theme variables
├── tokens.css         # Design tokens
└── global.css         # Global styles
```

## Naming Conventions
- Astro components: `kebab-case.astro`
- SolidJS components: `PascalCase.tsx`
- CSS Modules: `[name].module.css`
- Test files: `[name].test.ts`
- Utility files: `kebab-case.ts`

## Import Paths
- Use alias imports from `src/`
- Example: `import { Button } from '@/components/ui/Button'`
- Use `@/` as the alias for the `src/` directory

## Astro-Specific
- Keep Astro components as static as possible
- Use SolidJS components only for interactive elements
- Leverage Astro's partial hydration with client directives
- Use TypeScript for type safety in both Astro and SolidJS components
