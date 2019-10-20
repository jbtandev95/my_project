const mongoose = require('mongoose');
const Wishlist = mongoose.model("Wishlist");
const ErrorCodeBundle = require("../../bundles/ErrorCode/ErrorCode.js");

const createWish = (wishlistDto, res, next) => {
    Wishlist.findOne({ name: wishlistDto.name }).then(existingWish => {
        if (existingWish) {
            return res.json({ success: false, errorCode: ErrorCodeBundle.err1001 });
        } else {
            const wishlist = new Wishlist();

            wishlist.name = wishlistDto.name;
            wishlist.value = wishlistDto.value;
            wishlist.priority = wishlistDto.priority;

            wishlist.save().then(function() {
                return res.json({ success: true, wishlist: wishlist });
            }).catch(next);
        }
    }).catch(err => {
        return res.json({ success: false, errorCode: ErrorCodeBundle.err1002 });
    });
};

const updateWish = (wishlistDto, res, next) => {
    Wishlist.findOneAndUpdate({ name: wishlistDto.name }, { $set: { name: wishlistDto.updateName } }, { new: true }).then((existingWish) => {
        if (existingWish) {
            return res.json({ success: true, wishlist: existingWish });
        } else {
            return res.json({ success: false, errorCode: ErrorCodeBundle.err4004 });
        }
    }).catch(err => {
        return res.json({ success: false, errorCode: ErrorCodeBundle.err1002 });
    })
};

const deleteWish = (wishlistDto, res, next) => {
    Wishlist.findOneAndRemove({ name: wishlistDto.name }).then((wishlist) => {
        if (wishlist) {
            return res.json({ success: true, wishlist: wishlist });
        } else {
            return res.json({ success: false, errorCode: ErrorCodeBundle.err4004 });
        }
    }).catch(err => {
        return res.json({ success: false, errorCode: ErrorCodeBundle.err1002 });
    });
};

const findWish = (wishlistDto, res, next) => {
    Wishlist.findOne({ name: wishlistDto.name }).then(wishlist => {
        if (wishlist) {
            return res.json({ success: true, wishlist: wishlist });
        } else {
            return res.json({ success: false, errorCode: ErrorCodeBundle.err4004 });
        }
    }).catch(err => {
        return res.json({ success: false, errorCode: ErrorCodeBundle.err1002 });
    });
};

const findAll = (wishlistDto, res, next) => {
    Wishlist.find().then(function(wishlist) {
        return res.json({ wishlist: wishlist });
    }).catch(err => {
        return res.json({ success: false, errorCode: ErrorCodeBundle.err1002 });
    });
}

module.exports = {
    createWish: createWish,
    findWish: findWish,
    deleteWish: deleteWish,
    updateWish: updateWish,
    findAll: findAll
};