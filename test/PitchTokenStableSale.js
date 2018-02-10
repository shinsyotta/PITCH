// Specifically request an abstraction for PitchToken
var PitchTokenStableSale = artifacts.require("PitchTokenStableSale"),
    PitchToken = artifacts.require("PitchToken");

contract('PitchTokenStableSale', function(accounts) {
    let token;
    let stable;
    let seller;

    beforeEach(async function () {
      token = await PitchToken.deployed();
      stable = await PitchTokenStableSale.deployed();
      seller = accounts[9];
    });

    it("should have an allowance equaling all eight rounds", async function() {
        var allowance = (await token.allowance(accounts[0], stable.address)).toNumber();
        assert.equal(allowance, 40450000 * 8);
    });

    it("should whitelist purchasers", async function() {
        var purchaser = accounts[2];

        var one = await stable.addToWhitelist.sendTransaction(purchaser, {from: seller});

        var two = await stable.isWhitelisted.call(purchaser);
        assert.equal(two, true, "checking if whitelisted");
    });

    it("should allow for token purchases", async function() {
        var purchaser = accounts[2];
        var beneficiary = accounts[0];

        await stable.addToWhitelist.sendTransaction(purchaser, {from: seller});

        var startingBalance = web3.eth.getBalance(beneficiary).toNumber();

        await stable.sendTransaction({from: purchaser, value: 74165636588380 * 2});

        var endingBalance = web3.eth.getBalance(beneficiary).toNumber();

        assert.equal(endingBalance - startingBalance, (74165636588380 * 2) - 1720);

        var balance = await token.balanceOf.call(purchaser);
        assert.equal(balance.toNumber(), 2);
    });
});
