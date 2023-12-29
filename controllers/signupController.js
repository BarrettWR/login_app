var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require('../models/user');

exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render("index");
});

exports.signup_post = [
  check('fullname').trim().escape(),
  check('username').trim().escape(),
  check('password').trim().escape(),
  check('confirmpassword').trim().escape(),
  check('email').isEmail().trim().withMessage('Invalid email address').escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
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
      res.render("login", {success: "User created! Try logging in."})
    }
  })
]