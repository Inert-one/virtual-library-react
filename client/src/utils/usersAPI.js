import { URL_API } from "./URL_API.js";

export default { getByUserName };

function getByUserName(username, cb, signal) {
  fetch(`${URL_API.getByUserName}/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
