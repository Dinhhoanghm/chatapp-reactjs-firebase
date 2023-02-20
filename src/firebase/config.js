
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,connectFirestoreEmulator} from 'firebase/firestore'
import { getAuth, connectAuthEmulator, } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq_ZjlARE1qw7fhlGfF8pfyK2n-o8n9Mw",
  authDomain: "chatapp-feb2d.firebaseapp.com",
  databaseURL: "https://chatapp-feb2d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatapp-feb2d",
  storageBucket: "chatapp-feb2d.appspot.com",
  messagingSenderId: "1091937007902",
  appId: "1:1091937007902:web:25af6d8e43c0a500e6b10f",
  measurementId: "G-B3NZDR3GYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

connectAuthEmulator(auth, "http://127.0.0.1:9099/ ");


  connectFirestoreEmulator(db, '127.0.0.1', 8080);



export {analytics,app,auth, db} 