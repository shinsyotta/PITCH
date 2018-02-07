pragma solidity ^0.4.4;

import "contracts/PitchToken.sol";
import "contracts/SafeMath.sol";


contract PitchTokenSale {
    using SafeMath for uint256;

    address private token;
    address private seller;
    address public owner;

    uint256[] public thresholdPrices = [
        74165636588380 wei, // per token, total sale 3000 ether
        80346106304079 wei, // per token, total sale 3250 ether
        86526576019777 wei, // per token, total sale 3500 ether
        92707045735475 wei, // per token, total sale 3750 ether
        98887515451174 wei, // per token, total sale 4000 ether
        105067985166872 wei, // per token, total sale 4250 ether
        111248454882571 wei, // per token, total sale 4500 ether
        117428924598269 wei // per token, total sale 4750 ether
    ];

    uint256 constant threshold = 40450000;
    uint public currentThresholdIndex;

    function PitchTokenSale(address _token, address _seller) public {
        token = _token;
        seller = _seller;
        currentThresholdIndex = 0;

        owner = PitchToken(_token).owner();
    }

    function currentTokenPrice() public view returns (uint256 price) {
        return thresholdPrices[currentThresholdIndex];
    }

    function updateIndex(uint index) public returns (bool) {
        require(msg.sender == owner || msg.sender == seller);

        currentThresholdIndex = index;

        return true;
    }

    function calculatePurchase(uint256 valueInWei, uint256 currentTokenCount) public returns (uint256, uint) {
        uint256 price = thresholdPrices[currentThresholdIndex];
        uint256 tokenCount = valueInWei.div(price);
        uint newIndex = (currentTokenCount + tokenCount).div(threshold);

        if (newIndex < thresholdPrices.length) {
            currentThresholdIndex = newIndex;
        }

        return (tokenCount, currentThresholdIndex);
    }
}