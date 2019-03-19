pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract SARAToken is ERC20 {

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    string public name = "SARAToken";
    string public symbol = "SAT";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 51000000;
}