<!-- 9ed4ca45-5787-4122-bbf7-2a4178b9a04f 42c255b1-647d-436b-a31a-4de2788ffc69 -->
# Simplify Workflows and Templates - Detailed Specification

## Phase 1: Foundation (101-106)

### 101 - Project Overview (vibing/workflows/101-project-overview.md + vibing/templates/T01)

**Workflow Validation Questions: 11 → 5**

KEEP:

- Q1: Pain Point - What specific problem does this application solve that existing solutions don't address well?
- Q2: Competitive Differentiation - Who are direct competitors and how will this application differentiate itself?
- Q3: User Workflows - What are the most common user workflows in your target domain?
- Q9: Scalability Requirements - What are your scalability requirements (expected user volume, data size, geographic distribution)?
- Q10: Security/Compliance - Are there specific security, compliance, or regulatory requirements?

REMOVE:

- Q4: User Personas
- Q5: Platform Access
- Q6: Minimum Viable Features
- Q7: User Feedback
- Q8: System Integration
- Q11: Deployment Environment

**Workflow Execute Checklist Changes:**

- Change "Populate 6 template sections" to "Populate 5 template sections"
- Remove "Establish measurable success metrics" item
- Keep all quality assurance items

**Template Sections: 6 → 5**

KEEP & SIMPLIFY:

- Section 1: Application Purpose & Value Proposition (reduce to 1-2 sentences max, remove verbose examples)
- Section 2: Target Users & Their Goals (keep format, simplify to 2-5 user types)
- Section 3: Key Business Scenarios (keep 2-5 scenarios, make more concise)
- Section 5: Technology Constraints & Preferences (reduce format verbosity)
- Section 6: High-Level Feature Categories (keep 2-7 categories)

REMOVE:

- Section 4: Success Metrics (entire section)

---

### 102 - System Architecture (vibing/workflows/102-system-architecture.md + vibing/templates/T02)

**Workflow Validation Questions: 22 → 9**

KEEP:

- Q1: Application Components - What are the major components (web UI, mobile app, API backend, admin interface, background workers, scheduled tasks)?
- Q5: Frontend Preference - What frontend framework/library do you prefer (React, Vue, Svelte, Astro, SolidJS)?
- Q6: Backend Preference - What backend technology do you prefer (Node.js, Python, Go, .NET)?
- Q7: Database Requirements - What type of data storage fits your needs (relational, document, graph, key-value)?
- Q9: API Style - How should frontend and backend communicate (REST, GraphQL, tRPC)?
- Q12: Traffic Patterns - What are expected traffic patterns and peak load requirements?
- Q18: Deployment Environment - What's the preferred deployment environment (cloud provider, on-premises, hybrid)?
- Q21: Architecture Drivers - What are the primary drivers for architectural choices (performance, scalability, team size, timeline, cost)?
- Q22: Testing Approach - What's the testing strategy for different components (unit, integration, E2E)?

REMOVE:

- Q2: Platform Targets
- Q3: Real-Time Requirements
- Q4: Background Processing
- Q8: Team Expertise
- Q10: External Integrations
- Q11: Third-Party Failures
- Q13: Data Growth
- Q14: Caching Strategy
- Q15: Authentication/Authorization
- Q16: Compliance
- Q17: Sensitive Data
- Q19: Environment Management
- Q20: Monitoring Strategy

**Workflow Execute Checklist Changes:**

- Change "Populate all 6 sections" to "Populate all 4 sections"
- Keep quality assurance items

**Template Sections: 6 → 4**

KEEP:

- Section 1: Architectural Style & Patterns (merge infrastructure details here as brief bullets)
- Section 2: Major System Components
- Section 3: Technology Stack
- Section 6: Testing Strategy (renumber to Section 4)

REMOVE:

- Section 4: Component Interactions & Data Flow (too detailed for initial planning)
- Section 5: Infrastructure & Non-Functional Requirements (merge key points into Section 1)

---

### 103 - Data Model (vibing/workflows/103-data-model.md + vibing/templates/T03)

