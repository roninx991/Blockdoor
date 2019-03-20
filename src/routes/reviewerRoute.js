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
            if (!req.user) {
                res.redirect('/');
            } else {


                var count = 0;
                var ans = new Array();

                MainContract.deployed().then(function(contractInstance) {
                    contractInstance.displayDocCount().then(function(count) {
                        count = parseInt(count);
                        console.log("Count: ", count);

                        if (count > 0) {
                            for (var i = 0; i < count; i++) {
                                contractInstance.displayHash(i).then(function(h) {
                                    var hash = h;
                                    console.log("Hash: ", hash);
                                    contractInstance.hasReviewed(hash, req.user.address).then(function(answer) {
                                        console.log("Owner: ", answer);
                                        if (!answer) {
                                            contractInstance.displaySubmissionStatus(hash).then(function(stat) {
                                                var s = {};
                                                if (stat == 1)
                                                    s.status = "Pending...";
                                                else if (stat == 2)
                                                    s.status = "Accepted...";
                                                else
                                                    s.status = "Rejected";
                                                s.h = hash;
                                                console.log("Object: ", s);
                                                ans.push(s);
                                                // console.log(ans);
                                            });
                                        }
                                    });
                                });
                            }
                        }


                    }).catch(function(e) {
                        console.log("Error: ", e);
                    });
                });

                const url = 'mongodb://localhost:27017';
                mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('NodeDemoWebApp');
                    const Submissions = db.collection('Submissions');
                    var review, review_content;



                    Submissions.find({ "reviews.Reviewerid": req.user._id }, { 'reviews.$': true }).toArray(function(err, ans1) {
                        review_content = ans1;
                        var bal = 0;
                        Submissions.find({ "reviews.Reviewerid": req.user._id }).toArray(function(err, reviews) {
                            review = reviews;
                            //console.log(review[0]);
                            SATContract.deployed().then(function(instance) {
                                return instance.balanceOf.call(req.user.address);
                            }).then(function(result) {
                                console.log(result.toString());
                                bal = result.toString();
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
                                            reviewed: review,
                                            content: review_content
                                        });
                                        //console.log(review_content);
                                    }
                                });
                            }, function(error) {
                                console.log(error);
                            });
                        });


                        //console.log("Review Content 1", review_content);
                        // Submissions.find({ "reviews.Reviewerid": { $ne: req.user._id } }).toArray(function(err, ans) {
                        //     if (err) {
                        //         console.log(err);
                        //     } else {
                        //         res.render('reviewer', {
                        //             title: "SmartReviewer",
                        //             navMenu: menu,
                        //             user: req.user,
                        //             sub: ans,
                        //             balance: bal,
                        //             reviewed: review,
                        //             content: review_content
                        //         });
                        //         console.log(review_content);
                        //     }
                        // });
                    });
                    //console.log("Review Content 2", review_content);


                });
            }
        });


    return reviewerRouter;
}
module.exports = p_router;