const router = require('express').Router();
const postsController = require("./postsController.js");

router.post("/posts/create", function(req, res, next) {
    var postDto = {
        title: req.body.title,
        post: req.body.post,
        username: req.body.username
    }
    postsController.createPost(postDto, res, next);
});



module.exports = router;