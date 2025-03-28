/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqhdbxCPT5pC8eltD1h2-l3ttSI22sLX4",
  authDomain: "streamgpt-dfdc0.firebaseapp.com",
  projectId: "streamgpt-dfdc0",
  storageBucket: "streamgpt-dfdc0.firebasestorage.app",
  messagingSenderId: "1026959891815",
  appId: "1:1026959891815:web:90338e797e1c8304bb63c2",
  measurementId: "G-B218FK1DHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();