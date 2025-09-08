# Multi-Instance Firebase Emulator Setup for Rank Decider

This document explains the implementation of a multi-instance Firebase emulator setup that allows multiple developers to run independent Firebase emulator instances on the same host machine.

## Overview

The system uses an instance-based port management approach where each developer assigns themselves an instance number (1-9), which is then used to generate unique port numbers for all required services. This prevents port conflicts when multiple developers work on the same host.

## Key Components

### 1. Port Configuration

The system uses a base port configuration file (`ports.json`) that defines default ports:

```json
{
  "firebase": {
    "firestore": 8080,
    "auth": 9099,
    "storage": 9199,
    "functions": 5001,
    "hosting": 5000,
    "ui": 4000
  },
  "web": {
    "ui": 3333
  }
}
```

When a developer sets up their instance, these base ports are prefixed with their instance number to create unique ports:

```javascript
function updatePortsWithInstance(ports, instance) {
  const updated = { firebase: {}, web: {} };
  for (const [key, value] of Object.entries(ports.firebase)) {
    updated.firebase[key] = Number(`${instance}${value}`);
  }
  for (const [key, value] of Object.entries(ports.web)) {
    updated.web[key] = Number(`${instance}${value}`);
  }
  return updated;
}
```

For example, if a developer chooses instance `1`:

- Firestore port: `18080`
- Auth port: `19099`
- UI port: `13333`

### 2. Setup Process

The setup process is handled by `scripts/setup-ports.js`, which:

1. Prompts the developer for an instance number (1-9)
2. Reads the base port configuration from `ports.json`
3. Generates instance-specific ports
4. Creates a `ports-local.json` file with these ports
5. Generates `firebase.local.json` with the emulator configuration
6. Creates `.env` with environment variables for the application

```javascript
async function main() {
  const ports = readBasePorts();
  const instance = await promptInstanceNumber();
  const updatedPorts = updatePortsWithInstance(ports, instance);
  fs.writeFileSync(PORTS_LOCAL, JSON.stringify(updatedPorts, null, 2));
  generateFirebaseLocalJson(updatedPorts);
  generateEnv(updatedPorts);
  console.log("Generated firebase.local.json and .env with instance-specific ports.");
}
```

### 3. Environment Variables

The setup script generates environment variables that are used by both the application and testing framework:

```javascript
function generateEnv(ports) {
  const envContent = `PUBLIC_FIRESTORE_EMULATOR_HOST=localhost:${ports.firebase.firestore}
PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:${ports.firebase.auth}
PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST=localhost:${ports.firebase.storage}
PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:${ports.firebase.functions}
FIREBASE_AUTH_EMULATOR_HOST=localhost:${ports.firebase.auth}
FIRESTORE_EMULATOR_HOST=localhost:${ports.firebase.firestore}
FIREBASE_STORAGE_EMULATOR_HOST=localhost:${ports.firebase.storage}
FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:${ports.firebase.functions}
UI_PORT=${ports.web.ui}`;
  fs.writeFileSync(".env", envContent);
}
```

### 4. Firebase Configuration

The system creates a local Firebase configuration file that uses the instance-specific ports:

```javascript
function generateFirebaseLocalJson(ports) {
  // Read existing firebase.json
  const firebaseJson = JSON.parse(fs.readFileSync("firebase.json", "utf8"));

  // Add or update emulators section
  firebaseJson.emulators = {
    auth: { port: ports.firebase.auth },
    functions: { port: ports.firebase.functions },
    firestore: { port: ports.firebase.firestore },
    hosting: { port: ports.firebase.hosting },
    storage: { port: ports.firebase.storage },
    ui: { enabled: true, port: ports.firebase.ui },
  };

  // Write to firebase.local.json
  fs.writeFileSync("firebase.local.json", JSON.stringify(firebaseJson, null, 2));
}
```

### 5. Integration with Astro

The Astro configuration reads the UI port from environment variables:

