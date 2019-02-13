/* becodeorg/bookshelf
 *
 * /src/server/Users.js - Users Controller
 *
 * coded by Tanguy@Team Noix
 * started at 08/02/2019
 */

import mongoose from "mongoose";

/*
 * Mongoose's User Schema & Model definition
 */
const userSchema = new mongoose.Schema({
    isCoach: Boolean,
    pseudo: String,
    email: String,
    password: String,
    created_at: Number,
    updated_at: Number,
});
const Users = mongoose.model("Users", userSchema, "users"); // model( 'model name', schema, 'collection name' )

export default Users;
/* ------ */
