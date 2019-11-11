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
}

module.exports = {
    buildResponse
}