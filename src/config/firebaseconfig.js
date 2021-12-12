import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyB_jdIXCeOtUYwz9l-klgSZKYlFFlelYAk",
  authDomain: "mooras-29dc2.firebaseapp.com",
  projectId: "mooras-29dc2",
  storageBucket: "mooras-29dc2.appspot.com",
  messagingSenderId: "69531596279",
  appId: "1:69531596279:web:13ed80f7d40ccae1d26af2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
