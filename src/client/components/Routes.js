import * as React from "react";
import HomeList from "./HomeList";
import {Route} from "react-router-dom";
import Login from "./Login";
import AdminUsers from "./AdminUsers";
import WishList from "./WishList";
import YourBorrowings from "./YourBorrowings";

const Routes = () => (
    <div>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={HomeList} />
        <Route path="/wishlist" component={WishList} />
        <Route path="/yourborrowings" component={YourBorrowings} />
        <Route path="/admin" component={AdminUsers} />
    </div>
);

export default Routes;
