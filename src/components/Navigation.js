import React from "react";
import { Link } from "react-router-dom";

import { LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE, HOME_ROUTE } from "../constants/routes";

export default class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
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
                </ul>
            </nav>
        )
    }
}