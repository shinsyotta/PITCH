pragma solidity ^0.4.4;

import "contracts/PitchTokenSale.sol";
import "contracts/PitchToken.sol";

contract PitchTokenStableSale {
    address private token;
    address private currentSale;
    address public owner;

    function PitchTokenStableSale(address _token) public {
        token = _token;
        owner = PitchToken(_token).owner();
    }

    function setToken(address _token) public {
        if (msg.sender != owner) {
            revert();
        }

        token = _token;
    }

    function setCurrentSale(address _currentSale) public {
        if (msg.sender != owner) {
            revert();
        }

        currentSale = _currentSale;
    }

    function getCurrentPrice() public view returns (uint256 currentPrice) {
        if (currentSale == 0) {
            return 0;
        }

        return PitchTokenSale(currentSale).priceInEth();
    }

    function getValue() public pure returns (uint256 value) {
        return 99;
    }
}