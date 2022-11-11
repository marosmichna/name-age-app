import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "fir-beginer-c106b.firebaseapp.com",
    projectId: "fir-beginer-c106b",
    storageBucket: "fir-beginer-c106b.appspot.com",
    messagingSenderId: "909027923743",
    appId: "1:909027923743:web:3265ec878c10411758c22a",
    measurementId: "G-5E0QMTVXGS"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore();