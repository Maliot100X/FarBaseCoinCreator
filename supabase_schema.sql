-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE
create table public.users (
  fid bigint primary key,
  wallet text,
  score int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COINS TABLE
create table public.coins (
  address text primary key,
  name text not null,
  symbol text not null,
  supply numeric not null,
  creator_fid bigint references public.users(fid),
  boosted_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOOSTS TABLE
create table public.boosts (
  id uuid default uuid_generate_v4() primary key,
  user_fid bigint references public.users(fid),
  coin_address text references public.coins(address),
  type text not null, -- 'basic', 'pro'
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  user_fid bigint primary key references public.users(fid),
  plan text not null, -- 'pro'
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SWAPS TABLE
create table public.swaps (
  hash text primary key,
  from_token text not null,
  to_token text not null,
  amount numeric not null,
  user_fid bigint references public.users(fid),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI USAGE TABLE
create table public.ai_usage (
  fid bigint,
  count int default 0,
  date date default current_date,
  primary key (fid, date)
);

-- RLS POLICIES (Row Level Security)
alter table public.users enable row level security;
alter table public.coins enable row level security;
alter table public.boosts enable row level security;
alter table public.subscriptions enable row level security;
alter table public.swaps enable row level security;
alter table public.ai_usage enable row level security;

-- Public read access
create policy "Public users are viewable by everyone." on public.users for select using (true);
create policy "Public coins are viewable by everyone." on public.coins for select using (true);
create policy "Public boosts are viewable by everyone." on public.boosts for select using (true);

-- Insert access (controlled via API/Backend logic usually, but here we allow authenticated users to insert mostly via server actions)
-- For simplicity in this SQL, we allow authenticated inserts, but in production, you might restrict this further.
create policy "Users can insert their own data." on public.users for insert with check (true);
create policy "Users can insert coins." on public.coins for insert with check (true);

