const mongoose = require('mongoose');
const Post = mongoose.model("Posts");
const CommonUtil = require('../../utils/CommonUtils.js');

const createPost = (postDto, res, next) => {
	const post = new Post();

	post.title = postDto.title;
	post.post = postDto.post;
	post.username = postDto.username;

	post.save().then(function(){
		CommonUtil.generateResponse(res, wishlist);
	}).catch(){
		CommonUtil.generateResponse(res, null, "err1002");
	};
};


module.exports = {
	createPost: createPost
}