const bcrypt = require('bcrypt');

var obj = {
    "name": "Badminton ASTROX89",
    "updateName": "Badminton ASTROX99"
}

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(JSON.stringify(obj), salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        console.log(salt);
    });
});