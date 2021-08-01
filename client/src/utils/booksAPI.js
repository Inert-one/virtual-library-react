import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

export default { getBooks, getUserBooks, remove, create };

function getBooks(options, cb) {
  fetch(URL_API.getBooks, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function getUserBooks(cb, userId = false) {
  let headers = authHeader();
  const URL = userId
    ? `${URL_API.getUserBooks}/${userId}`
    : URL_API.getUserBooks;

  fetch(URL, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}
function remove(bookId, cb) {
  let headers = authHeader();
  fetch(URL_API.deleteBook, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.message);
      cb(res);
    });
}

function create(book, cb) {
  let headers = authHeader();
  fetch(URL_API.addBook, {
    method: "POST",
    headers,
    body: JSON.stringify(book),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
