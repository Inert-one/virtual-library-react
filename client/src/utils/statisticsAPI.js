import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

function getBestBooks(cb) {
  let headers = authHeader();
  fetch(URL_API.getBestBooks, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function getLastBooks(cb) {
  let headers = authHeader();
  fetch(URL_API.getLastBooks, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function getMostPopular(cb) {
  let headers = authHeader();
  fetch(URL_API.getMostPopular, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function getQuantityOfCategories(cb) {
  let headers = authHeader();
  fetch(URL_API.getQuantityOfCategories, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function getUserActivity(userId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.getUserActivity}/${userId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function getUserBooks(userId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.getUserBooks}/${userId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function getNumbers(cb) {
  let headers = authHeader();
  fetch(URL_API.getNumbers, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

export default {
  getBestBooks,
  getLastBooks,
  getMostPopular,
  getQuantityOfCategories,
  getNumbers,
  getUserActivity,
  getUserBooks,
};
