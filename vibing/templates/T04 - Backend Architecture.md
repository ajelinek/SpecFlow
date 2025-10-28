# 04 - Backend Architecture Template

**Purpose**: This document details the backend architecture, including API design principles, service layer structure, data access patterns, authentication mechanisms, and core service interactions. It focuses on the **how** backend services are structured and implemented.

## 1. API Design & Style

[Define the principles and conventions for designing the public-facing API. Defaults provided below should be used unless explicitly overridden.]

- **Style**: [Default: REST]
- **Versioning Strategy**: URL path (e.g., `/api/v1/...`)
- **Authentication**: [Default: JWT via `Authorization` header]
- **Payload Format**: [Default: JSON (camelCase)]
- **Error Response Format**: [Default: Problem+JSON envelope]

## 2. Service Layer Architecture

[Describe how business logic is organized and executed.]

- **Pattern**: [Architectural pattern used for organizing business logic]
- **Controllers**: [Role and responsibilities of controller layer]
- **Services**: [Role and responsibilities of service layer]
- **Data Access Layer**: Repository Pattern with clear domain boundaries
- **Query Approach**: Raw SQL for relational databases (default)
- **Input Validation**: Zod for schema validation (default)
- **Dependency Management**: [How dependencies are managed between layers]

## 3. Security & Operations

[Detail security measures, background processing, and observability across the backend.]

- **Authentication Strategy**: [How users are authenticated]
- **Authorization Model**: [How access control is implemented]
- **Token Management**: [How tokens are issued, validated, and revoked]
- **Security Implementation**: [Input validation, data protection, API security, infrastructure security]
- **Background Processing**: [Framework, use cases, workflow, error handling for async tasks]
- **Logging Framework**: Winston (default)
- **Logging & Monitoring**: [Logging strategy, monitoring approach, error tracking, performance metrics]
