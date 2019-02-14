/* becodeorg/bookshelf
 *
 * /src/server/models/Borroweds.js - Mongoose's Borroweds Schema & Model definition
 *
 * coded by Tanguy@Team Noix
 * started at 14/02/2019
 */

import mongoose from "mongoose";

const borrowedSchema = new mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    book_id: mongoose.Schema.ObjectId,
    borrowed_date: Number,
    returned_date: Number,
});
const Borroweds = mongoose.model("Borroweds", borrowedSchema, "borroweds"); // model( 'model name', schema, 'collection name' )

export default Borroweds;
