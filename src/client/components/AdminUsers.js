/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import {Route, NavLink} from "react-router-dom";
import UsersCrudModal from "./UsersCrudModal";

export default class AdminUsers extends React.Component {
    render() {
        return (
            <div>
                I'M ADMIN COMPONENT
                <NavLink to="/admin/add">Add User</NavLink>
                <Route path="/admin/add" component={UsersCrudModal} />
                <Route path="/admin/edit" component={UsersCrudModal} />
            </div>
        );
    }
}
