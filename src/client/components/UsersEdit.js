/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import axios from "axios";

export default class UsersEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // get info from database to render the user => then via axios, edit the info

            pseudo: props.pseudo,
            email: props.email,
            password: "",
            checked: props.isCoach,
            uri: props.uri,
            show: false,
            id: props.id,
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changepseudo = this.changepseudo.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div
                style={{
                    display: this.props.show ? "block" : "none",
                }}>
                <h1>{"Editer utilisateur"}</h1>

                <hr />
                <form onSubmit={this.onSubmit}>
                    <input
                        value={this.state.pseudo}
                        name="pseudo"
                        required
                        placeholder="pseudo"
                        onChange={this.changepseudo}
                    />

                    <input
                        type="email"
                        value={this.state.email}
                        required
                        name="email"
                        placeholder="E-mail"
                        onChange={this.changeEmail}
                    />

                    <input
                        type="password"
                        value={this.state.password}
                        name="password"
                        required
                        placeholder="Password"
                        onChange={this.changePassword}
                    />
                    <hr />
                    <label htmlFor="coach">{"Coach ?"}</label>
                    <input
                        type="checkbox"
                        id="coach"
                        name="checked"
                        onChange={this.handleCheck}
                        defaultChecked={this.state.checked}
                    />

                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }

    changepseudo = event => {
        console.log("okok");
        this.setState({
            pseudo: event.target.value,
        });
    };

    changeEmail = event => {
        console.log("okok");
        this.setState({
            email: event.target.value,
        });
    };

    changePassword = event => {
        console.log("okok");
        this.setState({
            password: event.target.value,
        });
    };

    handleCheck = function() {
        this.setState({
            checked: true,
        });
        if (this.state.checked) {
            console.log("I am a coach oh yeah");
        }
    };

    onSubmit(e) {
        e.preventDefault();
        console.log(
            `The values are ${this.state.pseudo}, ${this.state.email}, ${
                this.state.password
            }, and ${this.state.checked}`,
        );

        const obj = {
            isCoach: this.state.checked,
            pseudo: this.state.pseudo,
            email: this.state.email,
            password: this.state.password,
        };
        const uri = this.state.uri;
        const id = this.state.id;

        axios
            .put(`${uri}/users/${id}`, obj, {crossdomaine: true})
            .then(res => console.log(res.data));

        this.setState({
            pseudo: props.pseudo,
            email: props.email,
            password: "",
            checked: props.isCoach,
        });
    }
}
