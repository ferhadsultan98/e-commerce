import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEIrZLNzTa1p0Ct5gdnlhmZ9i8dx_0ldQ",
  authDomain: "e-commerce-c80cb.firebaseapp.com",
  projectId: "e-commerce-c80cb",
  storageBucket: "e-commerce-c80cb.firebasestorage.app",
  messagingSenderId: "860168402050",
  appId: "1:860168402050:web:8f6a47b7205814ce79b09b",
  measurementId: "G-2N2DQRXSTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };