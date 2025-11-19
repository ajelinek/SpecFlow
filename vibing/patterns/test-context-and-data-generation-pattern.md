# Test Context and Data Generation Pattern: Complete Implementation Guide

## Overview

This guide provides a complete, step-by-step process for implementing a test data generation and test context system for any project. The pattern is based on the implementation in `@group-recruitment/test-tools` and provides a structured, reusable approach to generating and managing test data across your application.

**⚠️ DB-AGNOSTIC DESIGN**: This pattern is designed to work with **any database** (Firestore, PostgreSQL, MongoDB, etc.) through interface-based abstraction. The implementation uses interfaces (`DatabaseAdapter`, `DatabaseReadOperations`) instead of concrete database types, allowing you to switch databases without changing core code.

**Prerequisites**: 
- You must have a completed `D03 - Data Model.md` or `Data_Model.md` file in your project's `_docs/design/` directory before starting
- TypeScript project with proper type definitions
- Access to your database (Firestore, PostgreSQL, MongoDB, etc.)
- **CRITICAL**: You MUST create database abstraction interfaces (`src/database/types.ts`) BEFORE implementing concrete adapters

**🎯 Complete Implementation**: This document contains **everything** needed to implement the pattern from scratch. All code templates are complete and ready to copy-paste. Follow phases in order, and you'll have a fully functional, DB-agnostic test data generation system.

---

## Quick Start: DB-Agnostic Implementation Checklist

**⚠️ CRITICAL ORDER** - Follow these steps in order for DB-agnostic design:

1. ✅ **Phase 1**: Project setup (package.json, tsconfig.json, directory structure)
2. ✅ **Phase 2-7**: Implement core utilities, types, generators, Scenario, Selector, DataMerger
3. ✅ **Phase 7.5 FIRST (BEFORE Phase 8)**: Create `src/database/types.ts` with interfaces (`DatabaseAdapter`, `DatabaseReadOperations`, `DatabaseWriteOperations`)
4. ✅ **Phase 8**: Implement concrete adapter class that `implements DatabaseAdapter` interface
5. ✅ **Phase 9**: DatabaseReader uses `DatabaseReadOperations` interface (NOT concrete database type)
6. ✅ **Phase 10**: AuthManager (optional - Firebase only)
7. ✅ **Phase 11**: TestContext uses `DatabaseAdapter` interface (NOT concrete adapter class)
8. ✅ **Phase 12**: Export concrete adapter + interfaces as types

**Key Principle**: Core modules (DatabaseReader, TestContext) use **interfaces**, not concrete types. This enables switching databases by creating a new adapter class - no other code changes needed!

**⚠️ CRITICAL DB-AGNOSTIC PRINCIPLES**:
1. **Interfaces First**: Create `src/database/types.ts` BEFORE implementing any adapter
2. **Use Interfaces**: DatabaseReader and TestContext MUST use interfaces (`DatabaseReadOperations`, `DatabaseAdapter`), NOT concrete types (`Firestore`, `Pool`, `MongoClient`)
3. **No Direct Imports**: Never import concrete database types in DatabaseReader or TestContext
4. **Adapter Implementation**: Only the adapter class (`src/database/adapter.ts`) uses concrete database types
5. **Switch Databases**: Change database by creating new adapter class - no other code changes needed

