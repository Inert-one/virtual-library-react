const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  category: { type: String, required: true },
});

const Category = mongoose.model("Category", BookSchema, "categories");

module.exports = Category;
