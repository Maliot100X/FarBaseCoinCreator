"use client";

import { useEffect, useState } from "react";
import { fetchCoins } from "@/app/actions";
import { TrendingUp, TrendingDown, Clock, Flame, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Coin {
  id?: string;
  name: string;
  symbol: string;
  contract_address: string;
  image_url?: string;
  market_cap?: number;
  price?: number;
  priceChange24h?: number;
  created_at?: string;
}

export default function HomeTab() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCoins();
        setCoins(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Gainers Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold">Top Gainers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coins.slice(0, 3).map((coin, i) => (
            <Link
              key={coin.contract_address}
              href={`/token/${coin.contract_address}`}
              className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
                  ${i === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    i === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                      'bg-gradient-to-br from-orange-600 to-orange-800'}`}
                >
                  {coin.image_url ? (
                    <img src={coin.image_url} alt={coin.name} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    coin.symbol?.[0] || "?"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{coin.name}</div>
                  <div className="text-sm text-zinc-500">${coin.symbol}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium
                  ${(coin.priceChange24h || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {(coin.priceChange24h || 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(coin.priceChange24h || 0).toFixed(1)}%
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Market Cap</span>
                <span className="font-medium">${(coin.market_cap || 0).toLocaleString()}</span>
              </div>
            </Link>
          ))}

          {coins.length === 0 && (
            <div className="col-span-3 p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center text-zinc-500">
              No coins launched yet. Be the first!
            </div>
          )}
        </div>
      </section>

      {/* Recent Launches */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold">Recent Launches</h2>
        </div>

        <div className="space-y-3">
          {coins.length === 0 ? (
            <div className="text-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-500">
              No coins launched yet. Be the first!
            </div>
          ) : (
            coins.map((coin) => (
              <Link
                key={coin.contract_address}
                href={`/token/${coin.contract_address}`}
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                    {coin.image_url ? (
                      <img src={coin.image_url} alt={coin.name} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      coin.symbol?.[0] || "?"
                    )}
                  </div>
                  <div>
                    <div className="font-bold group-hover:text-blue-400 transition-colors">{coin.name}</div>
                    <div className="text-sm text-zinc-500">${coin.symbol}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-medium">${(coin.market_cap || 0).toLocaleString()}</div>
                    <div className="text-xs text-zinc-500">Market Cap</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
