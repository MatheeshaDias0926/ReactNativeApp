// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzBFHjghbuVamfM-zzUklzJageEN0-skU",
  authDomain: "matheeesha-a958d.firebaseapp.com",
  databaseURL: "https://matheeesha-a958d-default-rtdb.firebaseio.com",
  projectId: "matheeesha-a958d",
  storageBucket: "matheeesha-a958d.appspot.com",
  messagingSenderId: "1065936756874",
  appId: "1:1065936756874:web:5077f089ec2fe03010cd73"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);