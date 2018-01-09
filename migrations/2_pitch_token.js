var PitchToken = artifacts.require("./PitchToken.sol");

module.exports = function(deployer) {
  deployer.deploy(PitchToken);
};
