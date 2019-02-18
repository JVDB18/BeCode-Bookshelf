import React from "react";
import axios from "axios";

export default class BooksEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            author: props.author,
            isbn: props.isbn,
            language: props.language,
            format: props.format,
            uri: props.uri,
            showEdit: false,
            id: props.id,
        };

        this.changeAuthor = this.changeAuthor.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeIsbn = this.changeIsbn.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div
                style={{
                    display: this.props.showEdit ? "block" : "none",
                }}>
                <h1>{"Edit Books"}</h1>

                <hr />
                <form onSubmit={this.onSubmit}>
                    <input
                        value={this.state.title}
                        name="title"
                        required
                        placeholder="title"
                        onChange={this.changeTitle}
                    />

                    <input
                        value={this.state.author}
                        required
                        name="author"
                        placeholder="E-mail"
                        onChange={this.changeAuthor}
                    />

                    <input
                        value={this.state.isbn}
                        name="isbn"
                        required
                        placeholder="isbn"
                        onChange={this.changeIsbn}
                    />

                    <input
                        value={this.state.language}
                        name="language"
                        onChange={this.changeLanguage}
                        defaultlanguage={this.state.language}
                    />
                    <input
                        value={this.state.format}
                        name="format"
                        onChange={this.changeFormat}
                        defaultformat={this.state.format}
                    />

                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }

    changeTitle = event => {
        this.setState({
            title: event.target.value,
        });
    };

    changeAuthor = event => {
        this.setState({
            author: event.target.value,
        });
    };

    changeIsbn = event => {
        this.setState({
            isbn: event.target.value,
        });
    };
    changeLanguage = event => {
        this.setState({
            language: event.target.value,
        });
    };
    changeFormat = event => {
        this.setState({
            format: event.target.format,
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn,
            language: this.state.language,
            format: this.state.format,
        };
        const uri = this.state.uri;
        const id = this.state.id;

        axios
            .put(`${uri}/books/${id}`, obj, {crossdomaine: true})
            .then(res => console.log(res.data));

        this.setState({
            title: props.title,
            author: props.author,
            isbn: props.isbn,
            language: props.isCoach,
            format: props.format,
        });
    }
}
