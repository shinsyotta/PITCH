var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer, network, accounts) {
    deployer.deploy(PitchTokenStableSale, PitchToken.address, accounts[0]).then(function (stable) {
        return deployer.deploy(PitchTokenSale, PitchToken.address, PitchTokenStableSale.address);
    });
};
