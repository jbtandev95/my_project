const mongoose = require('mongoose');

var WishlistSchema = mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], index: true },
    value: Number,
    priority: Number
}, { timestamps: true });


mongoose.model("Wishlist", WishlistSchema, "Wishlist");