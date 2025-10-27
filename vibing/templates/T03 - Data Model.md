# 03 - Data Model Template

**Purpose**: This document details the persisted data model for the application, including entities, their attributes, relationships, and constraints. It focuses solely on the data structure and relationships independent of access patterns or user experience. This serves as the single source of truth for the application's persisted data structure.

## 1. Core Entities

[Define the primary data entities that form the backbone of your application's domain.]

**Format**:

- **[Entity Name]**: [A brief, one-sentence description of the entity's purpose]

**Example**:

- **User**: Represents an individual with an account who can log in and access the system
- **Organization**: Represents a company or team that users belong to
- **Project**: Represents a container for tasks and resources within an organization
- **Task**: Represents a single unit of work to be completed within a project

## 2. Entity Schema Definitions

[Provide detailed breakdown of attributes for each entity, including data types, constraints, and descriptions.]

**Format**:

### [Entity Name]

| Attribute Name     | Data Type     | Constraints                             | Description                              |
| ------------------ | ------------- | --------------------------------------- | ---------------------------------------- |
| `id`               | `UUID`        | Primary Key, Not Null                   | Unique identifier for the entity         |
| `[attribute_name]` | `[data_type]` | `[e.g., Not Null, Unique, Foreign Key]` | `[Purpose of the attribute]`             |
| `created_at`       | `Timestamp`   | Not Null                                | Timestamp of when the record was created |
| `updated_at`       | `Timestamp`   | Not Null                                | Timestamp of the last update             |

**Example**:

### Task

| Attribute Name | Data Type                             | Constraints                        | Description                              |
| -------------- | ------------------------------------- | ---------------------------------- | ---------------------------------------- |
| `id`           | `UUID`                                | Primary Key, Not Null              | Unique identifier for the task           |
| `project_id`   | `UUID`                                | Foreign Key (Project.id), Not Null | The project this task belongs to         |
| `title`        | `String(255)`                         | Not Null                           | The title or name of the task            |
| `status`       | `Enum('todo', 'in-progress', 'done')` | Not Null, Default: 'todo'          | The current status of the task           |
| `due_date`     | `Date`                                | Nullable                           | The target completion date for the task  |
| `created_at`   | `Timestamp`                           | Not Null                           | Timestamp of when the record was created |
| `updated_at`   | `Timestamp`                           | Not Null                           | Timestamp of the last update             |

## 3. Entity-Relationship Diagram (ERD)

[Provide a diagram illustrating entities and their relationships using Mermaid syntax. Only include keys needed for entity relationships, not all attributes from the tables above.]

**Example (Mermaid Syntax)**:

```mermaid
erDiagram
    ORGANIZATION ||--o{ USER : "has"
    USER }o--o{ PROJECT : "member of"
    PROJECT ||--o{ TASK : "contains"

    ORGANIZATION {
        string id PK
        string name
    }
    USER {
        string id PK
        string organization_id FK
        string email
    }
    PROJECT {
        string id PK
        string name
    }
    TASK {
        string id PK
        string project_id FK
        string title
        string status
    }
```

## 4. Data Constraints & Business Rules

[Define the business rules and constraints that govern data integrity, validation, security, and lifecycle at the database level.]

**Format**:

- **Entity Constraints**: [Required fields, data type constraints, value ranges]
- **Relationship Constraints**: [Referential integrity rules, cascade behaviors]
- **Business Rules**: [Domain-specific validation rules enforced at data level]
- **Security & Privacy**: [Sensitive data protection, encryption, access controls, data retention]
- **Schema Management**: [Schema evolution, data migration, archival policies]

**Example**:

- **Entity Constraints**: User email must be valid format, task status must be one of defined enum values
- **Relationship Constraints**: Tasks cannot exist without a project, users must belong to an organization
- **Business Rules**: Project names must be unique within an organization, task due dates cannot be in the past
- **Security & Privacy**: User passwords hashed with bcrypt, AES-256 encryption at rest, RBAC with project-level permissions, 7-year data retention
- **Schema Management**: Versioned migrations with backward compatibility, automated rollback procedures, archive completed projects after 5 years
