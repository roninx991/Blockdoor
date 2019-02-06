pragma solidity ^0.5.3;

contract Util {

  function verify(bytes32 _message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
   address signer = ecrecover(_message, _v, _r, _s);
   return signer;
  }
}
