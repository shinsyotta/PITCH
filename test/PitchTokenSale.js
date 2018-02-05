// Specifically request an abstraction for PitchToken
var PitchToken = artifacts.require("PitchToken"),
    PitchTokenSaleOne = artifacts.require("PitchTokenSaleOne"),
    PitchTokenSaleTwo = artifacts.require("PitchTokenSaleTwo");


contract('PitchTokenSaleOne', function(accounts) {
  let token;
  let sale_one;
  let sale_two;

  beforeEach(async function () {
    token = await PitchToken.deployed();
    sale_one = await PitchTokenSaleOne.deployed();
    sale_two = await PitchTokenSaleTwo.deployed();
  });

  it("should send coin correctly", async function() {
    var amount = 100;

    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance = (await token.balanceOf.call(account_one)).toNumber();
    var account_two_starting_balance = (await token.balanceOf.call(account_two)).toNumber();

    await sale_one.transferFrom(account_one, account_two, amount);

    var account_one_ending_balance = (await token.balanceOf.call(account_one)).toNumber();
    var account_two_ending_balance = (await token.balanceOf.call(account_two)).toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });

  it("should not send for sale two", async function() {
    var amount = 100;

    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance = (await token.balanceOf.call(account_one)).toNumber();
    var account_two_starting_balance = (await token.balanceOf.call(account_two)).toNumber();

    let err = null;
    try {
        await sale_two.transferFrom(account_one, account_two, amount);
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error, "transferFrom should have thrown an error");

    var account_one_ending_balance = (await token.balanceOf.call(account_one)).toNumber();
    var account_two_ending_balance = (await token.balanceOf.call(account_two)).toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance, "the sender balance shouldn't have changed");
    assert.equal(account_two_ending_balance, account_two_starting_balance, "the receiver balance shouldn't have changed");
  });
});
