var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer) {
    deployer.deploy(PitchTokenStableSale, PitchToken.address);
};
