const mongoose = require('mongoose');

var postsSchema = mongoose.Schema({
    title: { type: String, required: [true, "This can't be blank"], index: true },
    post: { type: String },
    username: { type: String, required: [true, "This can't be blank"] }
});

mongoose.model("Posts", postsSchema, "Posts");