/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import {NavLink} from "react-router-dom";

export default class AdminUsers extends React.Component {
    render() {
        return (
            <div>
                I'M ADMIN COMPONENT
                <NavLink to="/admin/add">Add User</NavLink>
            </div>
        );
    }
}
