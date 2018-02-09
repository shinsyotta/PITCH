var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer, network, accounts) {
    deployer.deploy(PitchTokenStableSale, PitchToken.address, accounts[0]).then(function (stable) {
        deployer.deploy(PitchTokenSale, PitchToken.address, PitchTokenStableSale.address);
        return PitchToken.deployed();
    }).then(function(token) {
        token.approve(PitchTokenStableSale.address, 323600000);
    });
};
