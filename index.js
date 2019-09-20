var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.DEV_PORT || 4500;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/test");
require("./src/models/userModel.js");

app.use(require('./src/routes/user-route.js'));

app.get('/', function(req, res) {
    res.send("Welcome to API");
});

app.listen(port, function() {
    console.log("Initializing Server on port ::: ", port);
});