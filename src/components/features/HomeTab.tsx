"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/server"; // This won't work in client component, need client-side supabase
// Actually, for client components, we usually fetch from an API route or use supabase-js client side if configured with anon key
// Since we set up server.ts, let's create a client-side one or just use an action.
// Let's use a server action to fetch data to keep logic secure/consistent.
import { fetchCoins } from "@/app/actions";
import { TrendingUp, Clock, Zap } from "lucide-react";

export default function HomeTab() {
  const [coins, setCoins] = useState<any[]>([]);
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

  if (loading) return <div className="p-8 text-center text-zinc-500 animate-pulse">Loading coins...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Trending</div>
            <div className="text-xl font-bold">Base Meme</div>
          </div>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">New Listings</div>
            <div className="text-xl font-bold">12 Today</div>
          </div>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Boosted</div>
            <div className="text-xl font-bold">Top 3</div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Recent Launches</h3>
      <div className="space-y-3">
        {coins.length === 0 ? (
          <div className="text-center p-8 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500">
            No coins launched yet. Be the first!
          </div>
        ) : (
          coins.map((coin) => (
            <div key={coin.address} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                  {coin.symbol[0]}
                </div>
                <div>
                  <div className="font-bold">{coin.name}</div>
                  <div className="text-xs text-zinc-400">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-zinc-300">
                  {parseInt(coin.supply).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500">Supply</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
