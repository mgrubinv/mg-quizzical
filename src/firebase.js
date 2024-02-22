
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcpdVqPUjc3-na01BE3fpBGiF5qNmzvfg",
  authDomain: "mg-quizzical.firebaseapp.com",
  projectId: "mg-quizzical",
  storageBucket: "mg-quizzical.appspot.com",
  messagingSenderId: "23374492028",
  appId: "1:23374492028:web:9acae17ae472bae36534f9",
  measurementId: "G-VMGF3S23WZ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const scoresCollection = collection(db, "scores")