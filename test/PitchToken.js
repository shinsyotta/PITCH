// Specifically request an abstraction for PitchToken
var PitchToken = artifacts.require("PitchToken");

contract('PitchToken', function(accounts) {
  let token;

  beforeEach(async function () {
    token = await PitchToken.deployed();
  });

  it("should put 161800000000000000 PitchTokens in the first account", async function() {
    let balance = await token.balanceOf.call(accounts[0]);

    assert.equal(balance.toNumber(), 161800000000000000, "161800000000000000 wasn't in the first account");
  });

  it("should start out incomplete", async function() {
    let isComplete = await token.isSaleComplete();

    assert.equal(isComplete, false, "should be incomplete");
  });

  it("should be completable only by the owner", async function() {
    let wontWork = await token.completeSale.call({from: accounts[1]});
    assert.equal(wontWork, false, "should not be completable by non-owner");

    let willWork = await token.completeSale.call({from: accounts[0]});
    assert.equal(willWork, true, "should be completable by owner");
  });

  it("owner can transfer", async function() {
    let account_one = accounts[0];
    let account_two = accounts[1];

    await token.transfer(account_two, 100, {from: account_one});

    let account_two_new_balance = await token.balanceOf(account_two);
    assert.equal(account_two_new_balance.toNumber(), 100, "should have the 100 we gave them");
  });

  it("transfers respect the completion state of the sale", async function() {
    let amount_one = 100;
    let amount_two = 10;

    let account_one = accounts[0];
    let account_two = accounts[1];
    let account_three = accounts[2];

    let account_two_initial = (await token.balanceOf(account_two)).toNumber();
    let account_three_initial = (await token.balanceOf(account_three)).toNumber();

    await token.transfer(account_two, amount_one, {from: account_one});

    var account_two_balance = (await token.balanceOf(account_two)).toNumber();
    assert.equal(account_two_balance, account_two_initial + amount_one, "should have the 100 we gave them");

    let err = null;
    try {
      await token.transfer(account_three, amount_two, {from: account_two});
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error, "transfer should have thrown an error");

    var account_two_balance = (await token.balanceOf(account_two)).toNumber();
    assert.equal(account_two_balance, account_two_initial + amount_one, "should still have the 100 we gave them");

    var account_three_balance = (await token.balanceOf(account_three)).toNumber();
    assert.equal(account_three_balance, account_three_initial, "should be at zero");

    await token.completeSale();

    await token.transfer(account_three, amount_two, {from: account_two});

    var account_two_balance = (await token.balanceOf(account_two)).toNumber();
    assert.equal(account_two_balance, (account_two_initial + amount_one) - amount_two, "should now have 90");

    var account_three_balance = (await token.balanceOf(account_three)).toNumber();
    assert.equal(account_three_balance, account_three_initial + amount_two, "should be at 10");
  });

  it("should send coin correctly", async function() {
    var amount = 100;

    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance = (await token.balanceOf.call(account_one)).toNumber();
    var account_two_starting_balance = (await token.balanceOf.call(account_two)).toNumber();

    await token.transfer(account_two, amount, {from: account_one});

    var account_one_ending_balance = (await token.balanceOf.call(account_one)).toNumber();
    var account_two_ending_balance = (await token.balanceOf.call(account_two)).toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
