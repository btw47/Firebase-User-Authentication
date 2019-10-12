import React from "react";

import { registerUser } from "../services/user.service";

/**
 * @description Component that allows users to register users in Firebase
 */
export default class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        //init the component with empty values
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };

        //bind the methods to "this" to avoid scope issues
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * @description Handle user inputs by updating the component's state
     * @param event event information containing the updated user's information
     */
    handleChange(event) {
        //get the name of the field and value from the event
        const { name, value } = event.target;

        //update the state to reflect the information input by the user
        this.setState({
            [name]: value
        });
    }
    
    /**
     * @description Send request to register user in Firebase
     * @param event event information used to trigger user registration
     */
    handleSubmit(event) {
        //prevent the page from refreshing
        event.preventDefault();

        //if the passwords do not match ==> alert user and do not submit to Firebase
        if (this.state.password !== this.state.passwordConfirm) {
            alert('Passwords do not match.')
        }
        //else ==> send request to register the user
        else {
            //send register request to Firebase
            registerUser(this.state);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
                </label>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" value={this.state.passwordConfirm} onChange={this.handleChange} name="passwordConfirm" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}