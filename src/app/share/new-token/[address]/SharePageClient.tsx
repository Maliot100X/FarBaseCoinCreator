"use client";

import { useEffect, useState } from "react";
import {
    PartyPopper,
    ExternalLink,
    Copy,
    Check,
    Share2,
    Loader2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";

interface TokenData {
    name: string;
    symbol: string;
    address: string;
    imageUrl?: string;
    creator?: string;
    createdAt?: string;
}

export default function SharePageClient({ address }: { address: string }) {
    const [token, setToken] = useState<TokenData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        async function fetchToken() {
            try {
                const res = await fetch(`/api/token/${address}`);
                if (res.ok) {
                    const data = await res.json();
                    setToken(data);
                } else {
                    setToken({
                        name: "New Token",
                        symbol: "TOKEN",
                        address: address,
                    });
                }
            } catch (err) {
                setToken({
                    name: "New Token",
                    symbol: "TOKEN",
                    address: address,
                });
            } finally {
                setLoading(false);
            }
        }
        fetchToken();

        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
    }, [address]);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnFarcaster = () => {
        const text = `🎉 Just created "${token?.name}" ($${token?.symbol}) on FarBase!`;
        const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, "_blank");
    };

    const shareOnTwitter = () => {
        const text = `🎉 Just created "${token?.name}" ($${token?.symbol}) on @FarBaseCreator!`;
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
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
        <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#101A2D] text-white relative overflow-hidden">
            {showConfetti && (
                <Confetti
                    width={typeof window !== 'undefined' ? window.innerWidth : 1200}
                    height={typeof window !== 'undefined' ? window.innerHeight : 800}
                    recycle={false}
                    numberOfPieces={200}
                />
            )}

            <div className="max-w-2xl mx-auto px-4 py-16 relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6">
                        <PartyPopper className="w-12 h-12 text-yellow-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        New Token Created!
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Your token has been deployed to Base
                    </p>
                </div>

                {/* Token Card */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shrink-0">
                            {token?.imageUrl ? (
                                <img src={token.imageUrl} alt={token.name} className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                                token?.symbol?.[0] || "?"
                            )}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">{token?.name}</h2>
                            <div className="text-xl text-zinc-400">${token?.symbol}</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl">
                            <span className="text-zinc-400">Token Address</span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm">
                                    {address.slice(0, 10)}...{address.slice(-8)}
                                </span>
                                <a
                                    href={`https://basescan.org/address/${address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 hover:bg-zinc-800 rounded transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4 text-zinc-500" />
                                </a>
                            </div>
                        </div>

                        {token?.creator && (
                            <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl">
                                <span className="text-zinc-400">Creator</span>
                                <span className="font-mono text-sm">
                                    {token.creator.slice(0, 10)}...{token.creator.slice(-8)}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl">
                            <span className="text-zinc-400">Created</span>
                            <span>
                                {token?.createdAt
                                    ? new Date(token.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    : new Date().toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={shareOnFarcaster}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-colors"
                    >
                        <Share2 className="w-5 h-5" />
                        Share on Farcaster
                    </button>

                    <button
                        onClick={shareOnTwitter}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition-colors"
                    >
                        Share on X/Twitter
                    </button>

                    <button
                        onClick={copyLink}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl font-medium transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 text-green-500" />
                                Link Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copy Share Link
                            </>
                        )}
                    </button>

                    <Link
                        href={`/token/${address}`}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors"
                    >
                        View Token Details
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
