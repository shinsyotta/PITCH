var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer, network, accounts) {
    // production values
    // var beneficiary = "0x4C7B4b345998Be3b601B1C1eF1e101307EE80518";
    // var seller = accounts[0];

    var beneficiary = accounts[0];
    var seller = accounts[9];

    deployer.deploy(PitchTokenStableSale, PitchToken.address, beneficiary, seller).then(function (stable) {
        return deployer.deploy(PitchTokenSale, PitchToken.address, PitchTokenStableSale.address);
    }).then(function(_) {
        return PitchToken.deployed();
    }).then(function(token) {
        token.approve(PitchTokenStableSale.address, 323600000 * (10 ** 9));
        return PitchTokenStableSale.deployed();
    }).then(function(stable) {
        return stable.setCurrentSale(PitchTokenSale.address);
    });
};
