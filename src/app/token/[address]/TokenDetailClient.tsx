"use client";

import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ExternalLink,
    Copy,
    Check,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Activity,
    Share2,
    Loader2
} from "lucide-react";
import Link from "next/link";

interface TokenData {
    name: string;
    symbol: string;
    address: string;
    imageUrl?: string;
    creator?: string;
    creatorFid?: number;
    marketCap?: number;
    price?: number;
    priceChange24h?: number;
    holders?: number;
    volume24h?: number;
    createdAt?: string;
}

export default function TokenDetailClient({ address }: { address: string }) {
    const [token, setToken] = useState<TokenData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchToken() {
            try {
                const res = await fetch(`/api/token/${address}`);
                if (res.ok) {
                    const data = await res.json();
                    setToken(data);
                } else {
                    // Fallback to basic data
                    setToken({
                        name: "Unknown Token",
                        symbol: "???",
                        address: address,
                    });
                }
            } catch (err) {
                console.error("Failed to fetch token:", err);
                setToken({
                    name: "Unknown Token",
                    symbol: "???",
                    address: address,
                });
            } finally {
                setLoading(false);
            }
        }
        fetchToken();
    }, [address]);

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnFarcaster = () => {
        const shareUrl = `https://warpcast.com/~/compose?text=Check out this token on FarBase!&embeds[]=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, "_blank");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#101A2D] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#101A2D] text-white">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Token Header */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-6">
                        {/* Token Image */}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shrink-0">
                            {token?.imageUrl ? (
                                <img src={token.imageUrl} alt={token.name} className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                                token?.symbol?.[0] || "?"
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">{token?.name}</h1>
                                <span className="px-3 py-1 bg-zinc-800 rounded-lg text-sm font-medium text-zinc-400">
                                    ${token?.symbol}
                                </span>
                            </div>

                            {/* Address */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-zinc-500 font-mono">
                                    {address.slice(0, 10)}...{address.slice(-8)}
                                </span>
                                <button
                                    onClick={copyAddress}
                                    className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
                                    title="Copy Address"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
                                </button>
                                <a
                                    href={`https://basescan.org/address/${address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
                                    title="View on BaseScan"
                                >
                                    <ExternalLink className="w-4 h-4 text-zinc-500" />
                                </a>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={shareOnFarcaster}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share on Farcaster
                                </button>
                                <a
                                    href={`https://app.uniswap.org/swap?outputCurrency=${address}&chain=base`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
                                >
                                    <DollarSign className="w-4 h-4" />
                                    Buy / Sell
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                            <DollarSign className="w-4 h-4" />
                            Price
                        </div>
                        <div className="text-xl font-bold">
                            ${token?.price?.toFixed(6) || "0.00"}
                        </div>
                        {token?.priceChange24h !== undefined && (
                            <div className={`flex items-center gap-1 text-sm ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {token.priceChange24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(token.priceChange24h).toFixed(2)}%
                            </div>
                        )}
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                            <Activity className="w-4 h-4" />
                            Market Cap
                        </div>
                        <div className="text-xl font-bold">
                            ${token?.marketCap?.toLocaleString() || "0"}
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                            <Users className="w-4 h-4" />
                            Holders
                        </div>
                        <div className="text-xl font-bold">
                            {token?.holders?.toLocaleString() || "0"}
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                            <TrendingUp className="w-4 h-4" />
                            24h Volume
                        </div>
                        <div className="text-xl font-bold">
                            ${token?.volume24h?.toLocaleString() || "0"}
                        </div>
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Price Chart</h3>
                    <div className="h-64 flex items-center justify-center bg-zinc-800/50 rounded-lg">
                        <a
                            href={`https://dexscreener.com/base/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                        >
                            View on DexScreener
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Creator Info */}
                {token?.creator && (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4">Creator</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                            <div>
                                <div className="font-medium">
                                    {token.creator.slice(0, 10)}...{token.creator.slice(-8)}
                                </div>
                                {token.creatorFid && (
                                    <div className="text-sm text-zinc-500">FID: {token.creatorFid}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
