var express = require('express');

var buyTRouter = express.Router();

var Web3 = require('web3');
var Contract = require('truffle-contract');
var path = require('path');
var ContractJSON = require(path.join(__dirname, '../../build/contracts/SARAToken.json'));
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var SATContract = Contract(ContractJSON);
SATContract.setProvider(provider);

var bt_router = function(web3) {
    buyTRouter.route("/")
        .post(function(req, res) {
            if (!req.user) {
                res.redirect('/');
            } else {
                SATContract.deployed().then(function(instance) {
                    console.log(req.body.buyT, web3.eth.accounts[0], req.user.address);
                    return instance.transfer(req.user.address, req.body.buyT, { from: web3.eth.accounts[0], gas: 100000 });

                }).then(function(result) {
                    console.log(result.toString());
                    res.redirect("/u");

                }, function(error) {
                    console.log(error);
                    res.redirect("/u");
                });
            }
        });


    return buyTRouter;
}
module.exports = bt_router;