**Workflow Validation Questions: 12 → 7**

KEEP:

- Q1: Core Business Entities - What are the main business entities that need to be stored (users, projects, orders, etc.)?
- Q2: Entity Relationships - How do these entities relate to each other (one-to-many, many-to-many, etc.)?
- Q3: Data Attributes - What specific attributes does each entity need (name, email, status, dates, etc.)?
- Q4: Business Rules - What are the business rules and constraints for each entity (required fields, value ranges, uniqueness)?
- Q6: Sensitive Data - What data is considered sensitive and requires special protection?
- Q9: Audit Requirements - Do you need to track who changed what data and when?
- Q10: Compliance Requirements - Are there specific compliance requirements (GDPR, HIPAA, etc.)?

REMOVE:

- Q5: Data Volume
- Q7: Data Retention
- Q8: Data Validation
- Q11: Data Migration
- Q12: Data Archival

**Workflow Execute Checklist Changes:**

- Keep all items but simplify expectations

**Template Sections: Keep 4, Simplify Content**

KEEP:

- Section 1: Core Entities (as-is)
- Section 2: Entity Schema Definitions (simplify table format, reduce explanatory text)
- Section 3: Entity-Relationship Diagram (as-is)
- Section 4: Data Constraints & Business Rules (simplify from 5 categories to 3)

MODIFY Section 4:

- KEEP subsections: Entity Constraints, Business Rules, Security & Privacy
- REMOVE subsections: Relationship Constraints, Schema Management

---

### 104 - Backend Architecture (vibing/workflows/104-backend-architecture.md + vibing/templates/T04)

**Workflow Validation Questions: 22 → 4**

KEEP:

- Q1: API Style - What API style will be used (REST, GraphQL, gRPC, tRPC)?
- Q2: Authentication Method - How will users authenticate (JWT, OAuth, session-based, API keys)?
- Q3: Authorization Model - What authorization approach (RBAC, ABAC, custom permissions)?
- Q22: Security Compliance - Are there specific security compliance requirements (GDPR, HIPAA, SOC 2)?

REMOVE (now pre-answered in template):

- Q5: ORM/Query Builder (Answer: Raw SQL for relational databases)
- Q8: Logging Framework (Answer: Winston)
- Q12: Input Validation (Answer: Zod)
- Q17: API Versioning (Answer: URL path)

REMOVE (too implementation-specific):

- Q4: Data Access Pattern
- Q6: Background Processing
- Q7: Caching Strategy
- Q9: Error Tracking
- Q10: Monitoring
- Q11: Rate Limiting
- Q13: File Uploads
- Q14: Email Service
- Q15: External APIs
- Q16: Database Transactions
- Q18: CORS Configuration
- Q19: Environment Management
- Q20: Health Checks
- Q21: Performance Requirements

**Workflow Execute Checklist Changes:**

- Change "Populate all 4 sections" to "Populate all 3 sections"

**Template Sections: 4 → 3**

KEEP:

- Section 1: API Design & Style (add pre-answered: API Versioning = URL path)
- Section 2: Service Layer Architecture (merge DAL as subsection, add pre-answered: Input Validation = Zod, Query approach = Raw SQL for relational DB)
- Section 4: Security & Operations (rename, expand to include background processing, add pre-answered: Logging = Winston)

REMOVE:

- Section 3: Data Access Layer (merge into Section 2 as subsection)

**Template Pre-Answered Decisions:**

Add these as established defaults in the template:

- API Versioning: URL path (e.g., `/api/v1/...`)
- Input Validation: Zod for schema validation
- Logging Framework: Winston
- Query Approach: Raw SQL for relational databases

---

### 105 - Frontend Architecture (vibing/workflows/105-frontend-architecture.md + vibing/templates/T05)

**Workflow Validation Questions: 10 → 6**

KEEP:

