const mongoose = require("mongoose");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require("../_helpers/db");
const Download = db.Download;

const booksService = require("../services/books.service.js");

async function get(userId) {
  const downloads = await Download.find({ userId });

  const bookIds = downloads
    .map((m) => m.bookId)
    .filter((id) => isObjectIDvalid(id));
  return await booksService.getBooksByIds(bookIds);
}
async function isBookMarked(userId, bookId) {
  const download = await Download.findOne({ bookId, userId });

  if (download !== null) {
    return true;
  }
  return false;
}

async function create(bookId, userId) {
  const book = await booksService.getBooksByIds(bookId);
  if (!book) return { message: "Book does not exist!", isSaved: false };

  const _marker = await Download.findOne({
    userId,
    bookId,
  });
  if (_marker)
    return { message: "Download already in database!", isSaved: false };

  const download = new Download({ userId, bookId });
  return await download.save();
}

async function _delete(bookId, userId) {
  const [book] = await booksService.getBooksByIds(bookId);
  if (!book) throw new Error("Book does not exist!");

  const download = await Download.findOne({
    userId,
    bookId,
  });

  if (!download) throw new Error("Download is not in database!");

  return await download.remove();
}

async function getAll() {
  return await Download.find();
}
async function findQuery(query) {
  return await Download.find(query);
}

module.exports = { get, create, _delete, getAll, findQuery, isBookMarked };
