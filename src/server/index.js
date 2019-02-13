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
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const {APP_PORT} = process.env;
const app = express();

import Users from "./models/Users.js";

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
app.use(express.json());
app.use(express.urlencoded());
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

    app.get("/api/users", (req, res) => {
        // Users Index

        // Print method & route in server console
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

        Users.find()
            .then(users => {
                res.json(users);
            })
            .catch(error => {
                console.error(error);
                res.send(error);
            });
    });

    app.get("/api/users/:user", (req, res) => {
        // Users Show

        // Print method & route in server console
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

        Users.findOne({_id: req.params.user})
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                console.error(error);
                res.send(error);
            });
    });

    app.post("/api/users", (req, res) => {
        // Users Store
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

        const user = {
            isCoach: req.body.isCoach,
            pseudo: req.body.pseudo,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            created_at: Date.now(),
            updated_at: null,
        };

        Users.create(user)
            .then(result => {
                console.log(`${result.pseudo} saved to database.`);
                res.json(result);
            })
            .catch(error => {
                console.error(error);
                res.send(error);
            });
    });

    app.get("/api/users/:user/edit", (req, res) => {
        // Users Edit
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

        Users.findOne({pseudo: req.params.user})
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                console.error(error);
                res.send(error);
            });
    });

    app.put("/api/users/:user", (req, res) => {
        // Users Update
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

        if (!req.body.pseudo || !req.body.isCoach || !req.body.email) {
            console.log("Missing informations to update user");
            res.send("Missing informations to update user");
        }

        let user = {
            isCoach: req.body.isCoach,
            pseudo: req.body.pseudo,
            email: req.body.email,
            updated_at: Date.now(),
        };

        const options = {
            new: true,
        };

        if (req.body.password && req.body.password !== "") {
            // A new password was given, so we update it as well
            user.password = bcrypt.hashSync(req.body.password, 10);
        }

        // Get user based on _id field, update selected fields, then executes callback
        Users.findOneAndUpdate(
            {_id: req.params.user},
            user,
            options,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.send(error);
                }
                console.log(`${result.pseudo} updated in database`);
                res.json(result);
            },
        );
    });

    app.delete("/api/users/:user", (req, res) => {
        // Users Delete
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

        Users.deleteOne({_id: req.params.user}, error => {
            if (error) {
                console.error(error);
                res.send(error);
            }

            console.log("User deleted from database");
            res.send("User deleted from database");
        });
    });

    // Users Login
    // Users Logout

    /*
     * Initiate Express
     */
    app.listen(APP_PORT, () =>
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
});
