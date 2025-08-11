---
description: Apollo Server v4 setup and architecture patterns
type: utility
---

# Setup

- SDL-first schemas; build executable schema only when needed (tooling or WS).
- Strongly type `context` via `ApolloServer<MyContext>`.
- Create per-request `DataLoader`, data sources, and auth/session info.
- Use Express integration, CORS, JSON body parser, and HTTP drain.

```ts
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl'
import responseCachePlugin from '@apollo/server-plugin-response-cache'

interface MyContext {
  userId?: string
}

export function createServer(schema: import('graphql').GraphQLSchema, httpServer: import('http').Server) {
  return new ApolloServer<MyContext>({
    schema,
    status400ForVariableCoercionErrors: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginCacheControl({ calculateHttpHeaders: 'if-cacheable' }),
      responseCachePlugin(),
    ],
  })
}
```

# HTTP Middleware

```ts
import express from 'express'
import cors from 'cors'
import { expressMiddleware } from '@as-integrations/express4'

export async function applyGraphQL(app: express.Express, server: ApolloServer) {
  await server.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ userId: await getUserId(req), loaders: buildLoaders() }),
    })
  )
}
```

# Persisted Queries

```ts
new ApolloServer({
  schema,
  persistedQueries: { ttl: 900 },
})
```

# Notes

- Keep resolvers thin; move logic to services.
- Use cache hints and response cache where safe.
