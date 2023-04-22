// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

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

let analytics: Analytics;
let db: Firestore;
let auth: Auth;
// Initialize Firebase
if (!getApps()?.length) {
  const app = initializeApp(firebaseConfig);
  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics();
  }
  db = getFirestore();
  auth = getAuth();
}

export { analytics, db, auth };
