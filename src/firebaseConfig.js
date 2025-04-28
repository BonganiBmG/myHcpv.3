import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Get Firebase configuration from environment variables with fallbacks
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBtKYtofqTi6v9auZOJDih_e7-8pddvW1Q",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "myhcp-310f9.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "myhcp-310f9",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "myhcp-310f9.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "63814691379",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:63814691379:web:873cf9058508e8a2d95146",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-5QBZ9QZP0K"
};

// Initialize Firebase with error handling
let app, auth, db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export { app, auth, db };
export default firebaseConfig;
