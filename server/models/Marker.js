const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkerSchema = new Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
});

const Marker = mongoose.model("Marker", MarkerSchema, "markers");

module.exports = Marker;
