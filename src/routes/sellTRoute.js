var express = require('express');

var sellTRouter = express.Router();

var Web3 = require('web3');
var Contract = require('truffle-contract');
var path = require('path');
var ContractJSON = require(path.join(__dirname, '../../build/contracts/SARAToken.json'));
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var SATContract = Contract(ContractJSON);
SATContract.setProvider(provider);

var st_router = function(web3) {
    sellTRouter.route("/")
        .post(function(req, res) {
            if (!req.user) {
                res.redirect('/');
            } else {
                SATContract.deployed().then(function(instance) {
                    console.log(web3.eth.accounts[0], req.body.sellT, req.user.address);
                    return instance.transfer(web3.eth.accounts[0], req.body.sellT, { from: req.user.address, gas: 100000 });

                }).then(function(result) {
                    console.log(result.toString());
                    if (req.user.type == 0) {
                        res.redirect('/p');
                    } else {
                        res.redirect('/u');
                    }

                }).catch(function(error) {
                    console.log(error);
                    if (req.user.type == 0) {
                        res.redirect('/p');
                    } else {
                        res.redirect('/u');
                    }
                });
            }
        });


    return sellTRouter;
}
module.exports = st_router;