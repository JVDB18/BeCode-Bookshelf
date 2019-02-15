/* becodeorg/bookshelf
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/01/2019
 */

import * as React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/Routes";
import Nav from "./components/NavLinks";
import "./styles/app.scss";

// import './styles/app.css';
// import './styles/appStyles.scss';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Nav />
            <Routes />
        </div>
    </BrowserRouter>,
    document.querySelector("#app"),
);
