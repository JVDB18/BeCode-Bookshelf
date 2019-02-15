/* eslint-disable react/jsx-no-literals */
import * as React from "react";
import {NavLink} from "react-router-dom";
const Nav = () => {
    return (
        <div>
            <nav>
                <NavLink to="/home" activeClassName="selected">
                    Home
                </NavLink>
                <NavLink to="/wishlist" activeClassName="selected">
                    Wishlist
                </NavLink>
                <NavLink to="/yourborrowings" activeClassName="selected">
                    Your Borrowings
                </NavLink>
                <NavLink to="/admin" activeClassName="selected">
                    Admin
                </NavLink>
                <NavLink to="/login" activeClassName="selected">
                    Login
                </NavLink>
                <NavLink to="/BooksCreation" activeClassName="selected">
                    BooksCreation
                </NavLink>
            </nav>
        </div>
    );
};

export default Nav;
