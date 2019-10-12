import React from "react";
import { Link } from "react-router-dom";

//url routes
import { LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE, HOME_ROUTE } from "../constants/routes";

import { FIREBASE_USERS } from "../services/user.service";
import { firebaseApp, firebaseDb } from "../firebase/firebase.service";

/**
 * @description Navigation bar at the top of most views
 */
export default class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);

        //init the component with null values
        this.state = {
            currentUser: null
        };
    }

    /**
     * @description Track any updates to the user's authentication status while this component is loaded (should trigger if a user logs in or logs out)
     */
    componentDidMount() {
        //listen for auth events via the firebase application
        firebaseApp.auth().onAuthStateChanged(user => {
            //if the user has just logged in ==> update the state of the app
            if (user) {
                //get additional user information from Firebase database
                firebaseDb.ref(FIREBASE_USERS + user.uid).on('value', snapshot => {
                    //get the user information from the response
                    const userInfo = snapshot.val();
                    
                    //update the current state of this component with the user's information (returned from Firebase)
                    this.setState({
                        currentUser: userInfo
                    });
                    
                    return userInfo;
                })
            }
        })
    }

    /**
     * @description Logic to render the navigation bar
     */
    renderNavbar() {
        //if the current url is not "/login" ==> show the navbar
        if (window.location.pathname !== LOGIN_ROUTE) {
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to={HOME_ROUTE}>Home</Link>
                        </li>
                        <li>
                            <Link to={LOGIN_ROUTE}>Login</Link>
                        </li>
                        <li>
                            <Link to={REGISTER_ROUTE}>Register</Link>
                        </li>
                        {/* <li>
                            <Link to={USERS_ROUTE}>Users</Link>
                        </li> */}
                        {
                            this.state.currentUser && this.state.currentUser.role === 'admin' ? <li><Link to={USERS_ROUTE}>Users</Link></li> : <div></div>
                        }
                    </ul>
                </nav>
            );
        }
        //else if the current url is "/login" ==> do not show the navbar
        else {
            return <div></div>
        }
    }

    render() {
        return (
            <div>
                {this.renderNavbar()}
            </div>
        )
    }
}