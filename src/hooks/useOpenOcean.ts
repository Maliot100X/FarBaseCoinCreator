import { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { chain } from '@/lib/thirdweb';

const OPENOCEAN_API_BASE = 'https://open-api.openocean.finance/v3';

export function useOpenOceanSwap() {
    const account = useActiveAccount();
    const [tokens, setTokens] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Token List for Base (Chain ID 8453)
        // Using OpenOcean public API or QuickNode addon if configured proxy
        fetch(`${OPENOCEAN_API_BASE}/8453/tokenList`)
            .then(res => res.json())
            .then(data => {
                if(data.data) setTokens(data.data);
            })
            .catch(err => console.error("Failed to fetch tokens", err));
    }, []);

    const getQuote = async (inToken: string, outToken: string, amount: string) => {
        if (!account) throw new Error("Wallet not connected");
        
        const gasPriceUrl = `${OPENOCEAN_API_BASE}/8453/gasPrice`;
        const gasPriceRes = await fetch(gasPriceUrl).then(r => r.json());
        const gasPrice = gasPriceRes.standard; // or fast

        const quoteUrl = `${OPENOCEAN_API_BASE}/8453/quote?inTokenAddress=${inToken}&outTokenAddress=${outToken}&amount=${amount}&gasPrice=${gasPrice}&slippage=1&account=${account.address}`;
        
        const res = await fetch(quoteUrl);
        const data = await res.json();
        return data;
    };

    return { tokens, getQuote };
}
