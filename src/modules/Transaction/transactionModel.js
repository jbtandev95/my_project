const mongoose = require('mongoose');

var TransactionSchema = mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"] },
    value: Number,
    type: { type: String, required: [true, "can't be blank"], index: true },
    userId: { type: String, required: [true, "can't be blank"], index: true }
}, { timestamps: true });


mongoose.model("Transaction", TransactionSchema, "Transaction");