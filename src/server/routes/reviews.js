/* becodeorg/bookshelf
 *
 * /src/server/routes/books.js - Books Router
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import mongoose from "mongoose";
import express from "express";
// import {authMiddleware} from "../authentication.js";
const router = new express.Router();

// Import Mongoose Model
import Reviews from "../models/Reviews.js";

// Require Authentication on all routes
// router.all("*", authMiddleware);

router.get("/", (req, res) => {
    // Reviews Index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

    Reviews.find()
        .then(reviews => {
            res.json(reviews);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.get("/:review", (req, res) => {
    // Reviews Show
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

    Reviews.findOne({_id: req.params.review})
        .then(review => {
            res.json(review);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.post("/", (req, res) => {
    // Reviews Store
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

    if (
        !req.body.user_id ||
        !req.body.book_id ||
        !req.body.stars ||
        !req.body.commentary
    ) {
        console.log("Missing informations to create review");
        res.send("Missing informations to create review");
        return;
    }

    const review = {
        user_id: new mongoose.Types.ObjectId(req.body.user_id),
        book_id: new mongoose.Types.ObjectId(req.body.book_id),
        stars: req.body.stars,
        commentary: req.body.commentary,
        created_at: Date.now(),
        updated_at: null,
    };

    Reviews.create(review)
        .then(result => {
            console.log("Review saved to database.");
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

/*
router.get("/:review/edit", (req, res) => {
    // Reviews Edit
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

    Books.findOne({_id: req.params.review})
        .then(review => {
            res.json(review);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});
*/

router.put("/:review", (req, res) => {
    // Review Update
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

    if (!req.body.stars || !req.body.commentary) {
        console.log("Missing informations to update review");
        res.send("Missing informations to update review");
        return;
    }

    const review = {
        stars: req.body.stars,
        commentary: req.body.commentary,
        updated_at: Date.now(),
    };

    const options = {
        new: true,
    };

    Reviews.findOneAndUpdate(
        {_id: req.params.review},
        review,
        options,
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return;
            }
            console.log("Review updated in database");
            res.json(result);
        },
    );
});

router.delete("/:review", (req, res) => {
    // Reviews Delete
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

    Reviews.findOneAndDelete({_id: req.params.review}, (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        if (result === null) {
            console.error("Review not found");
            res.send("Review not found");
            return;
        }

        console.log("Review deleted from database");
        res.send("Review deleted from database");
    });
});

module.exports = router;
