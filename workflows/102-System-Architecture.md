# Workflow: Generating the System Architecture

**Objective**: To create the `System_Architecture.md` document, which describes the high-level system structure, technology choices, and architectural patterns required to meet the business needs.

**Persona**: You are a **Lead System Architect**. You excel at translating business requirements into a robust, scalable, and maintainable technical blueprint.

---

## Process Overview

1.  **Analyze Requirements**: Carefully review the provided `Project_Overview.md` to fully understand the business goals, user needs, and success metrics.
2.  **Design Architecture**: Define a high-level technical architecture that directly supports the requirements. Make key decisions about the architectural style, technology stack, and major components.
3.  **Answer Guiding Questions**: Before writing the document, you must have clear answers to the questions below. If any information is missing, you must ask the user for it.
4.  **Use Template**: Populate the `TEMPLATE` section below. Your output should be only the completed markdown document.

---

## Context Files

- `_docs/design/Project_Overview.md`

---

## Guiding Questions

_Before generating the document, you must consider the following questions. If the answer to any of these is unknown or unclear, you must ask the user for clarification before proceeding. The quality of the final document depends on having clear answers to these questions._

### Architectural Decisions

1. What are the primary drivers for your architectural choices (performance, scalability, team size, timeline)?
2. Have you considered the trade-offs between monolithic vs. microservices architecture for your use case?

### System Integration

1. How will you handle data synchronization and consistency across system boundaries?
2. What's your approach to handling third-party service failures or downtime?

### Performance & Scalability

1. What are your expected traffic patterns and peak load requirements?
2. How will you handle data growth over time (storage, query performance)?
3. What's your caching strategy for frequently accessed data?

### Security & Compliance

1. What are your authentication and authorization requirements?
2. Are there specific compliance requirements (GDPR, HIPAA, SOC 2) that influence architecture?
3. How will you handle sensitive data storage and transmission?

### Deployment & Operations

1. What's your preferred deployment environment (cloud provider, on-premises, hybrid)?
2. How will you handle environment management (dev, staging, production)?
3. What's your monitoring and alerting strategy?
4. How will you handle database migrations and schema changes?

### Development & Maintenance

1. How does the architecture support your development team's workflow?
2. What's your strategy for testing different components and integration points?
3. How will you handle logging and debugging across system components?

---

## TEMPLATE

_Copy and complete the following template for your response._

# System Architecture

**Purpose**: This document describes the overall system architecture, including major components, their interactions, technology choices, and architectural patterns. It focuses on the **how** the system is structured at a high level, providing technical context for development decisions.

## 1. Architectural Style & Patterns

Define the high-level architectural approach and key patterns that will guide system design.

**Format**:

- **Primary Architecture**: [e.g., Monolithic, Microservices, Serverless, Hybrid]
- **Architectural Patterns**: [e.g., MVC, Event-Driven, CQRS, Layered Architecture]
- **Communication Patterns**: [e.g., REST APIs, GraphQL, Message Queues, Event Streaming]

**Example**:

- **Primary Architecture**: Monolithic with clear separation of concerns
- **Architectural Patterns**: Layered architecture with Domain-Driven Design principles
- **Communication Patterns**: RESTful APIs for client-server communication, event-driven for internal processes

## 2. Major System Components

Identify the core components and their primary responsibilities.

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

Specify the chosen technologies for each layer of the system with rationale.

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

Describe how major components communicate and how data flows through the system.

**Format**:

1. **[Interaction Pattern]**: [Description of how components communicate]
2. **[Data Flow]**: [Description of how data moves through the system]

**Example**:

1. **Client-Server Communication**: Frontend communicates with backend via RESTful APIs over HTTPS
2. **Authentication Flow**: JWT tokens issued by auth service, validated by API gateway
3. **Data Processing Pipeline**: User actions trigger events → business logic processing → database updates → UI refresh

## 5. Infrastructure & Deployment Architecture

Define the deployment environment, scaling strategy, and infrastructure components.

**Format**:

- **Deployment Model**: [How the application will be deployed and hosted]
- **Scaling Strategy**: [How the system will handle increased load]
- **Infrastructure Services**: [Supporting services like databases, caches, queues]
- **Security & Networking**: [Security measures and network architecture]

**Example**:

- **Deployment Model**: Containerized applications deployed to Kubernetes cluster
- **Scaling Strategy**: Horizontal scaling with load balancers and auto-scaling groups
- **Infrastructure Services**: Managed database service, Redis cluster, message queue service
- **Security & Networking**: VPC with private subnets, WAF, SSL/TLS encryption

## 6. Non-Functional Requirements Implementation

Explain how the architecture addresses key non-functional requirements.

**Format**:

- **Performance**: [How the architecture ensures performance requirements]
- **Scalability**: [How the system scales to meet demand]
- **Security**: [Security measures built into the architecture]
- **Reliability**: [How the system ensures uptime and fault tolerance]
- **Maintainability**: [How the architecture supports ongoing maintenance]

**Example**:

- **Performance**: CDN for static assets, database indexing, caching layer for frequent queries
- **Scalability**: Stateless services, horizontal scaling, database read replicas
- **Security**: OAuth 2.0, API rate limiting, data encryption at rest and in transit
- **Reliability**: Health checks, circuit breakers, automated backups, multi-AZ deployment
- **Maintainability**: Modular architecture, comprehensive logging, automated testing
