const ErrorCodeBundle = require("../bundles/ErrorCode/ErrorCodeBundle.js");
const { CustomError } = require("./CustomError.js");

var getIntersection = (arr1, arr2) => {
    var set = new Set(arr1);
    return arr2.filter((x) => { return set.has(x) });
}


module.exports = {
    generateResponse: generateResponse
};