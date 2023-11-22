import {getApp,getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIT22s3VbLa1a0fsNNvbQfGDlu3HqXojY",
  authDomain: "tennis-app-fire.firebaseapp.com",
  projectId: "tennis-app-fire",
  storageBucket: "tennis-app-fire.appspot.com",
  messagingSenderId: "966704070093",
  appId: "1:966704070093:web:ea1a2f23ec3b33b4cc5884"
};


const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export  { firebaseApp, auth,db};