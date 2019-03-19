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
            if (!req.user) {
                res.redirect('/');
            } else {
                var bal = 0;
                SATContract.deployed().then(function(instance) {
                    return instance.balanceOf.call(req.user.address);

                }).then(function(result) {
                    console.log(result.toString());
                    bal = result.toString();

                }, function(error) {
                    console.log(error);
                });

                const url = 'mongodb://localhost:27017';
                mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('NodeDemoWebApp');
                    const Submissions = db.collection('Submissions');
                    var review;
                    Submissions.find({ "reviews.Reviewerid": req.user._id }).toArray(function(err, reviews) {
                        review = reviews;
                        console.log(review);
                    });

                    Submissions.find({ "reviews.Reviewerid": { $ne: req.user._id } }).toArray(function(err, ans) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('reviewer', {
                                title: "SmartReviewer",
                                navMenu: menu,
                                user: req.user,
                                sub: ans,
                                balance: bal,
                                reviewed: review
                            });
                            console.log(review);

                        }
                    });
                });
            }
        });


    return reviewerRouter;
}
module.exports = p_router;