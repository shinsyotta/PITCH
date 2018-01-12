pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PitchTokenStableSale.sol";
import "../contracts/PitchTokenSaleOne.sol";
import "../contracts/PitchTokenSaleTwo.sol";

contract TestPitchTokenStableSale {
    function testUninitializedSaleHasZeroPrice() public {
        PitchTokenStableSale sale = PitchTokenStableSale(DeployedAddresses.PitchTokenStableSale());

        Assert.equal(sale.getCurrentPrice(), 0, "Unintialized sale should have a price of 0");
    }

    function testValue() public {
        PitchTokenStableSale sale = PitchTokenStableSale(DeployedAddresses.PitchTokenStableSale());

        Assert.equal(sale.getValue(), 99, "Should be 99");
    }

    function testSaleOneSaleHasRightPrice() public {
        PitchTokenStableSale sale = PitchTokenStableSale(DeployedAddresses.PitchTokenStableSale());

        sale.setCurrentSale(DeployedAddresses.PitchTokenSaleOne());

        Assert.equal(sale.getCurrentPrice(), 1, "Sale one should have a price of 1");
    }

}