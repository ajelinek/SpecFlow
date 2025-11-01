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
│   ├── BaseLayout/
│   │   ├── index.astro
│   │   └── styles.module.css
│   └── BlogLayout/
│       ├── index.astro
│       └── styles.module.css
├── pages/
│   ├── index/
│   │   ├── index.astro
│   │   └── styles.module.css
│   ├── blog/
│   │   ├── index.astro
│   │   └── styles.module.css
│   └── [dynamic]/
│       ├── index.astro
│       └── styles.module.css
└── content/
    ├── blog/
    └── config.ts
```

## Components Structure

```
src/
└── components/
    ├── foundation/
    │   ├── Button/
    │   │   ├── index.astro
    │   │   └── styles.module.css
    │   └── Input/
    │       ├── index.astro
    │       └── styles.module.css
    ├── layout/
    │   ├── Header/
    │   │   ├── index.astro
    │   │   └── styles.module.css
    │   └── Footer/
    │       ├── index.astro
    │       └── styles.module.css
    └── features/
        ├── Counter/
        │   ├── index.astro (or index.tsx for islands)
        │   └── styles.module.css
        └── Form/
            ├── index.astro
            └── styles.module.css
```

## Solid.js Islands Structure

When using Solid.js islands within Astro components:

```
src/
└── components/
    ├── Counter/
    │   ├── index.tsx      # Solid.js component
    │   └── styles.module.css
    └── Form/
        ├── index.tsx      # Solid.js component
        └── styles.module.css
```

# File Naming Conventions

- Astro components: `PascalCase/` folder with `index.astro`
- Layouts: `PascalCase/` folder with `index.astro`
- Pages: `kebab-case/` folder with `index.astro` or `[dynamic]/` folder with `index.astro`
- Utilities: `kebab-case.ts`
- CSS Modules: `styles.module.css` (always use `.module.css` extension)
- Component styles: Use CSS Modules (`*.module.css`) for all component-scoped styles

# Project Configuration

- `astro.config.mjs`
- `tsconfig.json`
- `package.json`
- `.env`

# Build and Output

- Build output: `dist/`
- Static assets: `public/`
- Static site generation by default