**⚠️ CRITICAL FILES THAT MUST EXIST**:
- `src/database/types.ts` - MUST be created BEFORE `src/database/adapter.ts`
- `src/database/adapter.ts` - MUST implement `DatabaseAdapter` interface
- `src/test-context/DatabaseReader.ts` - MUST use `DatabaseReadOperations` interface
- `src/test-context/TestContext.ts` - MUST use `DatabaseAdapter` interface

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Modules](#core-modules)
3. [Pre-Implementation Analysis](#pre-implementation-analysis)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Function Signature Templates](#function-signature-templates)
6. [Dependency Ordering Strategy](#dependency-ordering-strategy)
7. [Validation Checklists](#validation-checklists)
8. [Common Patterns & Examples](#common-patterns--examples)
9. [Database Selection Guide](#database-selection-guide)

---

## Architecture Overview

The test context system consists of **8 core modules** that work together:

1. **IdProvider** - Consistent ID mapping (shorthand → database IDs)
2. **Generators** - Entity-specific data creation functions
3. **Scenario** - Data assembly with dependency ordering
4. **Selector** - Data access and relationship traversal
5. **TestContext** - Main facade coordinating all components
6. **DataMerger** - Merges base + test-specific data
7. **AuthManager** - Firebase Auth user management (if using Firebase)
8. **DatabaseReader** - Database read operations with ID resolution

### Data Flow

```
TestContext.create(db)
  ↓
Scenario.bulkAdd(data) [with IdProvider]
  ↓
Selector.build() [pre-computes indexes]
  ↓
DatabaseAdapter.upsertGeneratedData() [inserts to DB]
  ↓
TestContext.setupEnv() [optional auth]
```

---

## Core Modules

### Module 1: IdProvider

**Purpose**: Maps human-readable shorthand IDs (e.g., `'C1'`, `'P1'`) to real database IDs (UUIDs or numeric).

**Key Features**:
- Consistent ID mapping across test runs
- Supports UUID and numeric ID generation
- Handles exact ID preservation for existing data
- Auto-maps generated IDs

**Dependencies**: None

**File**: `src/test-context/IdProvider.ts`

**Core Implementation Details**:
- Uses closure to maintain `idMap` Map instance
- Returns function that accepts optional string and options
- Auto-detects long strings (>10 chars) as exact UUIDs
- Supports `exact` mode for ID resolution without mapping
- Supports `log` mode for debugging ID mappings
- Supports `type` option for UUID vs numeric generation

### Module 2: Generators

**Purpose**: Create realistic test data for each entity type in your domain.

**Key Features**:
- Uses `@faker-js/faker` for realistic defaults
- Accepts partial options to override defaults
- Resolves foreign keys through IdProvider
- Returns generated entities (optionally adds to arrays)

**Dependencies**: `IdProvider`, `helpers`, `@faker-js/faker`

**File**: `src/generators/[entity-name].ts`

**Core Implementation Details**:
- Each generator accepts `options` partial type and `ID` provider function
- ID provider defaults to new instance if not provided (for standalone usage)
- Required fields throw errors if missing (e.g., foreign keys)
- Optional fields check for `undefined` (not falsy) to allow null values
- Timestamps use helper functions for consistency
- Foreign keys resolved through ID provider (shorthand → real ID)
- Some generators return multiple entities (e.g., Person + Firebase User)

### Module 3: Scenario

**Purpose**: Orchestrates data generation with proper dependency ordering.

**Key Features**:
- Maintains single IdProvider instance
- Processes entities in dependency order
- Supports bulk operations and fluent API
- Stitches nested entities (if applicable)

**Dependencies**: `IdProvider`, `Selector`, all generators

**File**: `src/test-context/Scenario.ts`

**Core Implementation Details**:
- Constructor requires IdProvider instance (validated)
- Maintains `data` object with arrays for all entity types
- Maintains separate `firebaseUsers` array for auth users
- `bulkAdd()` processes entities in strict dependency order
- Entities with multiple outputs handled (e.g., Person + Firebase User)
- `build()` stitches nested entities into parents (e.g., roles into communities)
- `build()` ensures business rules (e.g., at least one default prospect status)
- Returns Selector instance with pre-computed indexes

### Module 4: Selector

**Purpose**: Provides convenient access patterns to generated data with relationship traversal.

**Key Features**:
- Pre-computed indexes for O(1) access
- ID resolution (shorthand → real IDs)
- Relationship traversal methods
- GraphQL/API response builders

**Dependencies**: `IdProvider`, `indexUtils`, types

**File**: `src/test-context/Selector.ts`

**Core Implementation Details**:
- Constructor accepts data, optional idProvider, and firebaseUsers
- Pre-computes direct access indexes using `indexByKey`
- Pre-computes composite key indexes using `indexByCompositeKey`
- Pre-computes relationship indexes using `groupByKey`
- All getter methods resolve shorthand IDs through `resolveId()`
- Composite key access uses `${key1}:${key2}` format
- Relationship methods return empty arrays if no matches
- `getRawTestData()` returns complete data structure for database operations

### Module 5: TestContext

**Purpose**: Main facade coordinating the entire test data lifecycle.

**Key Features**:
- Factory pattern (`TestContext.create()`)
- Coordinates data merging, insertion, and authentication
- Provides retrieve methods for database lookups
- Handles Firebase Auth integration (if applicable)

**Dependencies**: All other modules, `DatabaseAdapter`

**File**: `src/test-context/TestContext.ts`

**Core Implementation Details**:
- Private constructor requires DatabaseAdapter (validated)
- Factory method `create()` always requires database adapter
- Initializes IdProvider, DatabaseReader, Scenario, AuthManager
- Firebase Auth initialized from default app (if available)
- `mergeData()` delegates to DataMerger pure function
- `bulkAdd()` adds data to scenario and builds selector
- `insert()` creates Firebase Auth users first, then inserts database entities
- `setupEnv()` completes full test setup with optional authentication
- Auth resolution validates person exists and has authUserId
- Retrieve methods delegate to DatabaseReader with ID resolution

### Module 6: DataMerger

**Purpose**: Pure functions for merging base data with test-specific data.

**Key Features**:
- Key-based override logic
- Handles single-key and composite-key entities
- Stateless (pure functions)

**Dependencies**: Types only

**File**: `src/test-context/DataMerger.ts`

**Core Implementation Details**:
- `mergeData()` merges baseData and testData objects
- Arrays merged using `mergeArrayByKey()` with key matching
- `findMatchingIndex()` handles single-key and composite-key matching
- TestData overrides baseData for matching keys
- Non-matching entities preserved from both arrays
- Switch statement in `findMatchingIndex()` handles all entity types
- Fallback logic for unknown entity types

### Module 7: AuthManager (Firebase Projects)

**Purpose**: Manages Firebase Auth user creation and authentication.

**Key Features**:
- Creates Firebase Auth users
- Generates custom tokens
- Authenticates Playwright pages

**Dependencies**: `firebase-admin/auth`, `@playwright/test`

**File**: `src/test-context/AuthManager.ts`

**Core Implementation Details**:
- Constructor requires Firebase Auth instance (validated)
- `createAuthUser()` checks for existing user by email first
- Creates user with specific UID if not exists
- Handles `auth/uid-already-exists` error gracefully
- `generateCustomToken()` creates custom token for user
- `authenticatePage()` injects Firebase SDK if needed
- Uses Firebase Auth emulator if `FIREBASE_AUTH_EMULATOR_HOST` set
- Browser-side authentication function serialized and executed in page context

### Module 8: DatabaseReader

**Purpose**: Unified database read operations with ID resolution.

**Key Features**:
- Direct database lookups
- ID resolution (shorthand → real IDs)
- Bulk read operations

**Dependencies**: `IdProvider`, database client

**File**: `src/test-context/DatabaseReader.ts`

**Core Implementation Details**:
- Constructor accepts database instance and optional idProvider
- Generic `readDocument()` helper for single document reads
- Entity-specific getter methods (e.g., `getPerson()`, `getCommunity()`)
- `getCommunity()` stitches nested entities from separate collections
- Retrieve methods resolve shorthand IDs before database lookup
- `readGeneratedData()` reads all entities matching provided structure
- Handles nested entity stitching (e.g., roles/labels into communities)

---

## Pre-Implementation Analysis

### Step 1: Analyze D03-Data-Model Document

**Location**: `_docs/design/D03 - Data Model.md` or `_docs/design/Data_Model.md`

**Checklist**:
- [ ] Identify all core entities listed in Section 1
- [ ] Extract entity schema definitions from Section 2
- [ ] Map entity relationships from ERD (Section 3) or relationship descriptions
- [ ] Note all foreign key relationships
- [ ] Identify composite key entities (e.g., `userGroupMembers`, `orgAdmins`)
- [ ] List all required vs optional fields
- [ ] Identify enum types and their valid values
- [ ] Note any special constraints or business rules
- [ ] Identify nested entities (embedded in parent but stored separately)

**Output**: Create a mapping document with:

```typescript
interface EntityMapping {
  entityName: string
  primaryKey: string
  foreignKeys: Array<{ field: string; references: string }>
  requiredFields: string[]
  optionalFields: string[]
  enums: Record<string, string[]>
  compositeKeys?: string[]
  dependencies: string[] // Entities that must be created first
  isNested?: boolean // Embedded in parent but stored separately
  parentEntity?: string // If nested, which entity contains it
}
```

### Step 2: Determine Dependency Order

**Process**:
1. Start with entities that have NO foreign keys (independent entities)
2. Then entities with foreign keys to independent entities
3. Continue until all entities are ordered
4. Relationship/junction tables come last
5. Nested entities are generated before their parent (if stored separately)

**Example Dependency Order** (from group-recruitment):
```
1. Roles, Labels, ProspectStatuses (no dependencies, but referenced by Community)
2. Communities (no dependencies, but stitched from roles/labels/statuses)
3. Persons (no dependencies)
4. Events (depends on Community)
5. CommunityAdmins (depends on Person, Community - composite key)
6. PersonEventRelationships (depends on Person, Event - composite key)
7. Notes (depends on Person)
```

**Validation**:
- [ ] Every entity appears exactly once in the order
- [ ] No circular dependencies exist
- [ ] All foreign key references are satisfied by earlier entities
- [ ] Nested entities come before their parent if stored separately

---

## Step-by-Step Implementation

### Phase 1: Project Setup

**File Structure**:
```
packages/test-tools/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts                    # Main exports
│   ├── generators/
│   │   ├── index.ts                # Export all generators
│   │   ├── helpers.ts              # Shared helper functions
│   │   ├── [entity-name].ts        # One file per entity
│   │   └── ...
│   ├── test-context/
│   │   ├── index.ts                # Export all test-context modules
│   │   ├── IdProvider.ts
│   │   ├── Scenario.ts
│   │   ├── Selector.ts
│   │   ├── TestContext.ts
│   │   ├── DataMerger.ts
│   │   ├── AuthManager.ts          # Only if using Firebase
│   │   ├── DatabaseReader.ts
│   │   ├── indexUtils.ts           # Index utility functions
│   │   └── types.ts                # Type definitions
│   └── database/
│       ├── types.ts                # Database abstraction interfaces ⚠️ CREATE FIRST
│       └── adapter.ts              # DatabaseAdapter implementation
```

**Step 1.1: Create package.json**

**File**: `packages/test-tools/package.json`

**Template**:
```json
{
  "name": "@your-project/test-tools",
  "version": "0.0.1",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./generators": "./src/generators/index.ts",
    "./test-context": "./src/test-context/index.ts",
    "./database": "./src/database/adapter.ts",
    "./database/types": "./src/database/types.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@faker-js/faker": "^10.1.0"
  },
  "devDependencies": {
    "typescript": "^5.6.3"
  },
  "peerDependencies": {
    "firebase-admin": "^12.0.0",
    "@playwright/test": "^1.48.2"
  },
  "peerDependenciesMeta": {
    "firebase-admin": {
      "optional": true
    },
    "@playwright/test": {
      "optional": true
    }
  }
}
```

**For PostgreSQL projects**, add to `dependencies`:
```json
"pg": "^8.11.0"
```

**For MongoDB projects**, add to `dependencies`:
```json
"mongodb": "^6.0.0"
```

**Step 1.2: Create tsconfig.json**

**File**: `packages/test-tools/tsconfig.json`

**Template**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "composite": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 1.3: Create Directory Structure**

**Checklist**:
- [ ] Create `packages/test-tools/` directory
- [ ] Create `src/` directory
- [ ] Create `src/generators/` directory
- [ ] Create `src/test-context/` directory
- [ ] Create `src/database/` directory
- [ ] Create all empty files listed in file structure above

### Phase 2: Implement Core Utilities

#### 2.1: IdProvider

**File**: `src/test-context/IdProvider.ts`

**Template**:
```typescript
export type IdProvider = (str?: string, options?: IdProviderOptions) => string

type IdProviderOptions = {
  exact?: boolean // Return existing mapping without creating new
  log?: boolean // Debug: log the ID map
  type?: 'numeric' | 'uuid' // ID generation type
}

export function IdProvider() {
  const idMap = new Map<string, string>()

  return function ID(str?: string, options: IdProviderOptions = {}): string {
    const { exact = false, log = false, type = 'uuid' } = options

    if (log) {
      console.log(idMap)
      return ''
    }

    // Return existing mapping if available
    if (str && idMap.has(str)) {
      return idMap.get(str)!
    }

    // Exact mode: return as-is without creating mapping
    if (exact && str) {
      return str
    }

    // Generate new ID based on type
    const newId = type === 'uuid' ? generateUuid() : generateNumericID()

    // Auto-map generated IDs
    if (!str) {
      idMap.set(newId, newId)
      return newId
    }

    // Long strings (like real UUIDs) are treated as exact IDs
    if (str && str.length > 10) {
      idMap.set(str, str)
      return str
    }

    // Map shorthand to generated ID
    idMap.set(str, newId)
    return newId
  }
}

function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function generateNumericID(): string {
  return Math.random().toString().slice(2, 12)
}
```

**Validation Checklist**:
- [ ] ID function maps shorthand to generated IDs
- [ ] Existing mappings are returned correctly
- [ ] Exact mode returns IDs without creating mappings
- [ ] UUIDs and numeric IDs generate correctly
- [ ] Long strings (>10 chars) are treated as exact IDs
- [ ] Log mode outputs ID map correctly

#### 2.2: Helper Functions

**File**: `src/generators/helpers.ts`

**Template**:
```typescript
import { faker } from '@faker-js/faker'

// Timestamp Generation
export function generateRandomTimestamp(): string {
  return faker.date.recent({ days: 365 }).toISOString()
}

export function generateRandomDate(options: { min?: number; max?: number; startDate?: string }): string {
  const { min = -12, max = 0, startDate } = options
  if (startDate) {
    const date = new Date(startDate)
    date.setMonth(date.getMonth() + faker.number.int({ min, max }))
    return date.toISOString().split('T')[0] // Return date only (YYYY-MM-DD)
  }
  return faker.date.recent({ days: 365 }).toISOString().split('T')[0]
}

export function generateRandomDateTime(options: { min?: number; max?: number; startDate?: string }): string {
  const { min = -12, max = 0, startDate } = options
  if (startDate) {
    const date = new Date(startDate)
    date.setMonth(date.getMonth() + faker.number.int({ min, max }))
    return date.toISOString()
  }
  return faker.date.recent({ days: 365 }).toISOString()
}

// Domain-specific helpers
export function generateUniqueEmail(firstName?: string, lastName?: string): string {
  const random = faker.string.alphanumeric(6)
  if (firstName && lastName) {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${random}@example.com`
  }
  return faker.internet.email()
}

export function generatePhoneNumber(): string {
  return faker.phone.number()
}

export function generateRandomWords(count: number = 1): string {
  return Array.from({ length: count }, () => faker.word.sample()).join(' ')
}

// Add project-specific helpers as needed
```

**Validation Checklist**:
- [ ] All timestamp functions return valid ISO strings
- [ ] Date functions handle startDate parameter correctly
- [ ] Domain-specific helpers generate realistic data
- [ ] All functions are pure (no side effects)
- [ ] Email generation creates unique emails when names provided

#### 2.3: Index Utilities

**File**: `src/test-context/indexUtils.ts`

**Template**:
```typescript
/**
 * Creates an index object from an array using a single key field.
 */
export function indexByKey<T extends Record<string, unknown>>(
  array: T[] | undefined,
  key: string = '_id'
): Record<string, T> {
  if (!array) return {} as Record<string, T>
  return array.reduce(
    (prev, current) => {
      const keyValue = String(current[key])
      return {
        ...prev,
        [keyValue]: current,
      }
    },
    {} as Record<string, T>
  )
}

/**
 * Creates an index object from an array using composite keys.
 */
export function indexByCompositeKey<T extends Record<string, unknown>>(
  array: T[] | undefined,
  keys: string[]
): Record<string, T> {
  if (!array) return {} as Record<string, T>
  return array.reduce((prev, current) => {
    const keyValues = keys.map(k => String(current[k])).join(':')
    return {
      ...prev,
      [keyValues]: current,
    }
  }, {} as Record<string, T>)
}

/**
 * Groups array items by a key field, creating arrays for each key value.
 */
export function groupByKey<T extends Record<string, unknown>>(
  array: T[] | undefined,
  key: string = '_id'
): Record<string, T[]> {
  if (!array) return {} as Record<string, T[]>
  return array.reduce((obj, item) => {
    const keyValue = String(item[key])
    if (!obj[keyValue]) {
      obj[keyValue] = []
    }
    obj[keyValue].push(item)
    return obj
  }, {} as Record<string, T[]>)
}
```

**Validation Checklist**:
- [ ] `indexByKey` creates correct single-key indexes
- [ ] `indexByCompositeKey` creates correct composite-key indexes
- [ ] `groupByKey` groups items correctly
- [ ] All functions handle undefined arrays gracefully
- [ ] Key values converted to strings correctly

### Phase 3: Create Type Definitions

**File**: `src/test-context/types.ts`

**Template Structure**:
```typescript
// Entity type definitions (match your database schema)
export type dbEntityName = {
  entityId: string // UUID, Primary Key
  // ... all fields from your schema
  insertTimestamp: string // Timestamp (ISO string)
  updateTimestamp: string // Timestamp (ISO string)
  upsertByUserId?: string | null // UUID
}

// Partial types for generator options (include shorthand ID fields)
export type EntityNamePartial = Partial<dbEntityName> & {
  entityId?: string // Shorthand ID field
  // Add any additional convenience fields (e.g., password for users)
}

// Generated data structure
export type GeneratedTableArrays = {
  entity1s: dbEntity1[]
  entity2s: dbEntity2[]
  // ... all entity arrays
}

// Partial structure for bulkAdd
export type GeneratedTableArraysPartials = {
  entity1s?: Entity1Partial[]
  entity2s?: Entity2Partial[]
  // ... all entity partial arrays
}

// DataGenObject for TestContext
export type DataGenObject = Partial<GeneratedTableArraysPartials>

// TestUser type (if using Firebase Auth)
export type TestUser = {
  userId: string
  displayName: string
  email: string
  password: string
  photoURL?: string
}
```

**Checklist**:
- [ ] Create `db[EntityName]` type for each entity (matches database schema)
- [ ] Create `[EntityName]Partial` type for each entity (extends Partial with shorthand ID fields)
- [ ] Add convenience fields to Partial types (e.g., `password` for PersonPartial)
- [ ] Create `GeneratedTableArrays` interface with arrays for all entities
- [ ] Create `GeneratedTableArraysPartials` type for bulk operations
- [ ] Create `DataGenObject` type for TestContext usage
- [ ] Add `TestUser` type if using Firebase Auth
- [ ] Ensure all timestamp fields use ISO string format
- [ ] Ensure all UUID fields are strings

### Phase 4: Implement Entity Generators

**For Each Entity in Dependency Order**:

#### Pattern 1: Simple Entity (No Foreign Keys)

**File**: `src/generators/[entity-name].ts`

**Template**:
```typescript
import { faker } from '@faker-js/faker'
import type { dbEntityName, EntityNamePartial } from '../test-context/types'
import { IdProvider } from '../test-context/IdProvider'
import { generateRandomTimestamp } from './helpers'

/**
 * Generator for EntityName entity
 */
export function generateEntityName(
  options: EntityNamePartial = {},
  ID: ReturnType<typeof IdProvider> = IdProvider()
): dbEntityName {
  const entityId = ID(options.entityId)

  const entity: dbEntityName = {
    entityId,
    name: options.name ?? faker.company.name(),
    description: options.description !== undefined ? options.description : null,
    insertTimestamp: options.insertTimestamp ?? generateRandomTimestamp(),
    updateTimestamp: options.updateTimestamp ?? generateRandomTimestamp(),
    upsertByUserId: options.upsertByUserId ?? null,
  }

  return entity
}
```

**Validation Checklist**:
- [ ] Function signature matches template
- [ ] Primary key resolved using ID provider
- [ ] All required fields have defaults from faker
- [ ] Optional fields check for `undefined` (not falsy)
- [ ] Returns generated entity
- [ ] Timestamps use helper functions

#### Pattern 2: Entity with Foreign Keys

**Template**:
```typescript
export function generateEntityName(
  options: EntityNamePartial = {},
  ID: ReturnType<typeof IdProvider> = IdProvider()
): dbEntityName {
  if (!options.parentId) {
    throw new Error('generateEntityName requires parentId in options')
  }
  
  const entityId = ID(options.entityId)
  const resolvedParentId = ID(options.parentId)
  
  const entity: dbEntityName = {
    entityId,
    parentId: resolvedParentId,
    // ... other fields
  }

  return entity
}
```

**Validation Checklist**:
- [ ] Foreign keys validated (throw error if missing)
- [ ] Foreign keys resolved through ID provider
- [ ] Shorthand IDs work correctly
- [ ] All dependencies satisfied

#### Pattern 3: Entity with Multiple Output Arrays

**Template** (e.g., Person + Firebase User):
```typescript
import type { TestUser } from '../test-context/types'

export function generatePerson(
  ID: ReturnType<typeof IdProvider> = IdProvider(),
  options: PersonPartial = {}
): { person: dbPerson; firebaseUser?: TestUser } {
  const personId = ID(options.personId)

  const firstName = options.name?.split(' ')[0] ?? faker.person.firstName()
  const lastName = options.name?.split(' ')[1] ?? faker.person.lastName()
  const fullName = options.name ?? faker.person.fullName({ firstName, lastName })
  const email = options.email ?? generateUniqueEmail(firstName, lastName)

  const person: dbPerson = {
    personId,
    name: fullName,
    email,
    authUserId: options.authUserId ?? null,
    // ... other fields
  }

  // Generate Firebase user only if password is explicitly provided
  let firebaseUser: TestUser | undefined
  if (options.password !== undefined) {
    const authUserId = options.authUserId ? ID(options.authUserId) : personId
    firebaseUser = {
      userId: authUserId,
      displayName: fullName,
      email,
      password: options.password,
      photoURL: options.photoURL,
    }
    person.authUserId = authUserId
  } else if (options.authUserId !== undefined && options.authUserId !== null) {
    // If authUserId is explicitly set but no password, link to existing auth user
    person.authUserId = ID(options.authUserId)
  }

  return { person, firebaseUser }
}
```

**Validation Checklist**:
- [ ] Multiple entities generated correctly
- [ ] Firebase user created only when password provided
- [ ] authUserId linked correctly
- [ ] Returns both entities in object

#### Pattern 4: Composite Key Entity

**Template**:
```typescript
export function generateCompositeEntity(
  options: CompositeEntityPartial = {},
  ID: ReturnType<typeof IdProvider> = IdProvider()
): dbCompositeEntity {
  if (!options.key1Id || !options.key2Id) {
    throw new Error('generateCompositeEntity requires key1Id and key2Id in options')
  }
  
  const resolvedKey1 = ID(options.key1Id)
  const resolvedKey2 = ID(options.key2Id)

  const entity: dbCompositeEntity = {
    key1Id: resolvedKey1,
    key2Id: resolvedKey2,
    // ... other fields
  }

  return entity
}
```

**Validation Checklist**:
- [ ] Both composite keys validated
- [ ] Both composite keys resolved through ID provider
- [ ] Error thrown if required keys missing
- [ ] Entity structure matches database schema

#### Pattern 5: Nested Entity (Stored Separately)

**Template** (e.g., Role stored separately but nested in Community):
```typescript
export function generateRole(
  options: RolePartial = {},
  ID: ReturnType<typeof IdProvider> = IdProvider()
): dbRole {
  if (!options.communityId) {
    throw new Error('generateRole requires communityId in options')
  }
  
  const roleId = ID(options.roleId)
  const resolvedCommunityId = ID(options.communityId)

  const role: dbRole = {
    roleId,
    communityId: resolvedCommunityId,
    name: options.name ?? faker.person.jobTitle(),
    description: options.description ?? faker.lorem.sentence(),
    archived: options.archived ?? null,
  }

  return role
}
```

**Validation Checklist**:
- [ ] Parent foreign key validated
- [ ] Parent foreign key resolved through ID provider
- [ ] Entity can be stitched into parent in Scenario.build()

**Generator Export Checklist**:
- [ ] All generators exported from `src/generators/index.ts`
- [ ] Export names match function names
- [ ] Types exported if needed

### Phase 5: Implement Scenario

**File**: `src/test-context/Scenario.ts`

**Template**:
```typescript
import { Selector } from './Selector'
import { IdProvider } from './IdProvider'
import type { GeneratedTableArrays, GeneratedTableArraysPartials, TestUser } from './types'

// Import generators directly
import { generateEntity1 } from '../generators/entity1'
import { generateEntity2 } from '../generators/entity2'
// ... import all generators

export class Scenario {
  readonly ID: ReturnType<typeof IdProvider>
  private data: GeneratedTableArrays = {
    // Initialize arrays for all entities in dependency order
    entity1s: [],
    entity2s: [],
    // ... all entity arrays
  }
  private firebaseUsers: TestUser[] = []

  constructor(idProvider: ReturnType<typeof IdProvider>) {
    if (!idProvider) {
      throw new Error('Scenario constructor requires an IdProvider instance')
    }
    this.ID = idProvider
  }

  /**
   * Bulk add multiple entities with automatic dependency ordering
   *
   * Dependency order:
   * 1. Nested entities (roles, labels, prospectStatuses) - generated first
   * 2. Independent entities (communities, persons)
   * 3. Entities depending on independent entities (events)
   * 4. Composite key entities (communityAdmins)
   * 5. Relationship entities (personEventRelationships)
   * 6. Notes and other dependent entities
   */
  bulkAdd(data: Partial<GeneratedTableArraysPartials>) {
    const ID = this.ID

    // 1. Generate nested entities first (they reference parentId)
    if (data.nestedEntities) {
      data.nestedEntities.forEach(opt => {
        const nested = generateNestedEntity(opt as any, ID)
        this.data.nestedEntities.push(nested)
      })
    }

    // 2. Generate independent entities
    if (data.entity1s) {
      data.entity1s.forEach(opt => {
        const entity = generateEntity1(opt as any, ID)
        this.data.entity1s.push(entity)
      })
    }

    // 3. Entities depending on independent entities
    if (data.entity2s) {
      data.entity2s.forEach(opt => {
        const entity = generateEntity2(opt as any, ID)
        this.data.entity2s.push(entity)
      })
    }

    // 4. Entities with multiple outputs (e.g., Person + Firebase User)
    if (data.persons) {
      data.persons.forEach(opt => {
        const { person, firebaseUser } = generatePerson(ID, opt as any)
        this.data.persons.push(person)
        if (firebaseUser) {
          this.firebaseUsers.push(firebaseUser)
        }
      })
    }

    // 5. Composite key entities
    if (data.compositeEntities) {
      data.compositeEntities.forEach(opt => {
        const entity = generateCompositeEntity(opt as any, ID)
        this.data.compositeEntities.push(entity)
      })
    }

    return this
  }

  /**
   * Build and return Selector for data access
   * Stitches nested entities into parents if applicable
   */
  build(): Selector {
    // Stitch nested entities into parents
    this.data.parentEntities?.forEach(parent => {
      parent.nestedEntities = this.data.nestedEntities.filter(
        nested => nested.parentId === parent.parentId
      )
      
      // Ensure business rules (e.g., at least one default status)
      if (parent.nestedEntities.length === 0) {
        // Create default nested entity
        const defaultNested = generateNestedEntity(
          { parentId: parent.parentId, isDefault: true },
          this.ID
        )
        this.data.nestedEntities.push(defaultNested)
        parent.nestedEntities = [defaultNested]
      }
    })

    return new Selector(this.data, this.ID, this.firebaseUsers)
  }

  /**
   * Get access to ID provider
   */
  getIdProvider(): ReturnType<typeof IdProvider> {
    return this.ID
  }
}
```

**Validation Checklist**:
- [ ] All entity arrays initialized in `data` property
- [ ] Constructor validates IdProvider is provided
- [ ] `bulkAdd` processes entities in strict dependency order
- [ ] Entities with multiple outputs handled correctly
- [ ] `build()` stitches nested entities if applicable
- [ ] `build()` ensures business rules (e.g., default status)
- [ ] `build()` returns Selector instance
- [ ] ID provider accessible via `getIdProvider()`

### Phase 6: Implement Selector

**File**: `src/test-context/Selector.ts`

**Template**:
```typescript
import type { IdProvider } from './IdProvider'
import type { GeneratedTableArrays, dbEntity1, dbEntity2, TestUser } from './types'
import { indexByKey, indexByCompositeKey, groupByKey } from './indexUtils'

export class Selector {
  data: GeneratedTableArrays
  private idProvider?: ReturnType<typeof IdProvider>
  private firebaseUsers: TestUser[]

  // Pre-computed indexes for direct access
  readonly entity1s: Record<string, dbEntity1>
  readonly entity2s: Record<string, dbEntity2>
  readonly firebaseUsersById: Record<string, TestUser>

  // Relationship indexes
  readonly entity2sByEntity1Id: Record<string, dbEntity2[]>
  readonly compositeEntitiesByKey1: Record<string, dbCompositeEntity[]>

  constructor(
    data: GeneratedTableArrays,
    idProvider?: ReturnType<typeof IdProvider>,
    firebaseUsers: TestUser[] = []
  ) {
    this.data = { ...data }
    this.idProvider = idProvider
    this.firebaseUsers = firebaseUsers

    // Build direct access indexes
    this.entity1s = indexByKey(this.data.entity1s, 'entity1Id')
    this.entity2s = indexByKey(this.data.entity2s, 'entity2Id')
    this.firebaseUsersById = indexByKey(this.firebaseUsers, 'userId')

    // Build composite key indexes
    this.compositeEntities = indexByCompositeKey(
      this.data.compositeEntities,
      ['key1Id', 'key2Id']
    )

    // Build relationship indexes
    this.entity2sByEntity1Id = groupByKey(this.data.entity2s, 'entity1Id')
    this.compositeEntitiesByKey1 = groupByKey(
      this.data.compositeEntities,
      'key1Id'
    )
  }

  /**
   * Resolve shorthand ID to real database ID
   */
  private resolveId(id: string): string {
    return this.idProvider ? this.idProvider(id, { exact: true }) : id
  }

  /**
   * Direct access methods with ID resolution
   */
  getEntity1(id: string): dbEntity1 | undefined {
    const resolvedId = this.resolveId(id)
    return this.entity1s[resolvedId]
  }

  getEntity2(id: string): dbEntity2 | undefined {
    const resolvedId = this.resolveId(id)
    return this.entity2s[resolvedId]
  }

  /**
   * Composite key access
   */
  getCompositeEntity(key1Id: string, key2Id: string): dbCompositeEntity | undefined {
    const resolvedKey1 = this.resolveId(key1Id)
    const resolvedKey2 = this.resolveId(key2Id)
    const key = `${resolvedKey1}:${resolvedKey2}`
    return this.compositeEntities[key]
  }

  /**
   * Relationship traversal methods
   */
  getEntity2sByEntity1(entity1Id: string): dbEntity2[] {
    const resolvedId = this.resolveId(entity1Id)
    return this.entity2sByEntity1Id[resolvedId] || []
  }

  /**
   * Get all Firebase users in the scenario
   */
  allFirebaseUsers(): TestUser[] {
    return this.firebaseUsers
  }

  /**
   * Get Firebase user by ID (shorthand or full)
   */
  getFirebaseUser(userId: string): TestUser | undefined {
    const resolvedId = this.resolveId(userId)
    return this.firebaseUsersById[resolvedId]
  }

  /**
   * Get raw data for database operations
   */
  getRawTestData(): GeneratedTableArrays {
    return this.data
  }
}
```

**Validation Checklist**:
- [ ] Constructor accepts data, idProvider, and optional firebaseUsers
- [ ] Pre-compute all direct access indexes using `indexByKey`
- [ ] Pre-compute composite key indexes using `indexByCompositeKey`
- [ ] Pre-compute relationship indexes using `groupByKey`
- [ ] Implement ID resolution helper
- [ ] Create getter methods for all entities
- [ ] Create relationship traversal methods
- [ ] Export `getRawTestData()` for database operations
- [ ] Handle Firebase users if applicable
- [ ] All getter methods resolve shorthand IDs

### Phase 7: Implement DataMerger

**File**: `src/test-context/DataMerger.ts`

**Template**:
```typescript
import type { DataGenObject } from './types'

/**
 * Merges base data with test-specific data using key-based override logic.
 *
 * For entities with matching primary keys, testData overrides baseData:
 * - Single key entities: match on primary key field (entityId, etc.)
 * - Composite key entities: match on composite keys
 *
 * Non-matching entities from both arrays are preserved.
 */
export function mergeData(baseData: DataGenObject, testData: DataGenObject): DataGenObject {
  const merged: DataGenObject = { ...baseData }

  Object.keys(testData).forEach(key => {
    const testKey = key as keyof DataGenObject
    const baseValue = baseData[testKey]
    const testValue = testData[testKey]

    if (Array.isArray(baseValue) && Array.isArray(testValue)) {
      // Merge arrays with smart key matching - testData overrides baseData
      merged[testKey] = mergeArrayByKey(
        baseValue as Record<string, unknown>[],
        testValue as Record<string, unknown>[],
        key
      ) as unknown as DataGenObject[typeof testKey]
    } else if (testValue !== undefined) {
      merged[testKey] = testValue
    }
  })

  return merged
}

function mergeArrayByKey<T extends Record<string, unknown>>(
  baseArray: T[],
  testArray: T[],
  entityType: string
): T[] {
  const result = [...baseArray]

  testArray.forEach(testItem => {
    const existingIndex = findMatchingIndex(result, testItem, entityType)

    if (existingIndex !== -1) {
      // Replace existing item with test item (testData overrides baseData)
      result[existingIndex] = testItem
    } else {
      // Add new item
      result.push(testItem)
    }
  })

  return result
}

function findMatchingIndex<T extends Record<string, unknown>>(
  array: T[],
  item: T,
  entityType: string
): number {
  return array.findIndex(arrayItem => {
    switch (entityType) {
      case 'compositeEntities':
        return arrayItem.key1Id === item.key1Id && arrayItem.key2Id === item.key2Id
      case 'entity1s':
        return arrayItem.entity1Id === item.entity1Id
      case 'entity2s':
        return arrayItem.entity2Id === item.entity2Id
      // ... add cases for all entity types
      default:
        // Fallback: try common primary key fields
        if (item.entity1Id) return arrayItem.entity1Id === item.entity1Id
        if (item.entity2Id) return arrayItem.entity2Id === item.entity2Id
        return false
    }
  })
}
```

**Validation Checklist**:
- [ ] Merges arrays correctly with key matching
- [ ] Handles single-key entities
- [ ] Handles composite-key entities
- [ ] TestData overrides baseData for matching keys
- [ ] Non-matching entities preserved from both arrays
- [ ] Switch statement includes all entity types
- [ ] Fallback logic handles unknown entity types

### Phase 7.5: Define Database Abstraction Interfaces ⚠️ REQUIRED FOR DB-AGNOSTIC DESIGN

**⚠️ CRITICAL**: This phase MUST be completed BEFORE Phase 8 (DatabaseAdapter implementation). Create this file FIRST, then implement the adapter.

**File**: `src/database/types.ts`

**Purpose**: Define database-agnostic interfaces that all database adapters must implement. **This phase is CRITICAL** - it ensures your implementation works with any database (Firestore, PostgreSQL, MongoDB, etc.) without code changes.

**⚠️ IMPORTANT**: You MUST create this file BEFORE implementing DatabaseAdapter. All other modules (DatabaseReader, TestContext) will use these interfaces instead of concrete database types.

**When to create**: Create this file immediately after Phase 7 (DataMerger), before starting Phase 8 (DatabaseAdapter).

**Template**:
```typescript
import type { GeneratedTableArrays } from '../test-context/types'

/**
 * Database-agnostic interface for read operations
 * Implementations should provide database-specific read methods
 */
export interface DatabaseReadOperations {
  /**
   * Read a single document by collection/table name and ID
   */
  readDocument<T>(collection: string, docId: string): Promise<T | null>

  /**
   * Read multiple documents matching a query
   * For SQL: WHERE field = value
   * For NoSQL: where(field, '==', value)
   */
  readDocumentsByField<T>(
    collection: string,
    field: string,
    value: unknown
  ): Promise<T[]>

  /**
   * Get the underlying database client for advanced operations
   * Return type depends on database (Firestore, Pool, MongoClient, etc.)
   */
  getDatabaseClient(): unknown
}

/**
 * Database-agnostic interface for write operations
 * Implementations should provide database-specific write methods
 */
export interface DatabaseWriteOperations {
  /**
   * Upsert a single document
   */
  upsertDocument(collection: string, docId: string, data: unknown): Promise<void>

  /**
   * Delete a single document
   */
  deleteDocument(collection: string, docId: string): Promise<void>

  /**
   * Get maximum batch size for this database
   */
  getMaxBatchSize(): number
}

/**
 * Complete database adapter interface
 * All database adapters must implement both read and write operations
 */
export interface DatabaseAdapter extends DatabaseReadOperations, DatabaseWriteOperations {
  /**
   * Upsert all generated test data in dependency order
   */
  upsertGeneratedData(data: GeneratedTableArrays): Promise<void>

  /**
   * Delete all generated test data in reverse dependency order
   */
  deleteGeneratedData(data: GeneratedTableArrays): Promise<void>
}
```

**Validation Checklist**:
- [ ] Interface defines all required read operations
- [ ] Interface defines all required write operations
- [ ] `getDatabaseClient()` returns database-specific client
- [ ] `getMaxBatchSize()` returns appropriate limit for database
- [ ] File is created BEFORE implementing DatabaseAdapter
- [ ] All interfaces exported for use in other modules

**⚠️ CRITICAL**: After creating this file, you MUST update:
1. DatabaseReader to use `DatabaseReadOperations` interface (not concrete database type)
2. TestContext to use `DatabaseAdapter` interface (not concrete adapter class)
3. DatabaseAdapter implementation to `implements DatabaseAdapter`

**⚠️ IMPORTANT NOTE**: 
- **Interface methods** (`readDocument`, `readDocumentsByField`, `upsertDocument`, `deleteDocument`) are for **single operations** and should be DB-agnostic
- **Batch operations** (`upsertGeneratedData`, `deleteGeneratedData`) can use database-specific features:
  - **Firestore**: Use `this.db.batch()` for batch writes (limit: 500 operations)
  - **PostgreSQL**: Use transactions (`BEGIN`/`COMMIT`) for batch operations
  - **MongoDB**: Use sessions with transactions for batch operations
- If you need advanced database-specific operations elsewhere, access them through `getDatabaseClient()` and cast to the appropriate type
- **CRITICAL**: Always prefer interface methods when possible to maintain DB-agnostic design

### Phase 8: Implement DatabaseAdapter

**⚠️ IMPORTANT**: Your DatabaseAdapter class MUST implement the `DatabaseAdapter` interface from `src/database/types.ts`. Do NOT use concrete database types in DatabaseReader or TestContext.

**File**: `src/database/adapter.ts`

**Choose ONE implementation based on your database:**

#### Option 1: Firestore Implementation

**⚠️ CRITICAL**: This class MUST `implements DatabaseAdapter` from `./types`. Do NOT skip this!

```typescript
import type { GeneratedTableArrays } from '../test-context/types'
import type { DatabaseAdapter as IDatabaseAdapter } from './types'
import type { Firestore } from 'firebase-admin/firestore'

/**
 * Firestore implementation of DatabaseAdapter
 * Implements the database-agnostic interface for Firestore operations
 * 
 * ⚠️ REQUIRED: This class MUST implement DatabaseAdapter interface from './types'
 */
export default class FirestoreAdapter implements IDatabaseAdapter {
  private db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  /**
   * Implements DatabaseReadOperations.getDatabaseClient
   * Returns the underlying Firestore instance for advanced operations
   */
  getDatabaseClient(): Firestore {
    return this.db
  }

  getMaxBatchSize(): number {
    return 500 // Firestore batch limit
  }

  /**
   * Implements DatabaseReadOperations.readDocument
   */
  async readDocument<T>(collection: string, docId: string): Promise<T | null> {
    const doc = await this.db.collection(collection).doc(docId).get()
    if (!doc.exists) {
      return null
    }
    return doc.data() as T
  }

  /**
   * Implements DatabaseReadOperations.readDocumentsByField
   */
  async readDocumentsByField<T>(
    collection: string,
    field: string,
    value: unknown
  ): Promise<T[]> {
    const snapshot = await this.db.collection(collection).where(field, '==', value).get()
    return snapshot.docs.map(doc => doc.data() as T)
  }

  /**
   * Implements DatabaseWriteOperations.upsertDocument
   */
  async upsertDocument(collection: string, docId: string, data: unknown): Promise<void> {
    await this.db.collection(collection).doc(docId).set(data)
  }

  /**
   * Implements DatabaseWriteOperations.deleteDocument
   */
  async deleteDocument(collection: string, docId: string): Promise<void> {
    await this.db.collection(collection).doc(docId).delete()
  }

  async upsertGeneratedData(data: GeneratedTableArrays): Promise<void> {
    const MAX_BATCH_SIZE = this.getMaxBatchSize()
    let batch = this.db.batch()
    let operationCount = 0

    const commitBatch = async () => {
      if (operationCount > 0) {
        await batch.commit()
        batch = this.db.batch()
        operationCount = 0
      }
    }

    const addToBatch = async (collection: string, docId: string, docData: any) => {
      if (operationCount >= MAX_BATCH_SIZE) {
        await commitBatch()
      }
      const ref = this.db.collection(collection).doc(docId)
      batch.set(ref, docData)
      operationCount++
    }

    // Process in dependency order (same as Scenario.bulkAdd)
    // 1. Independent entities
    if (data.entity1s?.length) {
      for (const entity of data.entity1s) {
        await addToBatch('entity1s', entity.entity1Id, entity)
      }
    }

    // 2. Nested entities (stored separately)
    if (data.nestedEntities?.length) {
      for (const nested of data.nestedEntities) {
        await addToBatch('nestedEntities', nested.nestedId, nested)
      }
    }

    // 3. Dependent entities
    if (data.entity2s?.length) {
      for (const entity of data.entity2s) {
        await addToBatch('entity2s', entity.entity2Id, entity)
      }
    }

    // 4. Composite key entities
    if (data.compositeEntities?.length) {
      for (const entity of data.compositeEntities) {
        const docId = `${entity.key1Id}:${entity.key2Id}`
        await addToBatch('compositeEntities', docId, entity)
      }
    }

    await commitBatch()
  }

  async deleteGeneratedData(data: GeneratedTableArrays): Promise<void> {
    const MAX_BATCH_SIZE = this.getMaxBatchSize()
    let batch = this.db.batch()
    let operationCount = 0

    const commitBatch = async () => {
      if (operationCount > 0) {
        await batch.commit()
        batch = this.db.batch()
        operationCount = 0
      }
    }

    const deleteFromBatch = async (collection: string, docId: string) => {
      if (operationCount >= MAX_BATCH_SIZE) {
        await commitBatch()
      }
      const ref = this.db.collection(collection).doc(docId)
      batch.delete(ref)
      operationCount++
    }

    // Delete in reverse dependency order
    if (data.compositeEntities?.length) {
      for (const entity of data.compositeEntities) {
        const docId = `${entity.key1Id}:${entity.key2Id}`
        await deleteFromBatch('compositeEntities', docId)
      }
    }
    if (data.entity2s?.length) {
      for (const entity of data.entity2s) {
        await deleteFromBatch('entity2s', entity.entity2Id)
      }
    }
    if (data.nestedEntities?.length) {
      for (const nested of data.nestedEntities) {
        await deleteFromBatch('nestedEntities', nested.nestedId)
      }
    }
    if (data.entity1s?.length) {
      for (const entity of data.entity1s) {
        await deleteFromBatch('entity1s', entity.entity1Id)
      }
    }

    await commitBatch()
  }
}
```

#### Option 2: PostgreSQL Implementation

```typescript
import type { GeneratedTableArrays } from '../test-context/types'
import type { DatabaseAdapter as IDatabaseAdapter } from './types'
import type { Pool } from 'pg'

export default class PostgresAdapter implements IDatabaseAdapter {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  /**
   * Implements DatabaseReadOperations.getDatabaseClient
   * Returns the underlying PostgreSQL Pool instance for advanced operations
   */
  getDatabaseClient(): Pool {
    return this.pool
  }

  getMaxBatchSize(): number {
    return 1000 // PostgreSQL can handle larger batches
  }

  async readDocument<T>(table: string, docId: string): Promise<T | null> {
    const primaryKey = this.getPrimaryKey(table)
    const result = await this.pool.query(
      `SELECT * FROM ${table} WHERE ${primaryKey} = $1`,
      [docId]
    )
    return result.rows[0] as T || null
  }

  async readDocumentsByField<T>(
    table: string,
    field: string,
    value: unknown
  ): Promise<T[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${table} WHERE ${field} = $1`,
      [value]
    )
    return result.rows as T[]
  }

  async upsertDocument(table: string, docId: string, data: unknown): Promise<void> {
    const primaryKey = this.getPrimaryKey(table)
    const dataRecord = data as Record<string, unknown>
    const columns = Object.keys(dataRecord)
    const values = Object.values(dataRecord)
    
    // Build SET clause for UPDATE (exclude primary key from SET clause)
    const setClause = columns
      .filter(col => col !== primaryKey)
      .map((col, i) => `${col} = $${i + 2}`) // Start from $2 since $1 is docId
      .join(', ')
    
    // Build VALUES clause for INSERT
    const insertColumns = [primaryKey, ...columns.filter(col => col !== primaryKey)]
    const insertPlaceholders = insertColumns.map((_, i) => `$${i + 1}`).join(', ')
    const insertValues = [docId, ...values.filter((_, i) => columns[i] !== primaryKey)]

    await this.pool.query(
      `INSERT INTO ${table} (${insertColumns.join(', ')}) 
       VALUES (${insertPlaceholders})
       ON CONFLICT (${primaryKey}) DO UPDATE SET ${setClause}`,
      insertValues
    )
  }

  async deleteDocument(table: string, docId: string): Promise<void> {
    const primaryKey = this.getPrimaryKey(table)
    await this.pool.query(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [docId])
  }

  async upsertGeneratedData(data: GeneratedTableArrays): Promise<void> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')

      // Process in dependency order (same as Scenario.bulkAdd)
      // 1. Independent entities first
      if (data.entity1s?.length) {
        for (const entity of data.entity1s) {
          await this.upsertDocument('entity1s', entity.entity1Id, entity)
        }
      }
      if (data.entity2s?.length) {
        for (const entity of data.entity2s) {
          await this.upsertDocument('entity2s', entity.entity2Id, entity)
        }
      }
      
      // 2. Nested entities (stored separately but referenced by parent)
      if (data.nestedEntities?.length) {
        for (const nested of data.nestedEntities) {
          await this.upsertDocument('nestedEntities', nested.nestedId, nested)
        }
      }
      
      // 3. Dependent entities
      if (data.dependentEntities?.length) {
        for (const entity of data.dependentEntities) {
          await this.upsertDocument('dependentEntities', entity.dependentId, entity)
        }
      }
      
      // 4. Composite key entities (use composite key as docId)
      if (data.compositeEntities?.length) {
        for (const entity of data.compositeEntities) {
          const docId = `${entity.key1Id}:${entity.key2Id}`
          await this.upsertDocument('compositeEntities', docId, entity)
        }
      }

      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  async deleteGeneratedData(data: GeneratedTableArrays): Promise<void> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')

      // Delete in reverse dependency order
      // 1. Composite key entities first
      if (data.compositeEntities?.length) {
        for (const entity of data.compositeEntities) {
          const docId = `${entity.key1Id}:${entity.key2Id}`
          await this.deleteDocument('compositeEntities', docId)
        }
      }
      
      // 2. Dependent entities
      if (data.dependentEntities?.length) {
        for (const entity of data.dependentEntities) {
          await this.deleteDocument('dependentEntities', entity.dependentId)
        }
      }
      
      // 3. Nested entities
      if (data.nestedEntities?.length) {
        for (const nested of data.nestedEntities) {
          await this.deleteDocument('nestedEntities', nested.nestedId)
        }
      }
      
      // 4. Independent entities last
      if (data.entity2s?.length) {
        for (const entity of data.entity2s) {
          await this.deleteDocument('entity2s', entity.entity2Id)
        }
      }
      if (data.entity1s?.length) {
        for (const entity of data.entity1s) {
          await this.deleteDocument('entity1s', entity.entity1Id)
        }
      }

      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  private getPrimaryKey(table: string): string {
    // Map table names to primary key column names
    // ⚠️ IMPORTANT: Replace these with your actual table names and primary key columns
    // For composite key tables, you may need to create a generated column or use a composite primary key
    const primaryKeys: Record<string, string> = {
      entity1s: 'entity1Id',
      entity2s: 'entity2Id',
      nestedEntities: 'nestedId',
      dependentEntities: 'dependentId',
      compositeEntities: 'compositeKey', // For composite keys, create a generated column: ALTER TABLE compositeEntities ADD COLUMN compositeKey TEXT GENERATED ALWAYS AS (key1Id || ':' || key2Id) STORED;
      // ... add all your tables here
    }
    return primaryKeys[table] || 'id'
  }
}
```

#### Option 3: MongoDB Implementation

```typescript
import type { GeneratedTableArrays } from '../test-context/types'
import type { DatabaseAdapter as IDatabaseAdapter } from './types'
import type { MongoClient, Db } from 'mongodb'

export default class MongoAdapter implements IDatabaseAdapter {
  private client: MongoClient
  private db: Db

  constructor(client: MongoClient, dbName: string) {
    this.client = client
    this.db = client.db(dbName)
  }

  /**
   * Implements DatabaseReadOperations.getDatabaseClient
   * Returns the underlying MongoClient instance for advanced operations
   */
  getDatabaseClient(): MongoClient {
    return this.client
  }

  getMaxBatchSize(): number {
    return 1000 // MongoDB can handle large batches
  }

  async readDocument<T>(collection: string, docId: string): Promise<T | null> {
    const doc = await this.db.collection(collection).findOne({ _id: docId })
    return doc as T || null
  }

  async readDocumentsByField<T>(
    collection: string,
    field: string,
    value: unknown
  ): Promise<T[]> {
    const docs = await this.db.collection(collection).find({ [field]: value }).toArray()
    return docs as T[]
  }

  async upsertDocument(collection: string, docId: string, data: unknown): Promise<void> {
    await this.db.collection(collection).replaceOne(
      { _id: docId },
      { ...data as Record<string, unknown>, _id: docId },
      { upsert: true }
    )
  }

  async deleteDocument(collection: string, docId: string): Promise<void> {
    await this.db.collection(collection).deleteOne({ _id: docId })
  }

  async upsertGeneratedData(data: GeneratedTableArrays): Promise<void> {
    const session = this.client.startSession()
    try {
      await session.withTransaction(async () => {
        // Process in dependency order (same as Scenario.bulkAdd)
        // 1. Independent entities first
        if (data.entity1s?.length) {
          for (const entity of data.entity1s) {
            await this.upsertDocument('entity1s', entity.entity1Id, entity)
          }
        }
        if (data.entity2s?.length) {
          for (const entity of data.entity2s) {
            await this.upsertDocument('entity2s', entity.entity2Id, entity)
          }
        }
        
        // 2. Nested entities (stored separately but referenced by parent)
        if (data.nestedEntities?.length) {
          for (const nested of data.nestedEntities) {
            await this.upsertDocument('nestedEntities', nested.nestedId, nested)
          }
        }
        
        // 3. Dependent entities
        if (data.dependentEntities?.length) {
          for (const entity of data.dependentEntities) {
            await this.upsertDocument('dependentEntities', entity.dependentId, entity)
          }
        }
        
        // 4. Composite key entities (use composite key as _id)
        if (data.compositeEntities?.length) {
          for (const entity of data.compositeEntities) {
            const docId = `${entity.key1Id}:${entity.key2Id}`
            await this.upsertDocument('compositeEntities', docId, entity)
          }
        }
      })
    } finally {
      await session.endSession()
    }
  }

  async deleteGeneratedData(data: GeneratedTableArrays): Promise<void> {
    const session = this.client.startSession()
    try {
      await session.withTransaction(async () => {
        // Delete in reverse dependency order
        // 1. Composite key entities first
        if (data.compositeEntities?.length) {
          for (const entity of data.compositeEntities) {
            const docId = `${entity.key1Id}:${entity.key2Id}`
            await this.deleteDocument('compositeEntities', docId)
          }
        }
        
        // 2. Dependent entities
        if (data.dependentEntities?.length) {
          for (const entity of data.dependentEntities) {
            await this.deleteDocument('dependentEntities', entity.dependentId)
          }
        }
        
        // 3. Nested entities
        if (data.nestedEntities?.length) {
          for (const nested of data.nestedEntities) {
            await this.deleteDocument('nestedEntities', nested.nestedId)
          }
        }
        
        // 4. Independent entities last
        if (data.entity2s?.length) {
          for (const entity of data.entity2s) {
            await this.deleteDocument('entity2s', entity.entity2Id)
          }
        }
        if (data.entity1s?.length) {
          for (const entity of data.entity1s) {
            await this.deleteDocument('entity1s', entity.entity1Id)
          }
        }
      })
    } finally {
      await session.endSession()
    }
  }
}
```

**⚠️ CRITICAL CUSTOMIZATION NOTE**: 
The adapter templates above use placeholder entity names (`entity1s`, `entity2s`, `compositeEntities`, etc.). You MUST replace these with your actual entity names from your data model:

1. **Replace placeholder entity names** in `upsertGeneratedData()` and `deleteGeneratedData()`:
   - `entity1s` → your actual entity array name (e.g., `communities`, `persons`)
   - `entity2s` → your actual entity array name (e.g., `events`, `notes`)
   - `compositeEntities` → your actual composite key entities (e.g., `communityAdmins`, `personEventRelationships`)
   - `nestedEntities` → your actual nested entities (e.g., `roles`, `labels`, `prospectStatuses`)
   - `dependentEntities` → your actual dependent entities

2. **Replace placeholder table/collection names**:
   - Use the same names as your entity arrays (e.g., `'communities'`, `'persons'`, `'events'`)
   - For PostgreSQL: Use your actual table names
   - For MongoDB/Firestore: Use your actual collection names

3. **Replace placeholder ID field names**:
   - `entity1Id` → your actual ID field (e.g., `communityId`, `personId`)
   - `entity2Id` → your actual ID field (e.g., `eventId`, `noteId`)
   - `key1Id`, `key2Id` → your actual composite key fields (e.g., `personId`, `communityId`)

4. **For PostgreSQL**: Update `getPrimaryKey()` method with your actual table names and primary key columns

5. **Follow dependency order**: Process entities in the same order as `Scenario.bulkAdd()` processes them

**Example**: If your entities are `communities`, `persons`, `events`, `communityAdmins`:
```typescript
// In upsertGeneratedData:
if (data.communities?.length) {
  for (const community of data.communities) {
    await this.upsertDocument('communities', community.communityId, community)
  }
}
if (data.persons?.length) {
  for (const person of data.persons) {
    await this.upsertDocument('persons', person.personId, person)
  }
}
// ... etc for all your entities
```

**Validation Checklist**:
- [ ] Implements `DatabaseAdapter` interface
- [ ] Constructor accepts database client instance
- [ ] `getDatabaseClient()` returns database-specific client
- [ ] `getMaxBatchSize()` returns appropriate limit
- [ ] `readDocument` returns null for non-existent documents
- [ ] `readDocumentsByField` returns array of matching documents
- [ ] `upsertDocument` creates or updates documents
- [ ] `deleteDocument` removes documents
- [ ] `upsertGeneratedData` processes in dependency order (matches Scenario.bulkAdd order)
- [ ] `deleteGeneratedData` deletes in reverse dependency order
- [ ] **All placeholder entity names replaced with actual entity names**
- [ ] **All placeholder table/collection names replaced with actual names**
- [ ] **All placeholder ID fields replaced with actual ID fields**
- [ ] Batch operations respect database limits
- [ ] Composite keys formatted correctly for database (`key1:key2`)
- [ ] Transactions used where appropriate (PostgreSQL, MongoDB)
- [ ] Error handling for all operations

### Phase 9: Implement DatabaseReader

**File**: `src/test-context/DatabaseReader.ts`

**⚠️ CRITICAL**: DatabaseReader MUST use `DatabaseReadOperations` interface (from `src/database/types.ts`), NOT a concrete database type like `Firestore`. This ensures DB-agnostic design.

**⚠️ DO NOT**: Import concrete database types (e.g., `import type { Firestore } from 'firebase-admin/firestore'`)
**✅ DO**: Import and use `DatabaseReadOperations` interface from `../database/types`

**Template**:
```typescript
import type { GeneratedTableArrays, dbEntity1, dbEntity2, dbParentEntity, dbNestedEntity, dbCompositeEntity } from './types'
import type { IdProvider } from './IdProvider'
import type { DatabaseReadOperations } from '../database/types'

/**
 * ⚠️ CRITICAL: Uses DatabaseReadOperations interface (NOT concrete database type)
 * This ensures DatabaseReader works with any database implementation
 */
export class DatabaseReader {
  private db: DatabaseReadOperations
  private idProvider?: ReturnType<typeof IdProvider>

  /**
   * Constructor accepts DatabaseReadOperations interface (not concrete database type)
   * This ensures DatabaseReader works with any database implementation
   * 
   * ⚠️ DO NOT: Accept Firestore, Pool, MongoClient, etc. directly
   * ✅ DO: Accept DatabaseReadOperations interface
   */
  constructor(db: DatabaseReadOperations, idProvider?: ReturnType<typeof IdProvider>) {
    this.db = db
    this.idProvider = idProvider
  }

  /**
   * Resolve shorthand ID to real database ID (if idProvider available)
   */
  private resolveId(id: string): string {
    if (this.idProvider) {
      return this.idProvider(id, { exact: true })
    }
    return id
  }

  /**
   * Direct read methods
   */
  async getEntity1(entity1Id: string): Promise<dbEntity1 | null> {
    return this.db.readDocument<dbEntity1>('entity1s', entity1Id)
  }

  /**
   * Reads entity with nested entities stitched together
   */
  async getParentEntity(parentId: string): Promise<dbParentEntity | null> {
    const parent = await this.db.readDocument<dbParentEntity>('parentEntities', parentId)
    if (!parent) {
      return null
    }

    // Stitch nested entities from separate collections
    const nestedEntities = await this.db.readDocumentsByField<dbNestedEntity>(
      'nestedEntities',
      'parentId',
      parentId
    )

    parent.nestedEntities = nestedEntities

    return parent
  }

  /**
   * Reads composite key entity
   */
  async getCompositeEntity(key1Id: string, key2Id: string): Promise<dbCompositeEntity | null> {
    const docId = `${key1Id}:${key2Id}`
    return this.db.readDocument<dbCompositeEntity>('compositeEntities', docId)
  }

  /**
   * Retrieve methods - Direct database lookups using short IDs (requires idProvider)
   */
  async retrieveEntity1(shortId: string): Promise<dbEntity1 | null> {
    const entity1Id = this.resolveId(shortId)
    return this.getEntity1(entity1Id)
  }

  async retrieveCompositeEntity(key1ShortId: string, key2ShortId: string): Promise<dbCompositeEntity | null> {
    const key1Id = this.resolveId(key1ShortId)
    const key2Id = this.resolveId(key2ShortId)
    return this.getCompositeEntity(key1Id, key2Id)
  }

  // ... add retrieve methods for all entities
}
```

**Validation Checklist**:
- [ ] Constructor accepts `DatabaseReadOperations` interface (NOT concrete database type like `Firestore`)
- [ ] Constructor accepts optional idProvider
- [ ] ID resolution works correctly
- [ ] Read methods delegate to database adapter's `readDocument` (via interface)
- [ ] Read methods return null for non-existent documents
- [ ] Retrieve methods resolve shorthand IDs
- [ ] Nested entity stitching uses `readDocumentsByField` (via interface)
- [ ] Composite key reads use correct document ID format (`key1:key2`)
- [ ] NO direct database-specific imports (e.g., `import type { Firestore }`)

### Phase 10: Implement AuthManager (Optional - Firebase Projects Only)

**File**: `src/test-context/AuthManager.ts`

**Note**: Only implement this if your project uses Firebase Auth. For other authentication systems, create a similar adapter or skip authentication features.

**Template**:
```typescript
import { Auth } from 'firebase-admin/auth'
import type { TestUser } from './types'
import type { Page } from '@playwright/test'

const DEBUG_PREFIX = '[AuthManager]'

function logError(context: string, error: unknown): void {
  console.error(`${DEBUG_PREFIX} ${context}:`, error)
}

export class AuthManager {
  constructor(private auth: Auth) {
    if (!auth) {
      throw new Error('AuthManager requires a Firebase Auth instance')
    }
  }

  /**
   * Creates a Firebase Auth user
   */
  async createAuthUser(user: TestUser): Promise<string> {
    try {
      // Try to get existing user by email first
      const userRecord = await this.auth.getUserByEmail(user.email)
      return userRecord.uid
    } catch {
      try {
        // Try to create user with specific UID
        const createUserData: {
          uid: string
          email: string
          password: string
          displayName: string
          photoURL?: string
        } = {
          uid: user.userId,
          email: user.email,
          password: user.password,
          displayName: user.displayName,
        }

        if (user.photoURL) {
          createUserData.photoURL = user.photoURL
        }

        const userRecord = await this.auth.createUser(createUserData)
        return userRecord.uid
      } catch (error: unknown) {
        // If user already exists with this UID, get the existing user
        if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/uid-already-exists') {
          const existingUser = await this.auth.getUser(user.userId)
          return existingUser.uid
        }
        logError(`Error creating auth user ${user.email}`, error)
        throw error
      }
    }
  }

  /**
   * Generates a custom token for a Firebase Auth user
   */
  async generateCustomToken(userId: string): Promise<string> {
    try {
      return await this.auth.createCustomToken(userId)
    } catch (error) {
      logError(`Error generating custom token for user ${userId}`, error)
      throw error
    }
  }

  /**
   * Authenticates a user in a Playwright page using Firebase
   */
  async authenticatePage(page: Page, authUser: TestUser): Promise<void> {
    const authEmulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099'
    const customToken = await this.generateCustomToken(authUser.userId)
    const firebaseConfig = this.getFirebaseConfig()

    await page.evaluate(authenticateInPage, {
      config: firebaseConfig,
      token: customToken,
      emulatorHost: authEmulatorHost,
    })
  }

  private getFirebaseConfig(): { apiKey: string; authDomain: string; projectId: string } {
    return {
      apiKey: process.env.VITE_FIREBASE_API_KEY || 'your-api-key',
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'your-project',
    }
  }
}

// Browser-side authentication function (serialized and executed in page context)
async function authenticateInPage({
  config,
  token,
  emulatorHost,
}: {
  config: { apiKey: string; authDomain: string; projectId: string }
  token: string
  emulatorHost: string
}): Promise<void> {
  await loadFirebaseSDKIfNeeded()
  const auth = initializeFirebaseAuth(config, emulatorHost)
  await auth.signInWithCustomToken(token)
}

async function loadFirebaseSDKIfNeeded(): Promise<void> {
  const windowWithFirebase = window as typeof window & { firebase?: unknown }
  if (windowWithFirebase.firebase) {
    return
  }

  return new Promise<void>((resolve, reject) => {
    const script1 = document.createElement('script')
    script1.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
    script1.onload = () => {
      const script2 = document.createElement('script')
      script2.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js'
      script2.onload = () => resolve()
      script2.onerror = reject
      document.head.appendChild(script2)
    }
    script1.onerror = reject
    document.head.appendChild(script1)
  })
}

function initializeFirebaseAuth(
  config: { apiKey: string; authDomain: string; projectId: string },
  emulatorHost: string
): {
  signInWithCustomToken: (token: string) => Promise<void>
} {
  const windowWithFirebase = window as typeof window & {
    firebase?: {
      apps: Array<{ name: string }>
      initializeApp: (config: { apiKey: string; authDomain: string; projectId: string }) => { name: string }
      auth: (app: { name: string }) => {
        useEmulator: (url: string) => void
        signInWithCustomToken: (token: string) => Promise<void>
      }
    }
  }

  const firebase = windowWithFirebase.firebase
  if (!firebase) {
    throw new Error('Failed to load Firebase SDK')
  }

  let app = firebase.apps[0]
  if (!app) {
    app = firebase.initializeApp(config)
  }

  const auth = firebase.auth(app)

  try {
    auth.useEmulator(`http://${emulatorHost}`)
  } catch {
    // Already connected, ignore
  }

  return auth
}
```

**For Non-Firebase Projects**: 
- Skip this phase entirely
- Remove all AuthManager references from TestContext
- Remove Firebase Auth initialization from TestContext
- Authentication features will be unavailable (but test data generation still works)

**Validation Checklist**:
- [ ] Constructor validates Auth instance
- [ ] `createAuthUser` handles existing users gracefully
- [ ] `createAuthUser` handles uid-already-exists error
- [ ] `generateCustomToken` works correctly
- [ ] `authenticatePage` injects authentication correctly
- [ ] Firebase SDK loaded if not already available
- [ ] Emulator connection handled correctly
- [ ] Error handling for auth operations

### Phase 11: Implement TestContext

**File**: `src/test-context/TestContext.ts`

**⚠️ CRITICAL**: TestContext MUST use `DatabaseAdapter` interface (from `src/database/types.ts`), NOT a concrete adapter class. This ensures DB-agnostic design.

**⚠️ DO NOT**: Import concrete adapter class (e.g., `import DatabaseAdapter from '../database/adapter'`)
**✅ DO**: Import interface type (e.g., `import type { DatabaseAdapter } from '../database/types'`)

**Template** (with optional Firebase Auth):
```typescript
import { Selector } from './Selector'
import { Scenario } from './Scenario'
import { IdProvider } from './IdProvider'
import { DatabaseReader } from './DatabaseReader'
import { mergeData as mergeTestData } from './DataMerger'
import type { DataGenObject, TestUser, dbPerson } from './types'
// ⚠️ CRITICAL: Import interface type, NOT concrete adapter class
import type { DatabaseAdapter } from '../database/types'

// Conditional imports for Firebase Auth (only if using Firebase)
let AuthManager: typeof import('./AuthManager').AuthManager | undefined
let getAuth: typeof import('firebase-admin/auth').getAuth | undefined
let getApps: typeof import('firebase-admin/app').getApps | undefined
let Auth: typeof import('firebase-admin/auth').Auth | undefined

try {
  const authModule = await import('./AuthManager')
  const firebaseAuth = await import('firebase-admin/auth')
  const firebaseApp = await import('firebase-admin/app')
  AuthManager = authModule.AuthManager
  getAuth = firebaseAuth.getAuth
  getApps = firebaseApp.getApps
  Auth = firebaseAuth.Auth
} catch {
  // Firebase not available - auth features will be disabled
}

import type { Page } from '@playwright/test'

export class TestContext {
  private db: DatabaseAdapter
  readonly dbReader: DatabaseReader
  private authManager?: InstanceType<typeof AuthManager>
  readonly auth?: Auth
  scenario: Scenario
  selector?: Selector
  idProvider: ReturnType<typeof IdProvider>

  /**
   * Private constructor - use TestContext.create() instead
   * 
   * ⚠️ IMPORTANT: Constructor accepts DatabaseAdapter interface (not concrete class)
   * This ensures TestContext works with any database implementation
   * 
   * ⚠️ DO NOT: Accept concrete adapter class (e.g., FirestoreAdapter)
   * ✅ DO: Accept DatabaseAdapter interface
   */
  private constructor(db: DatabaseAdapter) {
    if (!db) {
      throw new Error('TestContext requires a DatabaseAdapter instance')
    }
    this.db = db
    this.idProvider = IdProvider()
    // ⚠️ CRITICAL: DatabaseReader accepts DatabaseReadOperations interface
    // DatabaseAdapter extends DatabaseReadOperations, so we can pass db directly
    // DatabaseReader will use interface methods (`readDocument`, `readDocumentsByField`), NOT concrete database types
    this.dbReader = new DatabaseReader(db, this.idProvider)
    this.scenario = new Scenario(this.idProvider)

    // Initialize Firebase Auth (only if using Firebase and available)
    // ⚠️ NOTE: For Firestore projects, if you need the Firestore instance for AuthManager,
    // you can access it via: const firestore = db.getDatabaseClient() as Firestore
    // However, AuthManager typically uses Firebase Auth directly, not Firestore
    if (getApps && getAuth && AuthManager) {
      const apps = getApps()
      const app = apps.find(a => a.name === '[DEFAULT]') || apps[0]
      if (app) {
        this.auth = getAuth(app)
        this.authManager = new AuthManager(this.auth)
      }
    }
  }

  /**
   * Factory method to create TestContext instance
   * Always requires database adapter to avoid connection pool exhaustion
   */
  static async create(db: DatabaseAdapter): Promise<TestContext> {
    if (!db) {
      throw new Error(
        'TestContext.create() requires a DatabaseAdapter instance. ' +
          'Pass global.testDb or a shared database connection.'
      )
    }
    return new TestContext(db)
  }

  /**
   * Merges base data with test-specific data using key-based override logic.
   * Delegates to DataMerger for actual merging logic.
   */
  mergeData(baseData: DataGenObject, testData: DataGenObject): DataGenObject {
    return mergeTestData(baseData, testData)
  }

  /**
   * Adds data to scenario and builds selector
   */
  bulkAdd(data: DataGenObject): TestContext {
    this.scenario.bulkAdd(data)
    this.selector = this.scenario.build()
    return this
  }

  /**
   * Builds selector without inserting data
   */
  build(): TestContext {
    this.selector = this.scenario.build()
    return this
  }

  /**
   * Gets selector (builds if not already built)
   */
  getSelector(): Selector {
    if (!this.selector) {
      this.selector = this.scenario.build()
    }
    return this.selector
  }

  /**
   * Creates a Firebase Auth user (only if Firebase Auth available)
   * Delegates to AuthManager
   */
  async createAuthUser(user: TestUser): Promise<string> {
    if (!this.authManager) {
      throw new Error('AuthManager not initialized. Firebase Auth not available.')
    }
    return this.authManager.createAuthUser(user)
  }

  /**
   * Generates a custom token for a Firebase Auth user (only if Firebase Auth available)
   * Delegates to AuthManager
   */
  async generateCustomToken(userId: string): Promise<string> {
    if (!this.authManager) {
      throw new Error('AuthManager not initialized. Firebase Auth not available.')
    }
    return this.authManager.generateCustomToken(userId)
  }

  /**
   * Authenticates a user in a Playwright page using Firebase (only if Firebase Auth available)
   * Delegates to AuthManager
   */
  async authenticatePage(page: Page, authUser: TestUser): Promise<void> {
    if (!this.authManager) {
      throw new Error('AuthManager not initialized. Firebase Auth not available.')
    }
    return this.authManager.authenticatePage(page, authUser)
  }

  /**
   * Inserts generated data into database
   * Creates Firebase Auth users first (if applicable), then inserts database entities
   */
  async insert(): Promise<void> {
    if (!this.selector) {
      throw new Error('Cannot insert: selector not built. Call build() or bulkAdd() first.')
    }

    // Insert Firebase Auth users first (if applicable)
    if (this.authManager) {
      const firebaseUsers = this.selector.allFirebaseUsers()
      for (const user of firebaseUsers) {
        await this.createAuthUser(user)
      }
    }

    // Then insert database entities
    const data = this.selector.getRawTestData()
    await this.db.upsertGeneratedData(data)
  }

  /**
   * Complete test setup with data generation, insertion, and optional authentication
   *
   * @param options - Configuration object
   * @param options.baseData - Base data shared across tests
   * @param options.testData - Test-specific data that overrides baseData
   * @param options.page - Playwright page object (if authentication needed)
   * @param options.authPersonId - Explicit shorthand ID of person to authenticate as (must have password)
   * @returns Object with selector and authenticated user (TestUser, if auth available)
   */
  async setupEnv(options: {
    baseData: DataGenObject
    testData?: DataGenObject
    page?: Page
    authPersonId?: string
  }): Promise<{
    selector: Selector
    authUser?: TestUser
  }> {
    const { baseData, testData = {}, page, authPersonId } = options

    const mergedData = this.mergeData(baseData, testData)
    await this.bulkAdd(mergedData).insert()
    const selector = this.getSelector()

    const authUser = authPersonId && this.authManager 
      ? await this.resolveAuthUser(selector, authPersonId, page) 
      : undefined

    return { selector, authUser }
  }

  /**
   * Resolves and authenticates user if requested (only if Firebase Auth available)
   */
  private async resolveAuthUser(
    selector: Selector,
    authPersonId: string,
    page?: Page
  ): Promise<TestUser> {
    if (!this.authManager) {
      throw new Error('Authentication not available. Firebase Auth not initialized.')
    }

    const person = this.getPersonForAuth(selector, authPersonId)
    const authUser = this.getAuthUserForPerson(selector, person, authPersonId)

    if (page) {
      await this.authenticatePage(page, authUser)
    }

    return authUser
  }

  /**
   * Gets person for authentication, throwing if not found
   */
  private getPersonForAuth(selector: Selector, authPersonId: string): dbPerson {
    const person = selector.getPerson(authPersonId)
    if (!person) {
      const availablePersons = selector.data.persons?.map(p => p.personId).join(', ') || 'none'
      throw new Error(
        `Person with ID '${authPersonId}' not found in generated data. Available persons: ${availablePersons}`
      )
    }
    return person
  }

  /**
   * Gets Firebase Auth user for person, throwing if not found
   */
  private getAuthUserForPerson(selector: Selector, person: dbPerson, authPersonId: string): TestUser {
    if (!person.authUserId) {
      throw new Error(
        `Person '${authPersonId}' does not have an associated Firebase Auth user. ` +
          `Provide password in person options to create auth user.`
      )
    }

    const authUser = selector.getFirebaseUser(person.authUserId)
    if (!authUser) {
      throw new Error(
        `Firebase Auth user for person '${authPersonId}' (authUserId: ${person.authUserId}) not found. ` +
          `Ensure person has password set to create auth user.`
      )
    }

    return authUser
  }

  /**
   * Retrieve methods - Direct database lookups using short IDs
   * Delegates to DatabaseReader
   */
  async retrieveEntity1(shortId: string) {
    return this.dbReader.retrieveEntity1(shortId)
  }

  async retrieveEntity2(shortId: string) {
    return this.dbReader.retrieveEntity2(shortId)
  }

  // ... add retrieve methods for all entities
}
```

**Simplified Template** (without Firebase Auth - for non-Firebase projects):
```typescript
import { Selector } from './Selector'
import { Scenario } from './Scenario'
import { IdProvider } from './IdProvider'
import { DatabaseReader } from './DatabaseReader'
import { mergeData as mergeTestData } from './DataMerger'
import type { DataGenObject } from './types'
import type { DatabaseAdapter } from '../database/types'

/**
 * ⚠️ IMPORTANT: Uses DatabaseAdapter interface (not concrete class)
 * This ensures TestContext works with any database implementation
 */
export class TestContext {
  private db: DatabaseAdapter
  readonly dbReader: DatabaseReader
  scenario: Scenario
  selector?: Selector
  idProvider: ReturnType<typeof IdProvider>

  /**
   * Constructor accepts DatabaseAdapter interface (not concrete adapter class)
   */
  private constructor(db: DatabaseAdapter) {
    if (!db) {
      throw new Error('TestContext requires a DatabaseAdapter instance')
    }
    this.db = db
    this.idProvider = IdProvider()
    // ⚠️ CRITICAL: DatabaseReader accepts DatabaseReadOperations interface (db implements it)
    // DatabaseReader will use interface methods (`readDocument`, `readDocumentsByField`), NOT concrete database types
    this.dbReader = new DatabaseReader(db, this.idProvider)
    this.scenario = new Scenario(this.idProvider)
  }

  static async create(db: DatabaseAdapter): Promise<TestContext> {
    if (!db) {
      throw new Error('TestContext.create() requires a DatabaseAdapter instance')
    }
    return new TestContext(db)
  }

  mergeData(baseData: DataGenObject, testData: DataGenObject): DataGenObject {
    return mergeTestData(baseData, testData)
  }

  bulkAdd(data: DataGenObject): TestContext {
    this.scenario.bulkAdd(data)
    this.selector = this.scenario.build()
    return this
  }

  build(): TestContext {
    this.selector = this.scenario.build()
    return this
  }

  getSelector(): Selector {
    if (!this.selector) {
      this.selector = this.scenario.build()
    }
    return this.selector
  }

  async insert(): Promise<void> {
    if (!this.selector) {
      throw new Error('Cannot insert: selector not built. Call build() or bulkAdd() first.')
    }
    const data = this.selector.getRawTestData()
    await this.db.upsertGeneratedData(data)
  }

  async setupEnv(options: {
    baseData: DataGenObject
    testData?: DataGenObject
  }): Promise<{ selector: Selector }> {
    const { baseData, testData = {} } = options
    const mergedData = this.mergeData(baseData, testData)
    await this.bulkAdd(mergedData).insert()
    return { selector: this.getSelector() }
  }

  // ... add retrieve methods for all entities
}
```

**Validation Checklist**:
- [ ] Private constructor validates `DatabaseAdapter` interface (NOT concrete adapter class)
- [ ] NO imports of concrete database types (e.g., `import DatabaseAdapter from '../database/adapter'`)
- [ ] Uses `import type { DatabaseAdapter } from '../database/types'` instead
- [ ] Factory method `create()` works correctly
- [ ] Firebase Auth initialized conditionally (if available)
- [ ] `mergeData` delegates to DataMerger
- [ ] `bulkAdd` adds data and builds selector
- [ ] `insert` creates auth users first (if applicable), then inserts data
- [ ] `setupEnv` completes full test setup
- [ ] Auth resolution validates person exists (if auth available)
- [ ] Auth resolution validates authUserId exists (if auth available)
- [ ] Retrieve methods delegate to DatabaseReader
- [ ] Error messages are helpful and descriptive
- [ ] Works without Firebase Auth (for non-Firebase projects)
- [ ] DatabaseReader instantiated with interface (not concrete type)

### Phase 12: Create Exports

**File**: `src/index.ts`

**Template**:
```typescript
/**
 * @your-project/test-tools
 * 
 * Test data generation and context management tools for your-project application.
 * Can be used by tests, Firebase Functions, and other parts of the application.
 * 
 * ⚠️ DB-AGNOSTIC DESIGN: This package works with any database via DatabaseAdapter interface.
 * Import the concrete adapter implementation (FirestoreAdapter, PostgresAdapter, etc.) from './database/adapter'
 */

export * from './test-context'
export * from './generators'
// Export concrete adapter implementation (users choose which one to import)
// ⚠️ IMPORTANT: Export the adapter that matches your database
export { default as FirestoreAdapter } from './database/adapter' // Or PostgresAdapter, MongoAdapter, etc.
// Export interfaces for type safety
export type { DatabaseAdapter, DatabaseReadOperations, DatabaseWriteOperations } from './database/types'
export type { GeneratedTableArrays, DataGenObject } from './test-context/types'
// Export entity partial types (add all your entity partials)
export type { PersonPartial, CommunityPartial, EventPartial } from './test-context/types'
```

**⚠️ IMPORTANT**: 
- Export the concrete adapter class (FirestoreAdapter, PostgresAdapter, etc.) as default
- Export the `DatabaseAdapter` interface as a type for consumers to use
- Consumers import the concrete adapter: `import FirestoreAdapter from '@your-project/test-tools/database'`
- Consumers use the interface for type safety: `import type { DatabaseAdapter } from '@your-project/test-tools'`
- Update the export name to match your adapter class name (FirestoreAdapter, PostgresAdapter, MongoAdapter, etc.)

**File**: `src/generators/index.ts`

**Template**:
```typescript
/**
 * Export all generators
 */

export * from './entity1'
export * from './entity2'
// ... export all generators
export * from './helpers'
```

**File**: `src/test-context/index.ts`

**Template**:
```typescript
/**
 * Export all test context components
 */

export { TestContext } from './TestContext'
export { Scenario } from './Scenario'
export { Selector } from './Selector'
export { IdProvider } from './IdProvider'
export { DatabaseReader } from './DatabaseReader'
export { AuthManager } from './AuthManager' // Only if using Firebase
export { mergeData } from './DataMerger'
export * from './types'
```

**File**: `src/database/index.ts` (optional - for convenience)

**Template**:
```typescript
/**
 * Database adapter exports
 * Import the adapter that matches your database
 * 
 * ⚠️ DB-AGNOSTIC DESIGN: Export only ONE concrete adapter implementation
 * Users import the adapter that matches their database
 */

// Choose ONE based on your database:
export { default as FirestoreAdapter } from './adapter' // If using Firestore
// OR
// export { default as PostgresAdapter } from './adapter' // If using PostgreSQL
// OR
// export { default as MongoAdapter } from './adapter' // If using MongoDB

// Always export interfaces for type safety
export type { DatabaseAdapter, DatabaseReadOperations, DatabaseWriteOperations } from './types'
```

**⚠️ IMPORTANT**: 
- Only export ONE concrete adapter implementation (the one you're using)
- Always export the interfaces for type safety
- Users import: `import FirestoreAdapter from '@project/test-tools/database'`
- Users type-check with: `import type { DatabaseAdapter } from '@project/test-tools/database'`

**Validation Checklist**:
- [ ] All modules exported from main index
- [ ] Generators exported from generators index
- [ ] Test context modules exported from test-context index
- [ ] Types exported correctly
- [ ] DatabaseAdapter exported as default
- [ ] Database interfaces exported from database/types
- [ ] Package exports configured in package.json
- [ ] AuthManager export conditional (only if using Firebase)

---

## Function Signature Templates

### Generator Function Signatures

#### Simple Entity Generator
```typescript
export function generate[EntityName](
  options: [EntityName]Partial = {},
  ID: ReturnType<typeof IdProvider> = IdProvider()
): db[EntityName]
```

#### Entity with Multiple Outputs
```typescript
export function generate[EntityName](
  ID: ReturnType<typeof IdProvider> = IdProvider(),
  options: [EntityName]Partial = {}
): { entity: db[EntityName]; firebaseUser?: TestUser }
```

#### Composite Key Entity Generator
```typescript
export function generate[CompositeEntity](
  options: [CompositeEntity]Partial = {},
  ID: ReturnType<typeof IdProvider> = IdProvider()
): db[CompositeEntity]
```

### Scenario Methods

```typescript
class Scenario {
  constructor(idProvider: ReturnType<typeof IdProvider>)
  bulkAdd(data: Partial<GeneratedTableArraysPartials>): Scenario
  build(): Selector
  getIdProvider(): ReturnType<typeof IdProvider>
}
```

### Selector Methods

```typescript
class Selector {
  constructor(
    data: GeneratedTableArrays,
    idProvider?: ReturnType<typeof IdProvider>,
    firebaseUsers?: TestUser[]
  )
  get[EntityName](id: string): db[EntityName] | undefined
  get[CompositeEntity](key1Id: string, key2Id: string): db[CompositeEntity] | undefined
  get[Entity2]sBy[Entity1](entity1Id: string): db[Entity2][]
  getRawTestData(): GeneratedTableArrays
  allFirebaseUsers(): TestUser[]
  getFirebaseUser(userId: string): TestUser | undefined
}
```

### TestContext Methods

```typescript
class TestContext {
  static create(db: DatabaseAdapter): Promise<TestContext>
  mergeData(baseData: DataGenObject, testData: DataGenObject): DataGenObject
  bulkAdd(data: DataGenObject): TestContext
  build(): TestContext
  getSelector(): Selector
  insert(): Promise<void>
  setupEnv(options: {
    baseData: DataGenObject
    testData?: DataGenObject
    page?: Page
    authPersonId?: string
  }): Promise<{ selector: Selector; authUser?: TestUser }>
  retrieve[EntityName](shortId: string): Promise<db[EntityName] | null>
}
```

### DataMerger Functions

```typescript
function mergeData(baseData: DataGenObject, testData: DataGenObject): DataGenObject
```

### DatabaseAdapter Methods

```typescript
interface DatabaseAdapter {
  getDatabaseClient(): unknown
  getMaxBatchSize(): number
  readDocument<T>(collection: string, docId: string): Promise<T | null>
  readDocumentsByField<T>(collection: string, field: string, value: unknown): Promise<T[]>
  upsertDocument(collection: string, docId: string, data: unknown): Promise<void>
  deleteDocument(collection: string, docId: string): Promise<void>
  upsertGeneratedData(data: GeneratedTableArrays): Promise<void>
  deleteGeneratedData(data: GeneratedTableArrays): Promise<void>
}

// Implementation example (Firestore):
class FirestoreAdapter implements DatabaseAdapter {
  constructor(db: Firestore)
  getDatabaseClient(): Firestore
  getMaxBatchSize(): number
  // ... implement all interface methods
}
```

### DatabaseReader Methods

```typescript
class DatabaseReader {
  constructor(db: DatabaseReadOperations, idProvider?: ReturnType<typeof IdProvider>)
  get[EntityName](entityId: string): Promise<db[EntityName] | null>
  retrieve[EntityName](shortId: string): Promise<db[EntityName] | null>
}
```

### AuthManager Methods (Firebase Only)

```typescript
class AuthManager {
  constructor(auth: Auth)
  createAuthUser(user: TestUser): Promise<string>
  generateCustomToken(userId: string): Promise<string>
  authenticatePage(page: Page, authUser: TestUser): Promise<void>
}
```

---

## Dependency Ordering Strategy

### Rules

1. **Nested entities first**: Entities stored separately but nested in parent (e.g., roles, labels)
2. **Independent entities**: Entities with no foreign keys
3. **Dependent entities**: Entities with foreign keys to independent entities
4. **Composite key entities**: After all their dependencies
5. **Relationship entities**: After all referenced entities

### Validation Algorithm

```typescript
function validateDependencyOrder(entities: EntityMapping[]): boolean {
  const order = determineDependencyOrder(entities)
  
  for (let i = 0; i < order.length; i++) {
    const entity = order[i]
    const dependencies = entity.dependencies
    
    for (const dep of dependencies) {
      const depIndex = order.findIndex(e => e.entityName === dep)
      if (depIndex === -1 || depIndex >= i) {
        return false // Dependency not found or comes after
      }
    }
  }
  
  return true
}
```

### Example Dependency Order (group-recruitment)

```
1. Roles, Labels, ProspectStatuses (nested in Community, stored separately)
2. Communities (independent, stitched from roles/labels/statuses)
3. Persons (independent)
4. Events (depends on Community)
5. CommunityAdmins (depends on Person, Community - composite key)
6. PersonEventRelationships (depends on Person, Event - composite key)
7. Notes (depends on Person)
```

---

## Validation Checklists

### Generator Validation

For each generator:
- [ ] Generates valid entity with all required fields
- [ ] Uses faker for realistic defaults
- [ ] Options override defaults correctly
- [ ] Foreign keys validated (throw error if missing)
- [ ] Foreign keys resolved through ID provider
- [ ] Shorthand IDs work correctly
- [ ] Optional fields handled correctly (undefined vs null vs falsy)
- [ ] Enum values are valid
- [ ] Timestamps are reasonable ISO strings
- [ ] Returns generated entity (or entities)
- [ ] Function signature matches template

### Scenario Validation

- [ ] All entity arrays initialized in `data` property
- [ ] Constructor validates IdProvider is provided
- [ ] `bulkAdd` processes in strict dependency order
- [ ] All entities share same IdProvider instance
- [ ] Shorthand IDs resolve correctly
- [ ] `build()` returns Selector with all data
- [ ] `build()` stitches nested entities correctly
- [ ] `build()` ensures business rules (e.g., default status)
- [ ] Multiple calls accumulate data correctly
- [ ] Firebase users tracked separately

### Selector Validation

- [ ] Constructor accepts data, idProvider, and firebaseUsers
- [ ] Direct access methods work with shorthand IDs
- [ ] Relationship traversal methods return correct data
- [ ] Indexes are built correctly (direct, composite, relationship)
- [ ] Composite key access works (`key1:key2` format)
- [ ] `getRawTestData()` returns complete data structure
- [ ] Firebase user methods work (if applicable)
- [ ] ID resolution works for all getter methods
- [ ] Relationship methods return empty arrays if no matches

### TestContext Validation

- [ ] Private constructor validates DatabaseAdapter
- [ ] Factory method `create()` works correctly
- [ ] Firebase Auth initialized correctly (if applicable)
- [ ] `mergeData` delegates to DataMerger
- [ ] `bulkAdd` adds data and builds selector
- [ ] `insert` creates auth users first (if applicable)
- [ ] `insert` inserts data in correct order
- [ ] `setupEnv` completes full test setup
- [ ] Auth resolution validates person exists
- [ ] Auth resolution validates authUserId exists
- [ ] Retrieve methods work with shorthand IDs
- [ ] Error messages are helpful and descriptive

### DataMerger Validation

- [ ] Merges arrays correctly with key matching
- [ ] Handles single-key entities
- [ ] Handles composite-key entities
- [ ] TestData overrides baseData for matching keys
- [ ] Non-matching entities preserved from both arrays
- [ ] Switch statement includes all entity types
- [ ] Fallback logic handles unknown entity types

### DatabaseAdapter Validation

- [ ] Constructor accepts database instance
- [ ] `getDatabaseClient()` returns database-specific client (Firestore, Pool, MongoClient, etc.)
- [ ] `getMaxBatchSize()` returns appropriate limit for database
- [ ] `readDocument` implements interface method correctly
- [ ] `readDocumentsByField` implements interface method correctly
- [ ] `upsertDocument` implements interface method correctly
- [ ] `deleteDocument` implements interface method correctly
- [ ] `upsertGeneratedData` processes in dependency order
- [ ] Batch operations respect database limits (`getMaxBatchSize()`)
- [ ] Batch operations use database-specific features (Firestore batches, PostgreSQL transactions, MongoDB sessions)
- [ ] Composite keys formatted correctly (`key1:key2`)
- [ ] `deleteGeneratedData` deletes in reverse dependency order
- [ ] Error handling for batch operations
- [ ] Final batch/transaction committed after all operations
- [ ] Class implements `DatabaseAdapter` interface from `src/database/types.ts`

### DatabaseReader Validation

- [ ] Constructor accepts database and optional idProvider
- [ ] ID resolution works correctly
- [ ] Read methods return null for non-existent documents
- [ ] Retrieve methods resolve shorthand IDs
- [ ] Nested entity stitching works correctly
- [ ] Composite key reads use correct document ID format

### AuthManager Validation (Firebase Only)

- [ ] Constructor validates Auth instance
- [ ] `createAuthUser` handles existing users gracefully
- [ ] `createAuthUser` handles uid-already-exists error
- [ ] `generateCustomToken` works correctly
- [ ] `authenticatePage` injects authentication correctly
- [ ] Firebase SDK loaded if not already available
- [ ] Emulator connection handled correctly
- [ ] Error handling for auth operations

### Integration Validation

- [ ] Complete scenario generates correctly
- [ ] Relationships are maintained
- [ ] Data inserts to database correctly
- [ ] Data can be retrieved from database
- [ ] Authentication works (if applicable)
- [ ] Cleanup works correctly
- [ ] Shorthand IDs work end-to-end
- [ ] Multiple test contexts don't interfere

---

## Common Patterns & Examples

### Example 1: Simple Test Setup

```typescript
import { TestContext } from '@project/test-tools'
import FirestoreAdapter from '@project/test-tools/database' // Import concrete adapter
import type { Firestore } from 'firebase-admin/firestore'

// Create concrete adapter instance
const db = new FirestoreAdapter(firestoreInstance)
// TestContext accepts DatabaseAdapter interface (works with any implementation)
const context = await TestContext.create(db)

const { selector } = await context.setupEnv({
  baseData: {
    entity1s: [{ entity1Id: 'E1', name: 'Test Entity' }],
    entity2s: [{ entity2Id: 'E2', entity1Id: 'E1' }],
  },
})

const entity1 = selector.getEntity1('E1')
const entity2s = selector.getEntity2sByEntity1('E1')
```

### Example 2: Test with Authentication

```typescript
const { selector, authUser } = await context.setupEnv({
  baseData: {
    persons: [
      { personId: 'P1', email: 'test@example.com', password: 'password123' },
    ],
  },
  page,
  authPersonId: 'P1',
})

// User is authenticated in page
const person = selector.getPerson('P1')
```

### Example 3: Complex Scenario with Bulk Add

```typescript
const baseData = {
  entity1s: [
    { entity1Id: 'E1', name: 'Entity 1' },
    { entity1Id: 'E2', name: 'Entity 2' },
  ],
  entity2s: [
    { entity2Id: 'E2-1', entity1Id: 'E1' },
    { entity2Id: 'E2-2', entity1Id: 'E1' },
  ],
}

const testData = {
  entity2s: [
    { entity2Id: 'E2-1', entity1Id: 'E1', customField: 'override' },
  ],
}

const context = await TestContext.create(db)
const { selector } = await context.setupEnv({
  baseData,
  testData,
})
```

### Example 4: Using Scenario Directly

```typescript
import { Scenario, IdProvider } from '@project/test-tools/test-context'

const ID = IdProvider()
const scenario = new Scenario(ID)
  .bulkAdd({
    entity1s: [{ entity1Id: 'E1' }],
    entity2s: [{ entity2Id: 'E2', entity1Id: 'E1' }],
  })
  .build()

const selector = scenario.build()
const entity1 = selector.getEntity1('E1')
```

### Example 5: Database Retrieval

```typescript
const context = await TestContext.create(db)
await context.setupEnv({ baseData: { entity1s: [{ entity1Id: 'E1' }] } })

const entity1 = await context.retrieveEntity1('E1')
expect(entity1).toBeDefined()
```

### Example 6: Nested Entities

```typescript
const { selector } = await context.setupEnv({
  baseData: {
    communities: [{ communityId: 'C1' }],
    roles: [
      { roleId: 'R1', communityId: 'C1', name: 'Admin' },
      { roleId: 'R2', communityId: 'C1', name: 'Member' },
    ],
  },
})

const community = selector.getCommunity('C1')
// community.roles contains R1 and R2 (stitched in Scenario.build())
const roles = selector.getRolesByCommunity('C1')
```

### Example 7: Composite Key Entities

```typescript
const { selector } = await context.setupEnv({
  baseData: {
    persons: [{ personId: 'P1' }],
    communities: [{ communityId: 'C1' }],
    communityAdmins: [
      { personId: 'P1', communityId: 'C1', hasFullAccess: true },
    ],
  },
})

const admin = selector.getCommunityAdmin('P1', 'C1')
const adminsByPerson = selector.getCommunityAdminsByPerson('P1')
const adminsByCommunity = selector.getCommunityAdminsByCommunity('C1')
```

---

## Database Selection Guide

### Choosing Your Database Adapter

**⚠️ DB-AGNOSTIC DESIGN**: The pattern uses interfaces, so you can switch databases by:
1. Creating a new adapter class that implements `DatabaseAdapter` interface
2. Exporting it from `src/database/adapter.ts`
3. No changes needed to TestContext, DatabaseReader, or other modules!

**Firestore (Firebase)**:
- Use if: You're using Firebase/Firestore
- Batch limit: 500 operations
- Features: Real-time sync, serverless-friendly
- Implementation: Use `FirestoreAdapter` template
- **MUST implement**: `DatabaseAdapter` interface from `src/database/types.ts`

**PostgreSQL**:
- Use if: You're using SQL databases
- Batch limit: 1000+ operations (transaction-based)
- Features: ACID transactions, complex queries
- Implementation: Use `PostgresAdapter` template
- Note: Requires mapping table names and primary keys
- **MUST implement**: `DatabaseAdapter` interface from `src/database/types.ts`

**MongoDB**:
- Use if: You're using MongoDB
- Batch limit: 1000+ operations (transaction-based)
- Features: Document-based, flexible schema
- Implementation: Use `MongoAdapter` template
- **MUST implement**: `DatabaseAdapter` interface from `src/database/types.ts`

**Other Databases**:
- **REQUIRED**: Implement `DatabaseAdapter` interface from `src/database/types.ts`
- Provide `readDocument`, `readDocumentsByField`, `upsertDocument`, `deleteDocument`
- Implement `upsertGeneratedData` and `deleteGeneratedData` with dependency ordering
- Set appropriate `getMaxBatchSize()` for your database
- **CRITICAL**: Use interfaces in DatabaseReader and TestContext (not concrete types)

### Database Adapter Implementation Checklist

**Phase 7.5 (REQUIRED FIRST)**:
- [ ] Create `src/database/types.ts` with `DatabaseAdapter`, `DatabaseReadOperations`, `DatabaseWriteOperations` interfaces
- [ ] Export all interfaces for use in other modules

**Phase 8 (Implementation)**:
- [ ] Choose database type (Firestore/PostgreSQL/MongoDB/Other)
- [ ] Create `src/database/adapter.ts` with concrete adapter class
- [ ] Class MUST `implements DatabaseAdapter` (from `src/database/types.ts`)
- [ ] Implement `readDocument` method (from `DatabaseReadOperations`)
- [ ] Implement `readDocumentsByField` method (from `DatabaseReadOperations`)
- [ ] Implement `getDatabaseClient()` method (returns concrete database client)
- [ ] Implement `upsertDocument` method (from `DatabaseWriteOperations`)
- [ ] Implement `deleteDocument` method (from `DatabaseWriteOperations`)
- [ ] Implement `getMaxBatchSize()` method (returns appropriate limit)
- [ ] Implement `upsertGeneratedData` with dependency ordering
- [ ] Implement `deleteGeneratedData` in reverse dependency order
- [ ] Handle batch limits correctly
- [ ] Use transactions where appropriate
- [ ] Format composite keys correctly (`key1:key2`)
- [ ] Export adapter as default from `src/database/adapter.ts`

**Phase 9 (DatabaseReader)**:
- [ ] Update DatabaseReader constructor to accept `DatabaseReadOperations` interface
- [ ] Remove any concrete database type imports (e.g., `import type { Firestore }`)
- [ ] Use interface methods (`readDocument`, `readDocumentsByField`) instead of direct database calls

**Phase 11 (TestContext)**:
- [ ] Update TestContext constructor to accept `DatabaseAdapter` interface
- [ ] Remove concrete adapter class imports (use `import type { DatabaseAdapter }`)
- [ ] Pass interface to DatabaseReader (not concrete database type)

## Summary

This pattern provides a complete, scalable, **database-agnostic** approach to test data generation:

### Implementation Order (CRITICAL):

1. **Analyze D03-Data-Model** to understand entities and relationships
2. **Determine dependency order** for correct generation sequence
3. **Implement core utilities** (IdProvider, helpers, indexUtils)
4. **Create type definitions** matching your domain
5. **Implement generators** following established patterns
6. **Build Scenario** with dependency-aware bulk operations
7. **Create Selector** with efficient data access patterns
8. **Implement DataMerger** for base + test data merging
9. **⚠️ REQUIRED: Define database abstraction interfaces** (`DatabaseAdapter`, `DatabaseReadOperations`, `DatabaseWriteOperations`) in `src/database/types.ts`
10. **Build DatabaseAdapter** for your specific database (Firestore/PostgreSQL/MongoDB/Other) - **MUST implement interface from step 9**
11. **Implement DatabaseReader** using `DatabaseReadOperations` interface (NOT concrete database types)
12. **Implement AuthManager** (optional - only if using Firebase)
13. **Create TestContext** as main facade using `DatabaseAdapter` interface (NOT concrete adapter class)
14. **Create exports** - export concrete adapter, export interfaces as types
15. **Test thoroughly** to ensure correctness

### Key DB-Agnostic Principles:

- ✅ **Interfaces First**: Create `src/database/types.ts` BEFORE implementing adapters
- ✅ **Use Interfaces**: DatabaseReader and TestContext use interfaces, not concrete types
- ✅ **No Direct Imports**: Never import concrete database types in DatabaseReader or TestContext
- ✅ **Switch Databases**: Change database by creating new adapter class - no other code changes needed

### System Features:

- ✅ **Database-agnostic** - Works with Firestore, PostgreSQL, MongoDB, or any database via interfaces
- ✅ Consistent ID management across all entities
- ✅ Realistic test data using faker
- ✅ Proper dependency ordering
- ✅ Easy data access through Selector
- ✅ Reusable scenarios for multiple tests
- ✅ Type-safe implementation with TypeScript
- ✅ Database integration with proper ordering
- ✅ Authentication support (optional - Firebase only)
- ✅ Shorthand ID resolution throughout
- ✅ Nested entity stitching
- ✅ Composite key handling
- ✅ **Complete implementation guide** - Everything needed to build in one go
- ✅ **DB-agnostic by design** - Switch databases without changing core code

---

## Execution Checklist: Files to Create (In Order)

**Before starting**: Ensure you have `_docs/design/D03 - Data Model.md` or `_docs/design/Data_Model.md` completed.

### Phase 1: Setup Files
- [ ] `packages/test-tools/package.json` (use template from Phase 1.1)
- [ ] `packages/test-tools/tsconfig.json` (use template from Phase 1.2)
- [ ] Create all directories from file structure

### Phase 2-7: Core Implementation
- [ ] `src/test-context/IdProvider.ts`
- [ ] `src/generators/helpers.ts`
- [ ] `src/test-context/indexUtils.ts`
- [ ] `src/test-context/types.ts` (define all entity types from your data model)
- [ ] `src/generators/[entity-name].ts` (one file per entity, in dependency order)
- [ ] `src/generators/index.ts` (export all generators)
- [ ] `src/test-context/Scenario.ts`
- [ ] `src/test-context/Selector.ts`
- [ ] `src/test-context/DataMerger.ts`

### Phase 7.5: Database Interfaces ⚠️ CRITICAL
- [ ] `src/database/types.ts` - **MUST CREATE BEFORE Phase 8**

### Phase 8: Database Adapter
- [ ] `src/database/adapter.ts` - **MUST implement DatabaseAdapter interface**

### Phase 9: Database Reader
- [ ] `src/test-context/DatabaseReader.ts` - **MUST use DatabaseReadOperations interface**

### Phase 10: Auth Manager (Optional)
- [ ] `src/test-context/AuthManager.ts` - Only if using Firebase

### Phase 11: Test Context
- [ ] `src/test-context/TestContext.ts` - **MUST use DatabaseAdapter interface**

### Phase 12: Exports
- [ ] `src/test-context/index.ts` (export all test-context modules)
- [ ] `src/index.ts` (main exports - include concrete adapter + interfaces)

### Validation
- [ ] Run `npm run typecheck` to verify TypeScript compilation
- [ ] Verify all interfaces are used (not concrete types) in DatabaseReader and TestContext
- [ ] Verify DatabaseAdapter implements the interface from `src/database/types.ts`

**Once complete**: You can execute this pattern on a new project by following the phases in order. All templates and examples are provided in this document.

---

## 🎯 Execution Summary: Building from Scratch

This pattern document contains **everything** needed to implement a complete, DB-agnostic test data generation system. Here's what you get:

### ✅ Complete Code Templates
- **Phase 1**: Complete `package.json` and `tsconfig.json` templates
- **Phase 2**: Full implementations of IdProvider, helpers, indexUtils
- **Phase 3**: Complete type definition structure
- **Phase 4**: Generator patterns for all entity types (simple, foreign keys, nested, composite)
- **Phase 5**: Complete Scenario implementation with dependency ordering
- **Phase 6**: Complete Selector implementation with all access patterns
- **Phase 7**: Complete DataMerger implementation
- **Phase 7.5**: Complete database abstraction interfaces (CRITICAL for DB-agnostic design)
- **Phase 8**: Complete adapter implementations for Firestore, PostgreSQL, and MongoDB
- **Phase 9**: Complete DatabaseReader using interfaces (not concrete types)
- **Phase 10**: Complete AuthManager for Firebase projects
- **Phase 11**: Complete TestContext using interfaces (not concrete types)
- **Phase 12**: Complete export structure

### ✅ DB-Agnostic Design
- **Interfaces First**: Database abstraction interfaces defined before implementation
- **No Concrete Types**: DatabaseReader and TestContext use interfaces only
- **Switch Databases**: Change database by creating new adapter class - no other code changes
- **Works with Any DB**: Firestore, PostgreSQL, MongoDB, or any database via interfaces

### ✅ Ready to Execute
1. **Prerequisites**: Have `D03 - Data Model.md` completed
2. **Follow Phases**: Execute phases 1-12 in order
3. **Customize**: Replace entity names/types with your domain model
4. **Choose Database**: Select adapter in Phase 8 (Firestore/PostgreSQL/MongoDB)
5. **Test**: Verify compilation and functionality

### ⚠️ Critical Success Factors
1. **Phase 7.5 MUST come before Phase 8** - Create interfaces before implementing adapter
2. **Use Interfaces**: DatabaseReader and TestContext MUST use interfaces, not concrete types
3. **Import Types**: Use `import type` for interfaces, not concrete classes
4. **Complete Templates**: All code templates are complete - copy, customize, and use

### 📋 What You'll Build
- ✅ Consistent ID management (shorthand → database IDs)
- ✅ Realistic test data generation with faker
- ✅ Dependency-aware data assembly
- ✅ Efficient data access patterns
- ✅ Database integration with proper ordering
- ✅ Authentication support (optional - Firebase)
- ✅ Complete type safety with TypeScript
- ✅ **DB-agnostic by design** - works with any database

**Result**: A production-ready, DB-agnostic test data generation system that can be implemented in one go by following this document.

---

## ⚠️ Final Checklist: Ready to Execute?

Before executing this pattern on a new project, verify:

- [ ] **Prerequisites**: `_docs/design/D03 - Data Model.md` or `_docs/design/Data_Model.md` is completed
- [ ] **Database Choice**: Know which database you're using (Firestore/PostgreSQL/MongoDB/Other)
- [ ] **TypeScript Setup**: Project has TypeScript configured
- [ ] **Dependencies**: Can install `@faker-js/faker` and database client libraries
- [ ] **Pattern Document**: This complete pattern document is available
- [ ] **DB-Agnostic Understanding**: Understand that interfaces must be created BEFORE adapters
- [ ] **Execution Order**: Will follow phases 1-12 in order (especially Phase 7.5 before Phase 8)

**If all checked**: You're ready to execute! Follow the phases in order, copy templates, customize for your domain, and you'll have a complete test data generation system.

**This document contains EVERYTHING needed** - all code templates, all patterns, all examples. No external references required beyond your data model document.

---

## 🎯 Quick Reference: Customization Checklist

When implementing this pattern, you'll need to customize these key areas:

### 1. Entity Names (Throughout All Files)
- [ ] Replace `entity1s`, `entity2s`, etc. with your actual entity names (e.g., `communities`, `persons`, `events`)
- [ ] Replace `Entity1`, `Entity2`, etc. in type names (e.g., `dbCommunity`, `dbPerson`, `dbEvent`)
- [ ] Replace `entity1Id`, `entity2Id`, etc. with your actual ID fields (e.g., `communityId`, `personId`, `eventId`)

### 2. Database Adapter (Phase 8)
- [ ] Choose your database adapter (Firestore/PostgreSQL/MongoDB)
- [ ] Replace placeholder entity names in `upsertGeneratedData()` and `deleteGeneratedData()`
- [ ] Replace placeholder table/collection names with your actual names
- [ ] Replace placeholder ID fields with your actual ID fields
- [ ] For PostgreSQL: Update `getPrimaryKey()` mapping with your table names

### 3. Generators (Phase 4)
- [ ] Create one generator file per entity
- [ ] Replace placeholder entity types with your actual types
- [ ] Replace placeholder foreign key fields with your actual foreign keys
- [ ] Add all required fields from your data model
- [ ] Add all optional fields with appropriate defaults

### 4. Types (Phase 3)
- [ ] Define all entity types (`dbEntityName`) matching your data model
- [ ] Define all partial types (`EntityNamePartial`) for generator options
- [ ] Define `GeneratedTableArrays` with all your entity arrays
- [ ] Define `DataGenObject` with all your entity arrays

### 5. Scenario (Phase 5)
- [ ] Update `bulkAdd()` to process all your entities in dependency order
- [ ] Update `data` property to include all your entity arrays
- [ ] Update `build()` to stitch nested entities if applicable

### 6. Selector (Phase 6)
- [ ] Add getter methods for all your entities
- [ ] Add relationship traversal methods for all relationships
- [ ] Update indexes to match your entity structure

### 7. DataMerger (Phase 7)
- [ ] Update `findMatchingIndex()` switch statement with all your entity types
- [ ] Add cases for single-key entities
- [ ] Add cases for composite-key entities

### 8. DatabaseReader (Phase 9)
- [ ] Add read methods for all your entities
- [ ] Add retrieve methods for all your entities
- [ ] Update nested entity stitching if applicable

### 9. Exports (Phase 12)
- [ ] Export all generators from `src/generators/index.ts`
- [ ] Export all test-context modules from `src/test-context/index.ts`
- [ ] Export concrete adapter from `src/index.ts`
- [ ] Export interfaces from `src/index.ts`

---

## ⚠️ Common Pitfalls & Solutions

### Pitfall 1: Forgetting to Create Database Interfaces First
**Problem**: Implementing DatabaseAdapter before creating `src/database/types.ts`  
**Solution**: Always complete Phase 7.5 BEFORE Phase 8. The interfaces must exist first.

### Pitfall 2: Using Concrete Types Instead of Interfaces
**Problem**: DatabaseReader or TestContext imports concrete database types  
**Solution**: Use `import type { DatabaseReadOperations }` and `import type { DatabaseAdapter }` from `../database/types`

### Pitfall 3: Incomplete Adapter Implementation
**Problem**: Adapter doesn't implement all interface methods  
**Solution**: Ensure your adapter class `implements DatabaseAdapter` and implements ALL methods from the interface

### Pitfall 4: Wrong Dependency Order
**Problem**: Entities inserted in wrong order causing foreign key violations  
**Solution**: Process entities in the same order as `Scenario.bulkAdd()` - check your dependency order matches

### Pitfall 5: Forgetting to Replace Placeholder Names
**Problem**: Using `entity1s`, `entity2s` instead of actual entity names  
**Solution**: Systematically replace all placeholder names with your actual entity names throughout all files

### Pitfall 6: Composite Key Format Mismatch
**Problem**: Composite keys formatted differently in adapter vs generators  
**Solution**: Always use `${key1Id}:${key2Id}` format consistently everywhere

### Pitfall 7: Missing Entity in GeneratedTableArrays
**Problem**: TypeScript error about missing entity array  
**Solution**: Add all entity arrays to `GeneratedTableArrays` type definition

---

## ✅ Final Verification: Ready to Execute?

Before executing this pattern, verify:

1. ✅ **Data Model Complete**: `_docs/design/D03 - Data Model.md` exists and is complete
2. ✅ **Database Chosen**: Know which database you're using (Firestore/PostgreSQL/MongoDB)
3. ✅ **Dependencies Ready**: Can install `@faker-js/faker` and database client libraries
4. ✅ **TypeScript Configured**: Project has TypeScript set up
5. ✅ **Pattern Document**: This complete pattern document is available
6. ✅ **Understanding**: Understand DB-agnostic principles (interfaces first, use interfaces not concrete types)

**If all verified**: Execute phases 1-12 in order, customize entity names, and you'll have a complete, DB-agnostic test data generation system!
