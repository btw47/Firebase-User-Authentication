import { firebaseApp, firebaseDb } from "../firebase/firebase.service";

//url routes
import { HOME_ROUTE, LOGIN_ROUTE } from "../constants/routes";

//node in Firebase DB for User information
export const FIREBASE_USERS = 'users/';
//default role for a new user
export const DEFAULT_USER_ROLE = 'client';

/**
 * @description Sends login request to Firebase with user credentials
 * @param credentials User's email and password
 */
export const loginUser = credentials => {
    //get the email and password from the input credentials
    const { email, password } = credentials;

    //send the login request to Firebase
    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            //if successful login ==> get additional user information from their id
            getUserById(userCredentials.user.uid);

            //navigate the user to the Home component
            window.location.pathname = HOME_ROUTE;
        })
        .catch(error => {
            /* ----- Handle any login errors here ----- */
            console.log(error.code)
            console.log(error.message)
        })
}

/**
 * @description Sends a register request to Firebase with the user's information
 * @param userInfo Object containing user information (email, password, name, etc.)
 */
export const registerUser = userInfo => {
    //send request to Firebase to register the user with the provided information
    firebaseApp
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(newUserInfo => {
            //user registration was successful ==> add user information to Firebase DB
            console.log("Sign up success!")

            //remove password information from the request body
            delete userInfo.password;
            delete userInfo.passwordConfirm;

            //set the user's id in the user's information
            userInfo.uid = newUserInfo.user.uid;
            //set the user's role to the default role
            userInfo.role = DEFAULT_USER_ROLE;

            //get the current user's auth information
            const currentUser = firebaseApp.auth().currentUser;

            //send request to Firebase to add user's information to the Firebase DB
            setUserInfo(currentUser.uid, userInfo);

            //navigate the user to the Home component
            window.location.pathname = HOME_ROUTE;
        })
        .catch(error => {
            // Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
        });
}

/**
 * @description Logs a user out
 */
export const logoutUser = () => {
    //send logout request to Firebase
    firebaseApp
        .auth()
        .signOut()
        .then(() => {
            console.log('user signed out')

            //navigate the user to the Login component
            window.location.pathname = LOGIN_ROUTE;
        })
        .catch(error => {
            console.log('an error occurred while logging user out')
            console.log(error)
        })
}

/**
 * @description Add / replace user information in the Firebase DB
 * @param userId User's ID
 * @param userInfo User's information to set in Firebase DB
 */
export const setUserInfo = (userId, userInfo) => {
    //send update request to Firebase DB
    firebaseDb.ref(FIREBASE_USERS + userId).set(userInfo);
}

/**
 * @description Update a user's information with provided information (could be partial update)
 * @param userId The user's id whose information should be updated
 * @param userInfo The user's information that should be updated (can be partial update)
 */
export const updateUserInfo = (userId, userInfo) => {
    //send update request to Firebase to PATCH their information
    firebaseDb
        .ref(FIREBASE_USERS + userId)
        .update(userInfo)
        .then(res => {
            console.log('updated user info!')
            if (res) console.log(res);
        })
        .catch(error => {
            console.log('error updating user information')
            console.log(error)
        })
}

/**
 * @description Retrieves user information by their id
 * @param userId The user's id
 */
export const getUserById = userId => {
    //send request to Firebase to get the user's information by their id
    return firebaseDb.ref(FIREBASE_USERS + userId).on('value', snapshot => {
        const userInfo = snapshot.val();
        return userInfo;
    })
}

/**
 * @description Gets all users in the Firebase DB
 */
export const getAllUsers = () => {
    //send request to Firebase DB to retrieve all users
    firebaseDb.ref(FIREBASE_USERS).on('value', snapshot => {
        const users = snapshot.val();
        console.log(users)
    });
}