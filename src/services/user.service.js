import { firebaseApp, firebaseDb } from "../firebase/firebase.service";

/* ----- FIRESTORE CONSTANTS ----- */
export const FIREBASE_USERS = 'users/';

export const STAFF_ROLE = 'staff';
export const CLIENT_ROLE = 'client';
export const ADMIN_ROLE = 'admin';
export const DEFAULT_USER_ROLE = CLIENT_ROLE;

export const loginUser = credentials => {
    const { email, password } = credentials;

    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            getUserById(userCredentials.user.uid);
            window.location.pathname = '/home';
        })
        .catch(error => {
            console.log(error.code)
            console.log(error.message)
        })
}

export const registerUser = userInfo => {
    firebaseApp
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(newUserInfo => {
            console.log("Sign up success!")
            console.log(newUserInfo)

            delete userInfo.password;
            delete userInfo.passwordConfirm;

            userInfo.uid = newUserInfo.user.uid;

            userInfo.role = DEFAULT_USER_ROLE;

            updateUser(userInfo);
        })
        .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
            // ...
        });
}

export const updateUser = userInfo => {
    const currentUser = firebaseApp.auth().currentUser;

    firebaseDb.ref(FIREBASE_USERS + currentUser.uid).set(userInfo);
}

export const getUserById = userId => {
    return firebaseDb.ref(FIREBASE_USERS + userId).on('value', snapshot => {
        const userInfo = snapshot.val();

        return userInfo;
    })
}

export const getAllUsers = () => {
    firebaseDb.ref(FIREBASE_USERS).on('value', snapshot => {
        const users = snapshot.val();
        console.log(users)
    });
}