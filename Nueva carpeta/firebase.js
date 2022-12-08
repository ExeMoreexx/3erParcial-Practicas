// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlJSjryybiRq1zmecfgq3_k60jRl85HVI",
  authDomain: "appfirebase-4e97b.firebaseapp.com",
  projectId: "appfirebase-4e97b",
  storageBucket: "appfirebase-4e97b.appspot.com",
  messagingSenderId: "270398023778",
  appId: "1:270398023778:web:a726bb29447ee5fcdc493b",
  measurementId: "G-QGWFEGF4ER"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
