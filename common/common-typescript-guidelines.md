---
description: TypeScript best practices, typing patterns, and strict checking configurations
ruleType: typescript
globs: 
alwaysApply: false
---
## When to Use
Apply these rules when writing TypeScript code to ensure type safety and consistency.

# General TypeScript Guidelines
- Enable strict TypeScript checking
- No usage of `any` type
- Use proper TypeScript interfaces and types
- No implicit any in function parameters
- No non-null assertions (`!`)
- No type assertion using angle brackets (`<Type>`) - use `as Type` instead
- Use function overloads for complex type signatures
- Prefer interfaces for public API
- Prefer type for complex types, unions, intersections
- Use descriptive type names

# Type Definitions
- Define all interface and type names with PascalCase
- Add explicit return types to functions (except when obvious)
- Avoid excessive type usage that reduces readability
- Use type inference where appropriate
- Favor composition of types
- Add index signature when needed
- Use mapped types for transformations
- Use conditional types for type-level logic
- No circular type references

# Common Types
```ts
// Common TypeScript patterns
// Entity ID type
type EntityId = string | number;

// API Response wrapper
interface ApiResponse<T> {
  data: T;
  meta: {
    status: number;
    message?: string;
  };
}

// Safe type assertion utility
function assertType<T>(value: any, check: (v: any) => boolean): T {
  if (!check(value)) {
    throw new Error('Type assertion failed');
  }
  return value as T;
}
```

# Type Organization
- Related types should be in the same file
- Generic utility types in a common types file
- Domain-specific types in domain files
- Component prop types in component files or dedicated types file

# TypeScript Configuration
- Use `tsconfig.json` with strict mode enabled
- Explicit module resolution strategy
- Path aliases for clean imports
- Incremental builds enabled
- Source maps for debugging
