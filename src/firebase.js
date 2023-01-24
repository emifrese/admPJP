// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAY97NxfeMrVh1JgtSnHJbFRjj8YhlXHc",
  authDomain: "test-dd1fd.firebaseapp.com",
  databaseURL: "https://test-dd1fd-default-rtdb.firebaseio.com",
  projectId: "test-dd1fd",
  storageBucket: "test-dd1fd.appspot.com",
  messagingSenderId: "813916143463",
  appId: "1:813916143463:web:df4aabd198cec90971b9c2",
  measurementId: "G-1LRTDJEPWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
