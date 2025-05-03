---
description: Apply when defining data models, component props, utility types, or ensuring type safety
ruleType: typescript-types
globs: *
alwaysApply: false
---
## When to Use
Apply these rules when defining data models, component props, utility types, or ensuring type safety.

# TypeScript Type Standards

## Core Principles
- Use types over interfaces (except for classes)
- Explicit over implicit
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

type Product = BaseModel & {
  name: string
  price: number
  inStock: boolean
}

type Order = BaseModel & {
  userId: string
  items: Array<OrderItem>
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
}

type OrderItem = {
  productId: string
  quantity: number
  price: number
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
type Product = BaseModel & {
  name: string
  price: number
  inStock: boolean
}

type Order = BaseModel & {
  userId: string
  items: Array<OrderItem>
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
}

type OrderItem = {
  productId: string
  quantity: number
  price: number
}

type OrderWithItems = Order & {
  items: OrderItem[]
}

export type {
  Product,
  Order,
  OrderItem,
  OrderWithItems
}
```

## Type Safety
```ts
type Action = 
  | { type: 'ADD_ITEM'; productId: string; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'RESET_CART' }

function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'price' in value
  )
}

const OrderStatus = {
  PENDING: 'pending',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]
```

## Documentation
```ts
/** Product model for catalog and inventory */
type Product = BaseModel & {
  /** Product name */
  name: string
  /** Product price */
  price: number
  /** Inventory status */
  inStock: boolean
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