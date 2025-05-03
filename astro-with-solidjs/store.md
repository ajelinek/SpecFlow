---
description: Apply when implementing or modifying store architecture, repository, or service logic
globs: *
alwaysApply: false
---
## When to Use
Apply these rules when implementing or modifying store architecture, repository, or service logic.

# Store Architecture

## Layer Separation
/store
├── repository/     # Firebase or external system interactions (e.g., APIs, databases)
├── service/       # Business logic & state
├── utilities/     # Shared helpers
└── firebase.ts    # Firebase config

## Repository Layer Rules
- Direct Firebase or external system interactions only (e.g., API, database, third-party)
- One file per domain entity
- Pure async functions
- No business logic
- Error handling required
- Transaction usage for atomic updates (if supported)
- Batch operations for multiple updates (if supported)
- Type-safe queries
- Minimal data selection

## Service Layer Rules
- Use createAsyncStore() helper for all async state management (SolidJS)
- No direct use of createStore() for state that manages async operations
- All services should expose a consistent interface through a named export service object
- Do not use createRoot() or default exports for services
- Keep import ordering consistent:
  1. Internal store imports (firebase, repositories, utilities)
  2. External package imports
  3. Type imports

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
- Component access via services only
- No direct Firebase or external system calls from components
- Proper unsubscribe
- Memory management
- Batch updates
- Error propagation
- Loading indicators
- Offline handling

## Error Handling
- External system error mapping
- Network error handling
- Timeout handling
- Error logging
- Debug information
- Stack traces
- Business logic validation
- State error handling
- UI error mapping
- Error boundaries

## Firebase
- Client-side execution.
- Avoid Firebase Functions in favor of UI logic.
- Use transactions/atomic updates for metric calculations.
- Update database rules for access control.
- Select only necessary Firestore data.
- Identify and create necessary Firestore indexes for new queries.
- Use the firebase simulator for tests. 
