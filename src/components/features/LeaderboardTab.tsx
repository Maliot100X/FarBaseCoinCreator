"use client";

import { Trophy, TrendingUp, Medal, Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchLeaderboard } from "@/app/actions";

interface LeaderEntry {
    rank: number;
    name: string;
    volume: string;
    coins: number;
    fid?: number;
}

export default function LeaderboardTab() {
    const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        fetchLeaderboard()
            .then(data => {
                if (data && data.length > 0) {
                    setLeaders(data);
                    setIsEmpty(false);
                } else {
                    setLeaders([]);
                    setIsEmpty(true);
                }
            })
            .catch(err => {
                console.error("Leaderboard fetch error:", err);
                setIsEmpty(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4">
            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                    <div className="font-bold text-yellow-500">#1 Creator</div>
                    <div className="text-sm text-zinc-400">{leaders[0]?.name || "-"}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                    <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                    <div className="font-bold text-blue-500">Top Volume</div>
                    <div className="text-sm text-zinc-400">{leaders[0]?.volume || "-"}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                    <Medal className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="font-bold text-purple-500">Total Creators</div>
                    <div className="text-sm text-zinc-400">{leaders.length}</div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 font-bold flex justify-between">
                    <span>Rank</span>
                    <span>Creator</span>
                    <span>Volume</span>
                    <span>Coins</span>
                </div>

                {isEmpty ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-400 mb-2">No Creators Yet</h3>
                        <p className="text-sm text-zinc-500">
                            Be the first to launch a coin and claim the #1 spot!
                        </p>
                    </div>
                ) : (
                    leaders.map((leader) => (
                        <div
                            key={leader.rank}
                            className="p-4 border-b border-zinc-800 last:border-0 flex justify-between items-center hover:bg-zinc-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${leader.rank === 1
                                            ? "bg-yellow-500/20 text-yellow-500"
                                            : leader.rank === 2
                                                ? "bg-gray-400/20 text-gray-400"
                                                : leader.rank === 3
                                                    ? "bg-orange-700/20 text-orange-700"
                                                    : "text-zinc-500"
                                        }
                  `}
                                >
                                    {leader.rank}
                                </div>
                                <div>
                                    <div className="font-medium">{leader.name}</div>
                                    {leader.fid && (
                                        <div className="text-xs text-zinc-500">FID: {leader.fid}</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-12 text-zinc-400 text-sm">
                                <div className="w-20 text-right">{leader.volume}</div>
                                <div className="w-10 text-right">{leader.coins}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
