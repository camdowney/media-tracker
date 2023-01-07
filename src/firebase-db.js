// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCttlntoU3vSxW9C5HaEyfdXaxYgMLJEts",
  authDomain: "bucket-list-d7dfc.firebaseapp.com",
  databaseURL: "https://bucket-list-d7dfc-default-rtdb.firebaseio.com",
  projectId: "bucket-list-d7dfc",
  storageBucket: "bucket-list-d7dfc.appspot.com",
  messagingSenderId: "342542978919",
  appId: "1:342542978919:web:3bb496a43dcd20cad229c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);