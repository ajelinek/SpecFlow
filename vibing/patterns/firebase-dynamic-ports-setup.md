# Firebase Dynamic Ports Setup Pattern

**Purpose**: This pattern outlines how to set up Firebase emulators to run on unique port instances, allowing multiple developers to work on the same host machine without port conflicts. It includes the complete implementation including scripts, configuration files, environment variables, and integration points.

## Overview

The dynamic ports pattern uses an instance-based port management system where each developer assigns themselves an instance number (1-9), which is then used to generate unique port numbers for all Firebase services. This prevents port conflicts when multiple developers work on the same host.

## Architecture

### Core Concept

**Port Calculation Formula:**

```
Instance Port = Instance Number + Base Port
```

**Example:**

- Base Firestore port: `8080`
- Instance 1: `18080`
- Instance 2: `28080`
- Instance 9: `98080`

### Components

1. **Base Port Configuration** (`ports.json`) - Template with default ports
2. **Instance Port Configuration** (`ports-local.json`) - Generated per developer
3. **Firebase Local Config** (`firebase.local.json`) - Generated with instance ports
4. **Environment Variables** (`.env`) - Generated with emulator hosts
5. **Setup Script** (`scripts/setup-ports.js`) - Generates all configurations
6. **Port Killing Script** (`scripts/kill-firebase-ports.js`) - Cleans up processes

## Implementation

### Step 1: Base Port Configuration

**File:** `ports.json` (committed to version control)

```json
{
  "firebase": {
    "firestore": 8080,
    "auth": 9099,
    "storage": 9199,
    "functions": 5001,
    "hosting": 5000,
    "ui": 4000,
    "database": 9000
  },
  "web": {
    "ui": 3333
  }
}
```

**Purpose:**

- Defines base port numbers for all services
- Serves as template for instance-specific ports
- Committed to version control for consistency

### Step 2: Setup Script Implementation

**File:** `scripts/setup-ports.js`

**Complete Implementation:**

```javascript
import fs from 'fs'
import readline from 'readline'

const PORTS_TEMPLATE = 'ports.json'
const PORTS_LOCAL = 'ports-local.json'

/**
 * Prompts user for instance number (1-9)
 */
async function promptInstanceNumber() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise(resolve => {
    rl.question('Enter instance number (1-9): ', answer => {
      rl.close()
      const num = parseInt(answer, 10)
      if (isNaN(num) || num < 1 || num > 9) {
        console.error('Invalid instance number. Must be 1-9.')
        process.exit(1)
      }
      resolve(num)
    })
  })
}

/**
 * Reads base port configuration from ports.json
 */
function readBasePorts() {
  return JSON.parse(fs.readFileSync(PORTS_TEMPLATE, 'utf8'))
}

/**
 * Updates ports with instance number prefix
 * Formula: instance + basePort (e.g., 1 + 8080 = 18080)
 */
function updatePortsWithInstance(ports, instance) {
  const updated = { firebase: {}, web: {} }
  for (const [key, value] of Object.entries(ports.firebase)) {
    updated.firebase[key] = Number(`${instance}${value}`)
  }
  for (const [key, value] of Object.entries(ports.web)) {
    updated.web[key] = Number(`${instance}${value}`)
  }
  return updated
}

/**
 * Generates firebase.local.json with instance-specific ports
 */
function generateFirebaseLocalJson(ports) {
  // Read existing firebase.json
  const firebaseJson = JSON.parse(fs.readFileSync('firebase.json', 'utf8'))

  // Check if functions directory exists
  const hasFunctions = fs.existsSync('functions')

  // Add or update emulators section
  firebaseJson.emulators = {
    auth: { port: ports.firebase.auth },
    firestore: { port: ports.firebase.firestore },
    hosting: { port: ports.firebase.hosting },
    storage: { port: ports.firebase.storage },
    database: { port: ports.firebase.database },
    ui: { enabled: true, port: ports.firebase.ui },
    singleProjectMode: true,
  }

  // Only add functions if functions directory exists
  if (hasFunctions) {
    firebaseJson.emulators.functions = { port: ports.firebase.functions }
  }

  // Write to firebase.local.json
  fs.writeFileSync('firebase.local.json', JSON.stringify(firebaseJson, null, 2))
}

/**
 * Generates .env file with Firebase emulator host environment variables
 */
function generateEnv(ports) {
  const envContent = `PUBLIC_FIRESTORE_EMULATOR_HOST=localhost:${ports.firebase.firestore}
PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:${ports.firebase.auth}
PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST=localhost:${ports.firebase.storage}
PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:${ports.firebase.functions}
PUBLIC_DATABASE_EMULATOR_HOST=localhost:${ports.firebase.database}
FIREBASE_AUTH_EMULATOR_HOST=localhost:${ports.firebase.auth}
FIRESTORE_EMULATOR_HOST=localhost:${ports.firebase.firestore}
FIREBASE_STORAGE_EMULATOR_HOST=localhost:${ports.firebase.storage}
FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:${ports.firebase.functions}
DATABASE_EMULATOR_HOST=localhost:${ports.firebase.database}
UI_PORT=${ports.web.ui}`
  fs.writeFileSync('.env', envContent)
}

/**
 * Main setup function
 */
async function main() {
  const ports = readBasePorts()
  const instance = await promptInstanceNumber()
  const updatedPorts = updatePortsWithInstance(ports, instance)
  fs.writeFileSync(PORTS_LOCAL, JSON.stringify(updatedPorts, null, 2))
  generateFirebaseLocalJson(updatedPorts)
  generateEnv(updatedPorts)
  console.log('Generated firebase.local.json and .env with instance-specific ports.')
}

main()
```

**What it does:**

1. Prompts for instance number (1-9)
2. Reads base ports from `ports.json`
3. Calculates instance-specific ports
4. Generates `ports-local.json` with instance ports
5. Generates `firebase.local.json` with emulator configuration (conditionally includes functions if `functions` directory exists)
6. Generates `.env` with environment variables

**Functions Emulator Handling:**

- Checks if `functions` directory exists before adding functions emulator
- Prevents Firebase errors when functions emulator is configured but no functions code exists
- Only includes functions in emulator config if functions directory is present

### Step 3: Port Killing Script

**File:** `scripts/kill-firebase-ports.js`

**Complete Implementation:**

```javascript
import fs from 'fs'
import { spawn } from 'child_process'

/**
 * Kills a process on a specific port
 */
function killPort(port) {
  return new Promise(resolve => {
    const proc = spawn('npx', ['kill-port', String(port)], { stdio: 'inherit' })
    proc.on('close', code => {
      // Ignore errors - port might not be in use
      resolve()
    })
  })
}

async function main() {
  try {
    // Read stored port information
    const portInfo = JSON.parse(fs.readFileSync('ports-local.json', 'utf8'))

    let portsToKillArray = []

    // Extract Firebase emulator ports
    if (portInfo.firebase && typeof portInfo.firebase === 'object') {
      portsToKillArray.push(...Object.values(portInfo.firebase))
    }

    // Extract Web UI ports
    if (portInfo.web && typeof portInfo.web === 'object') {
      portsToKillArray.push(...Object.values(portInfo.web))
    }

    // Filter for valid numbers and remove duplicates
    const uniquePorts = [...new Set(portsToKillArray.filter(port => typeof port === 'number' && !isNaN(port)))]

    // Kill processes on these ports
    if (uniquePorts.length > 0) {
      const portsString = uniquePorts.join(' ')
      console.log(`Killing processes on ports: ${portsString}`)

      // Kill each port individually to avoid argument parsing issues
      await Promise.all(uniquePorts.map(port => killPort(port)))

      console.log('Processes on specified ports killed successfully')
    } else {
      console.log('No valid ports found in ports-local.json to kill.')
    }
  } catch (error) {
    console.error('Error killing processes:', error.message)
    // Fallback to default ports if file doesn't exist or parsing fails
    console.log('Falling back to default Firebase emulator ports...')
    const defaultPorts = [8080, 9099, 4000, 9199, 5001, 5000]
    await Promise.all(defaultPorts.map(port => killPort(port)))
  }
}

main()
```

**What it does:**

1. Reads `ports-local.json` for instance-specific ports
2. Extracts all Firebase and web ports
3. Filters for valid port numbers
4. Kills each port individually using `spawn` to avoid argument parsing issues
5. Falls back to default ports if config missing

**Why kill ports individually:**

- Avoids argument parsing issues with space-separated port strings
- More reliable across different shell environments
- Handles errors gracefully (ports might not be in use)

