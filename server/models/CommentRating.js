const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentRatingSchema = new Schema({
  userId: { type: String, required: true },
  commentId: { type: String, required: true },
  value: { type: String, required: true },
});

const CommentRating = mongoose.model(
  "CommentRating",
  CommentRatingSchema,
  "commentRatings"
);

module.exports = CommentRating;
