import { firebaseApp } from "./firebase";

export const loginUser = credentials => {
    const { email, password } = credentials;

    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log('Login success!')
            console.log(user)
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
        .then(user => {
            console.log("Sign up success!")
            console.log(user)

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

    currentUser
        .updateProfile({
            displayName: userInfo.name
        })
        .then(updatedUser => {
            console.log('Updated user info after creation!')
            console.log(firebaseApp.auth().currentUser);
        })
        .catch(error => {
            throw error;
        })
}

    // loginUser() {

    // }