### Step 4: Generated Configuration Files

#### `ports-local.json` (Generated, NOT committed)

**Example for Instance 2:**

```json
{
  "firebase": {
    "firestore": 28080,
    "auth": 29099,
    "storage": 29199,
    "functions": 25001,
    "hosting": 25000,
    "ui": 24000,
    "database": 29000
  },
  "web": {
    "ui": 23333
  }
}
```

#### `firebase.local.json` (Generated, NOT committed)

**Structure:**

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": {
    "predeploy": ["npm --prefix \"$RESOURCE_DIR\" run build"],
    "source": "functions"
  },
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": { "port": 29099 },
    "firestore": { "port": 28080 },
    "hosting": { "port": 25000 },
    "storage": { "port": 29199 },
    "database": { "port": 29000 },
    "ui": { "enabled": true, "port": 24000 },
    "singleProjectMode": true
  }
}
```

**Note:** The `functions` emulator entry is only included if a `functions` directory exists in the project root. If no functions directory is present, the functions emulator configuration is omitted to prevent Firebase startup errors.

#### `.env` (Generated, NOT committed)

**Structure:**

```bash
# Public Firebase SDK variables (for client-side)
PUBLIC_FIRESTORE_EMULATOR_HOST=localhost:28080
PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:29099
PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST=localhost:29199
PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:25001
PUBLIC_DATABASE_EMULATOR_HOST=localhost:29000

# Server-side Firebase Admin variables
FIREBASE_AUTH_EMULATOR_HOST=localhost:29099
FIRESTORE_EMULATOR_HOST=localhost:28080
FIREBASE_STORAGE_EMULATOR_HOST=localhost:29199
FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:25001
DATABASE_EMULATOR_HOST=localhost:29000

# Web UI port
UI_PORT=23333
```

## Integration Points

### 1. Firebase Emulator Startup

**Command:**

```bash
firebase emulators:start --config firebase.local.json
```

**How it works:**

- Reads `firebase.local.json` for emulator configuration
- Uses instance-specific ports from the config
- Starts all configured emulator services

### 2. Frontend Firebase SDK Connection

**File:** `src/store/firebase.ts`

**Implementation:**

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const functions = getFunctions(app)

// Connect to emulators in non-production mode
if (import.meta.env.MODE !== 'production') {
  // Auth
  const authHost = import.meta.env.PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
  if (!authHost) throw new Error('PUBLIC_FIREBASE_AUTH_EMULATOR_HOST is required')
  connectAuthEmulator(auth, `http://${authHost}`)

  // Firestore
  const firestoreHost = import.meta.env.PUBLIC_FIRESTORE_EMULATOR_HOST
  if (!firestoreHost) throw new Error('PUBLIC_FIRESTORE_EMULATOR_HOST is required')
  const [firestoreHostname, firestorePort] = firestoreHost.split(':')
  connectFirestoreEmulator(firestore, firestoreHostname, Number(firestorePort))

  // Storage
  const storageHost = import.meta.env.PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST
  if (!storageHost) throw new Error('PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST is required')
  const [storageHostname, storagePort] = storageHost.split(':')
  connectStorageEmulator(storage, storageHostname, Number(storagePort))

  // Functions
  const functionsHost = import.meta.env.PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST
  if (!functionsHost) throw new Error('PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST is required')
  const [functionsHostname, functionsPort] = functionsHost.split(':')
  connectFunctionsEmulator(functions, functionsHostname, Number(functionsPort))
}

export { app, auth, firestore, storage, functions }
```

**How it works:**

- Reads `PUBLIC_*` environment variables from `.env`
- Connects Firebase SDK to emulators using instance-specific ports
- Only connects in non-production mode

### 3. Backend Firebase Admin SDK Connection

**File:** `data/firebase/firebase-emulator.ts`

**Implementation:**

```typescript
import { initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getDatabase } from 'firebase-admin/database'
import { ENV } from '../../src/shared/config/env'

