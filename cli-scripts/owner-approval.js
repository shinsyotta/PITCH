var PitchToken = artifacts.require("./PitchToken.sol"),
    PitchTokenSale = artifacts.require("./PitchTokenSale.sol");
    PitchTokenStableSale = artifacts.require("./PitchTokenStableSale.sol");

module.exports = async function(callback) {
    var stable = await PitchTokenStableSale.deployed();
    var token = await PitchToken.deployed();

    var result = await token.approve.sendTransaction(stable.address, 323600000 * (10 ** 9));
    console.log(result);

    callback();
}