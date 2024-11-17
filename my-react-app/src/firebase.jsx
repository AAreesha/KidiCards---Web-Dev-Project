// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH9qvG8pasTFl7VDfU0IGIfX9Xa7SZN70",
  authDomain: "kidicards.firebaseapp.com",
  projectId: "kidicards",
  storageBucket: "kidicards.appspot.com",
  messagingSenderId: "377638968840",
  appId: "1:377638968840:web:cd9191bc4682e0b9d77bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
export const auth = getAuth(app);
export default getFirestore();