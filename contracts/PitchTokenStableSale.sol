pragma solidity ^0.4.4;

import "contracts/PitchTokenSale.sol";
import "contracts/PitchToken.sol";
import "contracts/SafeMath.sol";

contract PitchTokenStableSale {
    using SafeMath for uint256;

    uint256 public tokensSold;

    address public beneficiary;
    address public owner;
    address public token;
    address public currentSale;
    bool public saleOpen;

    mapping (address => bool) whitelist;

    function PitchTokenStableSale(address _token, address _beneficiary) public {
        token = _token;
        owner = PitchToken(_token).owner();
        beneficiary = _beneficiary;
        tokensSold = 0;
        saleOpen = true;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier canPurchase() {
        require(saleOpen);
        require(msg.value > 0);
        require(msg.sender != address(0));
        require(currentSale != address(0));
        require(whitelist[msg.sender]);
        _;
    }

    function () public payable canPurchase {
        PitchTokenSale tokenSale = PitchTokenSale(currentSale);
        uint256 tokenCount = tokenSale.calculatePurchaseQuantity(msg.value, tokensSold);
        PitchToken tokenInstance = PitchToken(token);

        tokensSold = tokensSold.add(tokenCount);
        beneficiary.transfer(address(this).balance);

        tokenInstance.transferFrom(owner, msg.sender, tokenCount);
    }

    function addToWhitelist(address _whitelistedAddress) public isOwner {
        whitelist[_whitelistedAddress] = true;
    }

    function setToken(address _token) public isOwner {
        token = _token;
    }

    function setCurrentSale(address _currentSale) public isOwner {
        currentSale = _currentSale;
    }

    function setBeneficiary(address _beneficiary) public isOwner {
        beneficiary = _beneficiary;
    }

    function setSaleOpen(bool _saleStatus) public isOwner {
        saleOpen = _saleStatus;
    }
}