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
                    console.log(web3.eth.accounts[0], req.body.buyT, req.user.address);
                    var x = web3.personal.unlockAccount(web3.eth.accounts[0], "123456");
                    return instance.transfer(req.user.address, req.body.data, { from: web3.eth.accounts[0], gas: 100000 });

                }).then(function(result) {
                    if (req.user.type == 0) {
                        res.redirect('/p');
                    } else {
                        res.redirect('/u');
                    }

                }).catch(function(err) {
                    console.log("Error in buying tokens: ", err);
                    if (req.user.type == 0) {
                        res.redirect('/p');
                    } else {
                        res.redirect('/u');
                    }
                });
            }
        });


    return buyTRouter;
}
module.exports = bt_router;