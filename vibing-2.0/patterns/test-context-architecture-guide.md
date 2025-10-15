# Building a Test Context System for Any Project

## Overview

A Test Context system provides a structured, reusable approach to generating and managing test data across your application. It consists of four core components that work together to create realistic, consistent test scenarios.

## Core Architecture

### 1. IdProvider - Consistent ID Management

**Purpose**: Ensures consistent ID mapping across test data generation and database operations.

```typescript
// Key Features:
- Maps human-readable IDs to database IDs
- Supports both numeric and UUID generation
- Maintains ID consistency across test runs
- Handles exact ID preservation for existing data

// Implementation Pattern:
export function IdProvider() {
  const idMap = new Map<string, string>()

  return function ID(str?: string, options?: IdProviderOptions): string {
    // Return existing mapping if available
    if (str && idMap.has(str)) return idMap.get(str)!

    // Generate new ID based on type preference
    const newId = options?.type === 'uuid' ? generateUuid() : generateNumericID()

    // Store mapping for future reference
    if (str) idMap.set(str, newId)
    return newId
  }
}
```

### 2. Generators - Data Creation Logic

**Purpose**: Create realistic test data for each entity type in your domain.

```typescript
// Pattern for each entity generator:
export function generate(opts?: Partial<EntityType>, entityArray?: EntityType[], idProvider?: IdProvider) {
  const provider = idProvider || IdProvider()
  const _id = provider(opts?._id)

  const entity: EntityType = {
    _id,
    // Use faker.js for realistic data
    name: opts?.name || faker.company.name(),
    // Apply business logic
    status: opts?.status || 'ACTIVE',
    // Handle relationships
    parentId: opts?.parentId || provider('parent'),
    // Use custom helpers for domain-specific data
    createdAt: opts?.createdAt || generateRandomTimestamp(),
  }

  if (entityArray) entityArray.push(entity)
  return entity
}
```

### 3. Scenario - Data Assembly and Relationships

**Purpose**: Orchestrates data generation with proper dependency ordering and relationship management.

```typescript
export class Scenario {
  readonly ID: ReturnType<typeof IdProvider>
  private data: DomainTableArrays = {
    // Initialize arrays for each entity type
    users: [],
    organizations: [],
    projects: [],
    // ... other entities
  }

  constructor(idProvider: ReturnType<typeof IdProvider>) {
    this.ID = idProvider
  }

  // Bulk data addition with dependency ordering
  bulkAdd(data: Partial<DomainTableArrays>) {
    // 1. Create independent entities first
    if (data.organizations) {
      data.organizations.forEach(opt => generators.fakeOrganization.generate(opt, this.data.organizations, this.ID))
    }

    // 2. Create dependent entities
    if (data.users) {
      data.users.forEach(opt => generators.fakeUser.generate(opt, this.data.users, this.ID))
    }

    // 3. Create relationship entities last
    if (data.userOrganizations) {
      data.userOrganizations.forEach(opt =>
        generators.fakeUserOrganization.generate(opt, this.data.userOrganizations, this.ID)
      )
    }

    return this
  }

  // Fluent API for individual entity creation
  organization(opt: any = {}) {
    generators.fakeOrganization.generate(opt, this.data.organizations, this.ID)
    return this
  }

  user(opt: any = {}) {
    generators.fakeUser.generate(opt, this.data.users, this.ID)
    return this
  }

  build() {
    return new Selector(this.data, this.ID)
  }
}
```

### 4. Selector - Data Access and Query Interface

**Purpose**: Provides convenient access patterns to generated data with relationship traversal.

```typescript
export default class Selector {
  data: DomainTableArrays
  private idProvider?: IdProvider

  // Pre-computed indexes for efficient access
  readonly users: Record<userId, User>
  readonly organizations: Record<orgId, Organization>
  readonly usersByOrganization: Record<orgId, User[]>
  readonly organizationsByUser: Record<userId, Organization[]>

  constructor(data: DomainTableArrays, idProvider?: IdProvider) {
    this.data = { ...data }
    this.idProvider = idProvider

    // Build indexes
    this.users = this.createObjectArray(this.data.users)
    this.organizations = this.createObjectArray(this.data.organizations)
    this.usersByOrganization = this.createObjectArrayGroupBy(this.data.userOrganizations, 'orgId')
    this.organizationsByUser = this.createObjectArrayGroupBy(this.data.userOrganizations, 'userId')
  }

  // Direct access methods
  getUser(id: userId) {
    const resolvedId = this.idProvider ? this.idProvider(id, { exact: true }) : id
    return this.users[resolvedId]
  }

  getOrganization(id: orgId) {
    const resolvedId = this.idProvider ? this.idProvider(id, { exact: true }) : id
    return this.organizations[resolvedId]
  }

  // Relationship traversal
  getUsersByOrganization(orgId: orgId) {
    return this.usersByOrganization[orgId] || []
  }

  getOrganizationsByUser(userId: userId) {
    return this.organizationsByUser[userId] || []
  }

  // Random selection utilities
  getRandomUser() {
    return faker.helpers.arrayElement(Object.values(this.users))
  }

  // GraphQL/API response builders
  getUserResponse(userId: userId) {
    const user = this.getUser(userId)
    return {
      user: {
        ...user,
        organizations: this.getOrganizationsByUser(userId).map(rel => ({
          ...rel,
          organization: this.getOrganization(rel.orgId),
        })),
      },
    }
  }

  // Utility methods
  private createObjectArray<T>(array?: T[], key: string = '_id') {
    if (!array) return {} as Record<string, T>
    return array.reduce(
      (prev, current) => ({
        ...prev,
        [current[key]]: current,
      }),
      {} as Record<string, T>
    )
  }

  private createObjectArrayGroupBy<T>(array?: T[], key: string = '_id') {
    if (!array) return {} as Record<string, T[]>
    return array.reduce(
      (obj, item) => ({
        ...obj,
        [item[key]]: array.filter(i => i[key] === item[key]),
      }),
      {} as Record<string, T[]>
    )
  }
}
```

