import firebase from 'firebase/app';    //firebase
import 'firebase/database';             //firebase database

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLPmBSOJArNcPL9QnPglUBmu5bKjNyt9g",
    authDomain: "projectfive-bc68e.firebaseapp.com",
    databaseURL: "https://projectfive-bc68e.firebaseio.com",
    projectId: "projectfive-bc68e",
    storageBucket: "projectfive-bc68e.appspot.com",
    messagingSenderId: "259913504488",
    appId: "1:259913504488:web:8589d72bf59294ef1cdb5d"
    };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
