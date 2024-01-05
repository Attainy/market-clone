import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: 
//   "https://carrot-market-f0cd0-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   storageBucket: "gs://carrot-market-f0cd0.appspot.com"
// };

const firebaseConfig = {
  apiKey: "AIzaSyD_uSgQj1xJsJAMQOj_fnkFveBP1UVvFUQ",
  authDomain: "carrot-market-f0cd0.firebaseapp.com",
  databaseURL: "https://carrot-market-f0cd0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carrot-market-f0cd0",
  storageBucket: "carrot-market-f0cd0.appspot.com",
  messagingSenderId: "6949374253",
  appId: "1:6949374253:web:85658a9f1b3e215099aba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

