import { network } from "hardhat";

async function main() {
  // 1. Connect to the network Hardhat gives you
  const { viem } = await network.connect();

  // 2. Contract address from your localhost deployment
  const counterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // 3. Get contract instance (ABI is auto-loaded from artifacts by name)
  const counter = await viem.getContractAt("Counter", counterAddress);

  // 4. Get clients
  const publicClient = await viem.getPublicClient();
  const [senderClient] = await viem.getWalletClients();

  console.log("Latest block number:", await publicClient.getBlockNumber());

  // 5. Read the current value of x
  const currentX = await counter.read.x();
  console.log("Current x value:", currentX.toString());

  // 6. Send a state-changing tx
  const txHash = await counter.write.incBy([10n], { account: senderClient.account });
  const txHash2 = await counter.write.inc({ account: senderClient.account });
  console.log("Tx hash:", txHash);

  // 7. Wait for receipt
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log("Tx confirmed in block:", receipt.blockNumber);

  // 8. Read x again after increment
  const newX = await counter.read.x();
  console.log("New x value:", newX.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
