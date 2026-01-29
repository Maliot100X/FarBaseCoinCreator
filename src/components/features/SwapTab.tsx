"use client";
import { useState } from "react";
import { useOpenOceanSwap } from "@/hooks/useOpenOcean";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

export default function SwapTab() {
  const { tokens, getQuote } = useOpenOceanSwap();
  const account = useActiveAccount();
  const [inToken, setInToken] = useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"); // ETH
  const [outToken, setOutToken] = useState("");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSwap = async () => {
    if (!account || !outToken || !amount) return;
    setLoading(true);
    try {
        const q = await getQuote(inToken, outToken, amount);
        setQuote(q);
        // In a real app, we would then execute the transaction using the data from quote
        // sendTransaction({ ... })
        alert("Swap quote fetched! (See console)");
        console.log(q);
    } catch (e) {
        console.error(e);
        alert("Swap failed");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Swap</h2>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
         <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">From</label>
            <div className="flex gap-2">
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-900 p-3 rounded border border-gray-700 focus:border-blue-500 outline-none" 
                    placeholder="0.0" 
                />
                <select 
                    value={inToken}
                    onChange={(e) => setInToken(e.target.value)}
                    className="bg-gray-700 px-3 rounded max-w-[100px]"
                >
                    <option value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">ETH</option>
                    {/* Add more tokens */}
                </select>
            </div>
         </div>
         <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-gray-700 p-2 rounded-full border border-gray-600">
                ⬇️
            </div>
         </div>
         <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">To</label>
            <div className="flex gap-2">
                <input type="number" disabled className="w-full bg-gray-900 p-3 rounded border border-gray-700 outline-none opacity-50" placeholder="0.0" />
                <select 
                    value={outToken}
                    onChange={(e) => setOutToken(e.target.value)}
                    className="bg-gray-700 px-3 rounded max-w-[100px]"
                >
                    <option value="">Select</option>
                    <option value="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913">USDC</option>
                    <option value="0x4200000000000000000000000000000000000006">WETH</option>
                </select>
            </div>
         </div>
         
         {!account ? (
             <ConnectButton client={client} />
         ) : (
             <button 
                onClick={handleSwap}
                disabled={loading || !outToken || !amount}
                className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded font-bold transition-colors disabled:opacity-50"
             >
                {loading ? "Fetching Quote..." : "Swap via OpenOcean"}
             </button>
         )}

         {quote && (
             <div className="mt-4 p-2 bg-gray-900 rounded text-xs overflow-auto max-h-40">
                 <pre>{JSON.stringify(quote, null, 2)}</pre>
             </div>
         )}
      </div>
    </div>
  )
}
