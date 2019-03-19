var date = new Date();
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var yesnoRouter = express.Router();

var Web3 = require('web3');
var Contract = require('truffle-contract');
var path = require('path');

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

// SAT Contract
var SATContractJSON = require(path.join(__dirname, '../../build/contracts/SARAToken.json'));
var SATContract = Contract(SATContractJSON);
SATContract.setProvider(provider);

// Main Contract
var MainContractJSON = require(path.join(__dirname, '../../build/contracts/MainContract.json'));
var MainContract = Contract(MainContractJSON);
MainContract.setProvider(provider);


var u_router = function(web3) {
    yesnoRouter.route("/")
        .post(function(req, res) {
            const url = 'mongodb://localhost:27017';
            mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                console.log("Successfully connected to database.");

                const db = client.db('NodeDemoWebApp');
                const Submissions = db.collection('Submissions');
                Submissions.updateOne({ hash: req.body.hashvalue }, { $addToSet: { reviews: { Reviewerid: req.user._id, Marks: req.body.marks, Comments: req.body.comments } } }, function(err, result) {
                    if (err == undefined) {
                        console.log("Successfully updated");
                        SATContract.deployed().then(function(instance) {
                            web3.personal.unlockAccount(req.user.address, req.user.pwd);
                            return instance.transfer(web3.eth.accounts[0], 10, { from: req.user.address, gas: 100000 });

                        }).then(function(result) {
                            console.log("This is SAT contract");
                            console.log(result.toString());

                        }).catch(function(error) {
                            console.log(error);
                        });

                        MainContract.deployed().then(function(instance) {
                            web3.personal.unlockAccount(web3.eth.accounts[0], "Pink#4119");
                            return instance.Review(req.body.hashvalue, req.user.address, { from: web3.eth.accounts[0], gas: 100000 });

                        }).then(function(result) {
                            console.log("This is main contract")
                            console.log(result.toString());

                        }).catch(function(error) {
                            console.log(error);
                        });
                    } else console.log(err);
                });
            });

            res.redirect("/u");
        });

    return yesnoRouter;
}
module.exports = u_router;