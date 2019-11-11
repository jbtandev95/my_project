const bcrypt = require('bcrypt');
const { CustomError } = require("./CustomError");
const ErrorCodeBundle = require("../bundles/ErrorCode/ErrorCodeBundle.js");

const buildResponse = (req, res, next) => {
    //setup response package
    setupResponse(res);
    return res.json({
        success: true,
        result: res.result
    });

};

const setupResponse = res => {
    res.set({
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': 1,
        'X-Content-Type-Options': 'nosniff'
    })
};

const validateRequest = (req, res, next) => {
    if (process.env.APP_ENV === "PROD") {
        //token header contains salted hash
        if (req.headers["token"]) {
            var payload = null;
            switch (req.method) {
                case "GET":
                    payload = req.query;
                    break;
                case "POST":
                    payload = req.body;
                    break;
            };
            const salt = req.headers["token"].substring(0, 29);
            bcrypt.hash(JSON.stringify(payload), salt, function(err, hash) {
                if (hash === req.headers["token"]) {
                    next();
                } else {
                    next(new CustomError(404, ErrorCodeBundle["err5000"]));
                }
            });
        } else {
            throw new CustomError(500, ErrorCodeBundle["err5000"]);
        }
    }
};

module.exports = {
    buildResponse,
    validateRequest
};