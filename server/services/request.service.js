const mongoose = require("mongoose");
// const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require("../_helpers/db");
const Request = db.Request;

const userService = require("../services/user.service.js");

async function getRequest(id, request) {
    return await Request.find({addedById : id})
    .sort({
      createdAt: -1,
    })
    .limit(request);
  }
  
  async function create(newRequest) {
    // const user = await userService.getById(userId);
    // // if(!isObjectIDvalid(user)) throw new Error("userId not found")
    // if ((user.userType === 1))
    //   throw new Error("You are not allowed to create requests!");
  // console.log(newRequest.request)
    const request = new Request(newRequest.request);
    request.save();
  }
  async function getAll(limit) {
    return await Request.find().sort({ createdAt: -1 });
  }

  module.exports = {
    create,
    getAll,
    getRequest,
  };