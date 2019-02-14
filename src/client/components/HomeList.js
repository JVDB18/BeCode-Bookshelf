/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-literals */
import * as React from "react";
import {Link} from "react-router-dom";
import books from "./books/books.json";

export default class HomeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: books,
        };
        // eslint-disable-next-line no-shadow
        // this.books declared as a variable
        this.books = this.state.books.map(book => {
            return (
                <div key={book.id}>
                    <Link to={`/home/books/${book.id}`}>
                        <li>
                            {book.title} {book.author}
                        </li>
                    </Link>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                Blabla
                {/* return the new this.books variable */}
                <ul>{this.books}</ul>
            </div>
        );
    }
}
