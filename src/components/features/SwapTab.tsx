"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Loader2, RefreshCw } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { useOpenOcean } from "@/hooks/useOpenOcean";

export default function SwapTab() {
  const { getQuote, getSwapTransaction, tokenList } = useOpenOcean();
  const account = useActiveAccount();
  
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock token list for now (would be fetched from OpenOcean)
  const TOKENS = [
      { symbol: "ETH", address: "0x4200000000000000000000000000000000000006" }, // WETH actually
      { symbol: "USDC", address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" },
      { symbol: "DEGEN", address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed" },
  ];

  const handleGetQuote = async () => {
      if (!amount || parseFloat(amount) <= 0) return;
      setLoading(true);
      try {
          // This is where we'd call the OpenOcean API
          // For now, we simulate a quote to demonstrate UI flow
          await new Promise(r => setTimeout(r, 1000));
          setQuote({
              outAmount: (parseFloat(amount) * 3200).toFixed(2), // Mock rate
              gas: "0.0005 ETH"
          });
      } catch (e) {
          console.error(e);
      } finally {
          setLoading(false);
      }
  };

  const handleSwap = async () => {
      if (!account) return alert("Please connect wallet");
      // Execute swap logic here using useOpenOcean
      alert("Swap initiated! (User-signed TX would pop up here)");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Swap</h2>
        <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <RefreshCw className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      <div className="p-4 bg-black border border-zinc-800 rounded-xl space-y-2">
        <div className="flex justify-between text-sm text-zinc-400">
            <span>From</span>
            <span>Balance: 0.00</span>
        </div>
        <div className="flex gap-4">
            <input 
                type="number" 
                placeholder="0.0" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-2xl font-bold outline-none w-full"
            />
            <select 
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-zinc-800 rounded-lg px-3 py-1 font-bold outline-none"
            >
                {TOKENS.map(t => <option key={t.symbol} value={t.symbol}>{t.symbol}</option>)}
            </select>
        </div>
      </div>

      <div className="flex justify-center -my-3 relative z-10">
        <button className="p-2 bg-zinc-800 border border-zinc-900 rounded-xl hover:rotate-180 transition-transform duration-300">
            <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 bg-black border border-zinc-800 rounded-xl space-y-2">
        <div className="flex justify-between text-sm text-zinc-400">
            <span>To</span>
            <span>Balance: 0.00</span>
        </div>
        <div className="flex gap-4">
            <input 
                type="text" 
                placeholder="0.0" 
                value={quote ? quote.outAmount : ""}
                readOnly
                className="bg-transparent text-2xl font-bold outline-none w-full text-zinc-400"
            />
             <select 
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-zinc-800 rounded-lg px-3 py-1 font-bold outline-none"
            >
                {TOKENS.map(t => <option key={t.symbol} value={t.symbol}>{t.symbol}</option>)}
            </select>
        </div>
      </div>

      {quote && (
          <div className="p-3 bg-blue-900/10 border border-blue-900/30 rounded-lg text-xs text-blue-400 flex justify-between">
              <span>Rate</span>
              <span>1 {fromToken} = {(parseFloat(quote.outAmount) / parseFloat(amount || "1")).toFixed(4)} {toToken}</span>
          </div>
      )}

      <button 
        onClick={quote ? handleSwap : handleGetQuote}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg shadow-blue-900/20 transition-all"
      >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (quote ? "Swap" : "Get Quote")}
      </button>

      <div className="text-center text-xs text-zinc-500 mt-2">
          Powered by OpenOcean v4 via QuickNode
      </div>
    </div>
  );
}
