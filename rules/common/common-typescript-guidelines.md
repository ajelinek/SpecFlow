---
description: TypeScript best practices, typing patterns, and strict checking configurations
ruleType: typescript
globs:
alwaysApply: false
---

## Core Principles

### Type Safety

- Enable strict TypeScript checking
- Prefer types over interfaces (except for class implementation)
- Use explicit typing over implicit `any`
- Favor composition of types over inheritance
- Utilize type inference where it improves readability

### Code Organization

- Export all shared types (needed in more than one file)
- Define component prop types within the component
- Document complex types with JSDoc comments
- Keep types within the respective module when only used in one place

## Type Definitions

### Naming & Structure

- Use PascalCase for type names
- Be descriptive and clear with type names
- Use domain prefixes when helpful (e.g., `UserProfile`)
- Use verb prefixes for action types (e.g., `UpdateUserRequest`)
- Use noun prefixes for model types (e.g., `UserProfile`)
- Use standard generic parameter names (T, K, V)
- Consistent naming conventions across the codebase

### Best Practices

- Avoid using `any` type (use `unknown` with type guards if needed)
- Avoid non-null assertions (`!`)
- Avoid type assertions (except when necessary with `as Type`)
- Avoid circular type references
- Keep type definitions focused and single-purpose
- Use mapped and conditional types for complex transformations

## Project Organization

### File Structure

- Place reusable types in the `types` directory
- Group related types in the same file
- Keep domain-specific types with their domain file
- Place component prop types in component files
- Create utility types in a common types file

### Module Management

- Use minimal, focused imports
- Prefer named exports for types
- Use path aliases for clean imports
- Keep type-only imports explicit with `import type`

## Performance Considerations

- Be mindful of large union types
- Limit deep nesting of generic types
- Use type-only imports to reduce runtime impact
- Keep type bounds as specific as possible
- Use efficient type guards

## Immutability

- Use `readonly` for component props
- Avoid `readonly` for service/repository types
- Consider `readonly` for configuration objects
- Use `as const` for literal value types

## TypeScript Configuration

- Use `tsconfig.json` with strict mode enabled
- Explicit module resolution strategy
- Path aliases for clean imports
- Incremental builds enabled
- Source maps for debugging

### Project/CI standards

- Use project references in monorepos.
- Enforce `tsc --noEmit` in CI for type checks.
- Prefer type-only imports and `export type` for re-exports.

## Must Avoid

- Interfaces (except for class implementation)
- Implicit any

## Type Distribution

- Clear dependencies
- Minimal imports
- Proper exports
- Type separation
- Composition focus
- Generic reuse

## Domain types in types/domain.ts

```ts
type User = BaseModel & {
  email: string
}

type UserPreferences = {
  theme: 'light' | 'dark'
}

// Compose types
type UserWithPreferences = User & {
  preferences: UserPreferences
}

// Export all types
export type { User, UserPreferences, UserWithPreferences }
```

## Type Safety

```ts
// Use discriminated unions
type Action = { type: 'INCREMENT'; amount: number } | { type: 'DECREMENT'; amount: number } | { type: 'RESET' }

// Use type guards
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value && 'email' in value
}

// Use const assertions
const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

type Theme = (typeof Theme)[keyof typeof Theme]
```
