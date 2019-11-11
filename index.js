const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { handleError, CustomError } = require("./src/utils/CustomError");
const { buildResponse } = require("./src/utils/CustomResponse");
//import environment config from .env file
require('dotenv').config();

const port = process.env.DEV_PORT || 4800;

//import models
require("./src/modules/User/userModel.js");
require("./src/modules/Wishlist/wishlistModel.js");
require("./src/modules/Transaction/transactionModel.js");

//setup express server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import routes
app.use(require('./src/modules/User/user-route.js'));
app.use(require('./src/modules/Wishlist/wishlist-route.js'));
app.use(require('./src/modules/Transaction/transaction-route.js'));

//setup db connection
mongoose.connect("mongodb://localhost:27017/test");


app.get('/', function(req, res) {
    res.send("Welcome to API");
});


app.get('/error', function(req, res) {
    throw new CustomError(500, "Internal Server Error");
});

//middleware to handle errors
app.use((err, req, res, next) => {
    handleError(err, res);
});

//middleware to handle proper response build
app.use((req, res, next) => {
	buildResponse(req, res, next);
});

app.listen(port, function() {
    console.log("Initializing Server on port ::: ", port);
});