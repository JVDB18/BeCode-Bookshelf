/* becodeorg/bookshelf
 *
 * /src/server/routes/books.js - Books Router
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import express from "express";
const router = new express.Router();

// Import Mongoose Model
import Books from "../models/Books.js";

router.get("/", (req, res) => {
    // Books index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

    Books.find()
        .then(books => {
            res.json(books);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.get("/:book", (req, res) => {
    // Books Show
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

    Books.findOne({_id: req.params.book})
        .then(book => {
            res.json(book);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.post("/", (req, res) => {
    // Books Store
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

    if (!req.body.title || !req.body.author || !req.body.isbn) {
        console.log("Missing informations to create book");
        res.send("Missing informations to create book");
    }

    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        language: req.body.language ? req.body.language : null,
        format: req.body.format ? req.body.format : null,
        created_at: Date.now(),
        updated_at: null,
    };

    Books.create(book)
        .then(result => {
            console.log(`\"${result.title}\" saved to database.`);
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

module.exports = router;
