import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkC_60IsxQy7a7aHYCIyMz5cwWimn3jZw",
  authDomain: "file-transfer-8399b.firebaseapp.com",
  projectId: "file-transfer-8399b",
  storageBucket: "file-transfer-8399b.firebasestorage.app",
  messagingSenderId: "507361340928",
  appId: "1:507361340928:web:81bd3a4955da5057a4b2e5",
  measurementId: "G-THQ4MDS1B5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
