---
description: Standard project structure and organization guidelines for all projects
ruleType: project-structure
globs: 
alwaysApply: false
---
## When to Use
Refer to this document when setting up new projects or when adding new features to understand where files should be placed.

# Folder Structure

## Root Level
```
├── src/                    # Main frontend source code
├── data/                   # Shared static or generated data
└── e2e/                    # End-to-End tests
```

## File Naming Conventions
- Use `kebab-case` for file and folder names
- Test files: `*.test.ts` or `*.spec.ts`
- Utility files: `kebab-case.ts` (e.g., `date-utils.ts`)
- Type definitions: `*.d.ts`

## Import Paths
- Use absolute imports from `src/` for all project files when possible
- Avoid relative path imports that go more than one level up (e.g., `../../..`)

## Environment Variables
- Store environment variables in `.env` files
- Document all required environment variables in `.env.example`
