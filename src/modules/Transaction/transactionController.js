const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");
const { CustomError } = require("../../utils/CustomError");
const ErrorCodeBundle = require("../../bundles/ErrorCode/ErrorCodeBundle.js");

const findListByUserId = (transactionDto, res, next) => {
    Transaction.find({ userId: transactionDto.userId }).then(function(transactionList) {
        if (transactionList.length > 0) {
            res.result = transactionList;
            next();
        } else {
            next(new CustomError(404, ErrorCodeBundle["err4004"]));
        }
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
};

const createOne = (transactionDto, res, next) => {
    const transaction = new Transaction();

    transaction.name = transactionDto.name;
    transaction.value = transactionDto.value;
    transaction.type = transactionDto.type;
    transaction.userId = transactionDto.userId;
    transaction.save().then(function() {
        res.result = transaction;
        next();
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
};

const summaryByUserId = (transactionDto, res, next) => {
    Transaction.find({ userId: transactionDto.userId }).then(function(transactionList) {
        if (transactionList.length > 0) {
            var summary = null;
            var totalIncome = 0;
            var totalOutcome = 0;

            transactionList.forEach(function(item) {
                if (item.type === "O") {
                    totalOutcome += item.value;
                } else if (item.type === "I") {
                    totalIncome += item.value;
                }
            });

            summary = {
                totalIncome: totalIncome,
                totalOutcome: totalOutcome,
                userId: transactionDto.userId
            }
            res.result = summary;
            next();
        } else {
            next(new CustomError(404, ErrorCodeBundle["err4004"]));
        }
    }).catch(err => {
        throw new CustomError(500, ErrorCodeBundle["err1002"]);
    });
};


module.exports = {
    findListByUserId: findListByUserId,
    createOne: createOne,
    summaryByUserId: summaryByUserId
};