# Vibing 2.0 - Agent-Based Development Framework

A structured approach to organizing development rules, agents, workflows, and context for consistent, high-quality software development.

## Overview

Vibing 2.0 separates development guidance into distinct, interconnected components that work together to provide comprehensive development support. Each component has a specific role and references others through `@` path links.

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

## How Components Work Together

### 1. Workflow Orchestration

Workflows coordinate multiple agents to accomplish complex tasks:

```
Workflow 301: Feature Implementation
├── Invokes: @agents/react.developer.md
├── Invokes: @agents/test.automation.engineer.md
├── References: @rules/common/testing-guidelines.md
└── Consults: @context/components.md
```

### 2. Agent Specialization

Agents provide specialized expertise by referencing relevant rules:

```
React Developer Agent
├── Uses: @rules/react/component-guidelines.md
├── Uses: @rules/common/typescript-guidelines.md
├── Consults: @context/components.md
└── Outputs: React components with tests
```

### 3. Context Awareness

Context files help agents understand current implementation:

```
Store Context
├── Describes: Apollo Client setup
├── Documents: Service patterns
├── References: @rules/apollo/client-guidelines.md
└── Guides: Future GraphQL changes
```

### 4. Rule Application

Rules provide specific implementation guidance:

```
TypeScript Guidelines
├── Applies to: All TypeScript files
├── Contains: Type definitions, interface patterns
├── Referenced by: All developer agents
└── Updated by: Modifiers for project customization
```

### 5. Template Usage

Templates provide structured document outlines for workflows:

```
Project Overview Template
├── Used by: Workflow 101
├── Contains: Numbered sections and placeholders
├── Generates: Project-specific overview documents
└── Customized by: Modifiers for project needs
```

## Usage Patterns

### For Development Teams

1. **Start with Workflows**: Choose the appropriate workflow for your task
2. **Follow Agent Guidance**: Let specialized agents guide implementation
3. **Reference Rules**: Apply specific rules for technical details
4. **Update Context**: Keep context files current as systems evolve

### For Project Setup

1. **Apply Patterns**: Use pattern prompts to establish architecture
2. **Use Templates**: Start with document templates for consistent structure
3. **Customize with Modifiers**: Adapt templates for your specific needs
4. **Create Context**: Document your current implementation patterns
5. **Establish Rules**: Define project-specific coding standards

### For Maintenance

1. **Update Context**: Keep documentation current with implementation
2. **Refine Rules**: Improve guidelines based on experience
3. **Enhance Workflows**: Optimize processes based on team feedback
4. **Extend Agents**: Add new specialists as needs evolve

## Key Benefits

- **Separation of Concerns**: Each component has a clear, focused responsibility
- **Reusability**: Rules and patterns can be applied across multiple projects
- **Consistency**: Standardized approaches ensure quality and maintainability
- **Flexibility**: Easy to customize and extend for specific project needs
- **Traceability**: Clear references show how components relate to each other

## Getting Started

1. **Review the Structure**: Understand each directory's purpose
2. **Choose a Workflow**: Start with a workflow that matches your current task
3. **Follow Agent Guidance**: Let specialized agents guide your implementation
4. **Apply Rules**: Use specific rules for technical implementation details
5. **Update Context**: Keep documentation current as you build

This framework provides a structured approach to maintaining high-quality, consistent software development practices while remaining flexible enough to adapt to different project needs.
