import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "eccoonecart.firebaseapp.com",
  projectId: "eccoonecart",
  storageBucket: "eccoonecart.firebasestorage.app",
  messagingSenderId: "287413224809",
  appId: "1:287413224809:web:39d8b02dfe85bb878ea9f8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
