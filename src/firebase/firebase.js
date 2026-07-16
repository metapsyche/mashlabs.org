// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgup7lFCM0kLaGB5K8rqzRysavnS_OT3M",
  authDomain: "mash-8645e.firebaseapp.com",
  projectId: "mash-8645e",
  storageBucket: "mash-8645e.appspot.com",
  messagingSenderId: "925212280649",
  appId: "1:925212280649:web:2776b289a44d8109c1bc98",
  measurementId: "G-305HZMRME6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);