const mongoose = require("mongoose");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require("../_helpers/db");
const Comment = db.Comment;

const booksService = require("../services/books.service.js");

async function getCommentsForBook(bookId) {
  return await Comment.find({
    bookId,
  }).sort({ createdAt: -1 });
}

async function create(comment, userId) {
  const { text, bookId } = comment;

  if (!isObjectIDvalid(bookId)) throw new Error("BookID is not valid!");

  const book = await booksService.getBooksByIds(bookId);
  if (!book) throw new Error("Book does not exist!");

  const newComment = new Comment({ userId, bookId, text });
  newComment.save();
}

async function getAll() {
  return await Comment.find({});
}
async function findQuery(query) {
  return await Comment.find(query);
}

module.exports = {
  getCommentsForBook,
  create,
  getAll,
  findQuery,
};
