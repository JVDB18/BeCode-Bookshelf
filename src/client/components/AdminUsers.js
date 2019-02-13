/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";
import {Route, NavLink} from "react-router-dom";
import UsersCreate from "./UsersCreate";
import UsersEdit from "./UsersEdit";
import UsersIndex from "./UsersIndex";

export default class AdminUsers extends React.Component {
    render() {
        return (
            <div>
                I'M ADMIN COMPONENTs
                <NavLink to="/admin/add">Add User</NavLink>
                <Route path="/admin/add" component={UsersCreate} />
                <NavLink to="/admin/edit:id">Edit User</NavLink>
                <Route path="/admin/edit:id" component={UsersEdit} />
                <NavLink to="/admin/users:id">Show Users</NavLink>
                <Route path="/admin/users:id" component={UsersIndex} />
            </div>
        );
    }
}
