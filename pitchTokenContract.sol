pragma solidity ^0.4.4;

// Could add whitelist here using Ethereum addresses and boolean flag showing whether they are whitelisted.

contract ERC20Token {
    function transfer(address _to, uint256 _value) public returns (bool); // This makes available the transfer function of the specified ERC20 token.
}

contract PricedTokenSale {
    // PMKN hardcoded for simplicity
    address tokenAddress = 0xcD7f46B8A66203B842c7B68863de7e90643E426B; // Whatever is the contract address for pitchToken when deployed.
    
    // Need to accept payment and transfer it to custody of another wallet.
    // Need to make the method that accepts payment into the default method of the contract.
    // Token sale should work as "send ETH to Ethereum address 0xabc123abc1233B842c7B68863de7e90643E426B"

    function deliverTokens(uint256 amountToTransfer) public returns (bool success) {
        ERC20Token token = ERC20Token(tokenAddress);
        token.transfer(msg.sender, amountToTransfer);
        return true;
    }
}