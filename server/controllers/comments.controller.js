const express = require("express");
const router = express.Router();

const userService = require("../services/user.service.js");
const commentsService = require("../services/comments.service.js");

router.post("/get", getBookComments);
router.post("/", createBookComment);

async function createBookComment(req, res) {
  const userId = req.user.sub;

  commentsService
    .create(req.body, userId)
    .then(() => res.json({ message: "Comment created!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

async function getBookComments(req, res) {
  const { bookId } = req.body;

  commentsService
    .getCommentsForBook(bookId)
    .then(async (comments) => {
      return await Promise.all(
        comments.map(async (comment) => {
          const user = await userService.getById(comment.userId);
          const name = `${user.firstName} ${user.lastName}`;
          return { comment, user, name };
        })
      );
    })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }));
}

module.exports = router;
