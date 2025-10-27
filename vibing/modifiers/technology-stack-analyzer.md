# Technology Stack Analyzer Modifier

## Purpose

This modifier analyzes all project files (workflows, agents, templates, agent files, and source code) to automatically detect the technology stack being used and dynamically filter content (rules, bullets, workflows, templates, and other technology-specific content) based on what technologies are actually present in the project.

## Configuration

### Required Parameters

- **Agent File Path**: The path to the agent file that contains the complete rule inventory with descriptions (e.g., `@vibing/context/global.AGENT.md`, `@vibing/agents/master.AGENT.md`, etc.)
- **Project Root**: The root directory of the project to analyze
- **Rule Directory**: The directory containing all rule files (e.g., `@vibing/rules/`, `@vibing/guidelines/`, etc.)

### Optional Parameters

- **Exclude Patterns**: File patterns to exclude from analysis (e.g., `node_modules/`, `dist/`, `*.test.*`)
- **Custom Technology Mappings**: Override default technology detection patterns
- **Content Categories**: Define custom content categories for grouping (rules, bullets, workflows, templates)
- **Filter Granularity**: Control how aggressively to filter content (strict, moderate, permissive)

## What It Analyzes

### 1. Source Code Analysis

Scans project files for technology indicators:

#### Frontend Frameworks

- **React**: `.tsx`, `.jsx`, `react`, `@types/react`, `useState`, `useEffect`, `JSX.Element`
- **SolidJS**: `solid-js`, `createSignal`, `createEffect`, `createMemo`, `<Show>`, `<For>`
- **Astro**: `.astro`, `astro`, `client:*`, `Astro.props`, `getStaticPaths`

#### Backend/API Technologies

- **Apollo GraphQL**: `@apollo/client`, `@apollo/server`, `gql`, `useQuery`, `useMutation`
- **Firebase**: `firebase`, `firestore`, `firebase/auth`, `firebase/storage`

#### Data Storage

- **Firebase Firestore**: `firestore`, `collection`, `doc`, `getDocs`, `addDoc`
- **Relational DB**: `sql`, `postgres`, `mysql`, `prisma`, `sequelize`
- **Object Store**: `mongodb`, `mongoose`, `document`, `collection`

#### Testing Frameworks

- **E2E Testing**: `playwright`, `cypress`, `@playwright/test`, `cy.visit`
- **Unit Testing**: `jest`, `vitest`, `@testing-library`, `describe`, `it`, `test`

#### Build Tools

- **TypeScript**: `typescript`, `@types/*`, `.ts`, `.tsx`, `tsconfig.json`
- **Vite**: `vite`, `@vitejs/*`, `vite.config`
- **Webpack**: `webpack`, `webpack.config`

### 2. Configuration Files

Analyzes package.json, tsconfig.json, and other config files for dependencies and settings.

### 3. Project Structure

Examines folder structure patterns:

- `src/components/` → React/SolidJS components
- `src/pages/` → Astro pages
- `graphql/` → Apollo GraphQL
- `firebase/` → Firebase integration

## Content Filtering Management

### Content Source Reference

All content (rules, bullets, workflows, templates) and their descriptions are maintained in the specified agent file. The technology stack analyzer references this file to:

1. **Get complete content inventory** with descriptions
2. **Map technologies to content files** based on the authoritative list
3. **Validate content existence** before adding references
4. **Maintain consistency** between detected stack and available content
5. **Filter technology-specific bullets** from all content types
6. **Remove irrelevant workflows** and templates
7. **Clean agent definitions** of unused technology references

The agent file location is configurable and can be:

- `@vibing/context/global.AGENT.md` (default)
- `@vibing/agents/master.AGENT.md`
- `@config/rules.AGENT.md`
- Any custom path to the agent file

### Technology-to-Content Mapping

The analyzer maps detected technologies to content using pattern matching:

#### Framework Detection

