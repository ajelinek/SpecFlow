---
description: Guidelines for integrating Firebase with React applications
ruleType: firebase
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when integrating Firebase services (Authentication, Firestore, Storage) in React applications.

# Firebase Setup

## Configuration
```ts
// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config object
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## Authentication

### Auth Provider
```tsx
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/config';

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## Firestore

### Custom Hook for Data Fetching
```tsx
// src/hooks/useCollection.ts
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase/config';

function useCollection<T>(path: string, conditions: [string, string, any][] = []) {
  const [documents, setDocuments] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let q = query(collection(db, path));
    
    // Apply conditions if any
    if (conditions.length > 0) {
      conditions.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator as any, value));
      });
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setDocuments(docs);
        setLoading(false);
      },
      (err) => {
        console.error('Error getting documents: ', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, JSON.stringify(conditions)]);

  return { documents, loading, error };
}

export default useCollection;
```

## Storage

### File Upload
```tsx
// src/utils/storage.ts
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

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
```

## Security Rules
- Always implement proper security rules in Firebase Console
- Validate data on the client and server
- Use Firebase Security Rules to protect your data
- Test security rules using the Firebase Emulator Suite

## Best Practices
1. **Separation of Concerns**: Keep Firebase logic in separate service files
2. **Error Handling**: Implement comprehensive error handling
3. **Loading States**: Always handle loading states
4. **Cleanup**: Unsubscribe from listeners when components unmount
5. **Type Safety**: Use TypeScript for better type safety
6. **Environment Variables**: Store sensitive configuration in environment variables
7. **Error Boundaries**: Use React Error Boundaries to catch and handle errors gracefully

## Performance Considerations
- Use Firestore's query capabilities to limit data transfer
- Implement pagination for large collections
- Use Firestore's offline persistence for better offline experience
- Implement proper indexing for better query performance

## Testing
- Mock Firebase services in unit tests
- Use Firebase Emulator for integration testing
- Test error scenarios and edge cases
- Test authentication flows thoroughly
