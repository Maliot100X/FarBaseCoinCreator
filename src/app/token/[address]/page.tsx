import { Metadata } from "next";
import TokenDetailClient from "./TokenDetailClient";

interface PageProps {
    params: Promise<{ address: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { address } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://far-base-coin-creator.vercel.app";
    const ogImageUrl = `${baseUrl}/api/og/token/${address}`;

    return {
        title: `Token ${address.slice(0, 10)}... | FarBase Creator`,
        description: "Create and trade tokens on Base via Farcaster",
        openGraph: {
            title: `Token ${address.slice(0, 10)}... | FarBase Creator`,
            description: "Create and trade tokens on Base via Farcaster",
            images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `Token ${address.slice(0, 10)}... | FarBase Creator`,
            description: "Create and trade tokens on Base via Farcaster",
            images: [ogImageUrl],
        },
        other: {
            "fc:frame": JSON.stringify({
                version: "1",
                imageUrl: ogImageUrl,
                button: {
                    title: "View Coin",
                    action: {
                        type: "launch_frame",
                        url: `${baseUrl}/token/${address}`,
                        name: "FarBase Coin",
                        splashImageUrl: `${baseUrl}/icon.png`,
                        splashBackgroundColor: "#0B0F1A",
                    },
                },
            }),
            "fc:miniapp": JSON.stringify({
                version: "1",
                imageUrl: ogImageUrl,
                button: {
                    title: "View Coin",
                    action: {
                        type: "launch_miniapp",
                        url: `${baseUrl}/token/${address}`,
                        name: "FarBase Coin",
                        splashImageUrl: `${baseUrl}/icon.png`,
                        splashBackgroundColor: "#0B0F1A",
                    },
                },
            }),
        },
    };
}

export default async function TokenPage({ params }: PageProps) {
    const { address } = await params;
    return <TokenDetailClient address={address} />;
}
