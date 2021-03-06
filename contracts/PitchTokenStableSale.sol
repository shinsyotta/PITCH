pragma solidity ^0.4.4;

import "contracts/PitchTokenSale.sol";
import "contracts/PitchToken.sol";
import "contracts/SafeMath.sol";

contract PitchTokenStableSale {
    using SafeMath for uint256;

    mapping (address => bool) public whitelistedAddresses;

    uint256 public tokensSold;

    address public beneficiary;
    address public owner;
    address public token;
    address public currentSale;
    address public seller;
    bool public saleOpen;
    bool public checkWhitelist;

    event LogEvent(string description);

    function PitchTokenStableSale(address _token, address _beneficiary, address _seller) public {
        seller = _seller;
        beneficiary = _beneficiary;
        token = _token;
        owner = PitchToken(_token).owner();
        tokensSold = 0;
        saleOpen = true;
        checkWhitelist = true;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier isSeller() {
        require(msg.sender == seller);
        _;
    }

    modifier canPurchase() {
        require(saleOpen);
        require(msg.value > 0);
        require(msg.sender != address(0));
        require(currentSale != address(0));
        require(!checkWhitelist || whitelistedAddresses[msg.sender] == true);
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

    function setWhitelist(bool _whitelistValue) public isOwner {
        checkWhitelist = _whitelistValue;
    }

    function addToWhitelist(address userAddress) public isSeller {
        whitelistedAddresses[userAddress] = true;
        Whitelist(userAddress);
    }

    function isWhitelisted(address userAddress) public view returns (bool whitelisted) {
        return whitelistedAddresses[userAddress];
    }

    function setToken(address _token) public isOwner {
        token = _token;
    }

    function setCurrentSale(address _currentSale) public isOwner {
        currentSale = _currentSale;
    }

    function setSaleOpen(bool _saleStatus) public isOwner {
        saleOpen = _saleStatus;
    }

    event Whitelist(address indexed who);
}