const ErrorCodeBundle = require("../bundles/ErrorCode/ErrorCode.js");
require('dotenv').config();

const generateResponse = (res, responseObj, errorCode, err) => {
    console.log("Generating Response");
    if (err && process.env.APP_ENV === 'DEV') {
        console.log(err);
    }
    //setup response package
    setupResponse(res);

    if (!errorCode) {
        return res.json({
            success: true,
            result: responseObj
        })
    } else {
        return res.json({
            success: false,
            errorCode: errorCode,
            errorMessage: ErrorCodeBundle[errorCode]
        })
    }
};

const setupResponse = res => {
    res.set({
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': 1,
        'X-Content-Type-Options': 'nosniff'
    })
}

var getIntersection = (arr1, arr2) => {
    var set = new Set(arr1);
    return arr2.filter((x) => { return set.has(x) });
}


module.exports = {
    generateResponse: generateResponse
};