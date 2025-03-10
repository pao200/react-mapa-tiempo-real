import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGaAh3_fGCfE-0mWThzPqEOcNr_Q5AjSI",
    authDomain: "miapp-integral-88347.firebaseapp.com",
    projectId: "miapp-integral-88347",
    storageBucket: "miapp-integral-88347.firebasestorage.app",
    messagingSenderId: "836468473985",
    appId: "1:836468473985:web:c05d9128410aa8654b8d80",
    measurementId: "G-2R16QWYS09"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

