// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs30OsfixrSWO6g_POBW8yAeKZTm-ltw0",
  authDomain: "victor-f17f3.firebaseapp.com",
  projectId: "victor-f17f3",
  storageBucket: "victor-f17f3.appspot.com",
  messagingSenderId: "842406658718",
  appId: "1:842406658718:web:6be1c11b0c90289011318f",
  measurementId: "G-GFHLZ2T6HJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);