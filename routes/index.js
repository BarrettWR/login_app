var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const Message = require("../models/message");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");

/* GET home page. */
router.get('/', signupController.signup_get);

router.post("/", signupController.signup_post)

router.get("/login", loginController.login_get)

router.post("/login", loginController.login_post)


router.get("/messages", async function(req, res, next) {
  // const gamer = await User.findOne({userName: "gamer"});
  // const message = new Message({
  //   title: "hi",
  //   message: "message message message",
  //   authorID: gamer._id,
  //   authorName: gamer.userName,
  //   time: new Date()
  // })
  // await message.save();
  let messages = await Message.find();
  res.render("messages", {messages: messages});
});


module.exports = router;

