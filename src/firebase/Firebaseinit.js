// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBymCeWyu4tA_25IE5CQiM0WkfjlA9Ubl0",
  authDomain: "minitwit-24677.firebaseapp.com",
  projectId: "minitwit-24677",
  storageBucket: "minitwit-24677.appspot.com",
  messagingSenderId: "449656356703",
  appId: "1:449656356703:web:bbd82d2a3268b04cc4c0ea",
  measurementId: "G-XGCJJZWYPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleprovider = new GoogleAuthProvider()
export const db = getFirestore(app)