var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");

/* GET home page. */
router.get('/', signupController.signup_get);

router.post("/", signupController.signup_post)

router.get("/login", loginController.login_get)

router.post("/login", loginController.login_post)


router.get("/messages", function(req, res, next) {
  res.render("messages");
});


module.exports = router;

