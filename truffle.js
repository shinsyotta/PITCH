var HDWalletProvider = require("truffle-hdwallet-provider");
var HDWalletPrivkeyProvider = require('truffle-hdwallet-provider-privkey');

var ropstenMnemonic = "bracket away desert regular obscure artist actor also brain oak ripple ball";
var privkey = '';

var ropstenPrivkey = '';
var ropstenPrivkey = Buffer.from(ropstenPrivkey, 'hex');

var mainnetPrivkey = '';
var mainnetPrivkey = Buffer.from(mainnetPrivkey, 'hex');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  
  networks: {
    test: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // match any network
    },
    ropsten: {
      // provider: new HDWalletPrivkeyProvider(ropstenPrivkey, "https://ropsten.infura.io/Cg3IghDxAPSXxOvqUH4C"),
      provider: new HDWalletProvider(ropstenMnemonic, "https://ropsten.infura.io/Cg3IghDxAPSXxOvqUH4C"),
      network_id: 3,
      gas: 2900000,
      // from: '0xa6b2fa26e542c444234f75fac2cc50dd6c71aec7'
    },
    // mainnet: {
    //   provider: new HDWalletPrivkeyProvider(mainnetPrivkey, "https://mainnet.infura.io/Cg3IghDxAPSXxOvqUH4C "),
    //   network_id: 1,
    //   gas: 4900000,
    //   from: '0xfe3874450b604fe91fef9115946959353b939a8c'
    // }
  }
};
