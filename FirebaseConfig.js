// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvSYs2F5Og5uNWF91ejNDV3lVgD25NfRo",
  authDomain: "health-and-fittness-app.firebaseapp.com",
  projectId: "health-and-fittness-app",
  storageBucket: "health-and-fittness-app.firebasestorage.app",
  messagingSenderId: "847514555651",
  appId: "1:847514555651:web:adc37c7403ba1053e1c536",
  measurementId: "G-MY21VBX88N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);