- **Frontend frameworks** → Include all content matching framework patterns
- **Backend technologies** → Include all content matching backend patterns
- **Data storage** → Include all content matching storage patterns
- **Testing frameworks** → Include all content matching testing patterns
- **Build tools** → Include all content matching build tool patterns

#### Content Type Filtering

The analyzer filters different content types based on detected technologies:

##### Rules

- **Framework-specific rules** → Include only for detected frameworks
- **Backend-specific rules** → Include only for detected backend technologies
- **Database-specific rules** → Include only for detected data storage
- **Testing-specific rules** → Include only for detected testing frameworks

##### Bullets and Guidelines

- **Technology-specific bullets** → Remove bullets for unused technologies
- **Framework-specific guidelines** → Include only for detected frameworks
- **Backend-specific guidelines** → Include only for detected backend technologies
- **Database-specific guidelines** → Include only for detected data storage

##### Workflows

- **Technology-specific workflows** → Include only workflows relevant to detected stack
- **Framework-specific steps** → Include only steps for detected frameworks
- **Backend-specific processes** → Include only for detected backend technologies

##### Templates

- **Technology-specific templates** → Include only templates for detected technologies
- **Framework-specific patterns** → Include only patterns for detected frameworks
- **Backend-specific structures** → Include only for detected backend technologies

#### Always-Included Content

This content is always included regardless of technology stack:

- **Core rules** (general, formatting, clarification)
- **Common rules** (UI/UX, error handling, data conventions)
- **Foundation rules** (component principles, styling, accessibility)
- **General workflows** (project setup, validation, cleanup)
- **Universal templates** (basic structure, common patterns)

### Technology-Specific Bullet Filtering

The analyzer performs comprehensive filtering of technology-specific bullets across all content types:

#### Bullet Detection Patterns

The analyzer identifies technology-specific bullets using these patterns:

##### Framework-Specific Bullets

- **React bullets**: `useState`, `useEffect`, `JSX`, `React.Component`, `@types/react`
- **SolidJS bullets**: `createSignal`, `createEffect`, `createMemo`, `<Show>`, `<For>`
- **Astro bullets**: `client:*`, `Astro.props`, `getStaticPaths`, `.astro` files

##### Backend-Specific Bullets

- **Apollo bullets**: `@apollo/client`, `@apollo/server`, `gql`, `useQuery`, `useMutation`
- **Firebase bullets**: `firebase`, `firestore`, `firebase/auth`, `firebase/storage`
- **REST API bullets**: `fetch`, `axios`, `express`, `fastify`

##### Database-Specific Bullets

- **Firestore bullets**: `collection`, `doc`, `getDocs`, `addDoc`, `firestore`
- **SQL bullets**: `sql`, `postgres`, `mysql`, `prisma`, `sequelize`
- **MongoDB bullets**: `mongodb`, `mongoose`, `document`, `collection`

##### Testing-Specific Bullets

- **E2E bullets**: `playwright`, `cypress`, `@playwright/test`, `cy.visit`
- **Unit testing bullets**: `jest`, `vitest`, `@testing-library`, `describe`, `it`, `test`

#### Bullet Filtering Process

1. **Scan All Content**: Analyze rules, workflows, templates, and agent files for technology-specific bullets
2. **Match Against Stack**: Compare detected bullets with the technology stack
3. **Remove Unused Bullets**: Delete bullets for technologies not in the detected stack
4. **Preserve Context**: Maintain bullet context while removing technology-specific content
5. **Update References**: Update all file references to reflect filtered bullet lists

#### Bullet Filtering Examples

##### Before Filtering (React + Apollo + Firebase Project)

```
- Use React hooks for state management
- Implement Apollo GraphQL for data fetching
- Use Firebase for authentication
- Consider MongoDB for document storage
- Use Playwright for E2E testing
- Implement SolidJS components
```

##### After Filtering (React + Apollo + Firebase Project)

```
- Use React hooks for state management
- Implement Apollo GraphQL for data fetching
- Use Firebase for authentication
- Use Playwright for E2E testing
```

**Removed bullets**: MongoDB (not detected), SolidJS (not detected)

