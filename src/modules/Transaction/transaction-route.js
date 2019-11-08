const router = require('express').Router();
const transactionController = require("./transactionController.js");

router.get("/transaction/findByUserId", function(req, res, next) {
    var transactionDto = {
        userId: req.query.userId
    };
    transactionController.findByUserId(transactionDto, res, next);
});

router.post("/transaction/create", function(req, res, next) {
    var transactionDto = {
        userId: req.body.userId,
        name: req.body.name,
        type: req.body.type,
        value: req.body.value
    };

    transactionController.createOne(transactionDto, res, next);
});

router.get("/transaction/summaryByUserId", function(req,res, next){
	var transactionDto = {
		userId: req.query.userId
	};
	transactionController.summaryByUserId(transactionDto, res, next);
});

module.exports = router;