# Feature: [Feature Name] - Technical Design

**Purpose**: This document provides the high-level technical specifications for the [Feature Name] feature. It includes a technical overview, system flow, and integration points with existing architecture.

## 1. Feature Overview

<!-- ALREADY POPULATED by 201-High-Level-Design workflow -->

## 2. System / User Flow

<!-- ALREADY POPULATED by 201-High-Level-Design workflow -->

## 3. Frontend Change Summary Table

**Purpose**: Provide a comprehensive overview of all frontend code changes required to implement this feature. This table serves as the single source of truth for what needs to be built, modified, or removed.

**How to Populate**:

- **Module/File Path**: Use exact file paths relative to project root (e.g., `src/components/UserProfile.tsx`)
- **Item Name**: Specific function, component, type, or module name being created/modified
- **Status**: `New` (creating from scratch), `Updated` (modifying existing), `Removed` (deleting)
- **Description**: Brief explanation of what this change accomplishes and why it's needed

**Validation Requirements**:

- Every item must have a corresponding detailed specification in Frontend Implementation Details
- No duplicate entries for the same file/function
- All changes must trace back to test scenarios and business requirements
- Status must accurately reflect the actual change being made

| Module/File Path    | Item Name    | Status                  | Description                                           |
| :------------------ | :----------- | :---------------------- | :---------------------------------------------------- |
| `[path/to/file.ts]` | `[ItemName]` | `[New/Updated/Removed]` | `[What this change accomplishes and why it's needed]` |

## 4. Backend Change Summary Table

**Purpose**: Provide a comprehensive overview of all backend code changes required to implement this feature. This table serves as the single source of truth for what needs to be built, modified, or removed.

**How to Populate**:

- **Module/File Path**: Use exact file paths relative to project root (e.g., `src/server/api/endpoint.ts`)
- **Item Name**: Specific function, component, type, or module name being created/modified
- **Status**: `New` (creating from scratch), `Updated` (modifying existing), `Removed` (deleting)
- **Description**: Brief explanation of what this change accomplishes and why it's needed

**Validation Requirements**:

- Every item must have a corresponding detailed specification in Backend Implementation Details
- No duplicate entries for the same file/function
- All changes must trace back to test scenarios and business requirements
- Status must accurately reflect the actual change being made

| Module/File Path    | Item Name    | Status                  | Description                                           |
| :------------------ | :----------- | :---------------------- | :---------------------------------------------------- |
| `[path/to/file.ts]` | `[ItemName]` | `[New/Updated/Removed]` | `[What this change accomplishes and why it's needed]` |

## 5. Frontend Implementation Details

**Purpose**: Provide interface specifications, purpose, and constraints for each item listed in the Frontend Change Summary Table. Focus on WHAT needs to be built and WHY it's needed, not HOW to implement it.

#### `[path/to/module.ts]`

**Module Description**: [What this module is responsible for and why it exists]

##### `[functionName](params: Type) => ReturnType`

- **Purpose**: [What this component/function does and why it's needed]
- **Constraints**: [Any architectural, performance, or security constraints]
- **Implementation Details**: [Optional - only include for complex scenarios and business rules]

##### `[anotherFunctionName](params: Type) => ReturnType`

- **Purpose**: [What this component/function does and why it's needed]
- **Constraints**: [Any architectural, performance, or security constraints]

## 6. Backend Implementation Details

**Purpose**: Provide interface specifications and constraints for each item listed in the Backend Change Summary Table. Focus on WHAT needs to be built and WHY it's needed, not HOW to implement it.

#### `[path/to/module.ts]`

**Module Description**: [What this module is responsible for and why it exists]

##### `[functionName](params: Type) => ReturnType`

- **Purpose**: [What this component/function does and why it's needed]
- **Constraints**: [Any architectural, performance, or security constraints]
- **Implementation Details**: [Optional - only include for complex scenarios and business rules]

##### `[anotherFunctionName](params: Type) => ReturnType`

- **Purpose**: [What this component/function does and why it's needed]
- **Constraints**: [Any architectural, performance, or security constraints]

## 7. Test Scenarios (Gherkin)

<!-- ALREADY POPULATED by 202-Test-Scenario-Design workflow -->
