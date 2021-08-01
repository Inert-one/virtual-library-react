const express = require("express");
const router = express.Router();

const categoriesService = require("../services/categories.service");

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/", deleteCategory);

async function createCategory(req, res) {
  categoriesService
    .create(req.body, req.user.sub)
    .then(() => res.json({ message: "Category created!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

async function deleteCategory(req, res) {
  categoriesService
    ._delete(req.body.id, req.user.sub)
    .then(() => res.json({ message: "Category deleted!" }))
    .catch((err) => res.json({ message: err.message }));
}

async function getCategories(req, res) {
  categoriesService
    .get()
    .then((categories) => res.json(categories))
    .catch((err) => res.json({ message: err }));
}
module.exports = router;
