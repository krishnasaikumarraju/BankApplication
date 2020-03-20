const User = require('../models/user.js')
const Customer = require('../models/customer.js')
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const transaction = require ('../models/transaction')

module.exports.updateCustomerProfileDetails = function ( idQuery, body, callback) {
    Customer.findOneAndUpdate(idQuery, body, callback);
}
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}
module.exports.transactionListByCategoryId = function ( fetchCategoryId, callback) {
    const query = { category: fetchCategoryId._id }
    transaction.find(query, callback);
} 

module.exports.getCustomerProfileByAccountno = function ( accountno, callback) {
    Customer.find(accountno, callback);
}
module.exports.makeTransaction = function(transactionData, callback, next ) {
    if (transactionData) {
        transactionData.save(callback);
    }
}
module.exports.addUser = function (newUser, callback, next) {
    console.log(newUser)
    
    // console.log("add user call")
    bcrypt.genSalt(10, (err, salt) => {
        console.log(newUser)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log("bcrypt error : " + err)
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatepassword, hash, callback) {
    bcrypt.compare(candidatepassword, hash, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            callback(null, isMatch)
        }
    });
}

// add customer to db
module.exports.addCustomer = function (newCustomer, callback) {
    newCustomer.save(callback)
}

// customer profile by mobile number
module.exports.getCustomerProfileByAccountNumber = function (accountNumber, callback) {
    const query = { accountno: accountNumber }
    User.findOne(query, callback);
}
//list customers
module.exports.listCustomer = function (res) {
    Customer.find({}, function (err, customers) {
        if (err) {
            console.log("db error", err)
        };
        if (customers) {
            return res(null, customers);
        }

    })
}
