/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import {NavLink} from "react-router-dom";
import Axios from "axios";

export default class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.handleclick = this.handleclick.bind(this);
        // eslint-disable-next-line no-shadow
    }
    handleclick() {
        if (this.state.show === false) {
            this.setState({
                show: true,
            });
        } else {
            this.setState({
                show: false,
            });
        }
    }
    componentDidMount() {
        const uri = "http://localhost:80/api/users";

        Axios.get(uri, {crossdomain: true}).then(response => {
            console.log(response.data);
            this.setState({users: response.data});
            console.log(this.state.users);
        });
    }
    render() {
        if (this.state.users.length === 0) {
            // eslint-disable-next-line react/no-unescaped-entities
            return <div>Pending...</div>;
        }
        return (
            <>
                I'M ADMIN COMPONENT
                <NavLink to="/admin/add">
                    <button>Add User</button>
                </NavLink>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user._id}>
                            Pseudo: {user.pseudo}
                            <br />
                            E-mail: {user.email}
                            <br />
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
