import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

export default { set, getById, getUserCommentRate };

function getUserCommentRate(commentId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.getUserCommentRate}/${commentId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      cb(res);
    });
}

function getById(commentId, cb) {
  let headers = authHeader();
  fetch(`${URL_API.getCommentRateById}/${commentId}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      cb(res);
    });
}

function set(payload, cb) {
  let headers = authHeader();
  fetch(URL_API.setCommentRate, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      cb(res);
    });
}
