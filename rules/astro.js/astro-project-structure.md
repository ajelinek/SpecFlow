---
description: Astro and Solid.js project folder structure, organization, and file conventions
ruleType: project-structure
globs:
alwaysApply: false
---

# Astro Project Structure

## Root Level Organization

```
├── src/
├── public/
└── astro.config.mjs
```

## Source Directory (`src/`)

```
src/
├── components/
├── layouts/
├── pages/
├── store/
│   ├── repository/
│   ├── service/
│   └── config.ts
├── styles/
└── utils/
```

## Astro-Specific Structure

```
src/
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   └── [dynamic].astro
└── content/
    ├── blog/
    └── config.ts
```

## Solid.js Islands Structure

```
src/
└── components/
        ├── Counter/
        │   ├── index.tsx
        │   └── styles.module.css
        └── Form/
```

# File Naming Conventions

- Astro components: `PascalCase.astro`
- Layouts: `PascalCase.astro`
- Pages: `kebab-case.astro` or `[dynamic].astro`
- Utilities: `kebab-case.ts`
- Styles: `kebab-case.css` or `PascalCase.module.css`

# Project Configuration

- `astro.config.mjs`
- `tsconfig.json`
- `package.json`
- `.env`

# Build and Output

- Build output: `dist/`
- Static assets: `public/`
- Static site generation by default
- SSR optional
