---
description: Apply when implementing or modifying store architecture, repository, or service logic
ruleType: store
globs: 
alwaysApply: false
---
## When to Use
Apply these rules when implementing or modifying store architecture, repository, or service logic.

# Store Architecture

## Layer Separation
/store
├── repository/     # External system interactions (e.g., APIs, databases)
├── service/       # Business logic & state
├── utilities/     # Shared helpers
└── config.ts      # System configuration

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
- Use custom hooks for async state management
- All services should expose a consistent interface through a named export service object or hook
- Keep import ordering consistent:
  1. Internal store imports (repositories, utilities)
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
- Component access via services/hooks only
- No direct external system calls from components
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
