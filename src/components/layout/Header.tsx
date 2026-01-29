"use client";

import WalletConnectButton from "@/components/ui/WalletConnectButton";
import { Coins } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                        <Coins className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        FarBase
                    </span>
                </div>
                <WalletConnectButton />
            </div>
        </header>
    );
}
