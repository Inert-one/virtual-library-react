const express = require("express");
const router = express.Router();

const booksRatingService = require("../services/booksRating.service.js");

router.post("/", setBookRating);
router.get("/:bookId", getAverageBookRate);
router.get("/user/:bookId", getBookUserRate);

async function setBookRating(req, res) {
  const userId = req.user.sub;
  booksRatingService
    .set(req.body, userId)
    .then(() => res.json({ message: "Book Rate created!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

async function getAverageBookRate(req, res) {
  const { bookId } = req.params;

  booksRatingService
    .getAverageRate(bookId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

async function getBookUserRate(req, res) {
  const { bookId } = req.params;
  const userId = req.user.sub;

  booksRatingService
    .userRateToBook(bookId, userId)
    .then((data) => res.json(data))
    .catch((err) =>
      res.json({ message: err.message, isSaved: false, isFound: false })
    );
}

module.exports = router;
