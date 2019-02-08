import React, {Component} from "react";

class Ajoututilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        // login = this.state.login,
        // password = this.state.password,
        // email = this.state.email
        // console.log(login)
    }

    handleSubmit(event) {
        console.log(
            `A new user was submitted: ${this.state.login} + ${
                this.state.email
            } + ${this.state.password}`,
        );
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>{"Ajouter / Editer un nouvel utilisateur"}</h1>

                <hr />
                <form onSubmit={() => this.handleSubmit()}>
                    <input
                        value={this.state.login}
                        name="login"
                        required
                        placeholder="Login"
                        onChange={this.handleChange()}
                    />

                    <input
                        type="email"
                        value={this.state.email}
                        required
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange()}
                    />

                    <input
                        type="password"
                        value={this.state.password}
                        name="password"
                        required
                        placeholder="Password"
                        onChange={this.handleChange()}
                    />
                    <hr />
                    <label htmlFor="coach">{"Coach ?"}</label>
                    <input type="checkbox" id="coach" name="coach" />

                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }
}

export default Ajoututilisateur;
