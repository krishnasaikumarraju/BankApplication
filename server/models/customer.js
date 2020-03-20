const mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


const addCustomerSchema = new Schema({
    id: ObjectId,
    accountno: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    postalcode: {
        type: Number,
        required: true
    },
    contactnumber: {
        type: Number,
        required: true
    },
    accounttype: {
        type: String,
        default: "savings"
    },
    balance:{
        type: Number,
        default: 0
    },
    datetime: {
        type: Date,
        default: Date.now
    }, 

});

const Customer = mongoose.model('customer', addCustomerSchema);



// var parentCustomerSchema = new Schema({
//     profile : [{type : Schema.Types.ObjectId, ref : 'customer'}],
//     transaction : [transactionSchema]
// });
// const transaction = mongoose.model('transaction', parentCustomerSchema);


module.exports = Customer



