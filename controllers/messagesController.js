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
    if (!req.user) {
        let error = {message: "Need to be logged in to see messages!"}
        res.render("login", {error: error, success: ""})
    }

    else {
        let messages = await Message.find();
        res.render("messages", {messages: messages, user:req.user, error: ""});
    }
});


exports.membership_post = [
    check('secretcode').trim().escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body.secretcode)
        if (req.body.secretcode == "Toast") {
            await User.updateOne({_id: req.user._id}, { membership: true});
            res.redirect("/messages");
        }
        else {
            errors.errors.push({
                message: "Incorrect Code!"
            })
            let messages = await Message.find();
            res.render("messages", {messages: messages, user:req.user, errors: errors.array()});
        }
    })
]