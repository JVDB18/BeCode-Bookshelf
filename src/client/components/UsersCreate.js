/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import axios from "axios";

export default class UsersCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
            checked: true,
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <h1>{"Ajouter un nouvel utilisateur"}</h1>

                <hr />
                <form onSubmit={this.onSubmit}>
                    <input
                        value={this.state.login}
                        name="login"
                        required
                        placeholder="Login"
                        onChange={this.changeLogin}
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

    changeLogin = event => {
        console.log("okok");
        this.setState({
            login: event.target.value,
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
            checked: !this.state.checked,
        });
        if (this.state.checked) {
            console.log("I am a coach oh yeah");
        }
    };

    onSubmit(e) {
        e.preventDefault();
        console.log(
            `The values are ${this.state.login}, ${this.state.email}, ${
                this.state.password
            }, and ${this.state.checked}`,
        );

        const obj = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
        };

        axios
            .post("localhost:8080/api/users", obj)
            .then(res => console.log(res.data));

        this.setState({
            login: "",
            email: "",
            password: "",
        });
    }
}
