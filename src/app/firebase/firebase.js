// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDh-FYapwgvVZEd-bkMT0eBGf6FwxTKx5o",
    authDomain: "sprint9-react.firebaseapp.com",
    projectId: "sprint9-react",
    storageBucket: "sprint9-react.appspot.com",
    messagingSenderId: "988362947759",
    appId: "1:988362947759:web:4f8ffe1d6ea0f02038685a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




