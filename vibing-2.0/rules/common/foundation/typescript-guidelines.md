## Core Principles

- Enable strict TypeScript checking
- Prefer types over interfaces (except for class implementation)
- Use explicit typing over implicit `any`
- Favor composition of types over inheritance
- Utilize type inference where it improves readability
- Export all shared types (needed in more than one file)
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
- Consistent naming conventions across the codebase see @/rules/common/data-attribute-naming-conventions.md

### Best Practices

- Use `function` keyword over `const` for functions
- Avoid using `any` type (use `unknown` with type guards if needed)
- Avoid non-null assertions (`!`)
- Avoid type assertions (except when necessary with `as Type`)
- Avoid circular type references
- Keep type definitions focused and single-purpose
- Use mapped and conditional types for complex transformations

## Project Organization

- Place reusable types in the `types` directory
- Group related types in the same file
- Keep domain-specific types with their domain file
- Place component prop types in component files
- Create utility types in a common types file
- Use minimal, focused imports
- Prefer named exports for types
- Use path aliases for clean imports
- Keep type-only imports explicit with `import type`

## Performance & Configuration

- Be mindful of large union types
- Limit deep nesting of generic types
- Use type-only imports to reduce runtime impact
- Keep type bounds as specific as possible
- Use efficient type guards
- Use `readonly` for component props
- Avoid `readonly` for service/repository types
- Use `as const` for literal value types
- Use `tsconfig.json` with strict mode enabled
- Explicit module resolution strategy
- Incremental builds enabled
- Source maps for debugging
- Enforce `tsc --noEmit` in CI for type checks
- Use project references in monorepos
- Prefer type-only imports and `export type` for re-exports

## Must Avoid

- Interfaces (except for class implementation)
- Implicit any

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

## Type Safety Examples

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
