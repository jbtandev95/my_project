const mongoose = require('mongoose');
const Wishlist = mongoose.model("Wishlist");
const { CustomError } = require("../../utils/CustomError");
const ErrorCodeBundle = require("../../bundles/ErrorCode/ErrorCodeBundle.js");

const createWish = (wishlistDto, res, next) => {
    Wishlist.findOne({ name: wishlistDto.name }).then(existingWish => {
        if (existingWish) {
            next(new CustomError(500, ErrorCodeBundle["err1001"]));
        } else {
            const wishlist = new Wishlist();

            wishlist.name = wishlistDto.name;
            wishlist.value = wishlistDto.value;
            wishlist.priority = wishlistDto.priority;
            wishlist.save().then(function() {
                res.result = wishlist;
                next();
            }).catch(err => {
                throw new CustomError(500, ErrorCodeBundle["err1002"]);
            });
        }
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
};

const updateWish = (wishlistDto, res, next) => {
    Wishlist.findOneAndUpdate({ name: wishlistDto.name }, { $set: { name: wishlistDto.updateName } }, { new: true }).then((existingWish) => {
        if (existingWish) {
            res.result = existingWish;
            next();
        } else {
            next(new CustomError(404, ErrorCodeBundle["err4004"]));
        }
    }).catch(err => {
        throw new CustomError(404, ErrorCodeBundle["err1002"]);
    })
};

const deleteWish = (wishlistDto, res, next) => {
    Wishlist.findOneAndRemove({ name: wishlistDto.name }).then((wishlist) => {
        if (wishlist) {
            res.result = wishlist;
            next();
        } else {
            next(new CustomError(404, ErrorCodeBundle["err4004"]));
        }
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
};

const findWish = (wishlistDto, res, next) => {
    Wishlist.findOne({ name: wishlistDto.name }).then(wishlist => {
        if (wishlist) {
            res.result = wishlist;
            next();
        } else {
            next(new CustomError(404, ErrorCodeBundle["err4004"]));
        }
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
};

const findAll = (wishlistDto, res, next) => {
    Wishlist.find().then(function(wishlist) {
        if (wishlist.length > 0) {
            res.result = wishlist;
            next();
        } else {
            next(new CustomError(404, ErrorCodeBundle["err4004"]));
        }
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
}

module.exports = {
    createWish: createWish,
    findWish: findWish,
    deleteWish: deleteWish,
    updateWish: updateWish,
    findAll: findAll
};