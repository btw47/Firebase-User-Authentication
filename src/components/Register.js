import React from "react";

import { registerUser } from "../services/user.service";

export default class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();

        registerUser(this.state);
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