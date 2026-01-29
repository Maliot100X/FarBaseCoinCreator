"use client";

import { Trophy, TrendingUp, Medal } from "lucide-react";

export default function LeaderboardTab() {
  const LEADERS = [
      { rank: 1, name: "BaseKing.eth", volume: "$1.2M", coins: 12 },
      { rank: 2, name: "MemeLord", volume: "$850k", coins: 5 },
      { rank: 3, name: "CryptoNinja", volume: "$500k", coins: 8 },
      { rank: 4, name: "0x1234...5678", volume: "$120k", coins: 2 },
      { rank: 5, name: "MoonWalker", volume: "$90k", coins: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
              <div className="font-bold text-yellow-500">#1 Creator</div>
              <div className="text-sm text-zinc-400">BaseKing.eth</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
              <div className="font-bold text-blue-500">Top Volume</div>
              <div className="text-sm text-zinc-400">$1.2M</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center">
              <Medal className="w-8 h-8 text-purple-500 mb-2" />
              <div className="font-bold text-purple-500">Most Viral</div>
              <div className="text-sm text-zinc-400">DogeBase</div>
          </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 font-bold flex justify-between">
              <span>Rank</span>
              <span>Creator</span>
              <span>Volume</span>
              <span>Coins</span>
          </div>
          {LEADERS.map((leader) => (
              <div key={leader.rank} className="p-4 border-b border-zinc-800 last:border-0 flex justify-between items-center hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                          ${leader.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                            leader.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                            leader.rank === 3 ? 'bg-orange-700/20 text-orange-700' : 'text-zinc-500'
                          }
                      `}>
                          {leader.rank}
                      </div>
                      <div className="font-medium">{leader.name}</div>
                  </div>
                  <div className="flex gap-12 text-zinc-400 text-sm">
                      <div className="w-20 text-right">{leader.volume}</div>
                      <div className="w-10 text-right">{leader.coins}</div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
