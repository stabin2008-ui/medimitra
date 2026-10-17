/**
 * MediMitra CareLoop — Firebase Configuration & Service Integration
 * 
 * Provides initialization for Firebase Authentication, Cloud Firestore,
 * and Google OAuth provider.
 * 
 * If valid credentials are not provided in .env, gracefully runs in offline demo mode.
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  type Auth 
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'your_firebase_api_key_here' &&
  !firebaseConfig.apiKey.includes('placeholder')
);

export const cloudStatus = {
  isConfigured: isFirebaseConfigured,
  projectId: firebaseConfig.projectId || 'demo-medimitra-careloop',
  mode: isFirebaseConfigured ? 'live-cloud' : 'local-demonstration',
  cloudRunEndpoint: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
const googleProvider = new GoogleAuthProvider();

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig as Record<string, string>) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('[MediMitra CareLoop] Connected to Firebase project:', firebaseConfig.projectId);
  } catch (err) {
    console.warn('[MediMitra CareLoop] Firebase initialization failed:', err);
  }
} else {
  console.info(
    '[MediMitra CareLoop] Running in Offline Demonstration Mode. Real Firebase API keys are not detected in .env. To connect your Google Cloud project, follow instructions in README.md.'
  );
}

export { 
  app, 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  firebaseSignOut 
};
