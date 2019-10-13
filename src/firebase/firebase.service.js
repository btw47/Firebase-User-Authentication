import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBbWrkmMd7ka5uZPCjKjf3z8uRW5s9x3T0",
    authDomain: "fir-school-auth.firebaseapp.com",
    databaseURL: "https://fir-school-auth.firebaseio.com",
    projectId: "fir-school-auth",
    storageBucket: "fir-school-auth.appspot.com",
    messagingSenderId: "1049419544792",
    appId: "1:1049419544792:web:231d90c81be8d2f2a1ffad"
  };
 

/* ----- Init Firebase components ----- */
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();