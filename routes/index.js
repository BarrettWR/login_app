var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", [
  check('fullname').trim().escape(),
  check('username').trim().escape(),
  check('password').trim().escape(),
  check('confirmpassword').trim().escape(),
  check('email').isEmail().trim().withMessage('Invalid email address').escape(),
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (req.body.password != req.body.confirmpassword) {
      errors.errors.push({
        value: req.body.password,
        msg: 'Passwords do not match',
        param: 'password',
        location: 'body'
      });
    }

    if (!errors.isEmpty()) {
      await res.render('index', {
        errors: errors.array()
      });
    }
    else {
      const user = new User({
        fullName: req.body.fullname,
        userName: req.body.username,
        password: req.body.password,
        email: req.body.email,
        membership: false
      })

      await user.save()
      res.redirect("/login")
    }
  }
))

router.get("/login", function(req, res, next) {
  res.render("login");
});

// router.post("/login", function(req, res, next) {
//   console.log(req.body);
//   res.render("login");
// })


module.exports = router;
