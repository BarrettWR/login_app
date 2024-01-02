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
    let messages = await Message.find();
    res.render("messages", {messages: messages, user:req.user, error: ""});
});


exports.messages_post = [
    check('messagebox').trim().escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const messageBox = req.body.messagebox;
        if (messageBox.length > 500 || messageBox.length < 10) {
            errors.errors.push({
                message: "Message must be between 10 and 500 characters!"
            })
        }
        
        if (!req.user) {
            errors.errors.push({
                message: "Need to be logged in to post messages!"
            })
        }

        if (!errors.isEmpty()) {
            console.log("error")
            let messages = await Message.find();
            res.render("messages", {messages: messages, user:req.user, errors: errors.array()});
        }
        else {
            const newMessage = new Message({
                message: messageBox,
                authorID: req.user._id,
                authorName: req.user.userName,
                time: new Date()
            })
            await newMessage.save();
            let messages = await Message.find();
            console.log(messages)
            console.log(req.user)
            res.render("messages", {messages: messages, user:req.user, errors: ""});
        } 
    })
]

exports.membership_post = [
    check('secretcode').trim().escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!req.user) {
            errors.errors.push({
                message: "Need to be logged in to gain membership!"
            })
        }

        if (!(req.body.secretcode == "Toast")) {
            errors.errors.push({
                message: "Incorrect Code!"
            })
        }

        if (!errors.isEmpty()) {
            let messages = await Message.find();
            res.render("messages", {messages: messages, user:req.user, errors: errors.array()});
        }
        else {
            await User.updateOne({_id: req.user._id}, { membership: true});
            res.redirect("/messages");
        }
    })
]