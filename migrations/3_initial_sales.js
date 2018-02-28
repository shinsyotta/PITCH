var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");


module.exports = function(deployer, network, accounts) {
    // production values
    // var beneficiary = "0x4C7B4b345998Be3b601B1C1eF1e101307EE80518";
    // var seller = accounts[0];

    // var beneficiary = accounts[0];
    // var seller = accounts[9];

    // mainnet 
    // var beneficiary = '0x46b855651930C1D5d1321BC7b8576b07de71F635';
    // var seller = '0x42d2A9526A4C388F268D7CA829Ed475D59c4a795';

    // ropsten
    // var beneficiary = '0x7B66c8f598Ae4796e9188FDf33bA0EBBCE5C2613';
    // var seller = '0x6Ca0656d364be4581C23C531626aA630D22b9823';
    var beneficiary = '0x073A5CB3DB5AF530d776eEbdc1926C25cE74c1F2';
    var seller = '0x073A5CB3DB5AF530d776eEbdc1926C25cE74c1F2';

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
