// console.log("users.js called")
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const controller = require('../controller/controller.js')
const Transaction = require('../models/transaction');
const User = require('../models/user')
const Customer = require('../models/customer')

/* Register */
router.post('/register', (req, res) => {
    let newUser = new User(req.body)
    controller.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'failed to register user' })
        } else {
            res.json({ success: true, msg: 'User Registered' })
        }
    })
});
/* Authenticate */
router.post('/authenticate', (req, res) => {
    // console.log("authenticate",req.body);
    const username = req.body.username;
    const password = req.body.password;
    controller.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.json({ success: false, msg: 'username and password not matched' });
        }
        controller.comparePassword(password, user.password, (err, isMatch) => {

            if (err) throw err;
            if (isMatch) {
                // console.log("came back")
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
                //return res;
            } else {
                return res.json({ success: false, msg: 'wrong password' })
            }
        });
    });
});
/* Add customer */
router.post('/addcustomeraccount', (req, res) => {
    let newCustomer = new Customer(req.body)
    controller.addCustomer(newCustomer, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add customer' })
        } else {
            res.json({ success: true, msg: 'Customer added successfully' })
        }
    })
});

/* make transaction */
router.post('/transaction', (req, res) => {
    let newTransaction = new Transaction(req.body)
    controller.makeTransaction(newTransaction, (err, successData) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to make transaction', transactionData: '' })
        } else {
            res.json({ success: true, msg: 'Transaction made successfully', transactionData:  successData})
        }
    });
});

/* transactions list by customer category id elastic search*/
router.post('/transaction-list', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    controller.transactionListByCategoryId(req.body, (err, transactionData) => {
        res.send(transactionData);
    });
});

/* get customer profile by account number */
router.post('/profile', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    controller.getCustomerProfileByAccountno(req.body, (err, profileDetails) => {
        res.send(profileDetails);
    });
});

/* list customers */
router.get('/customers-list', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    controller.listCustomer(function (err, result) {
        res.send(result);
    });
});
module.exports = router;