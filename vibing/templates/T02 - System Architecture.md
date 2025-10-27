# 02 - System Architecture Template

**Purpose**: This document describes the overall system architecture, including major components, their interactions, technology choices, and architectural patterns. It focuses on the **how** the system is structured at a high level, providing technical context for development decisions.

## 1. Architectural Style & Patterns

[Define the high-level architectural approach and key patterns that will guide system design.]

**Format**:

- **Primary Architecture**: [e.g., Monolithic, Microservices, Serverless, Hybrid]
- **Architectural Patterns**: [e.g., MVC, Event-Driven, CQRS, Layered Architecture]
- **Communication Patterns**: [e.g., REST APIs, GraphQL, Message Queues, Event Streaming]

**Example**:

- **Primary Architecture**: Monolithic with clear separation of concerns
- **Architectural Patterns**: Layered architecture with Domain-Driven Design principles
- **Communication Patterns**: RESTful APIs for client-server communication, event-driven for internal processes

## 2. Major System Components

[Identify the core components and their primary responsibilities.]

**Format**:

1. **[Component Name]**: [Primary responsibility and key functions]
2. **[Component Name]**: [Primary responsibility and key functions]

**Example**:

1. **Web Application (Frontend)**: User interface, client-side logic, and user experience
2. **API Gateway**: Request routing, authentication, rate limiting, and API management
3. **Application Services**: Business logic, data processing, and workflow orchestration
4. **Data Layer**: Data persistence, caching, and data access patterns
5. **External Integrations**: Third-party service connections and data synchronization

## 3. Technology Stack

[Specify the chosen technologies for each layer of the system with rationale.]

**Format**:

- **Frontend**: [Framework/Library + key supporting technologies]
- **Backend**: [Runtime/Framework + key supporting technologies]
- **Database**: [Primary database + caching solutions]
- **Infrastructure**: [Deployment platform + supporting services]
- **Development Tools**: [Build tools, testing frameworks, monitoring]

**Example**:

- **Frontend**: React.js with Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js, TypeScript, JWT authentication
- **Database**: PostgreSQL with Redis for caching
- **Infrastructure**: Docker containers on AWS ECS with CloudFront CDN
- **Development Tools**: Vite for bundling, Jest for testing, DataDog for monitoring

## 4. Component Interactions & Data Flow

[Describe how major components communicate and how data flows through the system.]

**Format**:

1. **[Interaction Pattern]**: [Description of how components communicate]
2. **[Data Flow]**: [Description of how data moves through the system]

**Example**:

1. **Client-Server Communication**: Frontend communicates with backend via RESTful APIs over HTTPS
2. **Authentication Flow**: JWT tokens issued by auth service, validated by API gateway
3. **Data Processing Pipeline**: User actions trigger events → business logic processing → database updates → UI refresh

## 5. Infrastructure & Non-Functional Requirements

[Define deployment environment, scaling strategy, and how the architecture addresses key non-functional requirements.]

**Format**:

- **Infrastructure & Deployment**: [Deployment model, scaling strategy, infrastructure services, security & networking]
- **Non-Functional Requirements**: [Performance, scalability, security, reliability, maintainability implementation]

**Example**:

- **Infrastructure & Deployment**: Containerized applications on Kubernetes, horizontal scaling with load balancers, managed database service, VPC with private subnets and WAF
- **Non-Functional Requirements**: CDN for static assets, database indexing, stateless services for scalability, OAuth 2.0 and encryption, health checks and circuit breakers, modular architecture for maintainability

## 6. Testing Strategy

[Define the high-level testing approach and tools for the system.]

**Format**:

- **Testing Philosophy**: [E2E > Integration > Unit testing approach with rationale]
- **Testing Tools**: [Primary testing frameworks and tools for each test type]

**Example**:

- **Testing Philosophy**: Prefer E2E tests using Playwright for user workflows, integration tests for component interactions, unit tests for business logic
- **Testing Tools**: Playwright for E2E, Vitest for unit/integration, TestContext for data management (see testing rules for detailed implementation)
