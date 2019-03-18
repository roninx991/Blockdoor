pragma solidity >=0.4.22 <0.6.0;

contract Storage {
  uint256 storedData;

  function set (uint256 data) public {
    storedData = data;
  }

  function get() public returns (uint256) {
    return storedData;
  }
}
