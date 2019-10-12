import React from "react";

import { firebaseDb } from "../firebase/firebase.service";

import { FIREBASE_USERS, updateUserInfo } from '../services/user.service';

/**
 * @description Roles that a user can have in the system
 */
const USER_ROLES = [
    {
        id: 'admin',
        label: 'Administrator'
    },
    {
        id: 'staff',
        label: 'Staff'
    },
    {
        id: 'client',
        label: 'Client'
    },
]

/**
 * @description Component that allows admin users to manage the roles of each user
 */
export default class UsersComponent extends React.Component {
    constructor(props) {
        super(props);

        //init the state with null value
        this.state = {
            users: null
        }
    }

    /**
     * @description Get & render users as the component is loading
     */
    componentWillMount() {
        //get users from Firebase and render to view
        this.renderUsers();
    }

    /**
     * @description Gets users from Firebase and formats for view
     */
    renderUsers() {
        //if the users have already been retrieved and defined ==> return
        if (this.state.users) return;

        //get the user information from Firebase
        firebaseDb.ref(FIREBASE_USERS).on('value', snapshot => {
            //get the users' information from the Firebase response
            const users = snapshot.val();

            //array to collect view information
            const userMarkup = [];
            
            //iterate through the users and build rows with user information
            for (let userId in users) {
                //get the specific user's information from the returned values
                const user = users[userId];

                //build markup and add to collection of markup information (userMarkup)
                userMarkup.push(
                    <div key={user.email}>
                        Name: <span>{user.name}</span> |
                        Email: <span>{user.email}</span> |
                        Role: {this.getRole(user)}
                    </div>
                )
            }

            //update the state with the user information & markup information that will be rendered on the page
            this.setState({
                ...this.state,
                users: users,
                userMarkup: userMarkup
            });
        })
    }

    /**
     * @description Build options list with all valid roles, and defaulted to each user's role
     * @param user user information that can be used to build options list
     */
    getRole(user) {
        return (
            <select defaultValue={user.role} onChange={this.updateUserRole} name={user.uid}>
                {USER_ROLES.map(role => {
                    return <option value={role.id} key={role.id}>{role.label}</option>
                })}
            </select>
        )
    }

    /**
     * @description Handle updates to the Role field by sending to Firebase
     * @param event event information that contains the user's new role
     */
    updateUserRole = (event) => {
        //get the userId from the event information
        const userId = event.target.name;
        //get the newly-selected role information from the event information
        const newRole = event.target.value;

        updateUserInfo(userId, { role: newRole });
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <ul>{this.state.userMarkup}</ul>
            </div>    
        )
    }
}