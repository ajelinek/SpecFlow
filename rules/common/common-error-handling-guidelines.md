---
description: Centralized error handling guidelines for client UI, services, and APIs
ruleType: general
globs:
alwaysApply: true
---

## When to Use

Apply for all error handling across UI components, services, and backend/API layers.

# Principles

- Use consistent, machine-readable error categories.
- Never leak stack traces, sensitive data, or internals to users.
- Log rich diagnostic details server-side only.
- Prefer user-safe, action-oriented messages in the UI.

# Error Categories

- UNAUTHENTICATED: User not signed in
- FORBIDDEN: Authenticated but not authorized
- BAD_USER_INPUT: Validation/semantic input errors
- NOT_FOUND: Missing resource
- CONFLICT: Version/state conflicts
- RATE_LIMITED: Too many requests
- INTERNAL_SERVER_ERROR: Unexpected/unknown errors

# Client/UI

- Display errors via the foundational Alert component.
- Show brief, user-friendly text; provide next steps when applicable.
- Avoid exposing technical details.

# Services

- Map backend errors to the categories above and return UI-safe messages.
- Normalize error shape to `{ code, message, details? }`.
- Do not pass raw exceptions to components.

# API/Backend

- Return stable, documented error codes.
- Map to appropriate HTTP status when applicable.
- Do not broaden error shapes; keep them narrow and versionable.
- Ensure all internal details are logged server-side, not returned to clients.
