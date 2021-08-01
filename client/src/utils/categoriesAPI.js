import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

function get(cb) {
  fetch(URL_API.getCategories)
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function add(category, cb) {
  let headers = authHeader();
  fetch(URL_API.addCategories, {
    method: "POST",
    headers,
    body: JSON.stringify({ category }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function remove(id, cb) {
  let headers = authHeader();
  fetch(URL_API.removeCategories, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
export default { get, add, remove };
