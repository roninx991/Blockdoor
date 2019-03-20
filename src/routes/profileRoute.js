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
            if (!req.user) {
                res.redirect('/');
            } else {
                // var bal = 0;
                // SATContract.deployed().then(function(instance) {
                //     return instance.balanceOf.call(req.user.address);

                // }).then(function(result) {
                //     console.log("Balance is: ", result.toString());
                //     bal = result.toString();

                // }, function(error) {
                //     console.log(error);
                // });

                // var count = 0;
                // var ans = new Array();

                // MainContract.deployed().then(function(contractInstance) {
                //     contractInstance.displayDocCount().then(function(count) {
                //         count = parseInt(count);
                //         console.log("Count: ", count);

                //         if (count > 0) {
                //             for (var i = 0; i < count; i++) {
                //                 contractInstance.displayHash(i).then(function(h) {
                //                     var hash = h;
                //                     console.log("Hash: ", hash);
                //                     contractInstance.isOwner(req.user.address, hash).then(function(answer) {
                //                         console.log("Owner: ", answer);
                //                         if (answer) {
                //                             contractInstance.displaySubmissionStatus(hash).then(function(stat) {
                //                                 var s = {};
                //                                 if (stat == 1)
                //                                     s.status = "Pending...";
                //                                 else if (stat == 2)
                //                                     s.status = "Accepted...";
                //                                 else
                //                                     s.status = "Rejected";
                //                                 s.h = hash;
                //                                 console.log("Object: ", s);
                //                                 ans.push(s);
                //                                 // console.log(ans);
                //                             });
                //                         }
                //                     });
                //                 });
                //             }
                //         }


                //     }).catch(function(e) {
                //         console.log("Error: ", e);
                //     });
                // });


                        const url = 'mongodb://localhost:27017';
                        mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                        const db = client.db('NodeDemoWebApp');
                        const Submissions = db.collection('Submissions');

                         Submissions.find({ owner: req.user._id }).toArray(function(err, x) {
                        if (err) {
                            console.log(err);
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
                                        contractInstance.isOwner(req.user.address, hash).then(function(answer) {
                                            console.log("Owner: ", answer);
                                            if (answer) {
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


                            setTimeout(function(){
                                 res.render('profile', {
                                    title: "SmartReviewer",
                                    navMenu: menu,
                                    user: req.user,
                                    balance: bal,
                                    details: x,
                                    sub: ans
                                });

                            },5000);
                               
                            }
                        });
                    });
               
            }
        });


    return profileRouter;
}
module.exports = p_router;