## Implementation Logic

### 1. Detection Process

The analyzer scans project files to detect technology indicators:

- **Package Dependencies**: Reads `package.json` for technology-specific packages
- **Source Code Patterns**: Scans imports, file extensions, and code patterns
- **Configuration Files**: Analyzes `tsconfig.json`, `vite.config.js`, etc.
- **Project Structure**: Examines folder patterns and file organization

### 2. Content Selection Process

The analyzer uses the specified agent file as the authoritative source:

- **Parse Agent Inventory**: Extracts all available content (rules, bullets, workflows, templates) with descriptions from the agent file
- **Map Technologies**: Match detected technologies to relevant content files
- **Include Core Content**: Always include essential content (general, formatting, clarification)
- **Filter by Stack**: Only include content relevant to detected technologies
- **Filter Technology Bullets**: Remove bullets and guidelines for unused technologies
- **Filter Workflows**: Include only workflows relevant to detected stack
- **Filter Templates**: Include only templates for detected technologies
- **Validate Existence**: Ensure all referenced content exists in the agent inventory

### 3. File Management Process

The analyzer updates project files to reflect the filtered content set:

- **Update Agent File**: Filter the specified agent file with only relevant content
- **Update Agent Files**: Reference only applicable content in agent definitions
- **Update Workflows**: Include relevant content in workflow files
- **Clean Templates**: Remove unused content references from templates
- **Filter Technology Bullets**: Remove bullets and guidelines for unused technologies from all files
- **Clean Workflows**: Remove workflow steps for unused technologies
- **Clean Templates**: Remove template patterns for unused technologies
- **Maintain Descriptions**: Preserve content descriptions from the agent inventory

## Usage

### Basic Usage

```bash
# Using default agent file location
technology-stack-analyzer --project-root ./my-project

# Specifying custom agent file location
technology-stack-analyzer --project-root ./my-project --agent-file @vibing/context/global.AGENT.md

# Using different agent file locations
technology-stack-analyzer --project-root ./my-project --agent-file @vibing/agents/master.AGENT.md
technology-stack-analyzer --project-root ./my-project --agent-file @config/rules.AGENT.md
technology-stack-analyzer --project-root ./my-project --agent-file ./custom/agent.md
```

### Advanced Configuration

```bash
# With custom rule directory and exclude patterns
technology-stack-analyzer \
  --project-root ./my-project \
  --agent-file @vibing/context/global.AGENT.md \
  --rule-directory @vibing/rules/ \
  --exclude-patterns "node_modules/,dist/,*.test.*" \
  --custom-mappings ./custom-mappings.json
```

## Usage Examples

### Example 1: React + Apollo + Firebase Project

**Detected Stack:**

- Frontend: React
- Backend: Apollo GraphQL
- Database: Firebase Firestore
- Testing: E2E + Unit
- Build: TypeScript + Vite

**Included Rules:**

The analyzer would read the specified agent file and include all rules that match the detected technology stack:

- **Core Rules** (always included): General, formatting, and clarification rules
- **Framework Rules**: All rules matching the detected frontend framework
- **Backend Rules**: All rules matching the detected backend technology
- **Data Rules**: All rules matching the detected data storage technology
- **Testing Rules**: All rules matching the detected testing frameworks
- **UI/UX Rules**: All common UI/UX and accessibility rules
- **Build Rules**: All rules matching the detected build tools
- **Additional Rules**: Data conventions, error handling, and other common rules

### Example 2: Astro + SolidJS Project

**Detected Stack:**

- Frontend: Astro + SolidJS
- Backend: None (static)
- Database: None
- Testing: Unit only
- Build: TypeScript

**Included Rules:**

The analyzer would read the specified agent file and include:

- **Core Rules** (always included): General, formatting, and clarification rules
- **Framework Rules**: All rules matching the detected frontend frameworks
- **Testing Rules**: All rules matching the detected testing frameworks
- **UI/UX Rules**: All common UI/UX and accessibility rules
- **Build Rules**: All rules matching the detected build tools
- **Additional Rules**: Data conventions, error handling, and other common rules

