import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

// Firebase yapılandırma nesnesi
const firebaseConfig = {
  apiKey: "AIzaSyDEIrZLNzTa1p0Ct5gdnlhmZ9i8dx_0ldQ",
  authDomain: "e-commerce-c80cb.firebaseapp.com",
  databaseURL: "https://e-commerce-c80cb-default-rtdb.firebaseio.com", // <- BURADA databaseURL əlavə olundu!
  projectId: "e-commerce-c80cb",
  storageBucket: "e-commerce-c80cb.appspot.com",
  messagingSenderId: "860168402050",
  appId: "1:860168402050:web:8f6a47b7205814ce79b09b",
  measurementId: "G-2N2DQRXSTV"
};

// Firebase tətbiqini başlat
const app = initializeApp(firebaseConfig);

// Servisləri başlat
const auth = getAuth(app);
const db = getDatabase(app);

// Export
export {
  app,
  auth,
  db,
  signInWithEmailAndPassword,
  signOut,
  ref,
  get
};
