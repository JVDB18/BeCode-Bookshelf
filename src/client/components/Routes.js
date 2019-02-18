import * as React from "react";
import HomeList from "./HomeList";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import AdminUsers from "./AdminUsers";
import WishList from "./WishList";
import YourBorrowings from "./YourBorrowings";
import BooksDetails from "./BooksDetails";
import BorrowingsHistory from "./BorrowingsHistory";

const Routes = () => (
    <div>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={HomeList} />
            <Route exact path="/home/books/:id" component={BooksDetails} />
            <Route path="/wishlist" component={WishList} />
            <Route path="/yourborrowings" component={YourBorrowings} />
            <Route path="/admin" component={AdminUsers} />
            <Route path="/home/book/history" component={BorrowingsHistory} />
        </Switch>
    </div>
);

export default Routes;
