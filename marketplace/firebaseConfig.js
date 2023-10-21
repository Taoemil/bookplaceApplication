import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";




// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2D_V7e5Srro7HM3XIwbqrZr-7hIwanGk",
  authDomain: "bookplace-fe746.firebaseapp.com",
  projectId: "bookplace-fe746",
  storageBucket: "bookplace-fe746.appspot.com",
  messagingSenderId: "547846937761",
  appId: "1:547846937761:web:d059ec5bed7683066ba4e0"
};

// Initialize Firebase
let firebaseApp = initializeApp(firebaseConfig);
console.log("Firebase has been initialized");

// Console.log if Firebase is initialized.
if (getApps().length > 0) {
  console.log("Firebase is initialized. Apps:", getApps());
} else {
  console.log("Firebase has not been initialized yet.");
}

export default firebaseApp;
