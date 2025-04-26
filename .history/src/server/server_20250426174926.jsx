import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Firebase yapılandırma nesnesi
const firebaseConfig = {
  apiKey: "AIzaSyDEIrZLNzTa1p0Ct5gdnlhmZ9i8dx_0ldQ",
  authDomain: "e-commerce-c80cb.firebaseapp.com",
  projectId: "e-commerce-c80cb",
  storageBucket: "e-commerce-c80cb.firebasestorage.app",
  messagingSenderId: "860168402050",
  appId: "1:860168402050:web:8f6a47b7205814ce79b09b",
  measurementId: "G-2N2DQRXSTV"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servisini başlat
const auth = getAuth(app);
const db = getFirestore(app);

// Gerekli modülleri dışa aktar
export {
  app,
  auth,
  db,
  signInWithEmailAndPassword,
  signOut,
  collection
};
