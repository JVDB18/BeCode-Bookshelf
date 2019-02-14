/* becodeorg/bookshelf
 *
 * /src/server/models/Reviews.js - Mongoose's Reviews Schema & Model definition
 *
 * coded by Tanguy@Team Noix
 * started at 13/02/2019
 */

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    book_id: mongoose.Schema.Types.ObjectId,
    stars: Number,
    commentary: String,
    created_at: Number,
    updated_at: Number,
});
const Reviews = mongoose.model("Reviews", reviewSchema, "reviews"); // model( 'model name', schema, 'collection name' )

export default Reviews;
