import React from "react";

import { FIREBASE_USERS } from '../services/user.service';
import { firebaseDb } from "../firebase/firebase.service";

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

export default class UsersComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        }
    }

    componentWillMount() {
        this.renderUsers();
    }

    getRole(user) {
        return (
            <select defaultValue={user.role} onChange={this.updateState} name={user.uid}>
                {USER_ROLES.map(role => {
                    return <option value={role.id} key={role.id}>{role.label}</option>
                })}
            </select>
        )
    }

    updateState = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        const userId = e.target.name;
        const newRole = e.target.value;

        firebaseDb.ref(FIREBASE_USERS + userId).update({
            role: newRole
        }).then(res => {
            console.log('upodated role!')
            console.log(res)
        })
    }

    updateUser(user, e) {
        e.preventDefault()
        console.log(user)
    }

    renderUsers() {
        if (this.state.users) return;

        firebaseDb.ref(FIREBASE_USERS).on('value', snapshot => {
            console.log(snapshot.val())
            const users = snapshot.val();
            const userMarkup = [];
            
            for (let userId in users) {
                const user = users[userId];
                userMarkup.push(
                    <div key={user.email}>
                        Name: <span>{user.name}</span> |
                        Email: <span>{user.email}</span> |
                        Role: {this.getRole(user)}

                        <button onClick={e => this.updateUser(user, e)}>Update</button>
                    </div>
                )
            }
            console.log('right before setting state')

            this.setState({
                ...this.state,
                users: users,
                userMarkup: userMarkup
            });

            console.log(this.state)
        })
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