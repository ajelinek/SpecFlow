# API Endpoints

## 1. Authentication Module
### 1.1. POST /api/auth/register
*   `Description: Creates a new user account.`
*   `Request Body (JSON):`
    ```json
    {
        "email": "string (unique)",
        "password": "string (min 8 chars, strong)"
    }
    ```
*   `Success Response (201 Created) (JSON):`
    ```json
    {
        "message": "User registered successfully",
        "token": "string (JWT)"
    }
    ```
*   `Error Responses:`
    *   `400 Bad Request: { message: "Invalid input", errors: [...] }`
    *   `409 Conflict: { message: "Email already exists" }`

### 1.2. POST /api/auth/login
*   `Description: Logs in an existing user.`
*   `Request Body (JSON):`
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "message": "Login successful",
        "token": "string (JWT)"
    }
    ```
*   `Error Responses:`
    *   `400 Bad Request: { message: "Invalid input" }`
    *   `401 Unauthorized: { message: "Invalid credentials" }`

## 2. Client Management Module (Authenticated)
### 2.1. GET /api/clients
*   `Description: Retrieves all clients owned by the authenticated user.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin`
*   `Request Query Params:`
    *   `search: string (optional, case-insensitive search by client name)`
    *   `industry: string (optional, filter by industry)`
*   `Success Response (200 OK) (JSON):`
    ```json
    [
        { "id": "uuid", "name": "string", "industry": "string", "contactEmail": "string", "createdAt": "datetime" }
    ]
    ```
*   `Error Responses: 401 Unauthorized, 403 Forbidden`

### 2.2. POST /api/clients
*   `Description: Creates a new client for the authenticated user.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin`
*   `Request Body (JSON):`
    ```json
    {
        "name": "string (required)",
        "industry": "string (optional)",
        "contactEmail": "string (optional, valid email)"
    }
    ```
*   `Success Response (201 Created) (JSON):`
    ```json
    {
        "id": "uuid",
        "name": "string",
        "industry": "string",
        "contactEmail": "string",
        "createdAt": "datetime",
        "message": "Client created successfully"
    }
    ```
*   `Error Responses: 400 Bad Request, 401 Unauthorized, 403 Forbidden`

### 2.3. GET /api/clients/:id
*   `Description: Retrieves a specific client by ID.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin (must own client or be admin)`
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "id": "uuid",
        "name": "string",
        "industry": "string",
        "contactEmail": "string",
        "createdAt": "datetime"
    }
    ```
*   `Error Responses: 401 Unauthorized, 403 Forbidden, 404 Not Found`

### 2.4. PUT /api/clients/:id
*   `Description: Updates an existing client by ID.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin (must own client or be admin)`
*   `Request Body (JSON):`
    ```json
    {
        "name": "string (optional)",
        "industry": "string (optional)",
        "contactEmail": "string (optional, valid email)"
    }
    ```
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "id": "uuid",
        "name": "string",
        "industry": "string",
        "contactEmail": "string",
        "updatedAt": "datetime",
        "message": "Client updated successfully"
    }
    ```
*   `Error Responses: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found`

### 2.5. DELETE /api/clients/:id
*   `Description: Deletes a client by ID.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin (must own client or be admin)`
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "message": "Client deleted successfully"
    }
    ```
*   `Error Responses: 401 Unauthorized, 403 Forbidden, 404 Not Found`

## 3. Deal Management Module (Authenticated)
### 3.1. GET /api/deals
*   `Description: Retrieves all deals associated with the authenticated user's clients.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin`
*   `Request Query Params:`
    *   `stage: string (optional, filter by deal stage)`
    *   `clientId: string (optional, filter by client ID)`
*   `Success Response (200 OK) (JSON):`
    ```json
    [
        { "id": "uuid", "clientId": "uuid", "name": "string", "amount": "float", "stage": "string", "closeDate": "date", "createdAt": "datetime" }
    ]
    ```
*   `Error Responses: 401 Unauthorized, 403 Forbidden`

### 3.2. POST /api/deals
*   `Description: Creates a new deal for a client.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin`
*   `Request Body (JSON):`
    ```json
    {
        "clientId": "string (required, uuid of an existing client)",
        "name": "string (required)",
        "amount": "float (required, non-negative)",
        "stage": "string (required, from DealStageEnum)",
        "closeDate": "date (optional)"
    }
    ```
*   `Success Response (201 Created) (JSON):`
    ```json
    {
        "id": "uuid",
        "clientId": "uuid",
        "name": "string",
        "amount": "float",
        "stage": "string",
        "closeDate": "date",
        "createdAt": "datetime",
        "message": "Deal created successfully"
    }
    ```
*   `Error Responses: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found (if clientId doesn't exist or not accessible)`

### 3.3. GET /api/deals/:id
*   `Description: Retrieves a specific deal by ID.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin (must be associated with client or be admin)`
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "id": "uuid",
        "clientId": "uuid",
        "name": "string",
        "amount": "float",
        "stage": "string",
        "closeDate": "date",
        "createdAt": "datetime"
    }
    ```
*   `Error Responses: 401 Unauthorized, 403 Forbidden, 404 Not Found`

### 3.4. PUT /api/deals/:id
*   `Description: Updates an existing deal by ID.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin (must be associated with client or be admin)`
*   `Request Body (JSON):`
    ```json
    {
        "name": "string (optional)",
        "amount": "float (optional, non-negative)",
        "stage": "string (optional, from DealStageEnum)",
        "closeDate": "date (optional)"
    }
    ```
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "id": "uuid",
        "clientId": "uuid",
        "name": "string",
        "amount": "float",
        "stage": "string",
        "closeDate": "date",
        "updatedAt": "datetime",
        "message": "Deal updated successfully"
    }
    ```
*   `Error Responses: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found`

### 3.5. DELETE /api/deals/:id
*   `Description: Deletes a deal by ID.`
*   `Authentication: Required (JWT)`
*   `Authorization: Roles: sales, admin (must be associated with client or be admin)`
*   `Success Response (200 OK) (JSON):`
    ```json
    {
        "message": "Deal deleted successfully"
    }
    ```
*   `Error Responses: 401 Unauthorized, 403 Forbidden, 404 Not Found`
