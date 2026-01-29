"use client";

import { useState } from "react";
import { useDeployToken } from "@/hooks/useDeployToken";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

export default function CreateCoinTab() {
  const { deploy } = useDeployToken();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("1000000");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const address = await deploy(name, symbol, supply);
      setResult(address);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Deployment failed");
      } else {
        setError("Deployment failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Coin</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700"
          placeholder="e.g. FarBase Coin"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700"
          placeholder="e.g. FBC"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Initial Supply</label>
        <input
          type="number"
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700"
        />
      </div>

      <div className="pt-4">
        <ConnectButton client={client} />
        
        <button
          onClick={handleDeploy}
          disabled={loading || !name || !symbol}
          className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 font-bold"
        >
          {loading ? "Deploying..." : "Create Coin (Sign TX)"}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="p-3 bg-green-900/50 border border-green-500 rounded text-green-200 text-sm break-all">
          <p className="font-bold">Success!</p>
          <p>Contract: {result}</p>
        </div>
      )}
    </div>
  );
}
