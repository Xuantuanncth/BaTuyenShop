import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN_bgmu28BQ9XJ7YSgm3ixClpPgGbs_JU",
  authDomain: "batuyenshop.firebaseapp.com",
  projectId: "batuyenshop",
  storageBucket: "batuyenshop.firebasestorage.app",
  messagingSenderId: "676382184894",
  appId: "1:676382184894:web:d60193ee65d353afa395ef"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }