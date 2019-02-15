/* becodeorg/bookshelf
 *
 * /src/server/routes/users.js - Users Router
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcryptjs";
const router = new express.Router();

// Import Mongoose Models
import Users from "../models/Users.js";
import Wishlists from "../models/Wishlists.js";
import Borroweds from "../models/Borroweds.js";

router.get("/", (req, res) => {
    // Users Index

    // Print method & route in server console
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.get("/:user", (req, res) => {
    // Users Show

    // Print method & route in server console
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Users.findOne({_id: req.params.user})
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.post("/", (req, res) => {
    // Users Store
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    if (
        !req.body.password ||
        !req.body.pseudo ||
        !req.body.isCoach ||
        !req.body.email
    ) {
        console.log("Missing informations to create user");
        res.send("Missing informations to create user");
        return;
    }

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

router.get("/:user/edit", (req, res) => {
    // Users Edit
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Users.findOne({pseudo: req.params.user})
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.put("/:user", (req, res) => {
    // Users Update
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    if (!req.body.pseudo || !req.body.isCoach || !req.body.email) {
        console.log("Missing informations to update user");
        res.send("Missing informations to update user");
        return;
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

router.delete("/:user", (req, res) => {
    // Users Delete
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Users.findOneAndDelete({_id: req.params.user}, (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        if (result === null) {
            console.error("User not found");
            res.send("User not found");
            return;
        }

        console.log(`${result.pseudo} deleted from database`);
        res.send(`${result.pseudo} deleted from database`);
    });
});

router.get("/:user/borroweds", (req, res) => {
    // Users' Borroweds Index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Borroweds.find({user_id: req.params.user}, (error, borrows) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.json(borrows);
    });
});

router.get("/:user/wishlists", (req, res) => {
    // Users' Wishlist Index
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Wishlists.find()
        .then(wishes => {
            res.json(wishes);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.get("/:user/wishlists/:wish", (req, res) => {
    // Users' Wishlist Show
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Wishlists.findOne({_id: req.params.wish})
        .then(wish => {
            res.json(wish);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.post("/:user/wishlists", (req, res) => {
    // Users' Wishlist Store
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    if (!req.params.user || !req.body.book_id) {
        console.log("Missing informations to add book to user's wishlist");
        res.send("Missing informations to add book to user's wishlist");
        return;
    }

    const wish = {
        user_id: new mongoose.Types.ObjectId(req.params.user),
        book_id: new mongoose.Types.ObjectId(req.body.book_id),
    };

    Wishlists.create(wish)
        .then(result => {
            console.log("Wishlist saved to database.");
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

router.delete("/:user/wishlists/:wish", (req, res) => {
    // Users' Wishlist Delete
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    Wishlists.findOneAndDelete({_id: req.params.wish}, (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        if (result === null) {
            console.error("Wishlist not found");
            res.send("Wishlist not found");
            return;
        }

        console.log("Wishlist deleted from database");
        res.send("Wishlist deleted from database");
    });
});

router.post("/login", (req, res) => {
    // Users Login
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);
    res.send("User login route not functionnal yet. Please try again later");

    /*
    if (!req.body.email || !req.body.password) {
        console.error("Please fill all field");
        res.send("Please fill all fields");
    }

    Users.findOne({email: req.body.email})
        .then(user => {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                console.error("Email or password invalid");
                res.send("Email or password invalid");
            }

            // Else, connect
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
    */
});

router.get("/logout", (req, res) => {
    // Users Logout
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);
    res.send("User logout route not functionnal yet. Please try again later");
});

module.exports = router;
