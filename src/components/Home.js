import React from "react";

import { logoutUser } from "../services/user.service";

/**
 * @description Home component of the application
 */
export default class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <h2>
                    Home
                </h2>

                <button onClick={() => logoutUser()}>logout</button>
            </div>
        )
    }
}