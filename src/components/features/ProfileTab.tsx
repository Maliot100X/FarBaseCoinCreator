"use client";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

export default function ProfileTab() {
  const account = useActiveAccount();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
        <div className="flex items-center justify-between">
            <span className="text-gray-400">Wallet Status</span>
            <ConnectButton client={client} />
        </div>
        
        {account && (
            <div className="pt-4 border-t border-gray-700">
                <h3 className="font-bold mb-2">Your Coins</h3>
                <p className="text-gray-500 text-sm">You haven't created any coins yet.</p>
            </div>
        )}
      </div>
    </div>
  )
}
