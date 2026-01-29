"use client";

import { useActiveAccount } from "thirdweb/react";
import { User, Wallet, Award, Clock, Loader2, RefreshCw, ExternalLink, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/app/actions";
import { useFarcasterProfile } from "@/hooks/useFarcasterProfile";

export default function ProfileTab() {
  const account = useActiveAccount();
  const { profile: farcasterProfile, loading: fcLoading, error: fcError, syncProfile } = useFarcasterProfile();
  const [dbProfile, setDbProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (account?.address) {
      setLoading(true);
      fetchUserProfile(account.address)
        .then(data => setDbProfile(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [account?.address]);

  const copyAddress = (addr: string, label: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!account) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex p-4 rounded-full bg-zinc-800 mb-4">
          <Wallet className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
        <p className="text-zinc-500">Please connect your wallet to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6 p-4">
      {/* Profile Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          {farcasterProfile?.pfpUrl ? (
            <img
              src={farcasterProfile.pfpUrl}
              alt={farcasterProfile.username}
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          )}

          <div className="flex-1">
            {farcasterProfile ? (
              <>
                <h2 className="text-2xl font-bold">{farcasterProfile.displayName}</h2>
                <div className="text-zinc-400">@{farcasterProfile.username}</div>
                <div className="text-xs text-zinc-500 mt-1">FID: {farcasterProfile.fid}</div>
                {farcasterProfile.bio && (
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{farcasterProfile.bio}</p>
                )}
                <div className="flex gap-4 mt-2 text-sm">
                  <span><strong>{farcasterProfile.followerCount}</strong> <span className="text-zinc-500">followers</span></span>
                  <span><strong>{farcasterProfile.followingCount}</strong> <span className="text-zinc-500">following</span></span>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">User {account.address.slice(0, 6)}...</h2>
                <div className="text-zinc-400 text-sm font-mono">{account.address}</div>
              </>
            )}

            <div className="flex gap-2 mt-3">
              {farcasterProfile && (
                <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-md border border-purple-500/20">
                  Farcaster ✓
                </span>
              )}
              <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-md border border-blue-500/20">
                Base
              </span>
            </div>
          </div>

          {/* Sync Button */}
          <button
            onClick={syncProfile}
            disabled={fcLoading}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
            title="Sync Farcaster Profile"
          >
            <RefreshCw className={`w-5 h-5 ${fcLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {fcError && (
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-lg text-yellow-500 text-sm">
            {fcError}. <button onClick={syncProfile} className="underline">Try again</button>
          </div>
        )}
      </div>

      {/* Wallet Addresses */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Connected Wallets</h3>
        <div className="space-y-3">
          {/* Current Connected Wallet */}
          <div className="flex items-center justify-between p-3 bg-black rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="text-sm font-medium">Connected Wallet</div>
                <div className="text-xs text-zinc-500 font-mono">{account.address.slice(0, 10)}...{account.address.slice(-8)}</div>
              </div>
            </div>
            <button onClick={() => copyAddress(account.address, 'connected')} className="p-2 hover:bg-zinc-800 rounded-lg">
              {copied === 'connected' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
            </button>
          </div>

          {/* Farcaster Custody Address */}
          {farcasterProfile?.custodyAddress && (
            <div className="flex items-center justify-between p-3 bg-black rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <div className="text-sm font-medium">Farcaster Custody</div>
                  <div className="text-xs text-zinc-500 font-mono">{farcasterProfile.custodyAddress.slice(0, 10)}...{farcasterProfile.custodyAddress.slice(-8)}</div>
                </div>
              </div>
              <button onClick={() => copyAddress(farcasterProfile.custodyAddress, 'custody')} className="p-2 hover:bg-zinc-800 rounded-lg">
                {copied === 'custody' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
              </button>
            </div>
          )}

          {/* Verified ETH Addresses */}
          {farcasterProfile?.verifiedAddresses?.ethAddresses?.map((addr: string, i: number) => (
            <div key={addr} className="flex items-center justify-between p-3 bg-black rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-medium">Verified Address {i + 1}</div>
                  <div className="text-xs text-zinc-500 font-mono">{addr.slice(0, 10)}...{addr.slice(-8)}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => copyAddress(addr, `verified-${i}`)} className="p-2 hover:bg-zinc-800 rounded-lg">
                  {copied === `verified-${i}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
                </button>
                <a
                  href={`https://basescan.org/address/${addr}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-zinc-800 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4 text-zinc-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-sm">Coins Created</span>
          </div>
          <div className="text-2xl font-bold">{dbProfile?.stats?.coinsCreated || 0}</div>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Days Active</span>
          </div>
          <div className="text-2xl font-bold">{dbProfile?.stats?.daysActive || 0}</div>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <User className="w-4 h-4" />
            <span className="text-sm">Followers</span>
          </div>
          <div className="text-2xl font-bold">{farcasterProfile?.followerCount || dbProfile?.stats?.followers || 0}</div>
        </div>
      </div>

      {/* Your Coins */}
      <h3 className="text-xl font-bold mt-8 mb-4">Your Coins</h3>
      <div className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500">
        {dbProfile?.stats?.coinsCreated > 0
          ? "Your coins will appear here."
          : "You haven't launched any coins yet."}
      </div>
    </div>
  );
}
