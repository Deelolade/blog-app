// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-8917f.firebaseapp.com",
  projectId: "blog-app-8917f",
  storageBucket: "blog-app-8917f.firebasestorage.app",
  messagingSenderId: "142675361571",
  appId: "1:142675361571:web:93cea2cd3bdf2ca67cd696"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);