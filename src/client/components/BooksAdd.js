/* eslint-disable react/jsx-no-literals */
import React from "react";
import axios from "axios";

export default class BooksAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Titre: "",
            Auteur: "",
            ISBN: "",
            Langue: "",
            Format: "",
            uri: props.uri,
            showAdd: false,
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

        const NewBook = {
            title: this.state.Titre,
            author: this.state.Auteur,
            isbn: this.state.ISBN,
            language: this.state.Langue,
            format: this.state.Format,
        };
        const uri = this.state.uri;

        axios.post(`${uri}/books`, NewBook, {crossdomaine: true}).then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    render() {
        return (
            <div
                style={{
                    display: this.props.showAdd ? "block" : "none",
                }}>
                <h1>Add books</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="Titre"
                        placeholder="title"
                        type="text"
                        value={this.state.Titre}
                        onChange={this.handleChange}
                    />
                    <input
                        name="Auteur"
                        placeholder="author"
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
                        placeholder="language"
                        type="text"
                        value={this.state.Langue}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="Format"
                        placeholder="format"
                        type="text"
                        value={this.state.Format}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}
