"use client";

import { useActiveAccount, useActiveWallet, useDisconnect, ConnectButton } from "thirdweb/react";
import { User, Wallet, Award, Clock, Loader2, RefreshCw, ExternalLink, Copy, Check, LogOut, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/app/actions";
import { useFarcasterProfile } from "@/hooks/useFarcasterProfile";
import { client, chain } from "@/lib/thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

// Define wallets
const farcasterWallet = inAppWallet({
  auth: {
    options: ["farcaster"],
  },
});

const metamaskWallet = createWallet("io.metamask");
const coinbaseWallet = createWallet("com.coinbase.wallet");

export default function ProfileTab() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
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

  const handleDisconnect = () => {
    if (wallet) {
      disconnect(wallet);
    }
  };

  // Not connected state - show wallet options
  if (!account) {
    return (
      <div className="max-w-xl mx-auto space-y-6 p-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-4">
            <Wallet className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-zinc-400">Choose a wallet to connect to FarBase</p>
        </div>

        <div className="space-y-4">
          {/* Farcaster / Base Mini Wallet */}
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold">Farcaster</div>
                <div className="text-sm text-zinc-500">Sign in with Warpcast</div>
              </div>
            </div>
            <ConnectButton
              client={client}
              chain={chain}
              wallets={[farcasterWallet]}
              connectButton={{
                label: "Connect with Farcaster",
                className: "!w-full !bg-purple-600 !hover:bg-purple-500 !text-white !font-bold !py-3 !rounded-lg",
              }}
              theme="dark"
            />
          </div>

          {/* MetaMask */}
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <img src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg" alt="MetaMask" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold">MetaMask</div>
                <div className="text-sm text-zinc-500">Popular browser wallet</div>
              </div>
            </div>
            <ConnectButton
              client={client}
              chain={chain}
              wallets={[metamaskWallet]}
              connectButton={{
                label: "Connect MetaMask",
                className: "!w-full !bg-orange-600 !hover:bg-orange-500 !text-white !font-bold !py-3 !rounded-lg",
              }}
              theme="dark"
            />
          </div>

          {/* Coinbase Wallet / Base */}
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <img src="https://www.coinbase.com/img/favicon/favicon-256.png" alt="Coinbase" className="w-6 h-6 rounded" />
              </div>
              <div className="flex-1">
                <div className="font-bold">Coinbase / Base Wallet</div>
                <div className="text-sm text-zinc-500">Smart wallet on Base</div>
              </div>
            </div>
            <ConnectButton
              client={client}
              chain={chain}
              wallets={[coinbaseWallet]}
              connectButton={{
                label: "Connect Base Wallet",
                className: "!w-full !bg-blue-600 !hover:bg-blue-500 !text-white !font-bold !py-3 !rounded-lg",
              }}
              theme="dark"
            />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-500" /></div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      {/* Profile Header */}
      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          {farcasterProfile?.pfpUrl ? (
            <img
              src={farcasterProfile.pfpUrl}
              alt={farcasterProfile.username}
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
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
                <h2 className="text-2xl font-bold">Connected Wallet</h2>
                <div className="text-zinc-400 text-sm font-mono">{account.address.slice(0, 10)}...{account.address.slice(-8)}</div>
                <p className="text-sm text-yellow-500 mt-2">Sync your Farcaster profile to see your info</p>
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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={syncProfile}
            disabled={fcLoading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${fcLoading ? 'animate-spin' : ''}`} />
            {farcasterProfile ? 'Refresh Farcaster' : 'Sync Farcaster'}
          </button>
          <button
            onClick={handleDisconnect}
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            title="Disconnect Wallet"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {fcError && (
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-lg text-yellow-500 text-sm">
            {fcError}
          </div>
        )}
      </div>

      {/* Connected Wallet */}
      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          Connected Wallet
        </h3>
        <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-medium">{wallet?.id === "inApp" ? "Farcaster Wallet" : wallet?.id || "Wallet"}</div>
              <div className="text-xs text-zinc-500 font-mono">{account.address.slice(0, 12)}...{account.address.slice(-10)}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => copyAddress(account.address, 'connected')} className="p-2 hover:bg-zinc-800 rounded-lg">
              {copied === 'connected' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
            </button>
            <a
              href={`https://basescan.org/address/${account.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-800 rounded-lg"
            >
              <ExternalLink className="w-4 h-4 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Farcaster Verified Addresses */}
        {farcasterProfile?.verifiedAddresses?.ethAddresses && farcasterProfile.verifiedAddresses.ethAddresses.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-zinc-400 mb-2">Farcaster Verified Addresses</div>
            <div className="space-y-2">
              {farcasterProfile.verifiedAddresses.ethAddresses.map((addr: string, i: number) => (
                <div key={addr} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                  <span className="text-xs text-zinc-500 font-mono">{addr.slice(0, 10)}...{addr.slice(-8)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => copyAddress(addr, `verified-${i}`)} className="p-1.5 hover:bg-zinc-800 rounded">
                      {copied === `verified-${i}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-400 mb-1">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">{dbProfile?.stats?.coinsCreated || 0}</div>
          <div className="text-xs text-zinc-500">Coins</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-400 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">{dbProfile?.stats?.daysActive || 0}</div>
          <div className="text-xs text-zinc-500">Days</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-400 mb-1">
            <User className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">{farcasterProfile?.followerCount || 0}</div>
          <div className="text-xs text-zinc-500">Followers</div>
        </div>
      </div>
    </div>
  );
}
