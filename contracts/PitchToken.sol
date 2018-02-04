pragma solidity ^0.4.4;

import "contracts/SafeMath.sol";


contract PitchToken {
    using SafeMath for uint256;

    address public owner;
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;
    bool private saleComplete;

    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string public symbol;                 //An identifier: eg SBX
    string public version = "H1.0";       //human 0.1 standard. Just an arbitrary versioning scheme.

    function PitchToken() public {
        name = "PITCH";                                             // Set the name for display purposes
        symbol = "PITCH";                                           // Set the symbol for display purposes

        decimals = 9;                                               // Amount of decimals for display purposes
        totalSupply = (161800000 * (10**uint(decimals)));

        owner = msg.sender;
        balances[msg.sender] = totalSupply;  // Give the creator all initial tokens (100000 for example)

        saleComplete = false;
        Transfer(address(0), msg.sender, totalSupply);
    }

    function balanceOf(address _owner) public constant returns (uint256 balance) {
        return balances[_owner];
    }

    // function approve(address _spender, uint256 _value) public returns (bool success) {
    //     allowed[msg.sender][_spender] = _value;
    //     Approval(msg.sender, _spender, _value);
    //     return true;
    // }

    // function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
    //   return allowed[_owner][_spender];
    // }

    // function transfer2(address _to, uint256 _value) public returns (bool success) {
    //     //Default assumes totalSupply can't be over max (2^256 - 1).
    //     //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
    //     //Replace the if with this one instead.
    //     //if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        
    //     // TODO: If token sale is not finished.
    //     // AND user is not the owner of the contract
    //     // don't allow transfer.
    //     // TODO: Implement "tradeable" function.

    //     if (_canTransfer(msg.sender, _value)) {
    //     // if (true) {
    //         balances[msg.sender] = balances[msg.sender].sub(_value);
    //         balances[_to] = balances[_to].add(_value);
    //         Transfer(msg.sender, _to, _value);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[msg.sender]);
        require(msg.sender == owner || saleComplete);

        // SafeMath.sub will throw if there is not enough balance.
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        
        // TODO: If token sale is not finished.
        // AND user is not the owner of the contract
        // don't allow transfer
        // TODO: Implement "tradeable" function.

        if ( _canTransferWithApproval(_from, _value) ) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else {
            return false;
        }
    }

    function _canTransferWithApproval(address _from, uint256 _value) internal constant returns (bool canTransfer) {        
        if (!_canTransfer(_from, _value))
            return false;

        if (_from == owner)
            return true;
        
        if (allowed[_from][msg.sender] >= _value)
            return true;

        return false;
    }

    function _canTransfer(address _from, uint256 _value) internal constant returns (bool canTransfer) {
        if (_value <= 0)
            return false;

        if (_from != owner && !saleComplete)
            return false;

        if (balances[_from] < _value)
            return false;
        
        return true;
    }

    function isSaleComplete() view public returns (bool complete) {
        return saleComplete;
    }

    function completeSale() public returns (bool complete) {
        if (msg.sender != owner) {
            return false;
        }

        saleComplete = true;
        return saleComplete;
    }

    // // TODO: Does this enable a receiving contract to take some kind of action?  If not, we need to implement a feature to do this so that the token is usable.
    // // function approveAndCall(address _spender, uint256 _value, bytes _extraData) public returns (bool success) {
    // //     allowed[msg.sender][_spender] = _value;
    // //     Approval(msg.sender, _spender, _value);

    // //     //call the receiveApproval function on the contract you want to be notified. This crafts the function signature manually so one doesn't have to include a contract in here just for this.
    // //     //receiveApproval(address _from, uint256 _value, address _tokenContract, bytes _extraData)
    // //     //it is assumed that when does this that the call *should* succeed, otherwise one would use vanilla approve instead.
    // //     if(!_spender.call(bytes4(bytes32(keccak256("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData)) { revert(); }
    // //     return true;
    // // }

    // function () public {
    //     //if ether is sent to this address, send it back.
    //     revert();
    // }

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}