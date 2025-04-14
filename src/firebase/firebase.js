// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgGahz1MYbA2ZrdHKGSFmtZsdjea-ILMg",
  authDomain: "np-menu-60116.firebaseapp.com",
  databaseURL: "https://np-menu-60116-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "np-menu-60116",
  storageBucket: "np-menu-60116.firebasestorage.app",
  messagingSenderId: "671133084387",
  appId: "1:671133084387:web:60d9034a49ab1bc937f3d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
