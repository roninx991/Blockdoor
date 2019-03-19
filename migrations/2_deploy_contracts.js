const Token = artifacts.require("SARAToken");
const Main = artifacts.require("MainContract");

module.exports = function(deployer) {
    deployer.deploy(Token);
    deployer.deploy(Main);
};