import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

// Context type
interface WalletContextType {
  account: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

// Create context
export const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);

  // Connect wallet
  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const client = createWalletClient({
          chain: mainnet,
          transport: custom((window as any).ethereum),
        });

        const [address] = await client.requestAddresses();
        setAccount(address);
      } catch (err) {
        console.error("User rejected or error:", err);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
  };

  // Watch account changes using Ethereum provider
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      (window as any).ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        (window as any).ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}
