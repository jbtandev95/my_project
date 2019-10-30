const router = require('express').Router();
const wishlistController = require("./wishlistController.js");

/*
 *  ================================================================
 *                          WISHLIST USE CASE
 *  2019/10/19      jbtan       Added new  route    
 *               
 *  ===============================================================
 */

// GET ALL WISHLIST BY ORDER
router.get("/wishlist/all", function(req, res, next) {
    wishlistController.findAll(req, res, next);
});

// CREATE WISH
router.post("/wishlist/create", function(req, res, next) {
    var wishlistObj = {
        name: req.body.name,
        value: req.body.value,
        priority: req.body.priority
    };

    wishlistController.createWish(wishlistObj, res, next);
});

// UPDATE WISH
router.post("/wishlist/update", function(req, res, next) {
    var wishlistObj = {
        name: req.body.name,
        updateName: req.body.updateName
    };

    wishlistController.updateWish(wishlistObj, res, next);
});

//DELETE WISH
router.delete("/wishlist/delete", function(req, res, next) {
    var wishlistObj = {
        name: req.body.name
    };

    wishlistController.deleteWish(wishlistObj, res, next);
});

//FIND WISH BASED ON NAME
router.get("/wishlist/find", function(req, res, next) {
    var wishlistObj = {
        name: req.query.name
    };

    wishlistController.findWish(wishlistObj, res, next);
});


module.exports = router;