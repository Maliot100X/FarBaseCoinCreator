export const BASE_CHAIN_ID = 8453;
export const BASE_RPC_URL = process.env.NEXT_PUBLIC_BASE_RPC_URL!;
export const BASE_WSS_URL = process.env.NEXT_PUBLIC_BASE_WSS_URL!;

export const DEX_ADDRESSES = {
  UNISWAP_V3_ROUTER: process.env.UNISWAP_V3_ROUTER || "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  AERODROME_ROUTER: process.env.AERODROME_ROUTER || "0xC0Aaa02f2E28C1C5B92C1C4f55e2eaf7f3d02134",
};

export const APP_CONFIG = {
  name: 'FarBaseCoinCreator',
  description: 'Create, Swap, and Boost Coins on Base via Farcaster',
  url: 'https://farbasecoincreator.vercel.app', // Placeholder
};
