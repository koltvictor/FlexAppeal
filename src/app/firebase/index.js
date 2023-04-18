import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2YgUJpEjM2lFJEsAiBKS2EJR16pNVjYc",
  authDomain: "flexappeal-6d5f9.firebaseapp.com",
  projectId: "flexappeal-6d5f9",
  storageBucket: "flexappeal-6d5f9.appspot.com",
  messagingSenderId: "1032960799262",
  appId: "1:1032960799262:web:0268e38ee9e3b6c86c740f",
  measurementId: "G-NCYE8RTVSS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = getAuth(app);
const firestore = getFirestore(app);

export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  firestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  firebaseConfig,
  firebase,
};
