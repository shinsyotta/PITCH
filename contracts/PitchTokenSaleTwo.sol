pragma solidity ^0.4.4;

import "contracts/PitchToken.sol";

contract PitchTokenSaleTwo {
    address private token;
    address private seller;
    uint256 public priceInEth = 2;
    address public owner;

    function PitchTokenSaleTwo(address _token, address _seller) public {
        token = _token;
        seller = _seller;

        owner = PitchToken(_token).owner();
    }
}