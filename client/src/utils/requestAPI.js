import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

function getRequest(cb) {
    let headers = authHeader();
    fetch(URL_API.getRequest, {
      method: "GET",
      headers,
    })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function setRequest(request, cb) {
  let headers = authHeader();
  fetch(URL_API.setRequest, {
    method: "POST",
    headers,
    body: JSON.stringify({ request }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
export default {getRequest, setRequest};