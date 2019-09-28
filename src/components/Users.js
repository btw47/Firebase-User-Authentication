import React from "react";

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
            users: [
                {
                    id: '1',
                    name: 'Test Name 1',
                    email: 'Test Email 1',
                    role: USER_ROLES[0].id
                },
                {
                    id: '2',
                    name: 'Test Name 2',
                    email: 'Test Email 2',
                    role: USER_ROLES[1].id
                },
                {
                    id: '3',
                    name: 'Test Name 3',
                    email: 'Test Email 3',
                    role: USER_ROLES[2].id
                }
            ]
        }
    }

    getUsers() {
        if (!this.state.users || this.state.users.length === 0) return <h2>No users found.</h2>
        return this.state.users.map(user => {
            return (
                <div key={user.id}>
                    Name: <span>{user.name}</span> |
                    Email: <span>{user.email}</span> |
                    Role: {this.getRole(user)}

                    <button onClick={e => this.updateUser(user, e)}>Update</button>
                </div>
            );
        })
    }

    getRole(user) {
        return (
            <select defaultValue={user.role} onChange={this.updateState}>
                {USER_ROLES.map(role => {
                    return <option value={role.id} key={role.id}>{role.label}</option>
                })}
            </select>
        )
    }

    updateState(e) {
        console.log(e.target)
        console.log(e.target.value)
    }

    updateUser(user, e) {
        e.preventDefault()
        console.log(user)
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <ul>{this.getUsers()}</ul>
            </div>    
        )
    }
}