### 5. TestContext - Integration and Database Operations

**Purpose**: Coordinates the entire test data lifecycle with database integration.

```typescript
export class TestContext {
  private db: DatabaseAdapter
  scenario: Scenario
  selector?: Selector
  idProvider: ReturnType<typeof IdProvider>

  private constructor(db: DatabaseAdapter) {
    this.db = db
    this.idProvider = IdProvider()
    this.scenario = new Scenario(this.idProvider)
  }

  static async create(db: DatabaseAdapter) {
    if (!db) {
      throw new Error('TestContext requires a database adapter instance')
    }
    return new TestContext(db)
  }

  // Data merging for base + test-specific data
  mergeData(baseData: DataGenObject, testData: DataGenObject): DataGenObject {
    const merged = { ...baseData }

    Object.keys(testData).forEach(key => {
      if (Array.isArray(baseData[key]) && Array.isArray(testData[key])) {
        merged[key] = [...baseData[key], ...testData[key]]
      } else if (testData[key]) {
        merged[key] = testData[key]
      }
    })

    return merged
  }

  // Build and insert data
  async bulkAdd(data: DataGenObject) {
    this.scenario.bulkAdd(data)
    this.selector = this.scenario.build()
    return this
  }

  async insert() {
    if (!this.selector) return
    const data = this.selector.getRawTestData()
    await this.db.upsertGeneratedData(data)
  }

  // Complete test setup with authentication
  async setupEnv(
    baseData: DataGenObject,
    testData: DataGenObject = {},
    page?: Page,
    authUserId?: string,
    loginFn?: (page: Page, user: User) => Promise<void>
  ) {
    // 1. Merge and insert data
    const mergedData = this.mergeData(baseData, testData)
    await this.bulkAdd(mergedData).insert()

    // 2. Handle authentication if needed
    let authUser: User | undefined
    if (authUserId && page && loginFn) {
      authUser = this.selector!.getUser(authUserId)
      if (!authUser) {
        throw new Error(`User with ID '${authUserId}' not found`)
      }
      await loginFn(page, authUser)
    }

    return {
      selector: this.selector!,
      authUser,
    }
  }
}
```

## Implementation Steps

### 1. Define Your Domain Types

```typescript
// Create type definitions for your entities
interface User {
  _id: string
  email: string
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
}

interface Organization {
  _id: string
  name: string
  type: 'COMPANY' | 'NONPROFIT'
  createdAt: string
}

// Define your table arrays type
interface DomainTableArrays {
  users: User[]
  organizations: Organization[]
  userOrganizations: UserOrganization[]
}
```

### 2. Create Generators

```typescript
// For each entity, create a generator
export function generate(opts?: Partial<User>, userArray?: User[], idProvider?: IdProvider) {
  const provider = idProvider || IdProvider()
  const _id = provider(opts?._id)

  const user: User = {
    _id,
    email: opts?.email || faker.internet.email(),
    name: opts?.name || faker.person.fullName(),
    status: opts?.status || 'ACTIVE',
    createdAt: opts?.createdAt || generateRandomTimestamp(),
  }

  if (userArray) userArray.push(user)
  return user
}
```

### 3. Build Database Adapter

```typescript
export class DatabaseAdapter {
  async upsertGeneratedData(data: DomainTableArrays) {
    // Implement your database insertion logic
    // Handle transactions, constraints, and error handling
  }
}
```

### 4. Create Test Usage Patterns

```typescript
// Base data for common scenarios
const baseData = {
  organizations: [{ name: 'Test Org' }],
  users: [{ email: 'admin@test.com', name: 'Admin User' }],
}

// Test-specific data
const testData = {
  users: [{ email: 'test@example.com', name: 'Test User' }],
}

// Usage in tests
const context = await TestContext.create(db)
const { selector, authUser } = await context.setupEnv(baseData, testData, page, 'admin', loginFunction)

// Access data in tests
const user = selector.getUser('admin')
const org = selector.getOrganization('test-org')
const users = selector.getUsersByOrganization('test-org')
```

## Key Benefits

1. **Consistency**: ID mapping ensures data relationships remain intact
2. **Reusability**: Base data can be shared across multiple tests
3. **Flexibility**: Test-specific data can override or extend base data
4. **Maintainability**: Centralized data generation logic
5. **Performance**: Pre-computed indexes for efficient data access
6. **Integration**: Seamless database and authentication integration

## Best Practices

1. **Dependency Ordering**: Create independent entities before dependent ones
2. **ID Consistency**: Always use the IdProvider for relationship references
3. **Realistic Data**: Use faker.js for believable test data
4. **Error Handling**: Implement proper error handling in database operations
5. **Transaction Safety**: Use database transactions for data insertion
6. **Memory Management**: Avoid storing large datasets in memory unnecessarily

## File Structure

```
src/
├── test-context/
│   ├── IdProvider.ts          # ID management
│   ├── Scenario.ts            # Data assembly
│   ├── TestContext.ts         # Main integration class
│   └── types.ts              # Type definitions
├── generators/
│   ├── index.ts              # Export all generators
│   ├── user.ts               # User entity generator
│   ├── organization.ts       # Organization entity generator
│   └── helpers.ts            # Shared utility functions
├── selectors/
│   └── index.ts              # Data access interface
└── database/
    └── adapter.ts            # Database operations
```

This architecture provides a robust foundation for test data management that can scale with your application's complexity while maintaining consistency and reliability across your test suite.
