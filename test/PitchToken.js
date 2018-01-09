// Specifically request an abstraction for PitchToken
var PitchToken = artifacts.require("PitchToken");

contract('PitchToken', function(accounts) {

  it("should put 10000 MetaCoin in the first account", function() {
    return PitchToken.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1618000000000000000, "1618000000000000000 wasn't in the first account");
    });
  });

  it("should send coin correctly", function() {
    var pitch;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return PitchToken.deployed().then(function(instance) {
      pitch = instance;
      return pitch.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return pitch.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return pitch.transferFrom(account_one, account_two, amount);
    }).then(function() {
      return pitch.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return pitch.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
