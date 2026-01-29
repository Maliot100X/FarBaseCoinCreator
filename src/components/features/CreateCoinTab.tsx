"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useDeployToken } from "@/hooks/useDeployToken";
import { Loader2, Rocket, AlertTriangle, Upload, Image as ImageIcon, Wallet } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { saveCoin } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function CreateCoinTab() {
  const router = useRouter();
  const { deploy } = useDeployToken();
  const account = useActiveAccount();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("1000000");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deployStep, setDeployStep] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeploy = async () => {
    if (!account) return setError("Please connect your wallet first.");
    if (!name || !symbol) return setError("Token name and symbol are required.");

    setIsDeploying(true);
    setError(null);
    setDeployStep("Preparing deployment...");

    try {
      setDeployStep("Deploying contract... (Sign in wallet)");
      const address = await deploy(name, symbol, supply || "0");

      setDeployStep("Saving to database...");
      await saveCoin({
        name,
        symbol,
        supply: supply || "0",
        address,
        creator: account.address
      });

      // Redirect to share page
      router.push(`/share/new-token/${address}`);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Deployment failed");
      setDeployStep("");
    } finally {
      setIsDeploying(false);
    }
  };

  if (!account) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
          <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-6">
            <Wallet className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Farcaster Wallet</h2>
          <p className="text-zinc-400 mb-4">
            Connect your Farcaster wallet to create tokens on Base
          </p>
          <p className="text-sm text-zinc-500">
            Use the wallet button in the header to connect
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Base Mainnet
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Deploy Your Coin
          </h2>
          <p className="text-zinc-400">Complete all fields to create your token</p>
        </div>

        {/* Image Upload */}
        <div className="flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative w-32 h-32 rounded-2xl bg-zinc-800 border-2 border-dashed border-zinc-700 hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-2 overflow-hidden group"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Token" className="w-full h-full object-cover" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs text-zinc-500 group-hover:text-blue-400">Upload Image</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Token Name *</label>
            <input
              type="text"
              placeholder="e.g. Penguin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Token Symbol *</label>
            <input
              type="text"
              placeholder="e.g. PENG"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              maxLength={10}
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg uppercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Initial Supply</label>
            <input
              type="number"
              placeholder="1000000"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl flex items-center gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Deploy Button */}
        <button
          onClick={handleDeploy}
          disabled={isDeploying || !name || !symbol}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-lg
            ${isDeploying || !name || !symbol
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/30"
            }`}
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {deployStep}
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              Launch Token
            </>
          )}
        </button>

        {/* Info */}
        <div className="text-xs text-center text-zinc-500 space-y-1">
          <p>You will be prompted to sign transactions in your wallet</p>
          <p>Gas fees are paid by you on Base Mainnet</p>
        </div>
      </div>
    </div>
  );
}
