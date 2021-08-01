const express = require("express");
const router = express.Router();

const markersService = require("../services/markers.service.js");

router.get("/user", getUserMarkers);
router.get("/book/:bookId", isBookMarked);
router.post("/", createMarker);
router.delete("/", deleteMarker);

function isBookMarked(req, res) {
  const userId = req.user.sub;
  const { bookId } = req.params;

  markersService
    .isBookMarked(userId, bookId)
    .then((isMarked) => res.json({ isMarked }))
    .catch(() => res.json({ isMarked: false }));
}
function getUserMarkers(req, res) {
  const userId = req.user.sub;

  markersService
    .get(userId)
    .then((books) => res.json(books))
    .catch((err) => res.json(err));
}

function createMarker(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;

  markersService
    .create(bookId, userId)
    .then(() => res.json({ message: "Marker created!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

function deleteMarker(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;

  markersService
    ._delete(bookId, userId)
    .then(() => res.json({ message: "Marker deleted!", isSaved: true }))
    .catch((err) => {
      res.json({ message: err.message, isSaved: false });
    });
}

module.exports = router;
