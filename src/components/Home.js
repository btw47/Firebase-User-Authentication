import React from "react";
import Button from 'react-bootstrap/Button';
import { logoutUser } from "../services/user.service";

/**
 * @description Home component of the application
 */
export default class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <center>
                <h2>
                   Welcome To The Home Page
                </h2>
                </center>
                <Button variant="outline-primary" onClick={() => logoutUser()}>logout</Button>
            </div>
        )
    }
}