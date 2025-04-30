// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJrY39c87Q6WvxX0rIkyuyN-7ceCUK3WY",
    authDomain: "stockify-99fc2.firebaseapp.com",
    projectId: "stockify-99fc2",
    storageBucket: "stockify-99fc2.appspot.com",
    messagingSenderId: "807437974439",
    appId: "1:807437974439:web:b0e6bf6c6b29e6b5841482"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
