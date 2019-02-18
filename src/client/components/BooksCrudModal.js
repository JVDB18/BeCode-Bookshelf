/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */

import React from "react";

// import axios from "axios";

export default class BooksCrudModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Titre: "",
            Auteur: "",
            ISBN: "",
            Langue: "",
            Format: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;

        this.setState({[target.name]: target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        // const NewBook = {
        //     Titre: this.state.Titre,
        //     Auteur: this.state.Auteur,
        //     ISBN: this.state.ISBN,
        //     Langue: this.state.Langue,
        //     Format: this.state.Format,
        // };

        // axios
        //     .post("", {NewBook})
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     });
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

    render() {
        return (
            <div>
                <h1>Ajoute un livre</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="Titre"
                        placeholder="Titre"
                        type="text"
                        value={this.state.Titre}
                        onChange={this.handleChange}
                    />
                    <input
                        name="Auteur"
                        placeholder="Auteur"
                        type="text"
                        value={this.state.Auteur}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="ISBN"
                        placeholder="ISBN"
                        type="text"
                        value={this.state.ISBN}
                        onChange={this.handleChange}
                    />
                    <input
                        name="Langue"
                        placeholder="Langue"
                        type="text"
                        value={this.state.Langue}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="Format"
                        placeholder="Format"
                        type="text"
                        value={this.state.Format}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Ajouter" />
                </form>
            </div>
        );
    }
}
