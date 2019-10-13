import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUser } from "../services/user.service";
import { LOGIN_ROUTE} from "../constants/routes";
import { Link } from "react-router-dom";
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
            <div id="Register-page" className = 'Register-page'>
            <br/>
            <Form id="Register-Form" onSubmit={this.handleSubmit}>
            <center>
        <h2 id="login-H2">Register Form</h2>
        </center>
          <Form.Text id="Register-text" className="form-text">
            We'll never share your email with anyone else.
            </Form.Text>
            <Form.Group controlId="formBasicName">  
                    <Form.Control type="text" value={this.state.name} onChange={this.handleChange} name="name" />
                    <Form.Label>Name:</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    <Form.Label>Email:</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                    <Form.Label>Password:</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" value={this.state.passwordConfirm} onChange={this.handleChange} name="passwordConfirm" />
                    <Form.Label> Confirm Password:</Form.Label>
                </Form.Group>
                <Button type="submit" value="Submit" >
                Submit
                 </Button>
                 <Button variant="outline-success" id="Registration-Link"><Link id="Registration-button" to={LOGIN_ROUTE}>LOGIN Here</Link></Button>
            </Form>
            </div>
        )
    }
}