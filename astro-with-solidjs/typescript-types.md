---
description: Apply when defining data models, component props, utility types, or ensuring type safety
globs: *
alwaysApply: true
---

# TypeScript Type Standards

## Core Principles

- Use types over interfaces (except for classes)
- Leverage type inference whenever possible
- Avoid creating unnecessary type definitions when types can be inferred
- Only create explicit types when they need to be reused across the system
- Place all shared type definitions in \*.d.ts declaration files
- Composition over inheritance
- Clear naming conventions
- Document complex types
- Export all shared types (needed in more than one file)
- Define component prop types within the component
- Prefer mutable types over readonly types except for component props

## Type Patterns

### Component Types

```ts
type BaseProps = {
  class?: string
  id?: string
  testId?: string
}

type ButtonProps = BaseProps & {
  variant: 'primary' | 'secondary' | 'tertiary'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick: () => void
}
```

### Data Models

```ts
type BaseModel = {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

type User = BaseModel & {
  email: string
  displayName: string
  photoURL?: string
}
```

### Utility Types

```ts
type Nullable<T> = T | null
type Optional<T> = T | undefined
type AsyncData<T> = {
  data: T | undefined
  loading: boolean
  error?: Error
}
```

## Type Requirements

- Union types for finite options
- Generic constraints
- Type composition
- Discriminated unions
- Type guards
- Mapped types
- Template literal types

## Must Avoid

- Interfaces (except for class implementation)
- Type assertions
- any type
- Object type
- Function type
- Non-null assertions
- Type merging
- Implicit any

## Naming Conventions

- PascalCase for type names
- Descriptive and clear
- Domain prefix when needed
- Suffix with Type for complex types
- Verb prefix for actions
- Noun prefix for models
- Generic T, K, V naming
- Consistent across codebase

## Type Organization

```ts
// Domain types in types/domain.ts
type User = BaseModel & {
  email: string
}

type UserPreferences = {
  theme: 'light' | 'dark'
}

type UserWithPreferences = User & {
  preferences: UserPreferences
}

export type { User, UserPreferences, UserWithPreferences }
```

## Type Safety

```ts
type Action = { type: 'INCREMENT'; amount: number } | { type: 'DECREMENT'; amount: number } | { type: 'RESET' }

function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value && 'email' in value
}

const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

type Theme = (typeof Theme)[keyof typeof Theme]
```

## Documentation

```ts
/** User model with authentication details */
type User = BaseModel & {
  /** Unique email address */
  email: string
  /** Display name for UI */
  displayName: string
  /** Optional profile photo URL */
  photoURL?: string
}
```

## Type Distribution

- Clear dependencies
- Minimal imports
- Proper exports
- Type separation
- Composition focus
- Generic reuse

## Performance

- Avoid large unions
- Limit generic nesting
- Optimize imports
- Clear type bounds
- Efficient type guards

## Immutability Guidelines

- Use readonly for component props to prevent accidental prop mutation
- Avoid readonly for service and repository types to prevent duplication
- Consider readonly for constants and configuration objects

## Firebase Compatibility

- Firebase data models should be mutable to simplify service layer integration
