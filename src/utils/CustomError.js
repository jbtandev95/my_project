class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
};

const handleError = (err, res) => {
    const { statusCode, message } = err;

    if (process.env.APP_ENV === 'DEV') {
        console.log(err);
    }
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
};

module.exports = {
    CustomError,
    handleError
};