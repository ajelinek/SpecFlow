---
description: React-specific project structure and folder organization guidelines
ruleType: react-project-structure
globs:
alwaysApply: false
---

## When to Use

Apply these guidelines when setting up or modifying the structure of a React project.

# React Project Structure

## Component Organization

```
src/
├── components/
│   ├── foundation/         # Base UI building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Alert/
│   ├── layout/             # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   ├── features/           # Feature-specific components
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   └── Settings/
│   └── index.ts            # Component exports
```

## Pages Organization

```
src/
├── pages/
│   ├── Home/
│   ├── Dashboard/
│   ├── Settings/
│   └── Auth/
│       ├── Login/
│       └── Register/
```

## Routing Structure

```
src/
├── App.tsx                 # Main App component with route setup
├── routes/                 # Route configuration
│   ├── index.tsx           # Main route setup
│   └── routeConfig.ts      # Route definitions
```

## React-Specific Files

```
src/
├── hooks/                  # Custom hooks
├── contexts/               # Context providers
```

# React Code Structure

- Each component in its own directory
- Component directory structure:
  ```
  ComponentName/
  ├── index.tsx             # Main component
  ├── ComponentName.tsx     # Implementation (if complex)
  ├── ComponentName.test.tsx # Component tests
  ├── styles.module.css     # Component styles
  ```

# Build Configuration

- Configure build using Vite
- Configure testing tools in Vitest setup
