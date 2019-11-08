const mongoose = require('mongoose');
const Wishlist = mongoose.model("Wishlist");
const CommonUtil = require('../../utils/CommonUtils.js');

const createWish = (wishlistDto, res, next) => {
    Wishlist.findOne({ name: wishlistDto.name }).then(existingWish => {
        if (existingWish) {
            CommonUtil.generateResponse(res, null, "err1001");
        } else {
            const wishlist = new Wishlist();

            wishlist.name = wishlistDto.name;
            wishlist.value = wishlistDto.value;
            wishlist.priority = wishlistDto.priority;
            wishlist.save().then(function() {
                CommonUtil.generateResponse(res, wishlist);
            }).catch(next);
        }
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    });
};

const updateWish = (wishlistDto, res, next) => {
    Wishlist.findOneAndUpdate({ name: wishlistDto.name }, { $set: { name: wishlistDto.updateName } }, { new: true }).then((existingWish) => {
        if (existingWish) {
            CommonUtil.generateResponse(res, existingWish);
        } else {
            CommonUtil.generateResponse(res, null, "err4004");
        }
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    })
};

const deleteWish = (wishlistDto, res, next) => {
    Wishlist.findOneAndRemove({ name: wishlistDto.name }).then((wishlist) => {
        if (wishlist) {
            CommonUtil.generateResponse(res, wishlist);
        } else {
            CommonUtil.generateResponse(res, null, "err4004");
        }
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    });
};

const findWish = (wishlistDto, res, next) => {
    Wishlist.findOne({ name: wishlistDto.name }).then(wishlist => {
        if (wishlist) {
            CommonUtil.generateResponse(res, wishlist);
        } else {
            CommonUtil.generateResponse(res, null, "err4004");
        }
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    });
};

const findAll = (wishlistDto, res, next) => {
    Wishlist.find().then(function(wishlist) {
        CommonUtil.generateResponse(res, wishlist);
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    });
}

module.exports = {
    createWish: createWish,
    findWish: findWish,
    deleteWish: deleteWish,
    updateWish: updateWish,
    findAll: findAll
};