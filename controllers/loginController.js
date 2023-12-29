var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require('../models/user');

exports.login_get = asyncHandler(async (req, res, next) => {
    res.render("login");
});

exports.login_post = [
    check('username').trim().escape(),
    check('password').trim().escape(),
    check('confirmpassword').trim().escape(),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (req.body.password != req.body.confirmPassword) {
        errors.errors.push({
          value: req.body.password,
          msg: 'Passwords do not match',
          param: 'password',
          location: 'body'
        });
      }
  
      if (!errors.isEmpty()) {
        await res.render('login', {
          errors: errors.array()
        });
      }
      else {
        let currentUser = await User.findOne({userName: req.body.username });
      
        if (currentUser) {
          if (currentUser.password == req.body.password) {
            await res.render("messages");
          }
        }
        else {
          errors.errors.push({
            value: req.body.username,
            msg: 'User not found.',
            param: 'username',
            location: 'body'
          });
          await res.render("login", {errors: errors.array()});
        }
      }
    })
]