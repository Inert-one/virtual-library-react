import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

function getUserMarkers(cb) {
  let headers = authHeader();
  fetch(URL_API.getUserMarkers, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function isBookMarked(bookId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.isBookMarked}/${bookId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function create(bookId, cb) {
  let headers = authHeader();
  fetch(URL_API.createMarker, {
    method: "POST",
    headers,
    body: JSON.stringify({ bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}
function remove(bookId, cb) {
  let headers = authHeader();
  fetch(URL_API.createMarker, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}

export default { create, getUserMarkers, remove, isBookMarked };
