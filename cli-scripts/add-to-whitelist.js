var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");

module.exports = async function(callback) {
    var stable = await PitchTokenStableSale.deployed();
    var toWhitelist = process.argv[process.argv.length - 1];

    var result = await stable.addToWhitelist.sendTransaction(toWhitelist);
    console.log(result);

    callback();
}