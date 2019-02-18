/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import Axios from "axios";

export default class YourBorrowings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowings: [],
            books: [],
        };
    }
    componentDidMount() {
        const uri = "http://localhost/api/";

        Axios.get(`${uri}borroweds`, {crossdomain: true})
            .then(response => {
                console.log(response.data);
                this.setState({borrowings: response.data});
                console.log(this.state.borrowings);
            })
            .then(
                Axios.get(`${uri}users/${this.state.borrowings.users_id}`, {
                    crossdomain: true,
                }).then(response => {
                    this.setState({
                        books: response.data,
                    });
                }),
            );
    }
    render() {
        if (this.state.borrowings.length === 0) {
            return <>Pending...</>;
        }
        return (
            <>
                <ul>
                    {this.state.borrowings.map(borrowing => (
                        <li key={borrowing.book_id}>
                            Titre: {this.state.books.title}
                            <br />
                            Date d'emprunt: {borrowing.borrowed_date}
                            <br />
                            Date de rentrée: {borrowing.returned_date}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
