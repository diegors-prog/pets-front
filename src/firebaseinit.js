// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAff9hKo9F-Ubv3q520aqLk-kokUa2mPWw",
  authDomain: "petfinder360-28fd1.firebaseapp.com",
  projectId: "petfinder360-28fd1",
  storageBucket: "petfinder360-28fd1.appspot.com",
  messagingSenderId: "449763451713",
  appId: "1:449763451713:web:e4b8e4e28755aca3bef7c0",
  measurementId: "G-FQV7TFML64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