- Q1: Frontend Framework - What frontend framework/library do you prefer (React, Astro, SolidJS, Mix)?
- Q5: Deployment Target - Where will the frontend be deployed (static hosting, CDN, server-side rendering)?
- Q6: Real-Time Features - Do you need real-time features (WebSockets, Server-Sent Events, polling)?
- Q7: Internationalization - Do you need multi-language support (i18n libraries, translation management)?
- Q9: SEO Requirements - What SEO features are needed (meta tags, structured data, server-side rendering)?
- Q10: Design System - Do you have an existing design system or need to create one?

REMOVE:

- Q2: Performance Requirements
- Q3: Mobile Support
- Q4: Browser Support
- Q8: Analytics

**Workflow Execute Checklist Changes:**

- Change "Populate all 5 sections" to "Populate all 4 sections"

**Template Sections: 5 → 4**

KEEP:

- Section 1: Core Frameworks & Libraries (reduce example verbosity, merge styling info here)
- Section 2: Directory Structure (as-is)
- Section 3: Component Architecture (simplify format explanations)
- Section 4: State Management Strategy (simplify, keep Service-Repository pattern)

REMOVE:

- Section 5: Styling & User Experience (merge key points into Section 1)
- Section 6: Testing Strategy (covered in T02)

---

### 106 - UI Design (vibing/workflows/106-ui-design.md + vibing/templates/T06)

**Workflow Validation Questions: 6 → 5**

KEEP:

- Q1: Brand Identity - What is the brand personality, tone, and visual identity (professional, playful, minimalist, bold)?
- Q2: Target Audience - What are the primary user demographics and accessibility requirements?
- Q3: Device Support - What devices and screen sizes need to be supported (mobile-first, desktop-first, responsive)?
- Q4: Theme Support - Do you need light/dark theme support or single theme?
- Q6: Competitive Landscape - Who are the main competitors and how should the design differentiate?

REMOVE:

- Q5: Design System (redundant with Q4)

**Template Sections: Keep 4, Simplify Content**

KEEP:

- Section 1: Design Strategy & Brand Foundation (reduce format verbosity)
- Section 2: Color Strategy (simplify subsections)
- Section 3: Typography Strategy (simplify subsections)
- Section 4: Layout & Component Strategy (keep consolidated approach)

SIMPLIFY: Remove verbose examples and explanatory formatting instructions throughout

---

## Phase 2: UI Design (107-108)

### 107 - UI Experience Overview (vibing/workflows/107-ui-experience-overview.md + vibing/templates/T07)

**Workflow Validation Questions: 5 → 3**

KEEP:

- Q2: Navigation Philosophy - What navigation approach, cross-platform patterns, and contextual navigation are needed?
- Q4: Interaction Patterns - What core interactions, accessibility, and error handling patterns are required?
- Q5: Page Structure - What pages exist and what are their routes and purposes?

REMOVE (duplicate with T01):

- Q1: Application Structure (already covered in T01 Project Overview)
- Q3: Information Architecture (too detailed for this phase, emerges from page designs)

**Template Sections: 5 → 2**

KEEP (ultra-concise, bullet points only):

- Section 1: Navigation & Interaction Patterns (merge Sections 2 and 4, bullet points only)
- Section 2: Page Summary (formerly Section 5, table only - this is the primary value)

REMOVE (duplicate or too detailed):

- Old Section 1: Application Structure (duplicate with T01)
- Old Section 3: Information Architecture (too detailed, emerges from actual page designs)
- Old Section 5: Page Summary (becomes new Section 2)

**Simplified Focus:**

T07 should be minimal - just enough to establish navigation patterns and list all pages before diving into individual page designs (T08).

---

### 108 - UI Page Design (vibing/workflows/108-ui-page-design.md + vibing/templates/T08)

**Workflow Validation Questions: 9 → 5**

KEEP:

- Q1: Page Purpose & Goals - What is the primary purpose, business objective, and main user goals for this page?
- Q2: User Journey Context - How does this page fit into the overall user journey and navigation flow?
- Q3: Content & Interactions - What content needs to be displayed and what user interactions are possible?
- Q5: Responsive Design - How should the page adapt fluidly across all screen sizes and performance requirements?
- Q7: User Permissions - What user roles and permissions affect this page's content and functionality?

