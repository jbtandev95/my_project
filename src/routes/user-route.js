var router = require('express').Router();
var config = require('../config/config.js');
var jwt = require('jsonwebtoken');
var auth = require("../auth.js");
var mongoose = require("mongoose");
var User = mongoose.model("User");
const bcrypt = require('bcrypt');

router.get("/findAllUser", function(req, res, next) {
    User.find().then(function(users) {
        return res.json({ users: users });
    }).catch(next);
});

router.post("/login", function(req, res, next) {
    console.log("Generating token");
    if (req.body) {
        let payload = {
            username: req.body.username
        }
        let token = auth.signToken(payload);
        if (token) {
            res.json({
                success: true,
                message: "This is your token",
                token: token
            });
        } else {
            res.json({
                success: false,
                message: 'Error in generating token'
            });
        }
    } else {
        res.json({
            success: false,
            message: "Please provide authenntication details"
        })
    }
});

router.post("/user", function(req, res, next) {
    var user = new User();

    user.username = req.body.username;
    user.name = req.body.name;
    user.age = req.body.age;
    user.password = req.body.password;

    // bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
    //     user.password = hash;
    user.save().then(function() {
        return res.json({ user: user.toAuthJSON() });
    }).catch(next);
    // }).catch(next);
});

router.post("/userLogin", function(req, res, next) {
    var foundUser = null;
    User.findOne({ username: req.body.username }).then(function(user) {
        foundUser = user;
        console.log(foundUser);

        if (foundUser) {
            bcrypt.compare(req.body.password, foundUser.password).then(function(result) {
                var token;
                if (result) {
                    let payload = {
                        username: foundUser.username
                    }
                    token = auth.signToken(payload);
                }
                res.json({
                    success: result,
                    token: token,
                    errorMessage: result ? null : "Sorry your username or password is invalid, please try again"
                })
            }).catch(next);
        } else {
            res.json({
                success: false,
                errorMessage: "User not found nigga"
            })
        }
    }).catch(next);
});

module.exports = router;