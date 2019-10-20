const jwt = require('jsonwebtoken');
const config = require("../../config/config.js");

/*
 *	Token Generator that takes in a payload
 *	Payload: { username: xxx, email: yyy}
 *	Returns a token object / Returns null if no payload
 */
const signToken = (payload) => {
    console.log("Signing in process...", payload);

    if (payload) {
        console.log("Signing commence...");

        let sign = config.SECRET_KEY;
        let signOptions = {
            expiresIn: '24h'
        };
        let token = jwt.sign(payload, sign, signOptions);

        return token;
    } else {
        return null;
    }
};

const verifyToken = () => {

}


module.exports = {
    signToken: signToken,
    verifyToken: verifyToken
}