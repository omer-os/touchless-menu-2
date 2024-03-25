import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9fM64iBh-wnlmSg5isCOSkj8EZ8aLriM",
  authDomain: "custom-dominion-312000.firebaseapp.com",
  projectId: "custom-dominion-312000",
  storageBucket: "custom-dominion-312000.appspot.com",
  messagingSenderId: "638647943941",
  appId: "1:638647943941:web:962b86236d68657584ad6c",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };
