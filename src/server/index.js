/* becodeorg/bookshelf
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/01/2019
 */

import express from "express";
import path from "path";
import assert from "assert";

const {APP_PORT} = process.env;
const app = express();
const MongoClient = require("mongodb").MongoClient;

let db = null;

console.log(process.env.DB_NAME);

(async function() {
    /*
     * Connect to database & keep connection alive
     * No return value
     * Saves connection to db variable
     */

    const dbName = process.env.DB_NAME; // Name of the database we want to use
    const url = `mongodb://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD
    }@${process.env.DB_URL}:${process.env.DB_PORT}`; // URL with credentials used to connect to database
    const client = new MongoClient(url, {useNewUrlParser: true}); // Connection instance

    try {
        // Wait for connection to be established
        await client.connect();
        // Print success in server console
        console.log("Connected successfully to server");
        // Save connection for further requests
        db = client.db(dbName);
    } catch (error) {
        // If connection failed
        // Print error in server console
        console.error(error);
    }

    /*
     * Avoid closing connection - we want to keep it alive for our requests (plus, NODEMON, throws an application crash notice if we do so)
     */
    // client.close();
    // console.log( 'Disconnected from server' );
    /* --- */
    return;
})();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
});

app.get("/users", (req, res) => {
    /*
     * Get all users
     * Return JSON with all users
     */

    // Print method & route in server console
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

    // Get datas from database
    db.collection("users") // Collection (equivalent to MySQL's Table) we want to get informations from
        .find({}) // Datas we want to collect (empty object being shorthand for "no specificity" => "find all")
        .toArray((err, result) => {
            // Check if errors getting datas
            assert.equal(null, err);

            // Send datas in JSON format
            res.send(JSON.stringify(result));
        });
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
