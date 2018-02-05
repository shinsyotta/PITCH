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

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value > 0 && _value <= balances[msg.sender]);
        require(msg.sender == owner || saleComplete);

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0));
        require(_value > 0 && _value <= balances[_from] && _value <= allowed[_from][msg.sender]);

        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);

        Transfer(_from, _to, _value);

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

    // function () public {
    //     //if ether is sent to this address, send it back.
    //     revert();
    // }

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}