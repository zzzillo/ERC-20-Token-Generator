import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { account, connectWallet, disconnectWallet } = useContext(WalletContext);

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-transparent text-white">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img src={logo} className="rounded-b-full h-15 w-15" alt="Logo" />
        </Link>
        <h1 className="text-xl font-bold">Token Generator</h1>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-10">
        <Link to="/create" className="text-lg font-medium hover:text-blue-800">
          Create Token
        </Link>
        <Link to="/tokens" className="text-lg font-medium hover:text-blue-800">
          Tokens Created
        </Link>

        {account ? (
          <button
            onClick={disconnectWallet}
            className="bg-blue-800 px-4 py-2 rounded-lg text-md font-medium hover:bg-blue-900 transition"
            title="Click to disconnect"
          >
            {account.slice(0, 6)}...{account.slice(-4)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg text-md font-medium hover:scale-105 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
