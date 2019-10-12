import React from "react";

import { loginUser } from "../services/user.service";

/**
 * @description Component with input fields that allows a user to sign in. Will navigate user to the Home component if login was successful.
 */
export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        //init state with empty string values for the "email" and "password" fields
        this.state = {
            email: '',
            password: ''
        };

        //bind the methods to "this" to avoid scope issues
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * @description Handle updates to the input field values (updates this.state)
     * @param event event information containing input information
     */
    handleChange(event) {
        //get the name of the field and the value input by the user
        const { name, value } = event.target;

        //update the local state to reflect the changes input by the user
        this.setState({
            [name]: value
        });
    }
    

    /**
     * @description Send login request to Firebase with the input email and password
     * @param event event information that contains the user's email and password
     */
    handleSubmit(event) {
        //prevent the page from re-loading
        event.preventDefault();
        //login the user in Firebase
        loginUser(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}