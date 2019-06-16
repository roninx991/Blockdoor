var date = new Date();
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var yesnoRouter = express.Router();

var Web3 = require('web3');
var Contract = require('truffle-contract');
var path = require('path');

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

// Main Contract
var MainContractJSON = require(path.join(__dirname, '../../build/contracts/MainContract.json'));
var MainContract = Contract(MainContractJSON);
MainContract.setProvider(provider);

var u_router = function(web3) {
    yesnoRouter.route("/")
        .post(function(req, res) {

            MainContract.deployed().then(function(instance) {
                console.log(instance);
                web3.personal.unlockAccount(web3.eth.accounts[0], "123456");
                var hash = web3.sha3(req.user.address);
                console.log("Hash value: ", hash);
                instance.newReview(hash, req.user.address.toLowerCase(), req.body.company, req.body.comments, req.body.marks, { from: web3.eth.accounts[0] }).then(function(result) {
                    console.log("Review successful!", result);
                    res.redirect("/u");
                }).catch(function(err) {
                    console.log("Error in Reviewing company: ", err);
                });

            }).catch(function(error) {
                console.log("Error in deploying MainContract: ", err);
            });
        });

    return yesnoRouter;
}
module.exports = u_router;