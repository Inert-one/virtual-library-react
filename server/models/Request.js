const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    bookName: { type: String, required: true },
    author: { type: String, required: true, minlength: 2, maxlength: 30 },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema, "Requests");

module.exports = Request;
