// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DogeCoin is ERC20, Ownable {
    constructor() ERC20("DogeCoin", "DOGE") {
    }

    function mint(address to, uint256 amount) public  payable{
        _mint(to, amount);
    }


      receive() external payable {
    // accept ETH, do nothing as it would break the gas fee for a transaction
  }

    function sendViaCall(address payable to, uint256 amount) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}