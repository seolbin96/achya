// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1grYwUzNNsQ0_IizYdJ1RmGy047qjisA",
  authDomain: "joa-amadda.firebaseapp.com",
  projectId: "joa-amadda",
  storageBucket: "joa-amadda.appspot.com",
  messagingSenderId: "88540409320",
  appId: "1:88540409320:web:00fec4aeac40191c0a485d",
  measurementId: "G-05CG4FR5D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Use these for db & auth
const db = getFirestore();
const auth = getAuth();

export { auth, db };
