---
description: Add Firebase SDK to the project
---

# Firebase SDK Integration

This workflow covers adding and configuring Firebase services in your Expo React Native Web app.

## Supported Firebase Services

- ✅ Authentication (Firebase JS SDK)
- ✅ Firestore Database
- ✅ Cloud Storage
- ✅ Analytics
- ✅ Realtime Database (limited on web)
- ✅ Cloud Functions (callable functions)

## Setup Steps

### 1. Install Firebase SDK

```bash
# Using Bun
bun add firebase

# Or using npm
npm install firebase
```

### 2. Initialize Firebase

Create a new file `app/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 3. Environment Variables

Create `.env.local` (add to `.gitignore`):

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Usage Example

```typescript
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

// Authentication
const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Firestore
const addDocument = async (data: any) => {
  const docRef = await addDoc(collection(db, 'users'), data);
  return docRef.id;
};
```

## Platform Compatibility

- **Web**: Full Firebase JS SDK support
- **iOS/Android**: Most features work, some limitations apply
- **Expo Web**: Full compatibility

## Deployment Notes

Firebase App Hosting automatically provides `FIREBASE_CONFIG` and `FIREBASE_WEBAPP_CONFIG` environment variables. You can use these instead of local variables in production.

## Security Rules

Remember to configure Firebase Security Rules for:
- Firestore database access
- Cloud storage access
- Authentication rules
