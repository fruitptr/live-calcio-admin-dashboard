import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD750J-KdGVhueMRkzmMn97Q2XbRj67oDU",
  authDomain: "live-calcio-fyp.firebaseapp.com",
  projectId: "live-calcio-fyp",
  storageBucket: "live-calcio-fyp.appspot.com",
  messagingSenderId: "824065313199",
  appId: "1:824065313199:web:41744e29a2bdde9c57c75a",
  measurementId: "G-S8CP9BZHJG"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);