# System Architecture Details

## 1. High-Level System Context
Show your application interacting with external systems (users, third-party services).

```mermaid
graph TD
    subgraph External
        U[User] -->|Interacts via HTTPS| W[Web App]
    end
    
    subgraph Application
        W -->|Reads/Writes| DB[(MongoDB Database)]
        W -->|Sends Emails| E[Email Service]
    end
    
    classDef external fill:#f9f,stroke:#333,stroke-width:2px;
    classDef app fill:#bbf,stroke:#333,stroke-width:2px;
    classDef storage fill:#bfb,stroke:#333,stroke-width:2px;
    
    class U external;
    class E external;
    class W app;
    class DB storage;
```

## 2. Application Components
Break down the application into its primary components.

```mermaid
graph LR
    User[User] -->|Uses| FE[Frontend\nReact.js/Next.js]
    FE -->|API Calls| BE[Backend API\nNode.js/Express]
    BE -->|Reads/Writes| DB[(MongoDB\nAtlas)]
    BE -->|Sends| ES[Email Service\nSendGrid/Mailgun]
    
    style User fill:#f9f,stroke:#333,stroke-width:2px
    style FE fill:#bbf,stroke:#333,stroke-width:2px
    style BE fill:#bbf,stroke:#333,stroke-width:2px
    style DB fill:#bfb,stroke:#333,stroke-width:2px
    style ES fill:#f9f,stroke:#333,stroke-width:2px
```
```

## 3. Key Architectural Decisions
*   `Backend Framework: Express.js` for its simplicity, flexibility, and large ecosystem.
*   `Frontend Framework: Next.js` for Server-Side Rendering (SSR), Static Site Generation (SSG), file-based routing, and overall developer experience.
*   `Database: MongoDB (Atlas)` for flexible schema design, scalability, and ease of development with JavaScript-based stacks.
*   `Authentication: JWT (JSON Web Tokens)` for stateless authentication, enabling scalability and decoupling of auth logic.
*   `Error Handling Strategy: Centralized middleware` in the backend for consistent API error responses. Standardized error objects.
*   `Validation Strategy: Joi/Zod schemas` for robust API input validation in the backend. Client-side validation for better UX.
*   `API Style: RESTful` with clear resource-based URLs and standard HTTP methods.

## 4. Folder Structure & Conventions (Backend Example)
A conceptual outline of how the codebase should be organized.
```
/backend
├── src/
│   ├── config/             // Environment-specific config (db, jwt, etc.)
│   ├── models/             // Mongoose schemas and models
│   ├── controllers/        // Request handling logic, interacts with services
│   ├── services/           // Business logic, interacts with models
│   ├── routes/             // API route definitions
│   ├── middleware/         // Custom middleware (auth, error handling, logging)
│   ├── utils/              // Helper functions, constants
│   ├── validators/         // Joi/Zod validation schemas
│   └── app.js              // Main application setup, Express app instantiation
├── tests/                  // Unit and integration tests
│   ├── unit/
│   └── integration/
├── .env.example            // Example environment variables
├── package.json
└── Dockerfile
```

## (Frontend Example)
```
/frontend
├── public/                 // Static assets
├── src/
│   ├── app/                // Next.js 13+ app directory structure (pages, layouts, components)
│   │   ├── (auth)/         // Route group for auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/    // Route group for authenticated app sections
│   │   │   ├── layout.tsx
│   │   │   ├── clients/page.tsx
│   │   │   └── deals/page.tsx
│   │   ├── layout.tsx      // Root layout
│   │   └── page.tsx        // Root page (e.g., landing)
│   ├── components/         // Reusable UI components (buttons, forms, cards)
│   │   ├── ui/             // Generic UI elements (shadcn/ui style)
│   │   └── features/       // Feature-specific components
│   ├── contexts/           // React contexts (e.g., AuthContext)
│   ├── hooks/              // Custom React hooks
│   ├── services/           // API service functions (fetching data)
│   ├── store/              // State management (e.g., Zustand, Redux Toolkit)
│   ├── lib/                // Utility functions, constants
│   ├── styles/             // Global styles, Tailwind config
│   └── types/              // TypeScript type definitions
├── .env.local.example
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
