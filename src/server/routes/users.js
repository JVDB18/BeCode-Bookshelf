/* becodeorg/bookshelf
 *
 * /src/server/routes/users.js - Users Router
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import express from "express";
import bcrypt from "bcryptjs";
const router = new express.Router();

// Import Mongoose Model
import Users from "../models/Users.js";

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

    Users.deleteOne({_id: req.params.user}, error => {
        if (error) {
            console.error(error);
            res.send(error);
        }

        console.log("User deleted from database");
        res.send("User deleted from database");
    });
});

router.post("/login", (req, res) => {
    // Users Login
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

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
});

// Users Logout

module.exports = router;