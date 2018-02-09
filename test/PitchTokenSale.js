// Specifically request an abstraction for PitchToken
var PitchToken = artifacts.require("PitchToken"),
    PitchTokenSale = artifacts.require("PitchTokenSale");


contract('PitchTokenSale', function(accounts) {
  let token;
  let sale;

  beforeEach(async function () {
    token = await PitchToken.deployed();
    sale = await PitchTokenSale.deployed();
  });

  it("should return the token price given a count of sold tokens", async function() {
    var roundOne = await sale.currentTokenPrice(0);
    assert.equal(roundOne.toNumber(), 74165636588380);

    var roundTwo = await sale.currentTokenPrice(40450000 * 1);
    assert.equal(roundTwo.toNumber(), 80346106304079);

    var roundThree = await sale.currentTokenPrice(40450000 * 2);
    assert.equal(roundThree.toNumber(), 86526576019777);

    var roundFour = await sale.currentTokenPrice(40450000 * 3);
    assert.equal(roundFour.toNumber(), 92707045735475);

    var roundFive = await sale.currentTokenPrice(40450000 * 4);
    assert.equal(roundFive.toNumber(), 98887515451174);

    var roundSix = await sale.currentTokenPrice(40450000 * 5);
    assert.equal(roundSix.toNumber(), 105067985166872);

    var roundSeven = await sale.currentTokenPrice(40450000 * 6);
    assert.equal(roundSeven.toNumber(), 111248454882571);

    var roundEight = await sale.currentTokenPrice(40450000 * 7);
    assert.equal(roundEight.toNumber(), 117428924598269);

    let err = null;
    try {
      var roundNine = await sale.currentTokenPrice(40450000 * 8);
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error, "trying to get too many tokens should blow up");
  });

  it("should calculate the number of tokens purchased", async function() {
    var one = await sale.calculatePurchaseQuantity.call(74165636588380 * 3, 0);
    assert.equal(one.toNumber(), 3);

    var one = await sale.calculatePurchaseQuantity.call(74165636588380 + 80346106304079, 40450000 - 1);
    assert.equal(one.toNumber(), 2, "purchase spans rounds 1 and 2");

    var one = await sale.calculatePurchaseQuantity.call(117428924598269, (40450000 * 8) - 1);
    assert.equal(one.toNumber(), 1, "last token");

    let err = null;
    try {
      var one = await sale.calculatePurchaseQuantity.call(117428924598269 * 2, (40450000 * 8) - 1);
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error, "last token plus one");
  });
});
