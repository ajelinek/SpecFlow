# System Architecture Details

## 1. High-Level System Context (Mermaid C4 Context Diagram)
Show your application interacting with external systems (users, third-party services).
```mermaid
C4Context
    title Sales CRM System Context
    Person user "Sales User" "Manages clients and deals."
    System crm_webapp "Sales CRM Web App" "The core web application."
    SystemDb database "MongoDB Database" "Stores all CRM data."
    System_Ext email_api "Transactional Email API" "Sends email notifications."

    user --> crm_webapp "Interacts via HTTPS"
    crm_webapp --> database "Reads/Writes data using Mongoose"
    crm_webapp --> email_api "Sends emails via REST API"
```

## 2. Application Containers (Mermaid C4 Container Diagram)
Break down the `crm_webapp` into its primary deployable units.
```mermaid
C4Container
    title Sales CRM Application Containers
    System_Boundary c1 "Sales CRM System" {
        Container frontend "Frontend Application" "React.js/Next.js" "Serves the user interface. Hosted on Vercel."
        Container backend_api "Backend API Service" "Node.js (Express.js)" "Provides RESTful API, business logic, and data access. Hosted as Docker container on AWS ECS."
    }
    ContainerDb mongodb_db "MongoDB Database" "MongoDB Atlas" "Stores persistent CRM data."
    Container_Ext email_service "Transactional Email Service" "e.g., SendGrid/Mailgun" "Third-party email sending."

    user --> frontend "Uses [HTTPS]"
    frontend --> backend_api "Makes API calls [HTTPS/JSON]"
    backend_api --> mongodb_db "Reads/Writes data [MongoDB Wire Protocol]"
    backend_api --> email_service "Sends emails [HTTPS/API Key]"
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
