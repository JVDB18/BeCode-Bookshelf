/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-literals */
import * as React from "react";
import BooksDetails from "./BooksDetails.js";
import {Link} from "react-router-dom";
import Axios from "axios";

export default class HomeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            show: "",
            uri: "http://localhost/api"
        };
        this.handleclick = this.handleclick.bind(this);
        // eslint-disable-next-line no-shadow
    }

    handleclick() {
        if (this.state.show === false){
            this.setState({
                show: true,
            });
        }
        else {
            this.setState({
                show: false,
            })
        }
    }
    componentDidMount() {
        const uri = this.state.uri;

        Axios.get(`${uri}/books`, {crossdomain: true}).then(response => {
            console.log(response.data);
            this.setState({books: response.data});
            console.log(this.state.books);
            console.log("hello");
        });
    }
    render() {
    if (this.state.books.length === 0){
        // eslint-disable-next-line react/no-unescaped-entities
        return <>Pending...</>
    }    
        return (
            <>
                <h2>Book's List</h2>
                <Link to="/home/add">
                    <button>
                        Add a book to database 
                    </button>
                </Link>
                <ul>
                    {this.state.books.map(book => (
                        <li key={book._id}>
                                {book.title} {book.author}
                                <input type="button" onClick={this.handleclick} value="Details"/>
                                <BooksDetails 
                                    key={book._id} 
                                    show={this.state.show}
                                    isbn={book.isbn}
                                    language={book.language}
                                    format={book.format}
                                    uri={this.state.uri}
                                />
                        </li>
                    ))}
                    </ul>
            </>
        );
    }
}
