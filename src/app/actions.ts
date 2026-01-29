"use server";

import { createClient } from "@/lib/supabase/server";
import { parseCommand, ParsedCommand } from "@/lib/ai/commandParser";
// import { Coinbase } from "@coinbase/cdp-sdk"; 

// Initialize Coinbase SDK
// Note: In a real server action, we should handle this carefully to avoid re-init
let cdpConfigured = false;
function configureCDP() {
    // Mocking CDP configuration for now as the import is failing in this environment
    if (!cdpConfigured && process.env.CDP_API_KEY_ID && process.env.CDP_API_SECRET) {
        try {
            // Coinbase.configure({
            //     apiKeyName: process.env.CDP_API_KEY_ID,
            //     privateKey: process.env.CDP_API_SECRET.replace(/\\n/g, "\n"),
            // });
            cdpConfigured = true;
        } catch (e) {
            console.error("Failed to configure CDP:", e);
        }
    }
}

export async function fetchCoins() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('coins').select('*').order('created_at', { ascending: false }).limit(10);
    if (error) {
        console.error("Fetch coins error:", error);
        return [];
    }
    return data || [];
}

export async function processAICommandAction(input: string) {
  configureCDP();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Enforce Daily Limit (if user is logged in)
  if (user) {
    const today = new Date().toISOString().split('T')[0];
    const { data: usage, error } = await supabase
        .from('ai_usage')
        .select('count')
        .eq('fid', user.id) // Assuming fid is stored as ID or mapped
        .eq('date', today)
        .single();

    const limit = parseInt(process.env.AI_DAILY_LIMIT || "500");
    
    if (usage && usage.count >= limit) {
        return "Daily AI limit reached. Please upgrade to Pro.";
    }

    // Increment usage
    if (usage) {
        await supabase.from('ai_usage').update({ count: usage.count + 1 }).eq('fid', user.id).eq('date', today);
    } else {
        await supabase.from('ai_usage').insert({ fid: user.id, count: 1, date: today });
    }
  }

  // 2. Parse Command
  const parsed = parseCommand(input);

  // 3. Process Intent (Mocked logic for now, would call MoltBot API)
  return await mockProcessIntent(parsed);
}

async function mockProcessIntent(parsed: ParsedCommand): Promise<string> {
    switch (parsed.intent) {
        case "ANALYZE":
          const token = parsed.args[0] || "ETH";
          return `Analyzing ${token}... \n\n[MoltBot Analysis]\n- Sentiment: Bullish 🟢\n- Volatility: High\n- Recommendation: DCA\n\n(Powered by Coinbase Agent Kit)`;
          
        case "CREATE":
          return "To create a coin, go to the 'Create' tab.";
          
        case "STATS":
          return "Base Mainnet Gas: 0.05 gwei. All systems operational.";
          
        case "SWAP":
            return "Head to the Swap tab.";
    
        case "HELP":
          return "Commands: /analyze, /create, /swap, /stats";
          
        default:
          return "I didn't understand that.";
      }
}
