pragma solidity ^0.4.4;

import "contracts/PitchToken.sol";

contract PitchTokenSale {
    address private token;
    address private seller;
    uint256 public priceInEth;
    address public owner;

    function PitchTokenSale(address _token, address _seller) public {
        token = _token;
        seller = _seller;

        owner = PitchToken(_token).owner();
    }
}