### Example 3: Pure React + REST API Project

**Detected Stack:**

- Frontend: React
- Backend: REST API (no Apollo)
- Database: Relational
- Testing: E2E + Unit
- Build: TypeScript + Webpack

**Included Rules:**

The analyzer would read the specified agent file and include:

- **Core Rules** (always included): General, formatting, and clarification rules
- **Framework Rules**: All rules matching the detected frontend framework
- **Data Rules**: All rules matching the detected data storage technology
- **Testing Rules**: All rules matching the detected testing frameworks
- **UI/UX Rules**: All common UI/UX and accessibility rules
- **Build Rules**: All rules matching the detected build tools
- **Additional Rules**: Data conventions, error handling, and other common rules

## Implementation Steps

### Step 1: Scan Project Files

1. Read `package.json` for dependencies
2. Scan `src/` directory for file extensions and imports
3. Check config files (`tsconfig.json`, `vite.config.js`, etc.)
4. Analyze workflow and agent files for technology references
5. **Read the specified agent file** to get complete rule inventory with descriptions

### Step 2: Generate Content List

1. **Parse the specified agent file** to extract all available content (rules, bullets, workflows, templates) with descriptions
2. Map detected technologies to content patterns from the agent inventory
3. Include always-required content (core, common, foundation)
4. Exclude unused technology content
5. **Filter technology-specific bullets** from all content types
6. **Remove irrelevant workflows** and templates
7. **Validate content existence** against the agent inventory

### Step 3: Update References

1. **Update the specified agent file** with filtered content list and descriptions
2. Update agent files to reference only relevant content from the filtered list
3. Update workflow files to include applicable content
4. Remove unused content references from templates
5. **Filter technology-specific bullets** from all files
6. **Clean workflows** of unused technology steps
7. **Clean templates** of unused technology patterns
8. **Maintain content descriptions** from the original agent file

### Step 4: Validation

1. Verify all referenced content exists
2. Check for circular dependencies
3. Ensure content coverage matches technology stack
4. Validate content file paths and references
5. **Verify technology bullet filtering** was applied correctly
6. **Confirm workflow cleaning** removed unused technology steps
7. **Confirm template cleaning** removed unused technology patterns

## Benefits

1. **Single Source of Truth**: Uses `@vibing/context/global.AGENT.md` as the authoritative content inventory
2. **Automatic Optimization**: Only includes content for technologies actually used
3. **Reduced Noise**: Eliminates irrelevant content references and technology-specific bullets
4. **Better Performance**: Fewer content items to process and validate
5. **Accurate Guidance**: Agents get only relevant technology guidance
6. **Clean Workflows**: Removes workflow steps for unused technologies
7. **Clean Templates**: Removes template patterns for unused technologies
8. **Maintenance**: Automatically adapts as technology stack evolves
9. **Consistency**: Ensures content descriptions are maintained from the global inventory
10. **Validation**: Prevents referencing non-existent or outdated content
11. **Focused Content**: Removes technology-specific bullets that don't apply to the current stack

## Error Handling

- **Missing Dependencies**: Warn if required content is missing
- **Invalid References**: Flag broken content file paths
- **Conflicting Technologies**: Alert on incompatible technology combinations
- **Unused Content**: Report content that could be removed
- **Bullet Filtering Issues**: Alert if technology-specific bullets weren't properly filtered
- **Workflow Cleaning Issues**: Alert if unused technology workflow steps weren't removed
- **Template Cleaning Issues**: Alert if unused technology template patterns weren't removed

## Integration Points

- **CI/CD**: Run during build process to validate content consistency
- **Development**: Trigger on dependency changes
- **Migration**: Use when switching technology stacks
- **Onboarding**: Automatically configure content for new projects
- **Content Maintenance**: Regularly clean unused technology-specific content
- **Workflow Optimization**: Remove unused technology workflow steps
- **Template Optimization**: Remove unused technology template patterns
