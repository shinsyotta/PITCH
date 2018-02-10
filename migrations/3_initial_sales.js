var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer, network, accounts) {
    deployer.deploy(PitchTokenStableSale, PitchToken.address, accounts[0], accounts[9]).then(function (stable) {
        return deployer.deploy(PitchTokenSale, PitchToken.address, PitchTokenStableSale.address);
    }).then(function(_) {
        return PitchToken.deployed();
    }).then(function(token) {
        token.approve(PitchTokenStableSale.address, 323600000);
        return PitchTokenStableSale.deployed();
    }).then(function(stable) {
        return stable.setCurrentSale(PitchTokenSale.address, {from: accounts[9]});
    });
};
