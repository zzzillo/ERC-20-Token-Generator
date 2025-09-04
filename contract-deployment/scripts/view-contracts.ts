import { network } from "hardhat";
import type { AbiFunction } from "viem";

async function main() {
  // 1. Connect to the Hardhat network
  const { viem } = await network.connect();

  // 2. Contract address from your localhost deployment
  const counterAddress: `0x${string}` = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // 3. Get contract instance (ABI auto-loaded by name)
  const counter = await viem.getContractAt("Counter", counterAddress);

  // 4. Get clients
  const publicClient = await viem.getPublicClient();
  const [senderClient] = await viem.getWalletClients();

  console.log("Latest block number:", await publicClient.getBlockNumber());

  // 5. Read current x value
  const currentX = await counter.read.x();
  console.log("Current x value:", currentX.toString());

  // 6. Send a state-changing transaction
  const txHash = await counter.write.incBy([5n], { account: senderClient.account });
  console.log("Tx hash:", txHash);

  // 7. Wait for transaction confirmation
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log("Tx confirmed in block:", receipt.blockNumber);

  // 8. Read x again after increment
  const newX = await counter.read.x();
  console.log("New x value:", newX.toString());

  // 9. Safely loop over functions in ABI and print their names
  const abi = counter.abi;
  abi.forEach((entry) => {
    if (entry.type === "function") {
      console.log("Function name:", (entry as AbiFunction).name);
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
