// Specifically request an abstraction for PitchToken
var PitchTokenStableSale = artifacts.require("PitchTokenStableSale");

contract('PitchTokenStableSale', function(accounts) {
    it("should have no price when uninitialized", async function() {
        var sale = await PitchTokenStableSale.deployed();
        var currentPrice = await sale.getCurrentPrice.call();

        assert.equal(currentPrice, 0, "Unintialized sale should have a price of 0.");
    });

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
