const ErrorCodeBundle = require("../bundles/ErrorCode/ErrorCode.js");

const generateResponse = (res, responseObj, errorCode, err) => {
    console.log("Generating Response");
    if (error) {
        console.log(err);
    }
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

var getIntersection3 = (arr1, arr2) => {
    var set = new Set(arr1);
    return  arr2.filter((x) => { return set.has(x) });
}


module.exports = {
    generateResponse: generateResponse
};