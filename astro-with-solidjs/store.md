---
description: 
globs: 
alwaysApply: false
---
---
description: Store architecture and implementation standards
---
# Store Architecture

## Layer Separation
/store
├── repository/     # Firebase interactions
├── service/       # Business logic & state
├── utilities/     # Shared helpers
└── firebase.ts    # Firebase config

## Repository Layer Rules
- Direct Firebase interactions only
- One file per domain entity
- Pure async functions
- No business logic
- Error handling required
- Transaction usage for atomic updates
- Batch operations for multiple updates
- Type-safe queries
- Minimal data selection

## Service Layer Rules
- Use createAsyncStore() helper for all async state management
- No direct use of createStore() for state that manages async operations
- All services should expose a consistent interface through a named export service object
- Do not use createRoot() or default exports for services
- Keep import ordering consistent:
  1. Internal store imports (firebase, repositories, utilities)
  2. External package imports
  3. Type imports

## Firebase Operations

### Required Patterns
- Use transactions for metric updates
- Implement atomic operations
- Batch writes when possible
- Query optimization
- Index usage
- Error handling
- Offline support

### Security Rules
- Client-side validation
- Data sanitization
- Access control
- Data validation
- Index enforcement
- Security rules testing

## State Management

### Store Creation
- Domain-specific stores
- Immutable state
- Atomic updates
- Computed values
- Side effect handling
- Cleanup registration
- Error boundaries
- Loading states

### Store Usage
- Component access via services only
- No direct Firebase calls
- Proper unsubscribe
- Memory management
- Batch updates
- Error propagation
- Loading indicators
- Offline handling



## Error Handling

### Repository Errors
- Firebase error mapping
- Network error handling
- Timeout handling
- Error logging
- Debug information
- Stack traces

### Service Errors
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
