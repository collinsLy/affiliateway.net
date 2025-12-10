import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQuvqlMKwsT_Ap-DJkgiwrj8QRnJYl_a0",
  authDomain: "affiliateway-bc72d.firebaseapp.com",
  projectId: "affiliateway-bc72d",
  storageBucket: "affiliateway-bc72d.firebasestorage.app",
  messagingSenderId: "158940765076",
  appId: "1:158940765076:web:3710ad1f071752ba3a4d81",
  measurementId: "G-FXY8P5WVXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
