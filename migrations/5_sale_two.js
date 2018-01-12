var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol"),
    PitchTokenSaleTwo = artifacts.require("./PitchTokenSaleTwo.sol");

module.exports = function(deployer) {
    deployer.deploy(PitchTokenSaleTwo, PitchToken.address, PitchTokenStableSale.address);
};
