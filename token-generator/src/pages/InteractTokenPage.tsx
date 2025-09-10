import { useState } from "react";
import Navbar from "../components/Navbar";

export default function InteractToken() {
  const [tokens] = useState([
    {
      name: "MyToken",
      symbol: "MTK",
      decimals: 18,
      totalSupply: 1000000,
      features: {
        mintable: true,
        burnable: true,
        pausable: false,
        ownable: true,
      },
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      name: "SampleToken",
      symbol: "STK",
      decimals: 8,
      totalSupply: 500000,
      features: {
        mintable: true,
        burnable: true,
        pausable: true,
        ownable: true,
      },
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
  ]);

  const [selected, setSelected] = useState<any>(null);

  // Local states for interactions
  const [burnAddress, setBurnAddress] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  // Confirmation messages
  const [burnMsg, setBurnMsg] = useState("");
  const [mintMsg, setMintMsg] = useState("");
  const [pauseMsg, setPauseMsg] = useState("");

  const handleBurnSearch = () => {
    if (!burnAddress) {
      setBurnMsg("❌ Please enter an address first.");
      return;
    }
    setBurnMsg(`✅ Balance fetched for ${burnAddress} (mock). Now enter amount to burn.`);
  };

  const handleBurn = () => {
    if (!burnAddress || !burnAmount) {
      setBurnMsg("❌ Enter both address and amount to burn.");
      return;
    }
    setBurnMsg(`🔥 Burning ${burnAmount} tokens from ${burnAddress}`);
  };

  const handleMint = (amount: string) => {
    if (!amount) {
      setMintMsg("❌ Enter amount to mint.");
      return;
    }
    setMintMsg(`✅ Minting ${amount} tokens to owner account`);
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
    const msg = isPaused ? "▶️ Contract unpaused." : "⏸️ Contract paused.";
    setPauseMsg(msg);
  };

  return (
    <>
      <div className="w-full bg-black">
        <Navbar />
      </div>

      <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6 w-full">
        {/* Title + Dropdown */}
        <div className="w-full flex items-center justify-between mb-8 relative">
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center">
            Interact with Your Token
          </h1>
          <div className="ml-auto">
            <select
              onChange={(e) => {
                const token = tokens.find((t) => t.contractAddress === e.target.value);
                setSelected(token || null);
              }}
              className="px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select a Token
              </option>
              {tokens.map((token, i) => (
                <option key={i} value={token.contractAddress} className="bg-black">
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Token Details */}
        {selected && (
          <div className="w-full max-w-4xl space-y-2 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Token Information</h2>
            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Symbol:</strong> {selected.symbol}</p>
            <p><strong>Decimals:</strong> {selected.decimals}</p>
            <p><strong>Total Supply:</strong> {selected.totalSupply.toLocaleString()}</p>
            <p><strong>Features:</strong> {Object.entries(selected.features || {})
              .filter(([_, v]) => v)
              .map(([k]) => k)
              .join(", ")}</p>
            <p>
              <strong>Contract Address:</strong>{" "}
              <a
                href={`https://sepolia.etherscan.io/address/${selected.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {selected.contractAddress}
              </a>
            </p>
          </div>
        )}

        {/* Token Interactions */}
        {selected && selected.features.ownable && (
          <div className="w-full max-w-4xl space-y-6">
            <h2 className="text-2xl font-semibold">Interactions</h2>

            {/* Burn */}
            {selected.features.burnable && (
              <div className="space-y-2">
                <p className="text-gray-300">Burn Tokens</p>
                <input
                  type="text"
                  placeholder="Address to check balance"
                  value={burnAddress}
                  onChange={(e) => setBurnAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-transparent border border-gray-700 text-white"
                />
                <button
                  onClick={handleBurnSearch}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
                >
                  Search Balance
                </button>

                <input
                  type="number"
                  placeholder="Amount to burn"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-transparent border border-gray-700 text-white"
                />
                <button
                  onClick={handleBurn}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium"
                >
                  Burn
                </button>

                {/* Burn confirmation */}
                {burnMsg && <p className="text-sm text-gray-400">{burnMsg}</p>}
              </div>
            )}

            {/* Mint */}
            {selected.features.mintable && (
              <div className="space-y-2">
                <p className="text-gray-300">Mint Tokens (Owner only)</p>
                <input
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => handleMint(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-transparent border border-gray-700 text-white"
                />
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium">
                  Mint
                </button>

                {/* Mint confirmation */}
                {mintMsg && <p className="text-sm text-gray-400">{mintMsg}</p>}
              </div>
            )}

            {/* Pause/Unpause */}
            {selected.features.pausable && (
              <div className="space-y-2">
                <p className="text-gray-300">Pause Contract</p>
                <button
                  onClick={handlePauseToggle}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isPaused ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {isPaused ? "Unpause" : "Pause"}
                </button>

                {/* Pause confirmation */}
                {pauseMsg && <p className="text-sm text-gray-400">{pauseMsg}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
