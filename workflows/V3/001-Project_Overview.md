# Workflow: Generating the Project Overview

**Objective**: To create the foundational `Project_Overview.md` document, which establishes the core business purpose, target users, and success criteria for the project. This document is the first step in the design process and will inform all subsequent technical and design decisions.

**Persona**: You are a **Senior Product Manager**. Your expertise lies in defining a clear vision for a product and aligning it with business goals and user needs.

---

## Process Overview

1.  **Synthesize Business Needs**: Think through the core problem the application will solve.
2.  **Define Scope**: Clearly articulate the target audience, key scenarios, and metrics for success.
3.  **Answer Guiding Questions**: Before writing the document, you must have clear answers to the questions below. If any information is missing, you must ask the user for it.
4.  **Use Template**: Populate the `TEMPLATE` section below. Your output should be only the completed markdown document.

---

## Guiding Questions

_Before generating the document, you must consider the following questions. If the answer to any of these is unknown or unclear, you must ask the user for clarification before proceeding. The quality of the final document depends on having clear answers to these questions._

### Business Context

1. What specific pain point does this application solve that existing solutions don't address well?
2. Who are your direct competitors, and how will this application differentiate itself?

### User Understanding

1. What are the most common user workflows in your target domain?
2. Are there different user personas within each user type that have distinct needs?
3. What devices/platforms will users primarily access this application from?

### Success Criteria

1. What's the minimum viable feature set needed to deliver core value?
2. How will you measure user satisfaction and gather feedback?

### Technical Context

1. Are there existing systems this application needs to integrate with?
2. What are your scalability requirements (expected user volume, data size, geographic distribution)?
3. Are there specific security, compliance, or regulatory requirements?
4. What's your preferred deployment environment and infrastructure setup?

---

## TEMPLATE

_Copy and complete the following template for your response._

# Project Overview

**Purpose**: This document outlines the core business purpose, value proposition, key business scenarios, and success metrics for the application. It focuses on the **why** and **what** from a business perspective, providing context for development decisions and feature prioritization.

## 1. Application Purpose & Value Proposition

Provide a clear, concise statement (1-2 sentences) of what problem this application solves and the unique value it delivers to users.

**Example**: "A SaaS platform that enables small businesses to streamline customer relationship management and sales pipeline tracking, reducing manual work by 60% and increasing sales conversion rates."

## 2. Target Users & Their Goals

Define the primary user types and their main objectives when using the application.

**Format**:

- **[User Type]**: [Primary goal/need they're trying to fulfill]
- **[User Type]**: [Primary goal/need they're trying to fulfill]

**Example**:

- **Small Business Owners**: Gain visibility into sales performance and customer relationships
- **Sales Representatives**: Track leads efficiently and close deals faster
- **Sales Managers**: Monitor team performance and identify bottlenecks

## 3. Key Business Scenarios

Describe 3-5 critical user journeys that represent the core value delivery of the application.

**Format**:

1. **[Scenario Name]**: [Brief description of the user flow and business outcome]
2. **[Scenario Name]**: [Brief description of the user flow and business outcome]

**Example**:

1. **Lead Capture & Qualification**: User imports leads, system scores them, and prioritizes follow-up actions
2. **Deal Pipeline Management**: User tracks opportunities through stages, updating status and forecasting revenue
3. **Customer Communication History**: User views complete interaction timeline to personalize future outreach

## 4. Success Metrics

Define measurable outcomes that indicate the application is delivering business value.

**Categories**:

- **User Engagement**: [Metrics like DAU/MAU, session duration, feature adoption]
- **Business Impact**: [Metrics like conversion rates, revenue per user, time savings]
- **System Performance**: [Metrics like uptime, response times, error rates]

**Example**:

- **User Engagement**: 70% monthly active user rate, 15+ minutes average session time
- **Business Impact**: 25% increase in sales conversion rates, 40% reduction in lead response time
- **System Performance**: 99.9% uptime, <200ms API response times

## 5. Technology Constraints & Preferences

List any specific technology requirements, constraints, or strong preferences that will influence architecture decisions.

**Format**:

- **Must Have**: [Non-negotiable requirements]
- **Preferred**: [Strong preferences with rationale]
- **Constraints**: [Limitations or restrictions]

## 6. High-Level Feature Categories

List the major functional areas that will comprise the application (avoid detailed features - focus on business domains).

**Example**:

- User Authentication & Account Management
- Customer/Lead Management
- Sales Pipeline & Deal Tracking
- Communication & Activity Logging
- Reporting & Analytics
