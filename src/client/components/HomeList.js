/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-literals */
import * as React from "react";
import BooksDetails from "./BooksDetails.js";
import Axios from "axios";
import BooksAdd from "./BooksAdd";

export default class HomeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            show: "",
            uri: "http://localhost/api",
            showAdd: false,
        };
        this.handleclick = this.handleclick.bind(this);
        this.handleShowAdd= this.handleShowAdd.bind(this);
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
    handleShowAdd() {
        if (this.state.showAdd === false){
            this.setState({
                showAdd: true,
            });
        }
        else {
            this.setState({
                showAdd: false,
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
                <input type="button" value="Add Book" onClick={this.handleShowAdd} />
                <BooksAdd showAdd={this.state.showAdd} uri={this.state.uri}/>
                <ul>
                    {this.state.books.map(book => (
                        <li key={book._id}>
                                {book.title} {book.author}
                                <input type="button" onClick={this.handleclick} value="Details"/>
                                <BooksDetails 
                                    id={book._id} 
                                    show={this.state.show}
                                    title={book.title}
                                    author={book.author}
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
