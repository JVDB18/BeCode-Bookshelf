/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-literals */
import * as React from "react";
import {Link} from "react-router-dom";
import BooksDetails from "./BooksDetails.js";
import Axios from "axios";

export default class HomeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            show: false,
        };
        this.showModal = this.showModal.bind(this);
        this.tamere = this.tamere.bind(this);
        // this.data = this.data.bind(this);
        // eslint-disable-next-line no-shadow
        // this.books declared as a variable
    }
    componentDidMount() {
        const uri = "http://localhost:80/api/books";

        Axios.get(uri, {crossdomain: true})
            .then(response => {
                console.log(response.data);
                this.setState({books: response.data});
                console.log(this.state.books);
                console.log("hello");
            })
            .then(() => {
                this.tamere();
            });
    }
    tamere() {
        // this.data();
        // console.log(this.books);
        console.log("prout");
        this.books = this.state.books.map(book => {
            return (
                <div key={book.id}>
                    <Link
                        to={`/home/books/${book.id}`}
                        onClick={this.showModal}>
                        <li>
                            {book.title} {book.author}
                        </li>
                        <BooksDetails title={book.title} id={book.id} />
                    </Link>
                </div>
            );
        });
        console.log(this.books);
    }
    showModal() {
        this.setState({
            show: true,
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
