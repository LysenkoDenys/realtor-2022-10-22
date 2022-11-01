// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT-3lA009LShWGgBC9wVsGxOXNjs-Jt5M",
  authDomain: "realtor-react-e46d6.firebaseapp.com",
  projectId: "realtor-react-e46d6",
  storageBucket: "realtor-react-e46d6.appspot.com",
  messagingSenderId: "627045878693",
  appId: "1:627045878693:web:8e3141bb6e5223f725764c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
