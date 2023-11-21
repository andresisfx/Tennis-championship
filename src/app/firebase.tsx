// Import the functions you need from the SDKs you need
import {getApp,getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIT22s3VbLa1a0fsNNvbQfGDlu3HqXojY",
  authDomain: "tennis-app-fire.firebaseapp.com",
  projectId: "tennis-app-fire",
  storageBucket: "tennis-app-fire.appspot.com",
  messagingSenderId: "966704070093",
  appId: "1:966704070093:web:ea1a2f23ec3b33b4cc5884"
};

// Initialize Firebase
const firebaseApp =getApps.length?getApp: initializeApp(firebaseConfig);
const auth= getAuth();
export  { firebaseApp,auth}