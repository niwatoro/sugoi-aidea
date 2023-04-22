// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBbgt1y7dySHaALxLU5bNmw0sa9W2-REM",
  authDomain: "sugoi-aidea.firebaseapp.com",
  projectId: "sugoi-aidea",
  storageBucket: "sugoi-aidea.appspot.com",
  messagingSenderId: "1065560098426",
  appId: "1:1065560098426:web:868e50eb251832c6e5ddc3",
  measurementId: "G-B1E87H4M43",
};

// Initialize Firebase
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const analytics = getAnalytics();
export const db = getFirestore();
export const auth = getAuth();
