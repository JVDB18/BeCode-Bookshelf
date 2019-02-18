/* becodeorg/bookshelf
 *
 * /src/server/routes/books.js - Books Router
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import mongoose from "mongoose";
import express from "express";
import {authMiddleware} from "../authentication.js";
const router = new express.Router();

// Import Mongoose Model
import Borroweds from "../models/Borroweds.js";

// Require Authentication on all routes
router.all("*", authMiddleware);

router.get("/", (req, res) => {
    // Borroweds Index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

    Borroweds.find()
        .then(borroweds => {
            res.json(borroweds);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.get("/:borrowed", (req, res) => {
    // Borroweds Show
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

    Borroweds.findOne({_id: req.params.borrowed})
        .then(borrowed => {
            res.json(borrowed);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.post("/", (req, res) => {
    // Borroweds Store
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

    if (!req.body.user_id || !req.body.book_id) {
        console.log("Missing informations to borrow book");
        res.send("Missing informations to borrow book");
        return;
    }

    const borrowed = {
        user_id: new mongoose.Types.ObjectId(req.body.user_id),
        book_id: new mongoose.Types.ObjectId(req.body.book_id),
        borrowed_date: Date.now(),
        returned_date: null,
    };

    Borroweds.create(borrowed)
        .then(result => {
            console.log("Book borrowing saved to database.");
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

/*
router.get("/:borrowed/edit", (req, res) => {
    // Borroweds Edit
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

    Borroweds.findOne({_id: req.params.borrowed})
        .then(borrowed => {
            res.json(borrowed);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});
*/

router.put("/:borrowed", (req, res) => {
    // Borroweds Update
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

    if (!req.body.user_id || !req.body.book_id || !req.body.borrowed_date) {
        console.log("Missing informations to update book borrowing");
        res.send("Missing informations to update book borrowing");
        return;
    }

    const borrowed = {
        user_id: new mongoose.Types.ObjectId(req.body.user_id),
        book_id: new mongoose.Types.ObjectId(req.body.book_id),
        borrowed_date: req.body.borrowed_date,
        returned_date: req.body.returned_date ? req.body.returned_date : null,
    };

    const options = {
        new: true,
    };

    Reviews.findOneAndUpdate(
        {_id: req.params.borrowed},
        borrowed,
        options,
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return;
            }
            console.log("Book borrowing updated in database");
            res.json(result);
        },
    );
});

/*
 * Not used in current app but, if it's needed, it's there and functionnal.
 * I know, I know, YAGNI - You Aren't Gonna Need It...
 * But hey ! It's called a CRUD, not a CRU !
 * And it's commented anyway, so it's not like it'll be a danger for historisation or something... right ?
 */
/*
router.delete("/:borrowed", (req, res) => {
    // Borroweds Delete
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

    Borroweds.findOneAndDelete({_id: req.params.borrowed}, (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        if (result === null) {
            console.error("Book borrowing not found");
            res.send("Book borrowing not found");
            return;
        }

        console.log("Book borrowing deleted from database");
        res.send("Book borrowing deleted from database");
    });
});
*/

module.exports = router;
