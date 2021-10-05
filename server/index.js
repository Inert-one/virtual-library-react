const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(jwt());

app.use("/api/users", require("./controllers/users.controller"));
app.use("/api/books", require("./controllers/books.controller"));
app.use("/api/categories", require("./controllers/categories.controller"));
app.use("/api/comments", require("./controllers/comments.controller"));
app.use(
  "/api/commentsRating",
  require("./controllers/commentsRating.controller")
);
app.use("/api/request/", require("./controllers/request.controller"));
app.use("/api/booksRating", require("./controllers/booksRating.controller"));
app.use("/api/markers", require("./controllers/markers.controller"));
app.use("/api/statistics", require("./controllers/statistics.controller"));
app.use("/api/book", require("./controllers/files.controller"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

global.__basedir = __dirname;

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
