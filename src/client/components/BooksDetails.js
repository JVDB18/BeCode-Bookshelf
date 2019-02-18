/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import BooksEdit from "./BooksEdit";
// import Reviews from "./Reviews";

export default class BooksDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showReviews: false,
            uri: props.uri,
            showEdit: false,
            id: props.id,
            title: props.title,
            author: props.author,
            isbn: props.isbn,
            language: props.language,
            format: props.format,
        };
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleClickEdit() {
        if (this.state.showEdit === false) {
            this.setState({
                showEdit: true,
            });
        } else {
            this.setState({
                showEdit: false,
            });
        }
    }
    handleClickReviews() {
        if (this.state.showReviews === false) {
            this.setState({
                showReviews: true,
            });
        } else {
            this.setState({
                showReviews: false,
            });
        }
    }

    render() {
        return (
            <>
                <div
                    style={{
                        display: this.props.show ? "block" : "none",
                    }}>
                    <input
                        type="button"
                        value="Edit"
                        onClick={this.handleClickEdit}
                    />
                    <BooksEdit
                        uri={this.state.uri}
                        id={this.state.id}
                        title={this.state.title}
                        author={this.state.author}
                        isbn={this.state.isbn}
                        language={this.state.language}
                        format={this.state.format}
                        showEdit={this.state.showEdit}
                    />
                    {/* <input
                        type="button"
                        value="Reviews"
                        onClick={this.handleClickReviews}
                    /> */}
                    {/* <Reviews
                        uri={this.state.uri}
                        id={this.state.id}
                        showReviews={this.state.showReviews}
                    /> */}
                    <div>
                        {this.props.children}
                        Numéro ISBN: {this.props.isbn},
                        <br />
                        Langue:{this.props.language},
                        <br />
                        Format: {this.props.format},
                        <br />
                    </div>
                </div>
            </>
        );
    }
}
