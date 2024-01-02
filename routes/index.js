var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const Message = require("../models/message");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const messagesController = require("../controllers/messagesController");


/* GET home page. */
router.get('/', signupController.signup_get);

router.post("/", signupController.signup_post)

router.get("/login", loginController.login_get)

router.post("/login", loginController.login_post)

router.get("/messages", messagesController.messages_get)

router.post("/messages", messagesController.messages_post)

router.post("/membership", messagesController.membership_post)

router.post("/logout", loginController.logout_post)


module.exports = router;


// posting messages
