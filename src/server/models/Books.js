/* becodeorg/bookshelf
 *
 * /src/server/models/Books.js - Books Model
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import mongoose from "mongoose";

/*
 * Mongoose's Book Schema & Model definition
 */
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    language: String,
    format: String,
    created_at: Number,
    updated_at: Number,
});
const Books = mongoose.model("Books", bookSchema, "books"); // model( 'model name', schema, 'collection name' )

export default Books;
/* ------ */
