/* eslint-disable no-dupe-class-members */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import Axios from "axios";
import UsersEdit from "./UsersEdit";
import UsersAdd from "./UsersAdd";

export default class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            uri: "http://localhost/api",
            show: "",
            isCreate: "",
        };
        this.handleclick = this.handleclick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
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
    handleCreate() {
        if (this.state.isCreate === false) {
            this.setState({
                isCreate: true,
            });
        } else {
            this.setState({
                isCreate: false,
            });
        }
    }
    componentDidMount() {
        const uri = this.state.uri;

        Axios.get(`${uri}/users`, {crossdomain: true}).then(response => {
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
                Users's list
                <input
                    type="button"
                    value="Add User"
                    onClick={this.handleCreate}
                />
                <UsersAdd isCreate={this.state.isCreate} uri={this.state.uri} />
                <ul>
                    {this.state.users.map(user => (
                        <li key={user._id}>
                            Pseudo: {user.pseudo}
                            <br />
                            E-mail: {user.email}
                            <br />
                            <input
                                type="button"
                                value="Edit"
                                onClick={this.handleclick}
                            />
                            <UsersEdit
                                uri={this.state.uri}
                                show={this.state.show}
                                id={user._id}
                                pseudo={user.pseudo}
                                email={user.email}
                                isCoach={user.isCoach}
                            />
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