```javascript
// astro.config.mjs
import "dotenv/config";

const uiPortRaw = process.env.UI_PORT;
const uiPort = uiPortRaw && !isNaN(Number(uiPortRaw)) ? Number(uiPortRaw) : null;
console.log("🚀 ~ uiPort:", uiPort);
if (!uiPort) {
  throw new Error("UI_PORT must be set in .env and must be a valid number");
}

export default defineConfig({
  // ...
  server: {
    port: uiPort,
  },
  // ...
});
```

### 6. Integration with Playwright

The Playwright configuration also reads the UI port from environment variables:

```typescript
// playwright.config.ts
import dotenv from "dotenv";
dotenv.config();

const uiPort = process.env.UI_PORT || "4000";
const baseUrl = `http://localhost:${uiPort}`;

export default defineConfig({
  // ...
  use: {
    baseURL: baseUrl,
    // ...
  },
  // ...
  webServer: {
    command: "npm run dev",
    url: baseUrl,
    // ...
  },
});
```

### 7. E2E Test Integration

The E2E tests are updated to use the environment-specific ports:

```typescript
// e2e/utilities/auth-helpers.ts
export function initFirebaseAdmin() {
  // ...
  const authPort = process.env.FIREBASE_AUTH_EMULATOR_HOST || "localhost:9099";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = authPort;

  const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || "localhost:8080";
  const firestore = admin.firestore();
  firestore.settings({
    host: firestoreHost,
    ssl: false,
  });
  // ...
}
```

### 8. Process Management

The system includes a script to kill processes on the instance-specific ports:

```javascript
// scripts/kill-firebase-ports.js
try {
  // Read stored port information
  const portInfo = JSON.parse(fs.readFileSync("ports-local.json", "utf8"));

  // Extract all ports
  const ports = Object.values(portInfo).join(" ");

  // Kill processes on these ports
  console.log(`Killing processes on ports: ${ports}`);
  execSync(`kill-port ${ports}`, { stdio: "inherit" });

  console.log("Firebase emulators killed successfully");
} catch (error) {
  // Fallback to default ports if file doesn't exist
  console.log("Falling back to default ports...");
  execSync("kill-port 8080 9099 4000 9199 5001 5000", { stdio: "inherit" });
}
```

## Usage Workflow

1. **Initial Setup**:

   ```sh
   pnpm run setup:ports
   # Enter instance number when prompted
   ```

2. **Start Development Environment**:

   ```sh
   pnpm run dev
   ```

   This runs both Astro and Firebase emulators in parallel using the configured ports.

3. **Run Tests**:

   ```sh
   pnpm test
   ```

   Tests use the dotenv-cli to load environment variables and connect to the correct ports.

4. **Kill Emulators**:
   ```sh
   pnpm run firebase:emulators:kill
   ```
   This terminates all processes running on the configured ports.

## Benefits

1. **Multiple Developers**: Allows multiple developers to work on the same host machine without port conflicts
2. **Isolated Environments**: Each developer has their own isolated Firebase emulator environment
3. **Consistent Configuration**: Environment variables are automatically generated for both application and tests
4. **Simple Setup**: One-time setup with a simple command and instance number selection
5. **Process Management**: Easy to start and stop emulators with the correct port configuration

## Implementation Details

1. **NPM Scripts**:

   - `setup:ports`: Configures instance-specific ports
   - `dev:firebase`: Starts Firebase emulators with custom configuration
   - `firebase:emulators:kill`: Kills processes on configured ports
   - `dev`: Runs both Astro and Firebase emulators in parallel
   - `test`: Runs tests with environment variables from .env

2. **Configuration Files**:

   - `ports.json`: Base port configuration
   - `ports-local.json`: Instance-specific port configuration (generated)
   - `firebase.local.json`: Firebase configuration with custom ports (generated)
   - `.env`: Environment variables for application and tests (generated)

3. **Git Exclusions**:
   The following files are added to `.gitignore` to prevent conflicts:
   ```
   .env.local
   firebase.local.json
   ports-local.json
   ```

## Conclusion

This multi-instance Firebase emulator setup provides a robust solution for teams working on Firebase-based applications. By using instance-based port prefixing, the system ensures that each developer can work independently without port conflicts, while maintaining a consistent development environment across the team.
