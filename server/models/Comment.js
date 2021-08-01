const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    text: { type: String, required: true, minlength: 2, maxlength: 200 },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema, "coments");

module.exports = Comment;
