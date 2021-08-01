const express = require("express");
const router = express.Router();

const statisticsService = require("../services/statistics.service.js");

router.get("/bestBooks", getBestBook);
router.get("/lastBooks", getLastBooks);
router.get("/mostPopularBooks", getMostPopular);
router.get("/getQuantityOfCategories", getQuantityOfCategories);
router.get("/getNumbers", getNumbers);
router.get("/userActivity/:userId", getUserActivity);

function getBestBook(req, res) {
  statisticsService
    .getBestBooks(3)
    .then((books) => res.json(books))
    .catch((err) => res.json({ err }));
}
function getLastBooks(req, res) {
  statisticsService
    .getLastBooks(3)
    .then((books) => res.json(books))
    .catch(() => res.json({}));
}

function getMostPopular(req, res) {
  statisticsService
    .getMostPopularBooks(3)
    .then((books) => {
      res.json(books);
    })
    .catch(() => res.json({}));
}
function getQuantityOfCategories(req, res) {
  statisticsService
    .getQuantityOfCategories()
    .then((cat) => {
      res.json(cat);
    })
    .catch(() => res.json({}));
}
function getNumbers(req, res) {
  statisticsService
    .getNumbers()
    .then((books) => {
      res.json(books);
    })
    .catch(() => res.json({}));
}
function getUserActivity(req, res) {
  const { userId } = req.params;

  statisticsService
    .getUserActivity(userId)
    .then((cat) => {
      res.json(cat);
    })
    .catch(() => res.json({}));
}

module.exports = router;
