import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD3n6sHHs3kUlEUCLpqsU-V5udSdCl-OzM",
    authDomain: "fir-user-auth-37797.firebaseapp.com",
    databaseURL: "https://fir-user-auth-37797.firebaseio.com",
    projectId: "fir-user-auth-37797",
    storageBucket: "",
    messagingSenderId: "313944776697",
    appId: "1:313944776697:web:35030c6040316492c92728"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();