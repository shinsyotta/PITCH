pragma solidity ^0.4.4;

import "contracts/PitchToken.sol";
import "contracts/SafeMath.sol";


contract PitchTokenSale {
    using SafeMath for uint256;

    address private token;
    address private seller;
    address public owner;
    uint256 public threshold = 40450000 * (10 ** 9);

    uint256[] public thresholdPrices = [
        74165 wei, // per token, total sale 3000 ether
        80346 wei, // per token, total sale 3250 ether
        86526 wei, // per token, total sale 3500 ether
        92707 wei, // per token, total sale 3750 ether
        98887 wei, // per token, total sale 4000 ether
        105067 wei, // per token, total sale 4250 ether
        111248 wei, // per token, total sale 4500 ether
        117428 wei // per token, total sale 4750 ether
    ];
    

    function PitchTokenSale(address _token, address _seller) public {
        token = _token;
        seller = _seller;
        owner = PitchToken(_token).owner();
    }

    function currentTokenPrice(uint256 _tokensSold) public view returns (uint256 price) {
        // get our index in the prices array
        uint256 index = _tokensSold.div(threshold);

        // if we've exceeded the prices array length it means
        // we're trying to sell too many tokens, blow up
        require(index < thresholdPrices.length);

        return thresholdPrices[index];
    }

    function calculatePurchaseQuantity(uint256 _amountInWei, uint256 _tokensSold) public returns (uint256) {
        // get the current price
        uint256 currentPrice = currentTokenPrice(_tokensSold);

        // figure out how many tokens this transaction is attempting to purchase
        uint256 want = _amountInWei.div(currentPrice);

        // figure out how many tokens in the current round we have to sell
        uint256 available = threshold.sub(_tokensSold % threshold);

        // if the transaction is trying to buy more than we have available
        // we have to sell what we have at the current price and work on
        // the remainder within the next round's pricing
        if (want > available) {
            // figure out how much was spent in the current round
            uint256 spent = available.mul(currentPrice);

            // return the tokens available in this round plus what was 
            // sold at higher prices
            return available.add(calculatePurchaseQuantity(_amountInWei.sub(spent), _tokensSold.add(available)));
        }

        // everything they wanted to buy fit in the current
        // round so just return the count of tokens they wanted
        return want;
    }
}