var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer) {
    deployer.deploy(PitchTokenStableSale, PitchToken.address).then(function (stable) {
        return deployer.deploy(PitchTokenSale, PitchToken.address, PitchTokenStableSale.address);
    });
};
