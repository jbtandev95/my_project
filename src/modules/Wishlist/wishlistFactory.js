function Wishlist(wishlistDto) {
    this.name = wishlistDto.name;
    this.value = wishlistDto.value;
    this.priority = wishlistDto.priority;
}

var a = new Wishlist({ "name": "joe", "value": 9000, "priority": 1 });
console.log(a);

Wishlist.prototype.constructSentence = function(){
	console.log("Wish is " + this.name);
}

a.constructSentence();


module.exports = {
    Wishlist: Wishlist
};