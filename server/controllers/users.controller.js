const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");

router.post("/login", login);
router.post("/register", register);
router.get("/:username", getByUserName);

module.exports = router;

function login(req, res, next) {
  userService
    .login(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}
function getByUserName(req, res, next) {
  const { username } = req.params;

  userService
    .getByUserName(username)
    .then((user) =>
      user
        ? res.json({ user, isFound: true })
        : res.status(400).json({
            message: `There isn't username called '${username}' `,
            isFound: false,
          })
    )
    .catch((err) => next(err));
}
