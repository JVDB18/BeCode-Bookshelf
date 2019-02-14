/* becodeorg/bookshelf
 *
 * /src/server/models/Wishlists.js - Wishlists Model
 *
 * coded by Tanguy@Team Noix
 * started at 14/02/2019
 */

import mongoose from "mongoose";

/*
 * Mongoose's Wishlist Schema & Model definition
 */
const wishlistSchema = new mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    book_id: mongoose.Schema.ObjectId,
});
const Wishlists = mongoose.model("Wishlists", wishlistSchema, "wishlists"); // model( 'model name', schema, 'collection name' )

export default Wishlists;
/* ------ */
