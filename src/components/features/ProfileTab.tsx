"use client";

import { useActiveAccount } from "thirdweb/react";
import { User, Wallet, Award, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/app/actions";

export default function ProfileTab() {
  const account = useActiveAccount();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account?.address) {
        setLoading(true);
        fetchUserProfile(account.address)
            .then(data => setProfile(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }
  }, [account?.address]);

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
    <div className="space-y-6">
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
        </div>
        <div>
            <h2 className="text-2xl font-bold">User {account.address.slice(0, 6)}...</h2>
            <div className="text-zinc-400 text-sm font-mono">{account.address}</div>
            <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-md border border-blue-500/20">Pro Member</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-md border border-green-500/20">Early Adopter</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Coins Created</span>
              </div>
              <div className="text-2xl font-bold">{profile?.stats?.coinsCreated || 0}</div>
          </div>
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Days Active</span>
              </div>
              <div className="text-2xl font-bold">{profile?.stats?.daysActive || 0}</div>
          </div>
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Followers</span>
              </div>
              <div className="text-2xl font-bold">{profile?.stats?.followers || 0}</div>
          </div>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Your Coins</h3>
      <div className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500">
          {profile?.stats?.coinsCreated > 0 
            ? "Your coins will appear here." 
            : "You haven't launched any coins yet."}
      </div>
    </div>
  );
}
