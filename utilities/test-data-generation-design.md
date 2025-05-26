# Data Generation Pattern: Detailed Guide

## Overview

This guide explains the data generation pattern used in this project. It covers how entity generators work, how the `Scenario` builder composes data, how IDs are managed, and how to extend the pattern for new entity types. This is written for junior developers and includes concrete examples from the codebase.

---

## Core Concepts

### 1. Entity Generators

**Entity generators** are functions that create a single instance of a data type (like a user, community, or group) with realistic, random, or default values. They use the [faker](https://fakerjs.dev/) library to generate fake data and accept an `options` object to override any field.

**Each generator lives in its own file** (e.g., `generators/community.ts`, `generators/user.ts`).

#### Example: Community Generator (`generators/community.ts`)

```ts
import { faker } from '@faker-js/faker'
import { generateFutureDate, generateIdentifier, generateRandomTimestamp } from './helpers'
import { IdProvider } from './identifiers'
import type { dbCommunityPartial, dbCommunity } from 'retamica-types'

export function generateCommunity(ID = IdProvider(), options: dbCommunityPartial = {}): dbCommunity {
  const community: dbCommunity = {
    communityId: ID(options.communityId),
    communityName: 'communityName' in options ? options.communityName! : faker.company.name(),
    // ... more fields ...
    upsertTimestamp: 'upsertTimestamp' in options ? options.upsertTimestamp! : generateRandomTimestamp(),
    endTimestamp: 'endTimestamp' in options ? options.endTimestamp : null,
  }
  return community
}
```

- **ID**: The first argument is an ID provider function. It ensures every entity gets a unique ID, or reuses a provided one.
- **options**: You can override any field by passing it in the options object.
- **faker**: Used to generate realistic random data for fields not provided.

### 2. IdProvider: Unique ID Management and Shorthand Mapping

The `IdProvider` is a function that generates and tracks unique IDs for all entities. It can also map a provided string to a generated ID, ensuring consistency across related entities. It's defined in its own file (`identifiers.ts`).

#### Shorthand Mapping for Testing

A key feature of the IdProvider is its support for **shorthand keys** (like `A1`, `C1`, etc.) for IDs. This is especially useful in tests:

- You can use short, human-readable keys in your test setup (e.g., `userId: 'A1'`).
- The IdProvider will map these to real database IDs (UUIDs or integers), which are used in the actual data.
- Later, you can use the same shorthand (`A1`) to look up the real ID in your test assertions or queries.
- This is critical when your database uses opaque keys (like UUIDs or auto-increment integers), but you want readable, stable references in your test code.

#### Example: Using Shorthand Keys

```ts
const ids = IdProvider()
const user = generateUser(ids, { userId: 'A1' })
const community = generateCommunity(ids, { communityId: 'C1' })
// ...
// Later in your test, get the real DB id for 'A1':
const realUserId = ids('A1')
```

#### Implementation (`identifiers.ts`)

```ts
export function IdProvider() {
  const idMap = new Map<string, string>()
  return function ID(str: string, exact = false, log = false) {
    if (log) {
      console.log(idMap)
      return
    }
    if ((str && idMap.has(str)) || exact) return idMap.get(str)
    const newId = generateIdentifier()
    if (!str) {
      idMap.set(newId, newId)
      return newId
    }
    if (str && str.length > 10) {
      idMap.set(str, str)
      return str
    }
    idMap.set(str, newId)
    return newId
  }
}
```

- **Purpose**: Guarantees unique IDs and allows mapping of custom keys to generated IDs.
- **Usage**: Always pass the same IdProvider instance to all generators in a scenario to keep IDs consistent.
- **Shorthand**: Use short keys for easy reference in tests, and retrieve the real ID later.

### 3. Helper Functions

Helpers like `generateIdentifier`, `generateRandomTimestamp`, and others are used to create random values for fields. These are defined in a common helpers file (`helpers.ts`):

- `generateIdentifier()`: Returns a UUID string.
- `generateRandomTimestamp()`: Returns a random date near today.
- `generateFutureDate(months)`: Returns a date string some months in the future.

### 4. Scenario Builder: Composing and Holding Data

The `Scenario` class lets you build up a set of related entities by chaining method calls. Each method adds an entity to the scenario using its generator. Internally, the Scenario holds onto the generated data in arrays, one for each entity type (e.g., `dbUsers`, `dbCommunities`, etc.).

This class is defined in its own file (`Scenario.ts`).

#### How Data is Held

- Each time you call a method like `.user()` or `.community()`, the generated entity is pushed onto the corresponding array inside the Scenario instance.
- All these arrays are private to the Scenario and accumulate as you build up your scenario.
- When you call `.build()`, all the arrays are packaged up and passed to the Selector.

#### Example

```ts
const scenario = new Scenario()
  .community({ communityId: 'C1', communityName: 'Test Community' })
  .user({ userId: 'A1', emailAddress: 'user@example.com' })
  .communityAdmin({ userId: 'A1', communityId: 'C1' })
  .build()

// Internally, scenario.dbCommunities, scenario.dbUsers, etc. now hold the generated data.
```

### 5. Selector: Accessing and Querying Data

The `Selector` class is constructed with all the data built by the scenario. It provides methods to retrieve entities by ID, get all entities of a type, or query relationships between entities.

This class is defined in its own file (`Selector.ts`).

#### Why Use a Selector?

- Keeps the data access logic separate from the data generation logic.
- Makes it easy to write tests that query the generated data in a way similar to how your application code would.
- Allows you to add utility methods for common queries (e.g., `getCommunityAdmins(communityId)`).

#### Example

```ts
const selector = scenario.build()
const realUserId = scenario.ids('A1')
const realCommunityId = scenario.ids('C1')
const user = selector.getUser(realUserId)
const community = selector.getCommunity(realCommunityId)
const allCommunities = selector.getAllCommunities()
```

- The Selector provides a clean API for accessing the generated data, so your tests remain readable and maintainable.

---

## File Structure

The data generation pattern is organized into several files:

```
src/test/
├── generators/
│   ├── community.ts       # Community entity generator
│   ├── user.ts            # User entity generator
│   ├── communityAdmin.ts  # CommunityAdmin entity generator
│   └── ... (other entity generators)
├── helpers.ts             # Common helper functions
├── identifiers.ts         # IdProvider implementation
├── Scenario.ts            # Scenario builder class
└── Selector.ts            # Data access class
```

## Best Practices

- Always use the same IdProvider instance for all generators in a scenario.
- Use short keys for IDs in your test setup for readability and easy reference.
- Use faker to generate realistic data, but override fields as needed for your test case.
- When adding new entity types, create a new file in the generators directory.
- Keep generator signatures and patterns consistent across all entity types.
- Use partial types for options so you only need to specify fields you want to override.
- Use the Selector to access data, not the raw arrays in Scenario.

## Common Mistakes

- Forgetting to pass the same IdProvider to all generators, causing inconsistent IDs.
- Not updating the Selector or Scenario when adding a new entity type.
- Overriding required fields with invalid or missing data in options.
- Not using faker or helpers, resulting in unrealistic or duplicate data.
- Forgetting to export/import generators from their respective files.

---

## Summary

This pattern lets you quickly build complex, realistic data scenarios for tests or seeding. Each entity generator is in its own file, the Scenario builder composes them, and the Selector gives you easy access to the results. Unique IDs and realistic data are handled automatically, but you can override anything as needed for your use case.
