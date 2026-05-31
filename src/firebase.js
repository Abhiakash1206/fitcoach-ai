import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN9Pr_ccBY1Ovtzc3NFoS9C7Pph7USv0U",
  authDomain: "fitcoach-ai-e0658.firebaseapp.com",
  projectId: "fitcoach-ai-e0658",
  storageBucket: "fitcoach-ai-e0658.firebasestorage.app",
  messagingSenderId: "739080951137",
  appId: "1:739080951137:web:5437c5327ed0b53572a120"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);