REMOVE:

- Q4: Success Criteria
- Q6: Integration Points
- Q8: Error & Loading States (overall design concern, not per-page)
- Q9: Design Consistency (covered in workflow checklist)

**Workflow Execute Checklist Changes:**

- Change "Populate all 5 sections" to "Populate all 3 sections"
- KEEP "Create high-fidelity SVG wireframes" item (will be linked in template)
- Keep design consistency and quality assurance sections

**Template Sections: 5 → 3**

KEEP & RESTRUCTURE:

- Section 1: Page Purpose & Wireframe (merge purpose + link to SVG wireframe asset)
- Section 2: Data Attributes & Requirements (formerly Section 4, KEEP DETAILED - critical for workflow 109)
- Section 3: User Experience & Responsive Behavior (formerly Section 5, simplify to essential responsive behavior)

REMOVE:

- Old Section 2: Page Layout & Visual Structure (replaced by SVG wireframe reference in Section 1)
- Old Section 3: Component Usage & Consistency (covered in workflow checklist)

---

## Phase 3: Planning (109-110)

### 109 - Data Access Patterns (vibing/workflows/109-data-access-patterns.md + vibing/templates/T09)

**Workflow Validation Questions: Keep 4 (already minimal)**

- Q1: Real-time Requirements
- Q2: Search Requirements
- Q3: Aggregation Requirements
- Q4: Access Control

**Workflow Execute Checklist Changes:**

- Change "Populate all 5 sections" to "Populate all 4 sections"

**Template Sections: 6 → 4**

KEEP:

- Section 1: Core Data Access Patterns (add pagination/filtering conventions as subsection)
- Section 2: DTO Definitions
- Section 5: Performance Optimizations (renumber to Section 3)
- Section 6: Real-time Data Requirements (renumber to Section 4)

REMOVE:

- Section 3: Common Access Conventions (merge into Section 1)
- Section 4: Data Model Gaps (too detailed for planning phase)

---

### 110 - Feature Overview (vibing/workflows/110-feature-overview.md + vibing/templates/T10)

**Workflow Validation Questions: Keep 11 (appropriate for feature planning)**

- Q1: Foundational Frameworks
- Q2: Vertical Slices
- Q3: User Journey
- Q4: Business Value
- Q5: Implementation Complexity
- Q6: WSJF Scoring
- Q7: User Stories
- Q8: Quick Wins
- Q9: Cross-Cutting Features
- Q10: End-to-End Value
- Q11: Foundation Dependencies

**Template Sections: Keep 2, Simplify Content**

KEEP:

- Section 1: Feature Build Order (table only)
- Section 2: Feature Details and User Stories (simplify format)

SIMPLIFY Section 2:

- Remove verbose "Business Purpose" paragraph
- Keep feature name + 3-5 concise user stories

---

## Phase 4: Feature Development (201-204)

### 201 - High Level Design (vibing/workflows/201-high-level-design.md + vibing/templates/T11a)

**Workflow Validation Questions: 7 → 5**

KEEP:

- Q1: Business Purpose - What business problem does this specific feature solve and what value does it provide?
- Q2: User Value - How will this specific feature improve the user experience or solve user pain points?
- Q3: User Scenarios - What are the primary user scenarios and workflows for this specific feature?
- Q6: User Journey - How does this specific feature fit into the overall user journey?
- Q7: Acceptance Criteria - What are the high-level acceptance criteria for this specific feature?

REMOVE:

- Q4: User Stories (covered in Q2/Q3)
- Q5: Business Impact (covered in Q2)

**Template Sections: Keep 2 (already minimal)**

- Section 1: Feature Overview
- Section 2: System / User Flow

No changes needed.

---

### 202 - Test Scenario Design (vibing/workflows/202-test-scenario-design.md + vibing/templates/T11b)

**Workflow Validation Questions: 7 → 5**

