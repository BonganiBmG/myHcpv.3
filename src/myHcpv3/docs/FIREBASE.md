# Firebase Integration in myHcp App

This document provides detailed information on how Firebase is integrated into the myHcp application, including authentication, Firestore database, storage, and other Firebase services.

## Firebase Setup

### Project Configuration

The Firebase configuration is stored in `src/firebaseConfig.js`. This file initializes the Firebase app and exports the necessary Firebase services:

```javascript
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
```

### Environment Variables

Firebase configuration values should be stored in the `.env` file (which is not committed to version control for security reasons). A template is provided in `.env.example`:

```
# Firebase Configuration
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```

## Authentication

### Authentication Methods

The myHcp app uses Firebase Authentication with the following methods:

1. **Email/Password Authentication**: Standard email and password authentication
2. **Google Authentication**: Sign in with Google (planned)
3. **Phone Authentication**: SMS-based authentication (planned)

### Authentication Implementation

#### Login

The login functionality is implemented in `src/Login.js`:

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Inside component
const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Handle successful login (e.g., navigation to home screen)
  } catch (error) {
    // Handle errors (e.g., display error message)
    console.error('Login error:', error.code, error.message);
  }
};
```

#### Sign Up

The sign-up functionality is implemented in `src/Home/SignUp.js`:

```javascript
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

// Inside component
const handleSignUp = async (email, password, displayName) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      createdAt: new Date(),
      role: 'patient'
    });
    
    // Handle successful sign-up (e.g., navigation to home screen)
  } catch (error) {
    // Handle errors (e.g., display error message)
    console.error('Sign-up error:', error.code, error.message);
  }
};
```

#### Authentication State Listener

To monitor authentication state changes (e.g., login, logout), use the `onAuthStateChanged` listener:

```javascript
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Inside component
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  
  // Clean up subscription
  return () => unsubscribe();
}, []);
```

## Firestore Database

### Database Structure

The myHcp app uses Firestore to store various types of data:

#### Collections

| Collection    | Description                            | Fields                                         |
|---------------|----------------------------------------|------------------------------------------------|
| users         | User profiles                          | email, displayName, role, createdAt            |
| practitioners | Healthcare practitioner profiles       | name, specialty, location, qualification, etc. |
| appointments  | Appointment bookings                   | patientId, practitionerId, date, status, etc.  |
| services      | Healthcare service categories          | name, description, icon, practitionerCount     |
| reviews       | Patient reviews of practitioners       | practitionerId, patientId, rating, comment     |

### Working with Firestore

#### Reading Data

**Get a Single Document**:
```javascript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};
```

**Get Multiple Documents (Collection)**:
```javascript
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebaseConfig';

const getSpecialists = async (specialty) => {
  try {
    const q = query(
      collection(db, 'practitioners'),
      where('specialty', '==', specialty),
      orderBy('rating', 'desc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const specialists = [];
    
    querySnapshot.forEach((doc) => {
      specialists.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return specialists;
  } catch (error) {
    console.error('Error getting specialists:', error);
    throw error;
  }
};
```

**Real-time Updates**:
```javascript
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useEffect, useState } from 'react';

// Inside component
const [appointments, setAppointments] = useState([]);

useEffect(() => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  
  const q = query(
    collection(db, 'appointments'),
    where('patientId', '==', userId)
  );
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const appointmentsList = [];
    querySnapshot.forEach((doc) => {
      appointmentsList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setAppointments(appointmentsList);
  });
  
  // Clean up subscription
  return () => unsubscribe();
}, []);
```

#### Writing Data

**Add a Document**:
```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

