# 02 - System Architecture Template

**Purpose**: This document describes the overall system architecture, including major components, their interactions, technology choices, and architectural patterns. It focuses on the **how** the system is structured at a high level, providing technical context for development decisions.

## 1. Architectural Style & Patterns

[Define the high-level architectural approach, infrastructure considerations, and non-functional drivers that shape the system. Keep responses concise bullet lists.]

- **Primary Architecture**: [e.g., Monolithic, Microservices, Serverless, Hybrid]
- **Core Patterns**: [e.g., MVC, Event-Driven, CQRS, Layered Architecture]
- **Communication**: [REST APIs, GraphQL, Message Queues, Event Streaming]
- **Infrastructure Highlights**: [Deployment model, scaling approach, core services, security posture]
- **Key Drivers**: [Performance, scalability, reliability, maintainability priorities]

## 2. Major System Components

[Identify the core components and their primary responsibilities.]

**Format**:

1. **[Component Name]**: [Primary responsibility and key functions]
2. **[Component Name]**: [Primary responsibility and key functions]

**Example**:

1. **Web Application (Frontend)**: User interface, client-side logic, and user experience
2. **Application API**: Request handling, authentication, authorization, and orchestration
3. **Data Platform**: Primary database, caching, and analytical data pipelines

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

## 4. Testing Strategy

[Define the high-level testing approach and tools for the system.]

- **Testing Philosophy**: [E2E > Integration > Unit testing approach with rationale]
- **Testing Tools**: [Primary testing frameworks and tools for each test type]
