import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from "../services/user.service";
import "../index.css"

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
            <div id="login-page" className = 'login-page'>
                  <br/>
    <Form id="Login-Form" onSubmit={this.handleSubmit}>
       <center>
        <h2 id="login-H2">Login Form</h2>
        </center>
          <Form.Text id="login-text" className="form-text">
            We'll never share your email with anyone else.
            </Form.Text>
                 <Form.Group controlId="formBasicEmail">
                    <Form.Control id="Input" type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    <Form.Label>Email:</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Control id="Input" type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                    <Form.Label>Password:</Form.Label>
                    </Form.Group>
                <Button id="Submit-button" variant="primary" type="submit" value="Submit"> 
                 Submit
                 </Button>
            </Form>
            </div>
        )
    }
}
