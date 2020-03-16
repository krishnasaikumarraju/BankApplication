const mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


    // Transaction Schema
const transactionSchema = new Schema({
    id: ObjectId,
    category : {type : Schema.Types.ObjectId, ref : 'customer'},
    accountno: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    actionBy: {
        type: String,
        default: "5e5e2f1af384cbab0873a738"
    },
    autherizorName: {
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    transactionAmount: {
        type: Number,
        default: 0
    }
});

const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction

