var express = require('express');
var mongodb = require('mongodb').MongoClient;
var profileRouter = express.Router();

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

var p_router = function(web3) {
    profileRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user && req.user.type != "0") {
                res.redirect('/');
            } else {

                // const url = 'mongodb://localhost:27017';
                // mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                //     const db = client.db('NodeDemoWebApp');
                //     const Submissions = db.collection('Submissions');

                // Submissions.find({ owner: req.user._id }).toArray(function(err, x) {
                //     if (err) {
                //         console.log("Error in finding user", err);
                //     } else {
                var count = 0;
                var ans = new Array();
                var data = {};

                MainContract.deployed().then(function(contractInstance) {
                    contractInstance.getReviewCount.call().then(function(count) {
                        console.log("Review Count: ", count);

                        for (var i = 0; i < parseInt(count.toString()); i++) {
                            contractInstance.getReviewHash.call(i).then(function(reviewHash) {
                                console.log("Review Hash: ", reviewHash);
                                contractInstance.getReviewCompany.call(reviewHash).then(function(company) {
                                    console.log("Company: ", company);
                                    contractInstance.getReviewBody.call(reviewHash).then(function(body) {
                                        console.log("Review: ", body);
                                        contractInstance.getReviewRating.call(reviewHash).then(function(rating) {
                                            console.log("Rating: ", rating);
                                            contractInstance.getReviewCreator.call(reviewHash).then(function(creator) {
                                                console.log("Creator: ", creator);
                                                if (company.toLowerCase() == req.user.address) {

                                                    data.address = company;
                                                    data.review = body;
                                                    data.marks = rating;
                                                    data.owner = creator;
                                                    ans.push(data);

                                                }
                                            }).catch(function(err) {
                                                console.log("Error in getting creator: ", err);
                                            });

                                        }).catch(function(err) {
                                            console.log("Error in getting rating: ", err);
                                        });
                                    }).catch(function(err) {
                                        console.log("Error in body: ", err);
                                    });
                                }).catch(function(err) {
                                    console.log("Error in getting company: ", err);
                                });
                            }).catch(function(err) {
                                console.log("Error in getting hash: ", err);
                            });
                        }
                    }).catch(function(e) {
                        console.log("Error: ", e);
                    });
                });


                setTimeout(function() {
                    res.render('profile', {
                        title: "SmartReviewer",
                        navMenu: menu,
                        user: req.user,
                        sub: ans
                    });

                }, 5000);

                //         })
                //     });
                // });

            }
        });


    return profileRouter;
}
module.exports = p_router;