KEEP:

- Q1: Feature Scope - What is the complete business scope and user value of the feature being tested?
- Q3: Business Rules - What are the key business rules, validation requirements, and decision points?
- Q4: User Journeys - What are the complete user workflows from start to finish?
- Q5: Business Outcomes - What business results should be achieved at each step of the user journey?
- Q6: Error Scenarios - What business error conditions and user-facing failure modes exist?

REMOVE:

- Q2: User Personas (covered in Q1)
- Q7: User Decision Points (covered in Q3/Q4)

**Template Sections: No changes (structure needs detail)**

Keep Section 5 (Test Scenarios) detailed structure as-is.

---

## Implementation Order

1. Foundation (101-106) - highest impact on project setup
2. UI Design (107-108) - high usage during design phase
3. Planning (109-110) - connects foundation to features
4. Feature Development (201-204) - moderate changes
5. Implementation (301-302, 401-402) - minimal changes

### To-dos

- [ ] Update vibing/workflows/101-project-overview.md: Reduce questions 11→5, update checklist
- [ ] Update vibing/templates/T01 - Project Overview.md: Reduce sections 6→5, remove Success Metrics
- [ ] Update vibing/workflows/102-system-architecture.md: Reduce questions 22→9, update checklist
- [ ] Update vibing/templates/T02 - System Architecture.md: Reduce sections 6→4, merge Infrastructure
- [ ] Update vibing/workflows/103-data-model.md: Reduce questions 12→7
- [ ] Update vibing/templates/T03 - Data Model.md: Simplify Section 4 constraints to 3 categories
- [ ] Update vibing/workflows/104-backend-architecture.md: Reduce questions 22→4, add pre-answered decisions
- [ ] Update vibing/templates/T04 - Backend Architecture.md: Reduce sections 4→3, add defaults
- [ ] Update vibing/workflows/105-frontend-architecture.md: Reduce questions 10→6, update checklist
- [ ] Update vibing/templates/T05 - Frontend Architecture.md: Reduce sections 5→4, merge Styling
- [ ] Update vibing/workflows/106-ui-design.md: Reduce questions 6→5
- [ ] Update vibing/templates/T06 - UI Design.md: Simplify content, remove verbose examples
- [ ] Update vibing/workflows/107-ui-experience-overview.md: Reduce questions 5→3, update checklist
- [ ] Update vibing/templates/T07 - UI Experience Overview.md: Reduce sections 5→2
- [ ] Update vibing/workflows/108-ui-page-design.md: Reduce questions 9→5 (remove Q8), keep SVG wireframes
- [ ] Update vibing/templates/T08 - UI Page Design.md: Reduce sections 5→3, keep detailed data attributes
- [ ] Update vibing/workflows/109-data-access-patterns.md: Update checklist for 4 sections
- [ ] Update vibing/templates/T09 - Data Access Patterns and Objects.md: Reduce sections 6→4
- [ ] Verify vibing/workflows/110-feature-overview.md unchanged (questions appropriate)
- [ ] Update vibing/templates/T10 - Feature Overview.md: Simplify Section 2 format
- [ ] Update vibing/workflows/201-high-level-design.md: Reduce questions 7→5
- [ ] Update vibing/workflows/202-test-scenario-design.md: Reduce questions 7→5
- [ ] Update vibing/workflows/203-implementation-design.md: Reduce questions 8→6
- [ ] Verify vibing/workflows/204-plan-evaluation-validation.md unchanged (5 questions)
- [ ] Verify vibing/templates/T12 - Technical Design Validation.md unchanged
- [ ] Verify vibing/workflows/301-feature-implementation.md unchanged (1 question)
- [ ] Verify vibing/workflows/302-test-only-implementation.md unchanged (1 question)
- [ ] Verify vibing/workflows/401-code-cleanup.md unchanged (2 questions)
- [ ] Verify vibing/workflows/402-test-cleanup.md unchanged (2 questions)
- [ ] Test workflow 101→106 progression for consistency
- [ ] Test workflow 107→108 iteration pattern
- [ ] Test workflow 109→110 transition to feature planning
- [ ] Test workflow 201→204 feature development cycle
- [ ] Verify all template references updated in workflows
- [ ] Verify all question number references updated in workflows
- [x] Update vibing/workflows/101-project-overview.md: Reduce questions 11→5, update checklist
- [ ] Update vibing/workflows/101-project-overview.md: Reduce questions 11→5, update checklist
- [ ] Update vibing/templates/T01 - Project Overview.md: Reduce sections 6→5, remove Success Metrics
- [ ] Update vibing/workflows/102-system-architecture.md: Reduce questions 22→9, update checklist
- [ ] Update vibing/templates/T02 - System Architecture.md: Reduce sections 6→4, merge Infrastructure into Section 1
- [ ] Update vibing/workflows/103-data-model.md: Reduce questions 12→7
- [ ] Update vibing/templates/T03 - Data Model.md: Simplify Section 4 constraints to 3 categories
- [ ] Update vibing/workflows/104-backend-architecture.md: Reduce questions 22→4, add pre-answered decisions, update checklist
- [ ] Update vibing/templates/T04 - Backend Architecture.md: Reduce sections 4→3, add pre-answered defaults
- [ ] Update vibing/workflows/105-frontend-architecture.md: Reduce questions 10→6, update checklist
- [ ] Update vibing/templates/T05 - Frontend Architecture.md: Reduce sections 5→4, merge Styling into Section 1
- [ ] Update vibing/workflows/106-ui-design.md: Reduce questions 6→5
- [ ] Update vibing/templates/T06 - UI Design.md: Simplify content, remove verbose examples
- [ ] Update vibing/workflows/107-ui-experience-overview.md: Reduce questions 5→3, update checklist
- [ ] Update vibing/templates/T07 - UI Experience Overview.md: Reduce sections 5→2, focus on navigation and page summary
- [ ] Update vibing/workflows/108-ui-page-design.md: Reduce questions 9→5 (remove Q8), keep SVG wireframe requirement, update checklist
- [ ] Update vibing/templates/T08 - UI Page Design.md: Reduce sections 5→3, keep detailed data attributes, add wireframe link
- [ ] Update vibing/workflows/109-data-access-patterns.md: Update checklist for 4 sections
- [ ] Update vibing/templates/T09 - Data Access Patterns and Objects.md: Reduce sections 6→4, merge conventions into Section 1
- [ ] Verify vibing/workflows/110-feature-overview.md unchanged (questions appropriate)
- [ ] Update vibing/templates/T10 - Feature Overview.md: Simplify Section 2 format, remove verbose business purpose
- [ ] Update vibing/workflows/201-high-level-design.md: Reduce questions 7→5
- [ ] Update vibing/workflows/202-test-scenario-design.md: Reduce questions 7→5
- [ ] Update vibing/workflows/203-implementation-design.md: Reduce questions 8→6
- [ ] Verify vibing/workflows/204-plan-evaluation-validation.md unchanged (5 questions)
- [ ] Verify vibing/templates/T12 - Technical Design Validation.md unchanged
- [ ] Verify vibing/workflows/301-feature-implementation.md unchanged (1 question)
- [ ] Verify vibing/workflows/302-test-only-implementation.md unchanged (1 question)
- [ ] Verify vibing/workflows/401-code-cleanup.md unchanged (2 questions)
- [ ] Verify vibing/workflows/402-test-cleanup.md unchanged (2 questions)
- [ ] Test workflow 101→106 progression for consistency (depends on Phase 1 completion)
- [ ] Test workflow 107→108 iteration pattern (depends on Phase 2 completion)
- [ ] Test workflow 109→110 transition to feature planning (depends on Phase 3 completion)
- [ ] Test workflow 201→204 feature development cycle (depends on Phase 4 completion)
- [ ] Verify all template references updated in workflows (depends on all phases)
- [ ] Verify all question number references updated in workflows (depends on all phases)