export async function initializeFirebaseEmulator(projectId: string = 'rank-decider') {
  const databaseURL = `http://${ENV.DATABASE_EMULATOR_HOST}/?ns=${projectId}-default-rtdb`

  // Set database emulator host
  if (ENV.DATABASE_EMULATOR_HOST) {
    process.env.FIREBASE_DATABASE_EMULATOR_HOST = ENV.DATABASE_EMULATOR_HOST
    process.env.FIREBASE_DATABASE_URL = databaseURL
  }

  const app = initializeApp({
    projectId,
    credential: applicationDefault(),
    databaseURL,
  })

  // Configure Firestore to use emulator
  const firestore = getFirestore(app)
  if (!ENV.FIRESTORE_EMULATOR_HOST) {
    throw new Error('FIRESTORE_EMULATOR_HOST is not configured')
  }

  firestore.settings({
    host: ENV.FIRESTORE_EMULATOR_HOST,
    ssl: false,
  })

  // Configure Database to use emulator
  const database = getDatabase(app)

  return { firestore, database, app }
}
```

**How it works:**

- Uses `ENV` object that reads from environment variables
- Configures Firestore and Database to use emulator hosts
- Uses instance-specific ports from `.env`

### 4. Shared Environment Configuration

**File:** `src/shared/config/env.ts`

**Implementation:**

```typescript
/**
 * Shared environment configuration for both frontend and tests
 * Used to ensure consistent environment variable naming and defaults
 */
export const ENV = {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'rank-decider',
  FIRESTORE_EMULATOR_HOST: process.env.PUBLIC_FIRESTORE_EMULATOR_HOST || 'localhost:8080',
  FUNCTIONS_EMULATOR_HOST: process.env.PUBLIC_FUNCTIONS_EMULATOR_HOST || 'localhost:5001',
  AUTH_EMULATOR_HOST: process.env.PUBLIC_AUTH_EMULATOR_HOST || 'localhost:9099',
  STORAGE_EMULATOR_HOST: process.env.PUBLIC_STORAGE_EMULATOR_HOST || 'localhost:9199',
  DATABASE_EMULATOR_HOST: process.env.PUBLIC_DATABASE_EMULATOR_HOST || 'localhost:9000',
}
```

**How it works:**

- Centralizes environment variable access
- Provides defaults for fallback
- Used by both frontend and backend code

### 5. Astro Configuration

**File:** `astro.config.mjs`

**Implementation:**

```javascript
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import 'dotenv/config'

const uiPortRaw = process.env.UI_PORT
const uiPort = uiPortRaw && !isNaN(Number(uiPortRaw)) ? Number(uiPortRaw) : null

if (!uiPort) {
  throw new Error('UI_PORT must be set in .env and must be a valid number')
}

export default defineConfig({
  integrations: [solidJs()],
  server: {
    port: uiPort,
  },
})
```

**How it works:**

- Reads `UI_PORT` from `.env`
- Uses instance-specific web UI port
- Ensures Astro dev server uses correct port

### 6. Playwright Configuration

**File:** `playwright.config.ts`

**Implementation:**

```typescript
import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

const uiPort = process.env.UI_PORT || '4000'
const baseUrl = `http://localhost:${uiPort}`

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: baseUrl,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run dev',
    url: baseUrl,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
