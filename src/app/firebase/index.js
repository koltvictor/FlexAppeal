import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
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

const db = firebase.firestore();
const auth = firebase.auth();
const firestore = getFirestore();

export {
  db,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  firestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  updatePassword,
  doc,
  firebaseConfig,
  firebase,
};
