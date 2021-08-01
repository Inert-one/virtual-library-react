const mongoose = require("mongoose");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require("../_helpers/db");
const BookRating = db.BookRating;

async function set({ bookId, value }, userId) {
  if (!isObjectIDvalid(bookId)) throw new Error("CommentID is not valid!");

  const ratingInDatabase = await BookRating.findOne({
    userId,
    bookId,
  });

  if (ratingInDatabase) {
    ratingInDatabase.value = value;
    ratingInDatabase.save(function (err, obj) {
      if (err) throw new Error("err.message");
      return;
    });
  } else {
    const commentRating = new BookRating({ userId, bookId, value });
    commentRating.save();
  }
}

async function getAverageRate(bookId) {
  if (!isObjectIDvalid(bookId)) throw new Error("CommentID is not valid!");

  const bookRatings = await ratingsByBookId(bookId);
  if (!bookRatings.length) return { value: 0 };

  const value = (
    bookRatings.reduce((acc, { value }) => {
      return acc + value;
    }, 0) / bookRatings.length
  ).toFixed(2);

  return { value, quantity: bookRatings.length };
}

async function userRateToBook(bookId, userId) {
  if (!isObjectIDvalid(bookId)) throw newError("CommentID is not valid!");

  const bookRating = await BookRating.findOne({
    userId,
    bookId,
  });

  if (bookRating)
    return {
      value: bookRating.value,
      isFound: true,
    };
  return { isFound: false };
}

async function ratingsByBookId(bookId) {
  return await BookRating.find({
    bookId,
  });
}

async function getAll() {
  return await BookRating.find({});
}
async function findQuery(query) {
  return await BookRating.find(query);
}

module.exports = {
  set,
  getAverageRate,
  ratingsByBookId,
  userRateToBook,
  getAll,
  findQuery,
};
