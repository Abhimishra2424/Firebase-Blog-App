import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8R-lDMUpAgZ5h3zV-v6CuyHAji1x5Y7Y",
  authDomain: "blog-14a51.firebaseapp.com",
  projectId: "blog-14a51",
  storageBucket: "blog-14a51.appspot.com",
  messagingSenderId: "174596180764",
  appId: "1:174596180764:web:14bd047e1e7133b64488d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
