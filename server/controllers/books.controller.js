const express = require("express");
const router = express.Router();

const booksService = require("../services/books.service.js");

router.post("/", getBooks);
router.post("/add", createBook);
router.get("/user", getCurrentUserBooks);
router.get("/user/:userId", getUserBooks);
router.delete("/delete", removeBook);

async function createBook(req, res) {
  const userId = req.user.sub;

  booksService
    .create(req.body, userId)
    .then(() => res.json({ message: "Book created!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

function getBooks(req, res) {
  booksService
    .getBooks(req.body)
    .then((books) => res.json(books))
    .catch((err) => res.json({ message: err }));
}

function getCurrentUserBooks(req, res, next) {
  const userId = req.user.sub;

  booksService
    .getBooksCreatedByUser(userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function removeBook(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;

  booksService
    ._delete(bookId, userId)
    .then(() => res.json({ message: "Book removed!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}
function getUserBooks(req, res, next) {
  const { userId } = req.params;
  console.log(userId);
  booksService
    .getBooksCreatedByUser(userId, 3)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function removeBook(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;

  booksService
    ._delete(bookId, userId)
    .then(() => res.json({ message: "Book removed!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

module.exports = router;
