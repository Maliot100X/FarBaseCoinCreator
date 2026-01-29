"use client";

import { useState } from "react";
import { useDeployToken } from "@/hooks/useDeployToken";
import { Loader2, Rocket, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { saveCoin } from "@/app/actions";

export default function CreateCoinTab() {
  const { deploy } = useDeployToken();
  const account = useActiveAccount();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!account) return setError("Please connect your wallet first.");
    if (!name || !symbol || !supply) return setError("All fields are required.");
    
    setIsDeploying(true);
    setError(null);
    setSuccess(null);

    try {
      const address = await deploy(name, symbol, supply);
      setSuccess(address);
      
      // Save to Supabase
      await saveCoin({
          name,
          symbol,
          supply,
          address,
          creator: account.address
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Deployment failed");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Launch on Base
        </h2>
        <p className="text-zinc-400">Create your own user-signed ERC20 token instantly.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Token Name</label>
          <input
            type="text"
            placeholder="e.g. FarBase Coin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Token Symbol</label>
          <input
            type="text"
            placeholder="e.g. FBC"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Initial Supply</label>
          <input
            type="number"
            placeholder="e.g. 1000000"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-center gap-2 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-900/20 border border-green-900/50 rounded-lg flex items-center gap-2 text-green-400 text-sm break-all">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Deployed at: {success}</span>
        </div>
      )}

      <button
        onClick={handleDeploy}
        disabled={isDeploying || !account}
        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
          ${isDeploying || !account 
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
          }`}
      >
        {isDeploying ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Deploying...
          </>
        ) : (
          <>
            <Rocket className="w-5 h-5" />
            Launch Token
          </>
        )}
      </button>

      <div className="text-xs text-center text-zinc-500">
        * You will be prompted to sign 2 transactions: Deploy & Mint.
        <br />
        Ensure you are on Base Mainnet (8453).
      </div>
    </div>
  );
}
