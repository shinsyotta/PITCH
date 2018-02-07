pragma solidity ^0.4.4;

import "contracts/PitchTokenSale.sol";
import "contracts/PitchToken.sol";
import "contracts/SafeMath.sol";

contract PitchTokenStableSale {
    using SafeMath for uint256;

    uint256 public tokensSold;

    address public owner;
    address public token;
    address public currentSale;

    function PitchTokenStableSale(address _token) public {
        token = _token;
        owner = PitchToken(_token).owner();
        tokensSold = 0;
    }

    function () payable {
        
    }

    function setToken(address _token) public {
        require(msg.sender == owner);

        token = _token;
    }

    function setCurrentSale(address _currentSale) public {
        require(msg.sender == owner);

        currentSale = _currentSale;
    }

    function getCurrentPrice() public view returns (uint256 currentPrice) {
        if (currentSale == 0) {
            return 0;
        }

        return PitchTokenSale(currentSale).currentTokenPrice();
    }

    // function buy() public {
    //     var current_token_sale = PitchTokenSale(currentSale);

    //     // reserve tokens for msg.sender

    //     // 

    // }
}