const mongoose = require('mongoose');
const Transaction = mongoose.model("Transaction");
const CommonUtil = require('../../utils/CommonUtils.js');

const findByUserId = (transactionDto, res, next) => {
    Transaction.find({ userId: transactionDto.userId }).then(function(transactionList) {
        CommonUtil.generateResponse(res, transactionList);
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    });
};

const createOne = (transactionDto, res, next) => {

    const transaction = new Transaction();

    transaction.name = transactionDto.name;
    transaction.value = transactionDto.value;
    transaction.type = transactionDto.type;
    transaction.userId = transactionDto.userId;
    transaction.save().then(function() {
        CommonUtil.generateResponse(res, transaction);
    }).catch(next);

};

const summaryByUserId = (transactionDto, res, next) => {
    Transaction.find({ userId: transactionDto.userId }).then(function(transactionList) {
        if (transactionList && transactionList.length > 0) {
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

            CommonUtil.generateResponse(res, summary);
        } else {
            CommonUtil.generateResponse(res, null, "err4004");
        }
    }).catch(err => {
        CommonUtil.generateResponse(res, null, "err1002");
    });
}


module.exports = {
    findByUserId: findByUserId,
    createOne: createOne,
    summaryByUserId: summaryByUserId
}