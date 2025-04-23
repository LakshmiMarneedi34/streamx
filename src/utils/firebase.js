/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk3htAYFcsTjsveG2pFB81f65iWG4EJXY",
  authDomain: "streamgpt-517b1.firebaseapp.com",
  projectId: "streamgpt-517b1",
  storageBucket: "streamgpt-517b1.firebasestorage.app",
  messagingSenderId: "311489664232",
  appId: "1:311489664232:web:481b064dfe0f8759e1e55d",
  measurementId: "G-4FPD3D4PRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore(app);