import { NextRequest, NextResponse } from "next/server";

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const NEYNAR_BASE_URL = "https://api.neynar.com/v2/farcaster";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    const fid = searchParams.get("fid");
    const username = searchParams.get("username");

    if (!NEYNAR_API_KEY) {
        return NextResponse.json({ error: "Neynar API not configured" }, { status: 500 });
    }

    try {
        let userData = null;

        // Priority: FID > Username > Wallet
        if (fid) {
            const res = await fetch(`${NEYNAR_BASE_URL}/user/bulk?fids=${fid}`, {
                headers: { api_key: NEYNAR_API_KEY },
            });
            const data = await res.json();
            userData = data.users?.[0];
        } else if (username) {
            const res = await fetch(`${NEYNAR_BASE_URL}/user/by_username?username=${username}`, {
                headers: { api_key: NEYNAR_API_KEY },
            });
            const data = await res.json();
            userData = data.user;
        } else if (wallet) {
            // Search by verified address
            const res = await fetch(`${NEYNAR_BASE_URL}/user/bulk-by-address?addresses=${wallet}`, {
                headers: { api_key: NEYNAR_API_KEY },
            });
            const data = await res.json();
            // Response is keyed by address
            userData = data[wallet.toLowerCase()]?.[0];
        }

        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return cleaned user data
        return NextResponse.json({
            fid: userData.fid,
            username: userData.username,
            displayName: userData.display_name,
            pfpUrl: userData.pfp_url,
            bio: userData.profile?.bio?.text || "",
            followerCount: userData.follower_count || 0,
            followingCount: userData.following_count || 0,
            verifiedAddresses: {
                ethAddresses: userData.verified_addresses?.eth_addresses || [],
                solAddresses: userData.verified_addresses?.sol_addresses || [],
            },
            custodyAddress: userData.custody_address,
            activeStatus: userData.active_status,
        });
    } catch (error) {
        console.error("Neynar API error:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}
