var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');
const Message = require("../models/message");


exports.messages_get = asyncHandler(async (req, res, next) => {
    // const gamer = await User.findOne({userName: "gamer"});
    // const message = new Message({
    //   title: "sup",
    //   message: "hello world",
    //   authorID: gamer._id,
    //   authorName: gamer.userName,
    //   time: new Date()
    // })
    // await message.save();
    let messages = await Message.find();
    res.render("messages", {messages: messages, user:req.user});
});



  
exports.logout_post = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    let messages = await Message.find();
    res.render("messages", {messages: messages, user:req.user});
});