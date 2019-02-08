import React, {Component} from "react";

class Ajoututilisateur extends Component {
    render() {
        return (
            <div>
                <h1>{"Ajouter / Editer un nouvel utilisateur"}</h1>

                <hr />

                <label htmlFor="login">{"Login"}</label>
                <input type="text" id="login" name="login" required />

                <label htmlFor="email">{"Email"}</label>
                <input type="email" id="email" name="email" required />
            </div>
        );
    }
}

export default Ajoututilisateur;
