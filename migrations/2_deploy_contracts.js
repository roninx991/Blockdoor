const Token = artifacts.require("SARAToken");

module.exports = function(deployer) {
    deployer.deploy(Token);
};