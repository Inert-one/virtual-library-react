const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const User = db.User;

module.exports = {
  login,
  getAll,
  getById,
  getByUserName,
  create,
  update,
  delete: _delete,
};

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(_id) {
  return await User.findById({ _id });
}
async function getByUserName(username) {
  return await User.findOne({ username });
}

async function create(userParam) {
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
  return user;
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
