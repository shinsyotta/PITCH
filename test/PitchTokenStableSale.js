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
        assert.equal(allowance, (40450000 * 8) * (10 ** 9));
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

        var startingBalance = web3.eth.getBalance(beneficiary);

        await stable.sendTransaction({from: purchaser, value: 74165 * 2});

        var endingBalance = web3.eth.getBalance(beneficiary);

        assert.isTrue(endingBalance > (startingBalance + 74165));

        var balance = await token.balanceOf.call(purchaser);
        assert.equal(balance.toNumber(), 2);
    });

    it("should allow for the whitelisting to be turned on and off", async function() {
        var purchaser = accounts[7];

        var err = null;
        try {
            await stable.sendTransaction({from: purchaser, value: 74165 * 2});
        } catch (error) {
            err = error;
        }
    
        assert.ok(err instanceof Error, "an unwhitelisted account should fail to purchase");

        await stable.setWhitelist.sendTransaction(false)

        var err = null;
        try {
            await stable.sendTransaction({from: purchaser, value: 74165 * 2});
        } catch (error) {
            err = error;
        }
    
        assert.ok(!(err instanceof Error), "an unwhitelisted account can purchase with whitelisting off");

        await stable.setWhitelist.sendTransaction(true)

        var err = null;
        try {
            await stable.sendTransaction({from: purchaser, value: 74165 * 2});
        } catch (error) {
            err = error;
        }
    
        assert.ok(err instanceof Error, "an unwhitelisted account should fail to purchase with whitelisting turned back on");

    });
});
