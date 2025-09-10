import { network } from "hardhat";
import type { AbiFunction } from "viem";

async function main() {
  // 1. Connect to Hardhat network
  const { viem } = await network.connect();

  // 2. Replace with your deployed TokenFactory address
  const factoryAddress: `0x${string}` = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  // 3. Load TokenFactory contract
  const tokenFactory = await viem.getContractAt("TokenFactory", factoryAddress);

  // 4. Get clients
  const publicClient = await viem.getPublicClient();
  const [senderClient] = await viem.getWalletClients();

  console.log("Latest block:", await publicClient.getBlockNumber());

  // 5. Deploy a token using the factory
  const txHash = await tokenFactory.write.createToken([
    "TestToken",     // name
    "TTK",           // symbol
    18,              // decimals
    1_000_000n,      // supply
    true,            // mintable
    true,            // burnable
    true,            // pausable
    true             // ownable
  ], { account: senderClient.account });

  console.log("createToken tx hash:", txHash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log("Token created in block:", receipt.blockNumber);

  // 6. Get deployed token address from logs (event TokenCreated)
  const logs = await publicClient.getLogs({
    address: factoryAddress,
    event: tokenFactory.abi.find((e) => e.type === "event" && e.name === "TokenCreated"),
    fromBlock: receipt.blockNumber,
    toBlock: receipt.blockNumber,
  });

  const tokenAddress = logs[0].args?.tokenAddress as `0x${string}`;
  console.log("New token deployed at:", tokenAddress);

  // 7. Load the ERC20 token contract
  const token = await viem.getContractAt("CustomERC20", tokenAddress);

  // === Test functionalities ===
  console.log("Token name:", await token.read.name());
  console.log("Token symbol:", await token.read.symbol());
  console.log("Decimals:", await token.read.decimals());
  console.log("Total Supply:", await token.read.totalSupply().toString());

  // Mint tokens
  const mintTx = await token.write.mint([senderClient.account.address, 500n], {
    account: senderClient.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: mintTx });
  console.log("Minted 500 tokens");

  // Burn tokens
  const burnTx = await token.write.burn([200n], { account: senderClient.account });
  await publicClient.waitForTransactionReceipt({ hash: burnTx });
  console.log("Burned 200 tokens");

  // Pause the contract
  const pauseTx = await token.write.pause([], { account: senderClient.account });
  await publicClient.waitForTransactionReceipt({ hash: pauseTx });
  console.log("Token paused");

  // Unpause the contract
  const unpauseTx = await token.write.unpause([], { account: senderClient.account });
  await publicClient.waitForTransactionReceipt({ hash: unpauseTx });
  console.log("Token unpaused");

  // 8. Loop ABI functions
  token.abi.forEach((entry) => {
    if (entry.type === "function") {
      console.log("Function name:", (entry as AbiFunction).name);
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
