/* becodeorg/bookshelf
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/01/2019
 */

/*
 * Const & imports
 */
import express from "express";
import mongoose from "mongoose";
import path from "path";
const {APP_PORT} = process.env;
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
// Requests middlewares
app.use(express.json());
app.use(express.urlencoded());

// Routing middlewares
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/borroweds", borrowedsRouter);

// Authentication middlewares

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
     * Initiate Express
     */
    app.listen(APP_PORT, () =>
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
});
