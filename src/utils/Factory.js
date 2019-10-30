const Wishlist = mongoose.model("Wishlist");

function createWish = (name, value, priority) => {
	var wishlist = new Wishlist();
	return wishlist;
};

module.exports = {

}