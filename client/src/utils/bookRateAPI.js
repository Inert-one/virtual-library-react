import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

export default {
  set,
  getUserBookRate,
  getAverageBookRate,
};

function getAverageBookRate(bookId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.getAverageBookRate}/${bookId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function set(payload, cb) {
  let headers = authHeader();
  fetch(URL_API.setBookRate, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function getUserBookRate(bookId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.getBookRateById}/${bookId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
