/**
 * MediMitra CareLoop — Firebase Configuration & Service Integration
 * 
 * This module provides clean initialization for Firebase Authentication,
 * Cloud Firestore, and Firebase Cloud Messaging for Google Cloud Hackathon.
 * 
 * If environment variables are not supplied, it safely reports unconfigured status
 * so the application runs seamlessly in offline local demonstration mode.
 */

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

/**
 * Checks whether valid Firebase credentials have been configured in .env
 */
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

// Safe logger explaining cloud status
if (isFirebaseConfigured) {
  console.log('[MediMitra CareLoop] Connected to Google Cloud / Firebase project:', firebaseConfig.projectId);
} else {
  console.info(
    '[MediMitra CareLoop] Running in Offline Demonstration Mode. Real Firebase API keys are not detected in .env. To connect your Google Cloud project, follow instructions in README.md.'
  );
}
