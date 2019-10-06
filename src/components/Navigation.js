import React from "react";
import { Link } from "react-router-dom";

import { LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE, HOME_ROUTE } from "../constants/routes";
import { firebaseApp, firebaseDb } from "../firebase/firebase.service";
import { FIREBASE_USERS } from "../services/user.service";

export default class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({currentUser: user});
                firebaseDb.ref(FIREBASE_USERS + user.uid).on('value', snapshot => {
                    const userInfo = snapshot.val();

                    this.setState({
                        currentUser: userInfo
                    });
            
                    return userInfo;
                })
            }
        })
    }

    renderNavbar() {
        if (window.location.pathname !== '/login') {
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
                        <li>
                            <Link to={USERS_ROUTE}>Users</Link>
                        </li>
                        {/* {
                            this.state.currentUser && this.state.currentUser.role === 'admin' ? <li><Link to={USERS_ROUTE}>Users</Link></li> : <div></div>
                        } */}
                    </ul>
                </nav>
            );
        }
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