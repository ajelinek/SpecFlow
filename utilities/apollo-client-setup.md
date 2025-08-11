---
description: Apollo Client setup and integration patterns
type: utility
---

# Client Factory

```ts
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'

export function createApolloClient({ uri, link }: { uri?: string; link?: import('@apollo/client').ApolloLink }) {
  const http = new HttpLink({ uri, credentials: 'include' })
  return new ApolloClient({
    link: link ?? http,
    cache: new InMemoryCache({ typePolicies: {} }),
    connectToDevTools: process.env.NODE_ENV !== 'production',
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-first' }, query: { fetchPolicy: 'cache-first' } },
  })
}
```

# Cache Policies

```ts
import { InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

export const cache = new InMemoryCache({
  possibleTypes,
  typePolicies: { Query: { fields: { comments: relayStylePagination() } } },
})
```

# Links

```ts
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { BatchHttpLink } from '@apollo/client/link/batch-http'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  /* map & report */
})
const authLink = setContext(async () => ({ headers: { authorization: await getAuthHeader() } }))
const httpLink = new BatchHttpLink({ uri: '/graphql', batchMax: 5, batchInterval: 20 })
export const link = from([errorLink, authLink, httpLink])
```

# Persisted Queries (safelisted)

```ts
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { generatePersistedQueryIdsFromManifest } from '@apollo/persisted-query-lists'

export const persisted = createPersistedQueryLink(
  generatePersistedQueryIdsFromManifest({ loadManifest: () => import('./persisted-query-manifest.json') })
)
```

# SSR

- Create a client per request and rehydrate cache on client with `cache.restore(initialState)`.

# Note

- Subscriptions are not in use; do not configure WS links.
