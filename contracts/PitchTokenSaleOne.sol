pragma solidity ^0.4.4;

import "contracts/PitchToken.sol";
// import "contracts/PitchTokenSale.sol";

contract PitchTokenSaleOne {
    address private token;
    address private seller;
    uint256 public priceInEth = 0.01 ether;
    address public owner;

    function PitchTokenSaleOne(address _token, address _seller) public {
        token = _token;
        seller = _seller;

        owner = PitchToken(_token).owner();
    }
}