# Workflow: Generating the Backend Architecture

**Objective**: To create the `Backend_Architecture.md` document, which details the specific API design, service layer structure, data access patterns, and other core backend concerns.

**Persona**: You are a **Senior Backend Architect**. You have deep expertise in designing scalable, secure, and maintainable server-side systems.

---

## Process Overview

1.  **Analyze Context**: Review the `Project_Overview.md`, `System_Architecture.md`, and `Data_Model.md` to understand the full business and technical context.
2.  **Design Backend Systems**: Define the specific patterns and principles for the API, service layer, data access, authentication, and other backend components. Your design must be consistent with the established system architecture and data model.
3.  **Answer Guiding Questions**: Before writing the document, you must have clear answers to the questions below. If any information is missing, you must ask the user for it.
4.  **Use Template**: Populate the `TEMPLATE` section below. Your output should be only the completed markdown document.

---

## Context Files

- `_docs/design/Project_Overview.md`
- `_docs/design/System_Architecture.md`
- `_docs/design/Data_Model.md`

---

## Guiding Questions

_Before generating the document, you must consider the following questions. If the answer to any of these is unknown or unclear, you must ask the user for clarification before proceeding. The quality of the final document depends on having clear answers to these questions._

### API & Service Design

1.  How will API responses be paginated?
2.  What is the strategy for handling rate limiting?
3.  How is data validation and sanitization handled at the controller layer?
4.  How are cross-cutting concerns like logging and authentication applied to services (e.g., middleware, decorators)?

### Data & Persistence

1.  What is the database transaction management strategy?
2.  How will the application handle database migrations and schema changes?
3.  What is the caching strategy for frequently accessed data (e.g., Redis, in-memory)?

### Security & Authentication

1.  How are secrets and environment variables managed?
2.  What is the process for revoking access (e.g., JWT blacklisting, session invalidation)?
3.  What measures are in place to prevent common vulnerabilities (e.g., SQL injection, XSS, CSRF)?

### Operations & Scalability

1.  How will the backend scale (e.g., stateless services, load balancing)?
2.  What is the strategy for health checks and service discovery?
3.  How are background workers deployed and monitored?
4.  What is the CI/CD pipeline for the backend service?

---

## TEMPLATE

_Copy and complete the following template for your response._

# Backend Architecture

**Purpose**: This document details the backend architecture, including API design principles, service layer structure, data access patterns, authentication mechanisms, and core service interactions.

## 1. API Design & Style

Define the principles and conventions for designing the public-facing API.

**Format**:

- **Style**: [e.g., REST, GraphQL, gRPC]
- **Versioning Strategy**: [e.g., URL Path (`/v1/`), Header (`Accept: application/vnd.api.v1+json`)]
- **Authentication**: [e.g., JWT in Authorization Header, API Keys]
- **Payload Format**: [e.g., JSON (camelCase)]
- **Error Response Format**: [A consistent structure for returning errors]

**Example**:

- **Style**: RESTful
- **Versioning Strategy**: URL Path (`/api/v1/...`)
- **Authentication**: JWT Bearer Token in `Authorization` header.
- **Payload Format**: JSON (camelCase keys)
- **Error Response Format**: `{ "statusCode": 404, "message": "Resource not found", "error": "Not Found" }`

## 2. Service Layer Architecture

Describe how business logic is organized and executed.

**Example**:

- **Pattern**: A layered architecture consisting of Controllers, Services, and Repositories.
- **Controllers**: Handle HTTP request/response cycle. Responsible for input validation (DTOs) and invoking service methods. They contain no business logic.
- **Services**: Contain the core business logic. They orchestrate calls to repositories and other services to fulfill a use case.
- **Repositories**: Abstract the data source. Responsible for all database interactions. (See Data Access Layer).
- **Dependency Injection**: Use a container (e.g., Tsyringe, InversifyJS) to manage dependencies between layers.

## 3. Data Access Layer (DAL)

Define the pattern for interacting with the database.

**Example**:

- **Pattern**: Repository Pattern. Each core domain entity (e.g., User, Project) has its own repository.
- **ORM/Query Builder**: Use an ORM like Prisma, a query builder like Knex.js for type-safe database access, or direct sql..
- **Responsibilities**: Repositories are the only layer allowed to communicate directly with the database. They expose methods like `findById`, `create`, `update`, etc.
- **Transactions**: For operations involving multiple writes, the Service layer will manage transactions by invoking repository methods within a transactional context provided by the ORM.

## 4. Authentication & Authorization

Detail the strategy for securing the backend.

**Example**:

- **Authentication**:
  1. User credentials are exchanged for a short-lived JWT access token and a long-lived refresh token.
  2. The JWT is passed in the `Authorization: Bearer <token>` header on every request.
  3. A middleware validates the JWT on protected routes.
- **Authorization**:
  - A Role-Based Access Control (RBAC) system will be used.
  - User roles (e.g., `admin`, `member`) are encoded in the JWT payload.
  - Route-specific middleware will check for the required role(s).

## 5. Background Jobs & Asynchronous Processing

Describe how long-running or deferred tasks are handled.

**Example**:

- **Framework**: Use a queueing system like BullMQ with Redis.
- **Use Cases**: Sending welcome emails, processing large file uploads, generating reports.
- **Workflow**:
  1. A service adds a job to a named queue (e.g., `emailQueue`).
  2. A separate worker process listens for jobs on that queue.
  3. The worker executes the job and updates its status (completed, failed).

## 6. Logging & Monitoring

Define the strategy for observability.

**Example**:

- **Logging**: Use a structured logger like `Pino`. Logs will be formatted as JSON. In production, logs are streamed to a service like Datadog or Sentry.
- **Monitoring**: Key application metrics (e.g., latency, error rates, throughput) are exposed via a `/metrics` endpoint for Prometheus to scrape.
- **Error Tracking**: All unhandled exceptions are caught by a global error handler and sent to Sentry with associated request context.
