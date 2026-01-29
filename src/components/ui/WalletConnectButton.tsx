"use client";

import { ConnectButton } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

// Configure supported wallets
const wallets = [
    inAppWallet({
        auth: {
            options: ["farcaster", "wallet"],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("app.phantom"),
];

export default function WalletConnectButton() {
    return (
        <ConnectButton
            client={client}
            chain={chain}
            wallets={wallets}
            connectButton={{
                label: "Connect",
                className: "!bg-blue-600 !hover:bg-blue-500 !text-white !font-bold !px-4 !py-2 !rounded-lg !text-sm",
            }}
            detailsButton={{
                className: "!bg-zinc-800 !text-white !font-medium !px-3 !py-2 !rounded-lg !text-sm",
            }}
            connectModal={{
                title: "Connect to FarBase",
                titleIcon: "",
                size: "compact",
            }}
            theme="dark"
            appMetadata={{
                name: "FarBaseCoinCreator",
                url: "https://far-base-coin-creator.vercel.app",
                description: "Create & Trade Coins on Base via Farcaster",
                logoUrl: "https://far-base-coin-creator.vercel.app/favicon.ico",
            }}
        />
    );
}
