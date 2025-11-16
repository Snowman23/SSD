// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDJr1NNFIXae8mdHKw2ZqOib2jpanIvCQ",
  authDomain: "social-media-engagement-27c4b.firebaseapp.com",
  projectId: "social-media-engagement-27c4b",
  storageBucket: "social-media-engagement-27c4b.firebasestorage.app",
  messagingSenderId: "1072615925067",
  appId: "1:1072615925067:web:2d43f48c2671f7c67b34ce",
  measurementId: "G-LGEDY4R1VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // ✅ Make sure to export auth