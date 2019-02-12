/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import {Route, NavLink} from "react-router-dom";
import BorrowingsHistory from "./BorrowingsHistory";

export default class BooksDetails extends React.Component {
    render() {
        return (
            <div>
                I'M BooksDetails COMPONENT
                <Route
                    path="/home/book/:id/history"
                    component={BorrowingsHistory}
                />
                <NavLink to="/home/book/:id/history">BorrowingsHistory</NavLink>
            </div>
        );
    }
}
