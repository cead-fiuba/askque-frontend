import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
	  apiKey: "AIzaSyBao9IQQLvvJjhd9g8yasaKIuDQssEwy-A",
	  authDomain: "cetec-askque.firebaseapp.com",
	  projectId: "cetec-askque",
	  storageBucket: "cetec-askque.appspot.com",
	  messagingSenderId: "183315005122",
	  appId: "1:183315005122:web:e771448fa6e01c090ac55b"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const storage = app.storage()
export default app
