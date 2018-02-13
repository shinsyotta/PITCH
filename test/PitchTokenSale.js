// Specifically request an abstraction for PitchToken
var PitchToken = artifacts.require("PitchToken"),
    PitchTokenSale = artifacts.require("PitchTokenSale");


contract('PitchTokenSale', function(accounts) {
  let token;
  let sale;
  let threshold;

  beforeEach(async function () {
    token = await PitchToken.deployed();
    sale = await PitchTokenSale.deployed();
    threshold = await sale.threshold();
  });

  it("should return the token price given a count of sold tokens", async function() {
    var roundOne = await sale.currentTokenPrice(0);
    assert.equal(roundOne.toNumber(), 74165);

    var roundTwo = await sale.currentTokenPrice(threshold);
    assert.equal(roundTwo.toNumber(), 80346);

    var roundThree = await sale.currentTokenPrice(threshold * 2);
    assert.equal(roundThree.toNumber(), 86526);

    var roundFour = await sale.currentTokenPrice(threshold * 3);
    assert.equal(roundFour.toNumber(), 92707);

    var roundFive = await sale.currentTokenPrice(threshold * 4);
    assert.equal(roundFive.toNumber(), 98887);

    var roundSix = await sale.currentTokenPrice(threshold * 5);
    assert.equal(roundSix.toNumber(), 105067);

    var roundSeven = await sale.currentTokenPrice(threshold * 6);
    assert.equal(roundSeven.toNumber(), 111248);

    var roundEight = await sale.currentTokenPrice(threshold * 7);
    assert.equal(roundEight.toNumber(), 117428);

    let err = null;
    try {
      var roundNine = await sale.currentTokenPrice(threshold * 8);
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error, "trying to get too many tokens should blow up");
  });

  it("should be selling 20% of the total supply", async function() {
    var supply = (await token.totalSupply()).toNumber();
    var totalToSell = threshold * 8;
    assert.equal(totalToSell / supply, 0.20);
  });

  it("should calculate the number of tokens purchased", async function() {
    var one = await sale.calculatePurchaseQuantity.call(74165 * 3, 0);
    assert.equal(one.toNumber(), 3);

    var one = await sale.calculatePurchaseQuantity.call(74165 + 80346, threshold.minus(1));
    assert.equal(one.toNumber(), 2, "purchase spans rounds 1 and 2");

    var one = await sale.calculatePurchaseQuantity.call(117428, threshold.times(8).minus(2));
    assert.equal(one.toNumber(), 1, "last token");

    let err = null;
    try {
      var one = await sale.calculatePurchaseQuantity.call(117428 * 2, threshold.times(8).minus(1));
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error, "last token plus one");
  });
});
