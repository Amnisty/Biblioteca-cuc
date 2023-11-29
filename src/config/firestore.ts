// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBHHzX_jZPB8nANpXAfxnpB6F92i9il6cA",

  authDomain: "biblioteca-cuc.firebaseapp.com",

  projectId: "biblioteca-cuc",

  storageBucket: "biblioteca-cuc.appspot.com",

  messagingSenderId: "701702939422",

  appId: "1:701702939422:web:04b32ace4f97484e329f0f",

  measurementId: "G-B6EJ89420L",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
