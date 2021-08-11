const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DownloadSchema = new Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  file_path: {type: String, required: true}
});

const Download = mongoose.model("Download", DownloadSchema, "downloads");

module.exports = Download;
