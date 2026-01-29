# FarBaseCoinCreator

A production-grade Farcaster Mini App on Base Mainnet for creating, swapping, and analyzing coins.

## Features

- **Base Mainnet Only**: Strict enforcement of Chain ID 8453.
- **User-Signed Transactions**: No backend wallet signing; all actions are user-confirmed.
- **Create Coins**: Deploy standard ERC20 tokens via Thirdweb (RPC only).
- **Swap**: Integrated OpenOcean V4 aggregation for best rates.
- **AI Assistant**: MoltBot AI for token analysis and command routing.
- **Farcaster Integration**: Frame compatibility and Neynar Snapchain support.
- **Leaderboard & Profile**: Track top creators and user stats via Supabase.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + RLS)
- **Blockchain SDK**: thirdweb (RPC only) + viem/wagmi
- **AI**: MoltBot + Coinbase CDP Agent Kit
- **DEX Aggregation**: OpenOcean V4 via QuickNode

## Setup & Deployment

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in the required keys.

```bash
cp .env.example .env
```

**Required Keys:**
- `NEXT_PUBLIC_BASE_RPC_URL`: QuickNode HTTP RPC URL
- `NEXT_PUBLIC_BASE_WSS_URL`: QuickNode WSS URL
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`: Thirdweb Client ID
- `SUPABASE_URL`: Supabase Project URL
- `SUPABASE_ANON_KEY`: Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key (Server only)
- `NEYNAR_API_KEY`: Neynar API Key
- `CDP_API_KEY_ID`: Coinbase CDP API Key ID
- `CDP_API_SECRET`: Coinbase CDP Secret
- `MOLTBOT_API_KEY_1`: MoltBot API Key

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Vercel Deployment

1. Create a new project on Vercel.
2. Import this repository.
3. Configure **Environment Variables** in Vercel settings (copy all from `.env`).
4. Set the **Framework Preset** to Next.js.
5. Deploy.
6. Assign a custom domain (HTTPS enforced).

## Repository Rules

- **No Secrets**: Never commit `.env`. Use `.env.example`.
- **Mainnet Only**: Do not add testnet configurations.
- **User-Signed**: Do not add private key signing logic to backend.

## License

Private Repository. All rights reserved.
