var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol"),
    PitchTokenSaleOne = artifacts.require("./PitchTokenSaleOne.sol");

module.exports = function(deployer) {
    deployer.deploy(PitchTokenSaleOne, PitchToken.address, PitchTokenStableSale.address);
};
