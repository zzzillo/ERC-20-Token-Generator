// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CustomERC20.sol";

/// @title TokenFactory
/// @notice Deploys CustomERC20 tokens with chosen features
contract TokenFactory {
    event TokenCreated(
        address indexed owner,
        address tokenAddress,
        string name,
        string symbol
    );

    mapping(address => address[]) public userTokens;

    /// @notice Deploy a new ERC20 token
    function createToken(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply_,
        bool mintable,
        bool burnable,
        bool pausable,
        bool ownable
    ) external returns (address) {
        CustomERC20 token = new CustomERC20(
            name_,
            symbol_,
            decimals_,
            initialSupply_,
            mintable,
            burnable,
            pausable,
            ownable,
            msg.sender
        );

        userTokens[msg.sender].push(address(token));

        emit TokenCreated(msg.sender, address(token), name_, symbol_);

        return address(token);
    }

    /// @notice Get all tokens deployed by a user
    function getUserTokens(address user) external view returns (address[] memory) {
        return userTokens[user];
    }
}
