# Vibing - Agent-Based Development Framework

> **The secret sauce for building software that doesn't suck** 🚀

A structured approach to organizing development rules, agents, workflows, and context for consistent, high-quality software development. Think of it as your development team's collective brain, but actually organized.

## What's This All About?

Vibing takes the chaos of modern development and turns it into something that actually makes sense. We've separated development guidance into distinct, interconnected components that work together like a well-oiled machine. Each component has a specific role and references others through `@` path links (because we're not animals).

## How to Actually Use This Thing

### The Right Way to Do Things (Workflow Execution Order)

Look, we didn't just throw this together randomly. The framework is designed to be used in a specific sequence because, surprise surprise, order matters. Follow this sequence to avoid the classic "why is everything broken?" moment:

#### 1. Foundation Phase (100 Series) - "Lay the Groundwork"

Run all 100-series workflows to establish your project foundation. Skip this and you'll be debugging architectural decisions at 2 AM:

- `101-project-overview.md` - Start here (seriously, don't skip this)
- `102-system-architecture.md` - Define your system structure (or suffer later)
- `103-data-model.md` - Figure out your data relationships (trust us on this one)
- `104-backend-architecture.md` - Design your backend services
- `105-frontend-architecture.md` - Structure your frontend
- `106-ui-design.md` - Plan your UI components
- `107-ui-experience-overview.md` - Map your user experience flow
- `108-ui-page-design.md` - Design individual pages
- `109-data-access-patterns.md` - Strategize your data access
- `110-feature-overview.md` - Plan your features

#### 2. Context Management (Before 200 Series) - "Don't Skip This Part"

**CRITICAL**: Before running any 200-series workflows, execute the context manager. This isn't optional - it's the difference between organized chaos and just chaos.

**Prompt**: Follow the instructions in the agent-context-manager modifier. Avoid all duplication between the rule files and the created AGENT.md files.

**Important**: Run this prompt multiple times to ensure comprehensive context capture. Yes, multiple times. We're not kidding.

#### 3. Design Phase (200 Series) - "Make It Work, Then Make It Pretty"

**IMPORTANT**: The 200 series is done for EACH feature you want to implement from the 110 feature planning step. Don't try to design everything at once - that's how projects die.

After context management (you did do that, right?), proceed with design workflows for each individual feature:

- `201-high-level-design.md` - Technical design overview
- `202-test-scenario-design.md` - Test planning (because testing isn't optional)
- `203-implementation-design.md` - Implementation details
- `204-plan-evaluation-validation.md` - Design validation (**Run this multiple times** - seriously, validation isn't a one-and-done thing)

#### 4. Implementation Phase (300 Series) - "Actually Build It"

- `301-feature-implementation.md` - Feature development
- `302-test-only-implementation.md` - Test implementation

#### 5. Cleanup Phase (400 Series) - "Make It Suck Less"

**FLEXIBLE APPROACH**: All 400 series workflows can and possibly should be run multiple times. Sometimes it's even fun to use different models for different perspectives on the same code.

- `401-code-cleanup.md` - Code quality improvements (run multiple times, try different models)
- `402-test-cleanup.md` - Test optimization (run multiple times, try different models)

### The Modifiers (The Secret Sauce)

These are the special tools that make everything work together without falling apart:

#### Agent Context Manager - "The Organizer"

**When**: Before any 200-series workflow
**Prompt**: Follow the instructions in the agent-context-manager modifier. Avoid all duplication between the rule files and the created AGENT.md files.
**Frequency**: Run multiple times to ensure comprehensive coverage (seriously, multiple times)

#### Common Commands Generator - "The Time Saver"

**When**: After initial project creation or when adding new functionality
**Prompt**: Follow the common-commands-generator commands and update the root AGENT.md file with the commands.
**Purpose**: Establishes project-specific command patterns, This helps significantly with your allowed command list.

#### Technology Stack Analyzer - "The Tech Whisperer"

**When**: When working with new technologies or updating existing stack
**Prompt**: Follow the technology-stack-analyzer instructions to update relevant agent files.
**Purpose**: Ensures agents have current technology knowledge, for the specific project helping to reduce the context size for unneeded information

#### Test Rules Customization - "The Quality Enforcer"

**When**: When implementing testing for new frameworks or patterns
**Prompt**: Follow the test-rules-customization instructions to update test-related agents and rules.
**Purpose**: Customizes testing approach for project needs (because one-size-fits-all testing is a myth)

#### Common Commands Generator - "The Command Curator"

**When**: When setting up project-specific commands and test patterns
**Prompt**: Follow the common-commands-generator instructions to create project-specific command references.
**Purpose**: Generates concise `context/common-commands.md` with project commands (AGENT.md can be manually updated to reference it)

## What's In This Box? (Directory Structure)

### 📋 `rules/` - The "How To" Manual

**Purpose**: Specific how-to instructions for building and styling code that doesn't make your future self cry.

- **Content**: Step-by-step implementation patterns, coding standards, and technical guidelines
- **Format**: Markdown files with clear sections and examples (because we're not monsters)
- **Usage**: Referenced by other files when specific implementation guidance is needed
- **Examples**:
  - `common/typescript-guidelines.md` - TypeScript best practices
  - `apollo/client-guidelines.md` - Apollo Client usage patterns
  - `react/component-guidelines.md` - React component patterns

### 🤖 `agents/` - Your Virtual Team

**Purpose**: Framework/language-specific expert personas that know which rules to apply (and won't judge your code).

- **Content**: Agent definitions with persona, scope, rule references, and guardrails
- **Format**: Markdown files with structured metadata (organized, not chaotic)
- **Usage**: Invoked by workflows to provide specialized expertise
- **Examples**:
  - `react.developer.md` - React specialist with component expertise
  - `graphql.developer.md` - GraphQL specialist with Apollo knowledge
  - `test.automation.engineer.md` - Testing specialist with E2E expertise

### 🔄 `workflows/` - The Orchestration Maestro

**Purpose**: Step-based orchestration that coordinates multiple agents to accomplish goals without the usual chaos.

- **Content**: Concise checklists with agent references and validation steps
- **Format**: Numbered workflows with clear objectives and agent handoffs
- **Usage**: Executed to guide complex development processes
- **Examples**:
  - `101-project-overview.md` - Product planning workflow
  - `301-feature-implementation.md` - Feature development workflow
  - `401-code-cleanup.md` - Code quality improvement workflow

### 📚 `context/` - The "What We Actually Built" Documentation

**Purpose**: Describes what has been built and the specific patterns in use (because memory is unreliable).

- **Content**: Current architecture, patterns, and implementation details
- **Format**: Markdown files describing existing systems
- **Usage**: Referenced by agents to understand current state before making changes
- **Examples**:
  - `AGENT.md` - `src/api` Backend API patterns and architecture
  - `AGENT.md` - `src/ui/store` GraphQL store implementation details
  - `AGENT.md` - `src/ui/components` - Frontend component architecture

### 🛠️ `modifiers/` - The Customization Wizards

**Purpose**: Reusable prompts that help update or customize other prompts for specific projects (because one size doesn't fit all).

- **Content**: Template prompts and customization instructions
- **Format**: Markdown files with prompt templates
- **Usage**: Applied to generate project-specific content from templates
- **Examples**:
  - `common-commands-generator.md` - Generates `context/common-commands.md` with project-specific commands and updates `AGENT.md` to reference it
  - `doc.project-overview.md` - Project overview generation template
  - `context.generate.md` - Context file generation from design docs

### 🧩 `fragments/` - The Building Blocks

**Purpose**: Focused, modular guidance blocks that can be embedded into agents, rules, and workflows (like LEGO for development).

- **Content**: Guardrails, principles, response formatting rules, and clarification prompts
- **Format**: Concise Markdown fragments designed for inclusion
- **Usage**: Referenced by agents and workflows to standardize tone, behavior, and expectations
- **Examples**:
  - `engineer-guardrails.md` - Operational boundaries and safety constraints
  - `engineer-principles.md` - Engineering values and decision principles
  - `response-formatting.md` - Output style and structure requirements
  - `user-clarification.md` - Strategies and prompts to resolve ambiguity

### 🏗️ `patterns/` - The Architectural Blueprints

**Purpose**: Reusable prompts that establish common architecture across projects (because reinventing the wheel is overrated).

- **Content**: Architectural patterns and setup instructions
- **Format**: Markdown files with implementation patterns
- **Usage**: Applied once at project start to implement unique features
- **Examples**:
  - `apollo-client-setup.md` - Apollo Client configuration
  - `test-context-architecture-guide.md` - Test data management setup

### 📄 `templates/` - The Document Factory

**Purpose**: Placeholder and outline documents used by workflows to create specific design documents and features (because starting from scratch is for masochists).

- **Content**: Document templates with numbered sections and placeholders
- **Format**: Markdown files with template structure and guidance
- **Usage**: Referenced by workflows to generate project-specific documents
- **Examples**:
  - `project-overview-template.md` - Project overview document template
  - `technical-design-template.md` - Feature technical design template
  - `feature-overview-template.md` - Feature planning template
