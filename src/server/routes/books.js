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
import Borroweds from "../models/Borroweds.js";
import Reviews from "../models/Reviews.js";

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
        return;
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

router.get("/:book/edit", (req, res) => {
    // Books Edit
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

router.put("/:book", (req, res) => {
    // Book Update
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

    if (!req.body.title || !req.body.author || !req.body.isbn) {
        console.log("Missing informations to update book");
        res.send("Missing informations to update book");
        return;
    }

    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        language: req.body.language ? req.body.language : null,
        format: req.body.format ? req.body.format : null,
        updated_at: Date.now(),
    };

    const options = {
        new: true,
    };

    Books.findOneAndUpdate(
        {_id: req.params.book},
        book,
        options,
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return;
            }
            console.log(`\"${result.title}\" updated in database`);
            res.json(result);
        },
    );
});

router.delete("/:book", (req, res) => {
    // Users Delete
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

    Books.findOneAndDelete({_id: req.params.book}, (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        if (result === null) {
            console.error("Book not found");
            res.send("Book not found");
            return;
        }

        console.log(`\"${result.title}\" deleted from database`);
        res.send(`\"${result.title}\" deleted from database`);
    });
});

router.get("/:book/borroweds", (req, res) => {
    // Books' Borroweds Index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

    Borroweds.find({book_id: req.params.book}, (error, borrows) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.json(borrows);
    });
});

router.get("/:book/reviews", (req, res) => {
    // Book's Reviews Index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Reviews.find({book_id: req.params.book}, (error, reviews) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.json(reviews);
    });
});

module.exports = router;
