import { Metadata } from "next";
import SharePageClient from "./SharePageClient";

interface PageProps {
    params: Promise<{ address: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { address } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://far-base-coin-creator.vercel.app";
    const ogImageUrl = `${baseUrl}/api/og/share/${address}`;

    return {
        title: `New Token Created! | FarBase Creator`,
        description: "Just created a new token on FarBase Creator platform",
        openGraph: {
            title: `New Token Created! | FarBase Creator`,
            description: "Just created a new token on FarBase Creator platform",
            images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `New Token Created! | FarBase Creator`,
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

export default async function SharePage({ params }: PageProps) {
    const { address } = await params;
    return <SharePageClient address={address} />;
}
