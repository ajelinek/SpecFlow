---
description: Astro and Solid.js project folder structure, organization, and file conventions
ruleType: project-structure
globs:
alwaysApply: false
---

## When to Use

Apply these guidelines when setting up a new Astro/Solid.js project or organizing files within an existing project.

# Astro Project Structure

## Root Level Organization

```
├── src/                    # Source code
├── public/                 # Static assets
└── astro.config.mjs        # Astro configuration
```

## Source Directory (`src/`)

```
src/
├── components/             # UI components
├── layouts/                # Layout templates (.astro)
├── pages/                  # Page routes (.astro)
├── store/                  # State management
│   ├── repository/         # External system interaction
│   ├── service/           # Business logic and state
│   └── config.ts          # Store configuration
├── styles/                 # Global styles
└── utils/                  # Utility functions
```

## Astro-Specific Structure

```
src/
├── layouts/                # Page layouts
│   ├── BaseLayout.astro    # Base layout with common elements
│   └── BlogLayout.astro    # Blog-specific layout
├── pages/                  # Page routes (file-based routing)
│   ├── index.astro         # Homepage
│   ├── blog/               # Blog routes
│   └── [dynamic].astro     # Dynamic routes
└── content/                # Content collections (if using content system)
    ├── blog/               # Blog posts
    └── config.ts           # Content collection configuration
```

## Solid.js Islands Structure

```
src/
└── components/
        ├── Counter/        # Example interactive component
        │   ├── index.tsx   # Component implementation
        │   └── styles.module.css  # Scoped styles
        └── Form/           # Form components with reactivity
```

# File Naming Conventions

- Astro components: `PascalCase.astro`
- Layouts: `PascalCase.astro`
- Pages: `kebab-case.astro` or `[dynamic].astro`
- Utility files: `kebab-case.ts`
- Style files: `kebab-case.css` or `PascalCase.module.css`

# Project Configuration

- `astro.config.mjs` for Astro configuration
- `tsconfig.json` for TypeScript configuration
- `package.json` for dependencies
- Environment variables in `.env` files

# Build and Output

- Output generated in `dist/` directory
- Public assets in `public/` directory
- Static site generation by default
- Server-side rendering option if needed
