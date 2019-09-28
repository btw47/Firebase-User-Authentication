import React from "react";

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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