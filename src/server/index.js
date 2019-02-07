/* becodeorg/bookshelf
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/01/2019
 */

process.env.databaseName = "test_bookshelf";
process.env.databaseUsername = "dev";
process.env.databasePassword = "dev";
process.env.databaseUrl = "mongo";
process.env.databasePort = "27017";

import express from "express";
import path from "path";
import assert from "assert";

const {APP_PORT} = process.env;
const app = express();
const MongoClient = require("mongodb").MongoClient;

let db = null;

// Connect to database
(async function() {
    const dbName = process.env.databaseName;
    const url = `mongodb://${process.env.databaseUsername}:${
        process.env.databasePassword
    }@${process.env.databaseUrl}:${process.env.databasePort}`;
    const client = new MongoClient(url, {useNewUrlParser: true});

    try {
        await client.connect();
        console.log("Connected successfully to server");
        db = client.db(dbName);
    } catch (error) {
        console.error(error);
    }

    /*
     * Avoid closing connection - we want to keep it alive for our requests (and it raises crash notice from NODEMON)
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
    console.log("This is /users route");
    // get users from database
    db.collection("users")
        .find({})
        .toArray((err, result) => {
            // Check if errors getting datas
            assert.equal(null, err);

            // send users in JSON format
            res.send(JSON.stringify(result));
        });
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
