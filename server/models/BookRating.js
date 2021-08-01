const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BooksRatingSchema = new Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  value: { type: Number, required: true, min: 0.5, max: 5 },
});

const BooksRating = mongoose.model(
  "BooksRatings",
  BooksRatingSchema,
  "booksRatings"
);

module.exports = BooksRating;
