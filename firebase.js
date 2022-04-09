// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbUq0scDS2uVHseC-EUtlnE3IxgaHqgqE",
  authDomain: "instagram-645fc.firebaseapp.com",
  projectId: "instagram-645fc",
  storageBucket: "instagram-645fc.appspot.com",
  messagingSenderId: "935829213667",
  appId: "1:935829213667:web:a7e4d408f482d9cd9dd0d6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export {app, db, storage};