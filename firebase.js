import { initializeApp } from 'firebase/app';
import { getFirestore  } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCsHA_DuVVYJaXomFigctTWxB4w1KtB_Pc",
  authDomain: "shopping-list-cf590.firebaseapp.com",
  projectId: "shopping-list-cf590",
  storageBucket: "shopping-list-cf590.appspot.com",
  messagingSenderId: "401618944201",
  appId: "1:401618944201:web:8b088e5b9848ceb134cd18",
  measurementId: "G-Z282SKB5G9"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }