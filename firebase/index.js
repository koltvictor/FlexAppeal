// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2YgUJpEjM2lFJEsAiBKS2EJR16pNVjYc",
  authDomain: "flexappeal-6d5f9.firebaseapp.com",
  projectId: "flexappeal-6d5f9",
  storageBucket: "flexappeal-6d5f9.appspot.com",
  messagingSenderId: "1032960799262",
  appId: "1:1032960799262:web:0268e38ee9e3b6c86c740f",
  measurementId: "G-NCYE8RTVSS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, updateDoc, doc };
