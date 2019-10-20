const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: [true, "can't be blank"], index: true },
    age: Number,
    name: String,
    password: { type: String, required: [true, "Password is required"] }
}, { timestamps: true });


UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        age: this.age,
        name: this.name
    };
};

UserSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(this.password, 10, function(err, hash) {
        if (!err) {
            console.log(hash);
            user.password = hash;
            next();
        } else {
            return next(err);
        }
    });
});


mongoose.model('User', UserSchema, "User");