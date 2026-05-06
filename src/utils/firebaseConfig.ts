import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

function assertFirebaseConfig() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error('Missing NEXT_PUBLIC Firebase configuration.')
  }
}

export function getFirebaseApp() {
  assertFirebaseConfig()

  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  }

  return app
}

export function getDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp())
  }

  return db
}

export function getAuthClient() {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
  }

  return auth
}
