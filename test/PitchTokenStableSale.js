// Specifically request an abstraction for PitchToken
var PitchTokenStableSale = artifacts.require("PitchTokenStableSale"),
    PitchToken = artifacts.require("PitchToken");

contract('PitchTokenStableSale', function(accounts) {
    let token;
    let stable;

    beforeEach(async function () {
      token = await PitchToken.deployed();
      stable = await PitchTokenStableSale.deployed();
    });

    it("should have an allowance equaling all eight rounds", async function() {
        var allowance = (await token.allowance(accounts[0], stable.address)).toNumber();
        assert.equal(allowance, 40450000 * 8);
    });

    it("should whitelist purchasers", async function() {
        var purchaser = accounts[2];
        
        console.log((await stable.addToWhitelist.call(purchaser)).toNumber());

        var whitelisted = await stable.isWhitelisted.call(purchaser);
        
        console.log([2, purchaser, whitelisted.toNumber()]);

        assert.isTrue(whitelisted);
    });

    // it("should allow for token purchases", async function() {
    //     var purchaser = accounts[2];

    //     (await stable.addToWhitelist.call(purchaser));

    //     (await web3.eth.sendTransaction({from: purchaser, to: stable.address, value: 74165636588380 * 2}));

    //     var balance = await token.balanceOf.call(purchaser);
    //     assert.equal(balance, 2);
    // });

    // it("should have no price when uninitialized", async function() {
    //     var sale = await PitchTokenStableSale.deployed();
    //     var currentPrice = await sale.getCurrentPrice.call();

    //     assert.equal(currentPrice, 0, "Unintialized sale should have a price of 0.");
    // });

    // it("should have a price of 1 when sale one is active", async function() {
    //     var sale = await PitchTokenStableSale.deployed();
    //     var saleOne = await PitchTokenSaleOne.deployed();

    //     sale.setCurrentSale.call(saleOne, {from: accounts[0]}, async function() {
    //         var currentPrice = await sale.getCurrentPrice.call();
    
    //         assert.equal(currentPrice.toNumber(), 1, "Sale one should have a price of 1.");

    //     });
    // });

    // it("should have a price of 2 when sale two is active", async function() {
    //     var sale = await PitchTokenStableSale.deployed();
    //     var saleOne = await PitchTokenSaleTwo.deployed();

    //     sale.setCurrentSale.call(saleOne, {from: accounts[0]}, async function() {
    //         var currentPrice = await sale.getCurrentPrice.call();
    
    //         assert.equal(currentPrice.toNumber(), 2, "Sale two should have a price of 2.");

    //     });
    // });
});
