var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.DEV_PORT || 4800;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/test");
require("./src/modules/User/userModel.js");
require("./src/modules/Wishlist/wishlistModel.js");

app.use(require('./src/modules/User/user-route.js'));
app.use(require('./src/modules/Wishlist/wishlist-route.js'));

app.get('/', function(req, res) {
    res.send("Welcome to API");
});

app.listen(port, function() {
    console.log("Initializing Server on port ::: ", port);
});