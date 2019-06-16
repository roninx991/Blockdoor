var express = require('express');
var mongodb = require('mongodb').MongoClient;
var reviewerRouter = express.Router();

var Web3 = require('web3');
var Contract = require('truffle-contract');
var path = require('path');
var ContractJSON = require(path.join(__dirname, '../../build/contracts/SARAToken.json'));
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var SATContract = Contract(ContractJSON);
SATContract.setProvider(provider);

var MainContractJSON = require(path.join(__dirname, '../../build/contracts/MainContract.json'));
var MainContract = Contract(MainContractJSON);
MainContract.setProvider(provider);

var menu = [{
        href: '/buyTokens',
        text: 'Buy SATs'
    },
    {
        href: '/sellTokens',
        text: 'Sell SATs'
    },
    {
        href: '#',
        text: 'Become a Reviewer'
    }
];

var p_router = function() {
    reviewerRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user && req.user.type != "0") {
                res.redirect('/');
            } else {

                var bal = 0;
                SATContract.deployed().then(function(instance) {
                    return instance.balanceOf.call(req.user.address);

                }).then(function(result) {
                    console.log("Balance is: ", result.toString());
                    bal = result.toString();

                }, function(error) {
                    console.log(error);
                });

                const url = 'mongodb://localhost:27017';


                mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('NodeDemoWebApp');
                    const Submissions = db.collection('Submissions');
                    const Users = db.collection('Users');

                    var review, review_content;

                    Users.find({ "type": "0" }).toArray(function(err, result) {
                        res.render('reviewer', {
                            title: "SmartReviewer",
                            navMenu: menu,
                            user: req.user,
                            sub1: result,
                            balance: bal
                        });
                    });
                });
            }
        });


    return reviewerRouter;
}
module.exports = p_router;