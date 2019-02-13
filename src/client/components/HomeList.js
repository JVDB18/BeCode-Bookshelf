/* eslint-disable react/jsx-no-literals */
import * as React from "react";
import {Route, NavLink} from "react-router-dom";
import BooksDetails from "./BooksDetails";
import BooksCrudModal from "./BooksCrudModal";

export default class HomeList extends React.Component {
    render() {
        return (
            <div>
                Blabla
                <NavLink to="/home/book/:id">BooksDetails</NavLink>
                <Route path="/home/book/:id" component={BooksDetails} />
                <Route path="/home/add" component={BooksCrudModal} />
                <Route path="/home/edit" component={BooksCrudModal} />
            </div>
        );
    }
}
