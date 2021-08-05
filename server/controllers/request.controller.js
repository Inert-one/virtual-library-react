const express = require("express");
const router = express.Router();

const userService = require("../services/user.service.js");
const requestService = require("../services/request.service.js");

router.post("/", setRequest);
router.get("/admin", getRequest);

async function setRequest(req, res) {

  requestService
    .create(req.body)
    .then(() => res.json({ message: "Book request sent!", isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}


async function getRequest(req, res) {
  const {userId } = req.body;

  requestService
    .getRequest(userId)
    .then(async (requests) => {
      return await Promise.all(
        requests.map(async (request) => {
          const user = await userService.getById(comment.userId);
          const name = `${user.firstName} ${user.lastName}`;
          return { request, user, name };
        })
      );
    })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }));
}
module.exports = router;