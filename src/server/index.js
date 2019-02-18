/* becodeorg/bookshelf
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode & Tanguy@Team Noix
 * started at 18/01/2019
 */

/*
 * Const & imports
 */
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import {createToken} from "./authentication.js";
const {PORT} = process.env;
const app = express();

// Import App Routers
const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");
const reviewsRouter = require("./routes/reviews.js");
const borrowedsRouter = require("./routes/borroweds.js");

/*
 * Connection to database
 */
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
    process.env.DB_NAME
}`; // URL to connect to database

mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        authSource: "admin",
    },
);
const db = mongoose.connection;
/* ------ */

/*
 * Middlewares stack
 */
// Cross-Origin middleware
app.use(cors());

// Requests middlewares
app.use(express.json());
app.use(express.urlencoded());

// Routing middlewares
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/borroweds", borrowedsRouter);
/* ------ */

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Successfully connected to server");

    /*
     * Routes
     */
    app.get("/hello", (req, res) => {
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
        res.send("Hello, World!");
    });

    /*
     * Login / Logout Routes
     */
    app.post("/login", (req, res) => {
        // Users Login
        console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

        if (!req.body.email || !req.body.password) {
            console.error("Please fill all field");
            res.send("Please fill all fields");
            return;
        }

        Users.findOne({email: req.body.email})
            .then(user => {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    console.error("Email or password invalid");
                    res.send("Email or password invalid");
                    return;
                }

                // Else, connect
                // Create JWToken
                let token = createToken({
                    _id: user._id,
                    pseudo: user.pseudo,
                });
                // Stock token in localstorage

                // localstorage.setItem("bookshelf_token", token);
                console.log("Successfully generated token");
                res.json(token);
                return;
            })
            .catch(error => {
                console.error(error);
                res.send(error);
                return;
            });
    });

    app.get("/logout", (req, res) => {
        // Users Logout
        console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);
        // clear token from localstorage
        // localstorage.removeItem("bookshelf_token");
        console.log("Successfully logged out");
        res.json("Successfully logged out");
        return;
    });

    /*
     * Catch-all route
     */
    app.all("*", (req, res) => {
        console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);
        res.render("../index.html");
        return;
    });

    /*
     * Initiate Express
     */
    app.listen(APP_PORT, () =>
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
});
