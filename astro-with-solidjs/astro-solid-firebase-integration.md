---
description: Guidelines for integrating Firebase with Astro and SolidJS applications
ruleType: firebase
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when integrating Firebase services (Authentication, Firestore, Storage) in Astro with SolidJS applications.

# Firebase Setup

## Configuration
```ts
// src/lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config object
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## Authentication

### Auth Store
```ts
// src/stores/auth.ts
import { createStore } from 'solid-js/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/config';

const [authState, setAuthState] = createStore({
  user: null as any,
  loading: true,
  error: null as Error | null,
});

// Subscribe to auth state changes
const unsubscribe = onAuthStateChanged(
  auth,
  (user) => {
    setAuthState({
      user,
      loading: false,
      error: null,
    });
  },
  (error) => {
    setAuthState({
      user: null,
      loading: false,
      error,
    });
  }
);

// Cleanup subscription when needed
const cleanup = () => unsubscribe();

export { authState, cleanup };
```

### Auth Context
```tsx
// src/contexts/AuthContext.tsx
import { createContext, ParentComponent, onCleanup } from 'solid-js';
import { authState, cleanup } from '../stores/auth';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase/config';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>();

export const AuthProvider: ParentComponent = (props) => {
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Cleanup auth subscription when context is unmounted
  onCleanup(() => {
    cleanup();
  });

  const value = {
    get user() { return authState.user; },
    get loading() { return authState.loading; },
    get error() { return authState.error; },
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};
```

## Firestore with SolidJS

### Collection Hook
```tsx
// src/hooks/useCollection.ts
import { createEffect, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  QueryDocumentSnapshot,
  DocumentData,
  Query,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase/config';

export function useCollection<T>(
  path: string, 
  ...queryConstraints: QueryConstraint[]
) {
  const [state, setState] = createStore<{
    data: T[];
    loading: boolean;
    error: Error | null;
  }>({
    data: [],
    loading: true,
    error: null,
  });

  createEffect(() => {
    let q: Query<DocumentData> = query(collection(db, path));
    
    // Apply query constraints if any
    if (queryConstraints.length > 0) {
      q = query(q, ...queryConstraints);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        
        setState({
          data: docs,
          loading: false,
          error: null,
        });
      },
      (error) => {
        console.error('Error getting documents: ', error);
        setState({
          data: [],
          loading: false,
          error,
        });
      }
    );

    onCleanup(() => unsubscribe());
  });

  return state;
}
```

## File Uploads

### Storage Utility
```ts
// src/lib/storage.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase/config';

export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { success: true, url };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error };
  }
};

export const deleteFile = async (fileUrl: string) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error };
  }
};
```

## Astro Integration

### Client-Side Components
```tsx
// src/components/ProtectedContent.astro
---
import { createSignal, onMount } from 'solid-js';
import { useAuth } from '../contexts/AuthContext';

// This component will only be hydrated on the client
const { user, loading } = useAuth();
--->

<div>
  {loading() ? (
    <p>Loading...</p>
  ) : user() ? (
    <slot />
  ) : (
    <p>Please sign in to view this content.</p>
  )}
</div>
```

## Best Practices

1. **Security Rules**: Always implement proper security rules in Firebase Console
2. **Error Handling**: Implement comprehensive error handling in all async operations
3. **Loading States**: Show appropriate loading states during data fetching
4. **Cleanup**: Unsubscribe from listeners when components unmount
5. **Type Safety**: Use TypeScript interfaces for your Firestore documents
6. **Environment Variables**: Store Firebase config in environment variables
7. **Code Splitting**: Use dynamic imports for Firebase features that aren't needed immediately

## Performance Considerations
- Use Firestore's query capabilities to limit data transfer
- Implement pagination for large collections
- Use Firestore's offline persistence for better offline experience
- Implement proper indexing for better query performance

## Testing
- Use Firebase Emulator for local development and testing
- Mock Firebase services in unit tests
- Test security rules using the Firebase Emulator Suite
- Test error scenarios and edge cases
