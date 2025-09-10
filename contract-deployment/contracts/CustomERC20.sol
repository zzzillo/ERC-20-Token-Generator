// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomERC20 is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    bool public isMintable;
    bool public isBurnable;
    bool public isPausable;
    bool public isOwnable;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply_,
        bool _mintable,
        bool _burnable,
        bool _pausable,
        bool _ownable,
        address owner_
    )
        ERC20(name_, symbol_)
        Ownable(owner_)  
    {
        // Mint initial supply to owner
        _mint(owner_, initialSupply_ * (10 ** decimals_));

        // Save feature flags
        isMintable = _mintable;
        isBurnable = _burnable;
        isPausable = _pausable;
        isOwnable = _ownable;
    }

    // Minting function (if enabled)
    function mint(address to, uint256 amount) public onlyOwner {
        require(isMintable, "Minting not enabled");
        _mint(to, amount);
    }

    // Override burn to allow only if burnable
    function burn(uint256 amount) public override {
        require(isBurnable, "Burning not enabled");
        super.burn(amount);
    }

    function burnFrom(address account, uint256 amount) public override {
        require(isBurnable, "Burning not enabled");
        super.burnFrom(account, amount);
    }

    // Pause/unpause (if enabled)
    function pause() public onlyOwner {
        require(isPausable, "Pausable not enabled");
        _pause();
    }

    function unpause() public onlyOwner {
        require(isPausable, "Pausable not enabled");
        _unpause();
    }

    // Required override to merge ERC20 + ERC20Pausable
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
