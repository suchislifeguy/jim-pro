import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8cLcvakuTxWP652GJ9eRDRW9_rnMVco8",
  authDomain: "jim-pro-app-6acf6.firebaseapp.com",
  projectId: "jim-pro-app-6acf6",
  storageBucket: "jim-pro-app-6acf6.firebasestorage.app",
  messagingSenderId: "1019661702938",
  appId: "1:1019661702938:web:12c45fcc9fe6f6e149fea3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