```

**How it works:**

- Reads `UI_PORT` from `.env`
- Uses instance-specific port for base URL
- Starts dev server on correct port for tests

### 7. Vitest Configuration

**File:** `vitest.config.ts`

**Implementation:**

```typescript
import { defineConfig } from 'vitest/config'
import * as dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  test: {
    environment: 'node',
    include: ['data/**/*.test.ts', 'functions/src/__tests__/**/*.test.ts'],
    globals: true,
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@e2e': '/e2e',
      '@components': '/src/components',
      '@layouts': '/src/layouts',
      '@types': '/src/types',
      '@store': '/src/store',
      '@e2e/data': '/data',
    },
  },
})
```

**How it works:**

- Loads `.env` file for environment variables
- Tests use Firebase emulator hosts from `.env`
- Connects to instance-specific emulator ports

## Usage Workflow

### Initial Setup

1. **Run setup script:**

   ```bash
   pnpm run setup:ports
   ```

2. **Enter instance number when prompted:**

   ```
   Enter instance number (1-9): 2
   ```

3. **Verify generated files:**
   - `ports-local.json` - Instance-specific ports
   - `firebase.local.json` - Firebase emulator config
   - `.env` - Environment variables

### Starting Emulators

**Command:**

```bash
firebase emulators:start --config firebase.local.json
```

**What happens:**

- Reads `firebase.local.json` for port configuration
- Starts all emulator services on instance-specific ports
- Emulator UI available at configured UI port

### Killing Ports

**Command:**

```bash
pnpm run kill:ports
```

**What happens:**

- Reads `ports-local.json` for instance ports
- Kills all processes on those ports
- Falls back to defaults if config missing

## File Reference Map

| File                             | Status        | Purpose                  | Generated By     |
| -------------------------------- | ------------- | ------------------------ | ---------------- |
| `ports.json`                     | Committed     | Base port template       | Manual           |
| `ports-local.json`               | NOT committed | Instance-specific ports  | `setup-ports.js` |
| `firebase.local.json`            | NOT committed | Firebase emulator config | `setup-ports.js` |
| `.env`                           | NOT committed | Environment variables    | `setup-ports.js` |
| `firebase.json`                  | Committed     | Base Firebase config     | Manual           |
| `scripts/setup-ports.js`         | Committed     | Port setup script        | Manual           |
| `scripts/kill-firebase-ports.js` | Committed     | Port killing script      | Manual           |

## Environment Variable Reference

| Variable                                  | Usage                         | Example (Instance 2) |
| ----------------------------------------- | ----------------------------- | -------------------- |
| `PUBLIC_FIRESTORE_EMULATOR_HOST`          | Frontend Firestore SDK        | `localhost:28080`    |
| `PUBLIC_FIREBASE_AUTH_EMULATOR_HOST`      | Frontend Auth SDK             | `localhost:29099`    |
| `PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST`   | Frontend Storage SDK          | `localhost:29199`    |
| `PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST` | Frontend Functions SDK        | `localhost:25001`    |
| `PUBLIC_DATABASE_EMULATOR_HOST`           | Frontend Database SDK         | `localhost:29000`    |
| `FIRESTORE_EMULATOR_HOST`                 | Backend Firestore Admin       | `localhost:28080`    |
| `FIREBASE_AUTH_EMULATOR_HOST`             | Backend Auth Admin            | `localhost:29099`    |
| `FIREBASE_STORAGE_EMULATOR_HOST`          | Backend Storage Admin         | `localhost:29199`    |
| `FIREBASE_FUNCTIONS_EMULATOR_HOST`        | Backend Functions Admin       | `localhost:25001`    |
| `DATABASE_EMULATOR_HOST`                  | Backend Database Admin        | `localhost:29000`    |
| `UI_PORT`                                 | Astro dev server & Playwright | `23333`              |

## Git Configuration

**Add to `.gitignore`:**

```
ports-local.json
firebase.local.json
.env
.env.local
```

**Why:**

- Each developer has unique instance configuration
- Prevents conflicts in version control
- Allows per-developer customization

## Benefits

1. **Multiple Developers**: Multiple developers can work on same host without conflicts
2. **Isolated Environments**: Each developer has isolated Firebase emulator instance
3. **Consistent Configuration**: Environment variables automatically generated
4. **Simple Setup**: One-time setup with instance number selection
5. **Process Management**: Easy to start/stop emulators with correct ports
6. **Test Integration**: Tests automatically use correct instance ports

## Troubleshooting

### Port Already in Use

**Symptom:** Error when starting emulators

**Solution:**

```bash
pnpm run kill:ports
```

### Missing Configuration Files

**Symptom:** Scripts fail or emulators use wrong ports

**Solution:**

```bash
pnpm run setup:ports
```

### Environment Variables Not Loading

**Symptom:** Application connects to wrong emulator ports

**Solution:**

1. Verify `.env` file exists
2. Check environment variables are correct
3. Restart dev server to reload `.env`

### Wrong Instance Number

**Symptom:** Ports conflict with another developer

**Solution:**

1. Kill existing ports: `pnpm run kill:ports`
2. Reconfigure: `pnpm run setup:ports`
3. Enter different instance number

## Best Practices

1. **Use unique instance numbers**: Coordinate with team to avoid conflicts
2. **Don't commit local configs**: Keep `ports-local.json`, `firebase.local.json`, `.env` in `.gitignore`
3. **Kill ports before restarting**: Always clean up before starting new instances
4. **Verify ports before starting**: Check that ports aren't in use
5. **Document instance assignments**: Keep track of which developers use which instances
