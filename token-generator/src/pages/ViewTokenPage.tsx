import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ViewTokenPage() {
  // Example token data (useState for now)
  const [tokens, setTokens] = useState([
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
        mintable: false,
        burnable: true,
        pausable: true,
        ownable: false,
      },
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
  ]);

  return (
    <>
      <div className="w-full bg-black">
        <Navbar />
      </div>

      <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">ERC-20 Tokens Created</h1>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-blue-800">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Symbol</th>
                <th className="px-6 py-3 text-left">Decimals</th>
                <th className="px-6 py-3 text-left">Total Supply</th>
                <th className="px-6 py-3 text-left">Features</th>
                <th className="px-6 py-3 text-left">Contract Address</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-900 transition">
                  <td className="px-6 py-4">{token.name}</td>
                  <td className="px-6 py-4">{token.symbol}</td>
                  <td className="px-6 py-4">{token.decimals}</td>
                  <td className="px-6 py-4">{token.totalSupply.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {[
                      token.features.mintable && "Mintable",
                      token.features.burnable && "Burnable",
                      token.features.pausable && "Pausable",
                      token.features.ownable && "Ownable",
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                  <td className="px-6 py-4 break-all">
                    <a
                      href={`https://sepolia.etherscan.io/address/${token.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {token.contractAddress}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
