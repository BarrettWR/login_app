var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

exports.login_get = asyncHandler(async (req, res, next) => {
    res.render("login", {error: "", success: ""});
});

exports.login_post = function (req, res, next) {
  passport.authenticate("local", function (err, user, info ) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {error: info})
    }

    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      return res.redirect('messages');
    });
  })
  (req, res, next)
}

  // Styling error messages in index
  // fixing index in general
  // make a logo
  // do the content page
