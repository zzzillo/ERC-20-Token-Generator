import Navbar from "../components/Navbar";
import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";

export default function CreateTokenPage() {
  const navigate = useNavigate();
  const { account, connectWallet } = useContext(WalletContext);

  useEffect(() => {
    const checkWallet = async () => {
      if ((window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0 && !account) {
            connectWallet(); // set the account in context
          }
        } catch (err) {
          console.error("Failed to check accounts:", err);
        }
      }
    };
    checkWallet();
  }, []);

  const [form, setForm] = useState({
    name: "",
    symbol: "",
    decimals: 18,
    supply: "",
    mintable: false,
    burnable: false,
    pausable: false,
    ownable: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Token config:", form, "from account:", account);
    navigate("/deploy");
  };
  
  return (
    <>
      {/* Navbar */}
      <div className="w-full bg-black">
        <Navbar />
      </div>

      <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Create ERC-20 Token</h1>

        {!account ? (
          // Show connect wallet prompt if not connected
          <div className="text-center">
            <p className="mb-4">Connect your wallet to create a token.</p>
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-400 px-6 py-2 rounded-lg text-md font-medium"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          // Show form if wallet connected
          <form
            onSubmit={handleSubmit}
            className=" p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6"
          >
            {/* Token Name */}
            <div>
              <label className="block text-gray-300 mb-2">Token Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 text-white"
                placeholder="Token Name"
                required
              />
            </div>

            {/* Symbol */}
            <div>
              <label className="block text-gray-300 mb-2">Token Symbol</label>
              <input
                type="text"
                name="symbol"
                value={form.symbol}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 text-white"
                placeholder="Symbol"
                required
              />
            </div>

            {/* Decimals */}
            <div>
              <label className="block text-gray-300 mb-2">Decimals</label>
              <input
                type="number"
                name="decimals"
                value={form.decimals}
                onChange={handleChange}
                min={0}
                max={18}
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 text-white"
              />
            </div>

            {/* Supply */}
            <div>
              <label className="block text-gray-300 mb-2">Total Supply</label>
              <input
                type="number"
                name="supply"
                value={form.supply}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 text-white"
                placeholder="1000000"
                required min={1}
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-gray-300 mb-4 font-semibold">
                Extra Features
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="mintable"
                    checked={form.mintable}
                    onChange={handleChange}
                  />
                  <span>Mintable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="burnable"
                    checked={form.burnable}
                    onChange={handleChange}
                  />
                  <span>Burnable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="pausable"
                    checked={form.pausable}
                    onChange={handleChange}
                  />
                  <span>Pausable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="ownable"
                    checked={form.ownable}
                    onChange={handleChange}
                  />
                  <span>Ownable</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              Create Token
            </button>
          </form>
        )}
      </div>
    </>
  );
}
