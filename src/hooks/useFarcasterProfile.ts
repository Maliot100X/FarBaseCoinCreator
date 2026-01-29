"use client";

import { useState, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";

interface FarcasterProfile {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
    bio: string;
    followerCount: number;
    followingCount: number;
    verifiedAddresses: {
        ethAddresses: string[];
        solAddresses: string[];
    };
    custodyAddress: string;
    activeStatus: string;
}

export function useFarcasterProfile() {
    const account = useActiveAccount();
    const [profile, setProfile] = useState<FarcasterProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const syncProfile = useCallback(async () => {
        if (!account?.address) {
            setError("No wallet connected");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/farcaster?wallet=${account.address}`);

            if (!res.ok) {
                if (res.status === 404) {
                    setError("No Farcaster account linked to this wallet");
                    return null;
                }
                throw new Error("Failed to fetch profile");
            }

            const data = await res.json();
            setProfile(data);
            return data;
        } catch (err: any) {
            setError(err.message || "Failed to sync profile");
            return null;
        } finally {
            setLoading(false);
        }
    }, [account?.address]);

    const lookupByUsername = useCallback(async (username: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/farcaster?username=${username}`);

            if (!res.ok) {
                throw new Error("User not found");
            }

            const data = await res.json();
            setProfile(data);
            return data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        profile,
        loading,
        error,
        syncProfile,
        lookupByUsername,
        isConnected: !!account,
    };
}
