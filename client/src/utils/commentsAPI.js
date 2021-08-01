import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

export default { get, add, remove };

function get(bookId, cb) {
  let headers = authHeader();
  fetch(URL_API.getComments, {
    method: "POST",
    headers,
    body: JSON.stringify({ bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function add(payload, cb) {
  let headers = authHeader();
  fetch(URL_API.addComment, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function remove(id, cb) {
  let headers = authHeader();
  fetch(URL_API.removeComment, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
