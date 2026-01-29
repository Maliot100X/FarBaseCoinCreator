# FarBase Coin Creator

A production-grade Base + Farcaster Mini App for creating, analyzing, and swapping coins on Base Mainnet.

## 🚀 Deployment Instructions (Vercel)

This project is designed to be deployed on **Vercel** with zero configuration, provided you set the environment variables correctly.

### 1. Prerequisites

- A [Vercel](https://vercel.com) account.
- A [GitHub](https://github.com) account.
- A [Supabase](https://supabase.com) project.
- A [Thirdweb](https://thirdweb.com) Client ID.
- A [Neynar](https://neynar.com) API Key.
- A [Coinbase CDP](https://portal.cdp.coinbase.com/) API Key.

### 2. Environment Variables

Go to your Vercel Project Settings > Environment Variables and add the following:

**Public Variables:**
- `NEXT_PUBLIC_BASE_RPC_URL`: `https://white-summer-daylight.base-mainnet.quiknode.pro/c70e9f7d028fa61b8a730fb47979326aa4c23539`
- `NEXT_PUBLIC_BASE_WSS_URL`: `wss://white-summer-daylight.base-mainnet.quiknode.pro/c70e9f7d028fa61b8a730fb47979326aa4c23539`
- `NEXT_PUBLIC_ZORA_API_KEY`: Your Zora API Key
- `NEXT_PUBLIC_PLATFORM_WALLET`: Your Platform Wallet Address (for fees/admin)
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`: Your Thirdweb Client ID

**Private Variables (Server-side):**
- `SUPABASE_URL`: Your Supabase Project URL
- `SUPABASE_ANON_KEY`: Your Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key
- `NEYNAR_API_KEY`: Your Neynar API Key
- `NEYNAR_CLIENT_ID`: Your Neynar Client ID
- `NEYNAR_SNAPCHAIN_URL`: Neynar Snapchain URL
- `CDP_API_KEY_ID`: Coinbase CDP API Key ID
- `CDP_API_SECRET`: Coinbase CDP API Secret
- `THIRDWEB_SECRET_KEY`: Thirdweb Secret Key
- `MOLTBOT_API_KEY_1`: Your MoltBot API Key
- `AI_DAILY_LIMIT`: `500`

### 3. Database Setup (Supabase)

1. Go to your Supabase Dashboard > SQL Editor.
2. Copy the content of `supabase_schema.sql` from this repository.
3. Run the SQL query to create tables and set up RLS policies.

### 4. Deploy

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Configure the environment variables.
4. Click **Deploy**.

## 🛠 Features

- **Base Mainnet Only**: Strict enforcement of Chain ID 8453.
- **User-Signed Transactions**: No backend wallet signing; users own their keys.
- **Farcaster Integration**: Frame v2 compatibility via `.well-known/farcaster.json`.
- **MoltBot AI**: Floating AI assistant for analysis and help.
- **Supabase**: RLS-enabled database for users, coins, and boosts.
- **OpenOcean Swap**: Integrated DEX aggregator.

## ⚠️ Security

- `.env` files are gitignored.
- No private keys are stored in the code.
- All sensitive operations are protected by RLS or server-side checks.

## 📜 License

MIT
