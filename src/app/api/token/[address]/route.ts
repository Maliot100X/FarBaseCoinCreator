import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ address: string }> }
) {
    const { address } = await params;
    const supabase = await createClient();

    try {
        // Fetch from our database
        const { data: coin, error } = await supabase
            .from("coins")
            .select("*")
            .eq("contract_address", address)
            .single();

        if (error || !coin) {
            // Try to fetch basic info from on-chain or return placeholder
            return NextResponse.json({
                name: "Unknown Token",
                symbol: "???",
                address: address,
                imageUrl: null,
                creator: null,
                marketCap: 0,
                price: 0,
                priceChange24h: 0,
                holders: 0,
                volume24h: 0,
            });
        }

        // Get creator info if available
        let creatorInfo = null;
        if (coin.creator_fid) {
            const { data: user } = await supabase
                .from("users")
                .select("wallet, fid")
                .eq("fid", coin.creator_fid)
                .single();
            creatorInfo = user;
        }

        return NextResponse.json({
            name: coin.name,
            symbol: coin.symbol,
            address: coin.contract_address,
            imageUrl: coin.image_url,
            creator: creatorInfo?.wallet || null,
            creatorFid: creatorInfo?.fid || null,
            marketCap: coin.market_cap || 0,
            price: 0, // Would need to fetch from DEX
            priceChange24h: 0,
            holders: 0, // Would need to fetch from blockchain
            volume24h: 0,
            createdAt: coin.created_at,
        });
    } catch (err) {
        console.error("Token fetch error:", err);
        return NextResponse.json(
            { error: "Failed to fetch token" },
            { status: 500 }
        );
    }
}
