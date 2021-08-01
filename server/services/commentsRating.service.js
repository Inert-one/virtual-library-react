const mongoose = require("mongoose");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require("../_helpers/db");
const CommentRating = db.CommentRating;

async function setUserRating({ commentId, value }, userId) {
  if (!isObjectIDvalid(commentId)) throw new Error("CommentID is not valid!");

  const ratingInDatabase = await CommentRating.findOne({
    userId,
    commentId,
  });

  if (ratingInDatabase) {
    if (value === null) {
      ratingInDatabase.remove((err, obj) => {
        if (err) throw new Error(err.message);
        return { message: "Comment Rating deleted!", isSaved: true };
      });
    }

    if (value === "like" || value === "dislike") {
      ratingInDatabase.value = value;
      ratingInDatabase.save(function (err, obj) {
        if (err) throw new Error(err.message);
        return { message: "Comment Rating updated!", isSaved: true };
      });
    }
  } else {
    const commentRating = new CommentRating({ userId, commentId, value });
    commentRating.save(function (err, obj) {
      if (err) throw new Error(err.message);
      return { message: "Comment Rate created!", isSaved: true };
    });
  }
}

async function getCommentRating(commentId) {
  if (!isObjectIDvalid(commentId)) throw new Error("CommentID is not valid!");

  const commentRatings = await CommentRating.find({
    commentId,
  });

  const value = commentRatings.reduce((acc, { value }) => {
    if (value === "like") return acc + 1;
    if (value === "dislike") return acc - 1;
    return acc;
  }, 0);

  return { value };
}

async function getUserCommentRating(commentId, userId) {
  if (!isObjectIDvalid(commentId)) throw new Error("CommentID is not valid!");

  const commentRatings = await CommentRating.findOne({
    userId,
    commentId,
  });

  if (commentRatings) return { value: commentRatings.value };
  return { value: null };
}

async function getAll() {
  return await CommentRating.find();
}
async function findQuery(query) {
  return await CommentRating.find(query);
}

module.exports = {
  setUserRating,
  getCommentRating,
  getUserCommentRating,
  getAll,
  findQuery,
};
