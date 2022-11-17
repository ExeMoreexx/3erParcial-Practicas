// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxeoZAeWz7VaPsHr0cOGBn9obiDpOvEOg",
  authDomain: "appfirebase-eee25.firebaseapp.com",
  projectId: "appfirebase-eee25",
  storageBucket: "appfirebase-eee25.appspot.com",
  messagingSenderId: "568280709323",
  appId: "1:568280709323:web:abe7e7289b78777df9834e",
  measurementId: "G-TD3ZHK0MHJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
