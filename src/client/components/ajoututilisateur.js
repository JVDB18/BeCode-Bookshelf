import React, {Component} from "react";

class Ajoututilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "your login",
            email: "yourEmail@something.com",
            password: "pswd lol",
        };

        this.changeText = this.changeText.bind(this);
    }

    render() {
        return (
            <div>
                <h1>{"Ajouter / Editer un nouvel utilisateur"}</h1>

                <hr />
                <form>
                    <input
                        value={this.state.login}
                        name="login"
                        required
                        // placeholder="Login"
                        onChange={this.changeText}
                    />

                    <input
                        type="email"
                        value={this.state.email}
                        required
                        name="email"
                        placeholder="Email"
                        onChange={this.changeText}
                    />

                    <input
                        type="password"
                        value={this.state.password}
                        name="password"
                        required
                        placeholder="Password"
                        onChange={this.changeText}
                    />
                    <hr />
                    <label htmlFor="coach">{"Coach ?"}</label>
                    <input type="checkbox" id="coach" name="coach" />

                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }

    changeText = event => {
        console.log("okok");
        this.setState({
            login: event.target.value,
        });
    };
}

export default Ajoututilisateur;
