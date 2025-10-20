# Vibing - Agent-Based Development Framework

A structured approach to organizing development rules, agents, workflows, and context for consistent, high-quality software development.

## Overview

Vibing separates development guidance into distinct, interconnected components that work together to provide comprehensive development support. Each component has a specific role and references others through `@` path links.

## Directory Structure

### 📋 `rules/` - Implementation Instructions

**Purpose**: Specific how-to instructions for building and styling code.

- **Content**: Step-by-step implementation patterns, coding standards, and technical guidelines
- **Format**: Markdown files with clear sections and examples
- **Usage**: Referenced by other files when specific implementation guidance is needed
- **Examples**:
  - `common/typescript-guidelines.md` - TypeScript best practices
  - `apollo/client-guidelines.md` - Apollo Client usage patterns
  - `react/component-guidelines.md` - React component patterns

### 🤖 `agents/` - Specialized Personas

**Purpose**: Framework/language-specific expert personas that know which rules to apply.

- **Content**: Agent definitions with persona, scope, rule references, and guardrails
- **Format**: Markdown files with structured metadata
- **Usage**: Invoked by workflows to provide specialized expertise
- **Examples**:
  - `react.developer.md` - React specialist with component expertise
  - `graphql.developer.md` - GraphQL specialist with Apollo knowledge
  - `test.automation.engineer.md` - Testing specialist with E2E expertise

### 🔄 `workflows/` - Orchestration Checklists

**Purpose**: Step-based orchestration that coordinates multiple agents to accomplish goals.

- **Content**: Concise checklists with agent references and validation steps
- **Format**: Numbered workflows with clear objectives and agent handoffs
- **Usage**: Executed to guide complex development processes
- **Examples**:
  - `101-project-overview.md` - Product planning workflow
  - `301-feature-implementation.md` - Feature development workflow
  - `401-code-cleanup.md` - Code quality improvement workflow

### 📚 `context/` - Current State Documentation

**Purpose**: Describes what has been built and the specific patterns in use.

- **Content**: Current architecture, patterns, and implementation details
- **Format**: Markdown files describing existing systems
- **Usage**: Referenced by agents to understand current state before making changes
- **Examples**:
  - `AGENT.md` - `src/api` Backend API patterns and architecture
  - `AGENT.md` - `src/ui/store` GraphQL store implementation details
  - `AGENT.md` - `src/ui/components` - Frontend component architecture

### 🛠️ `modifiers/` - Customization Prompts

**Purpose**: Reusable prompts that help update or customize other prompts for specific projects.

- **Content**: Template prompts and customization instructions
- **Format**: Markdown files with prompt templates
- **Usage**: Applied to generate project-specific content from templates
- **Examples**:
  - `doc.project-overview.md` - Project overview generation template
  - `context.generate.md` - Context file generation from design docs

### 🧩 `fragments/` - Reusable Content Blocks

**Purpose**: Focused, modular guidance blocks that can be embedded into agents, rules, and workflows.

- **Content**: Guardrails, principles, response formatting rules, and clarification prompts
- **Format**: Concise Markdown fragments designed for inclusion
- **Usage**: Referenced by agents and workflows to standardize tone, behavior, and expectations
- **Examples**:
  - `engineer-guardrails.md` - Operational boundaries and safety constraints
  - `engineer-principles.md` - Engineering values and decision principles
  - `response-formatting.md` - Output style and structure requirements
  - `user-clarification.md` - Strategies and prompts to resolve ambiguity

### 🏗️ `patterns/` - Architectural Scaffolding

**Purpose**: Reusable prompts that establish common architecture across projects.

- **Content**: Architectural patterns and setup instructions
- **Format**: Markdown files with implementation patterns
- **Usage**: Applied once at project start to implement unique features
- **Examples**:
  - `apollo-client-setup.md` - Apollo Client configuration
  - `test-context-architecture-guide.md` - Test data management setup

### 📄 `templates/` - Document Templates

**Purpose**: Placeholder and outline documents used by workflows to create specific design documents and features.

- **Content**: Document templates with numbered sections and placeholders
- **Format**: Markdown files with template structure and guidance
- **Usage**: Referenced by workflows to generate project-specific documents
- **Examples**:
  - `project-overview-template.md` - Project overview document template
  - `technical-design-template.md` - Feature technical design template
  - `feature-overview-template.md` - Feature planning template
