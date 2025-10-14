---
description: 'Use when implementing or modifying Firebase Firestore/Auth/Storage integration, security rules, and local emulation/testing.'
ruleType: firebase
applyTo:
  - 'src/**/firebase/**/*.{ts,tsx}'
  - 'src/**/store/**/*.{ts,tsx}'
  - 'src/**/services/**/*.{ts,tsx}'
  - 'src/**/repositories/**/*.{ts,tsx}'
---

# Firebase Rules

- Apply these rules for any code that interacts with Firebase Firestore, Auth, or Storage.
- Use for data access, authentication, file storage, and related security or validation logic.

## Firestore Patterns

- Use transactions for metric or multi-document updates
- Implement atomic operations for consistency
- Batch writes when possible
- Query optimization and index usage required
- Select only necessary data fields
- One repository file per domain entity
- Use Firestore indexes for new queries

## Auth Patterns

- Support Anonymous, Google, Email/Password, and Github providers
- Use Firebase Auth for all authentication flows
- Handle auth state changes reactively
- Secure sensitive operations with auth checks

## Storage Patterns

- Use Firebase Storage for file/image uploads
- Validate file types and sizes before upload
- Store file metadata in Firestore when needed

## Security Rules

- Enforce client-side validation before writes
- Data sanitization for all user input
- Access control for all Firestore and Storage operations
- Data validation and schema enforcement
- Index enforcement for queries
- Test security rules with Firebase Emulator Suite

## Error Handling

- Map Firebase errors to user-friendly messages
- Handle network and timeout errors
- Log errors for debugging
- Provide debug information and stack traces in dev

## Local Simulation/Testing

- Use Firebase Emulator Suite for local development and tests
- Write security rules tests for all new data models
- Prefer local simulation over production testing
