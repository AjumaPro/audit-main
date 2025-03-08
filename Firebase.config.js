// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbbFibjYhp44UK5J2y3j-NvlnNTBkLYZE",
  authDomain: "aucdt-9460a.firebaseapp.com",
  projectId: "aucdt-9460a",
  storageBucket: "aucdt-9460a.firebasestorage.app",
  messagingSenderId: "913869165934",
  appId: "1:913869165934:web:f99a0be687204545c49d7f",
  measurementId: "G-T1V4S3F0L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);