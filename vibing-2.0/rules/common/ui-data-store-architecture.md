# Store Architecture

## Layer Separation

/store
├── repository/ # External system interactions (e.g., APIs, databases)
├── service/ # Business logic & state
├── utilities/ # Shared helpers
└── config.ts # System configuration

## Repository Layer Rules

- Direct external system interactions only (e.g., API, database, third-party)
- One file per domain entity
- Pure async functions
- No business logic
- Error handling required
- Transaction usage for atomic updates (if supported)
- Batch operations for multiple updates (if supported)
- Type-safe queries
- Minimal data selection

## Service Layer Rules

- Use custom hooks for async state management based on front end framework. (e.g., SolidJS, React)
- All services should expose a consistent interface through a named export service object or hook

## State Management

- Domain-specific stores
- Immutable state
- Atomic updates
- Computed values
- Side effect handling
- Cleanup registration
- Error boundaries
- Loading states

## Store Usage

- Component access via services/hooks only
- No direct external system calls from components
- Proper unsubscribe
- Batch updates
- Error propagation
- Loading indicators

## Error Handling

- External system error mapping
- Error logging
- Debug information
- Stack traces
- Business logic validation
- State error handling
- UI error mapping
- Error boundaries
