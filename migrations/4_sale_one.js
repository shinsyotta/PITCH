var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol"),
    PitchTokenSaleOne = artifacts.require("./PitchTokenSaleOne.sol");

module.exports = function(deployer) {
    deployer.deploy(PitchTokenSaleOne, PitchToken.address, PitchTokenStableSale.address).then(function(_) {
        return PitchToken.deployed();
    }).then(function(token) {
        token.approve(PitchTokenSaleOne.address, 10000);
    });
};
