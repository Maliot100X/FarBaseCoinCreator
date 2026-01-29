export type Intent = "ANALYZE" | "CREATE" | "STATS" | "SWAP" | "HELP" | "UNKNOWN";

export interface ParsedCommand {
  intent: Intent;
  args: string[];
  original: string;
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  const parts = trimmed.split(" ");
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  let intent: Intent = "UNKNOWN";

  if (command.startsWith("/analyze") || command.includes("analyze")) {
    intent = "ANALYZE";
  } else if (command.startsWith("/create") || command.includes("create")) {
    intent = "CREATE";
  } else if (command.startsWith("/stats") || command.includes("stats")) {
    intent = "STATS";
  } else if (command.startsWith("/swap") || command.includes("swap")) {
    intent = "SWAP";
  } else if (command.startsWith("/help") || command.includes("help") || command.includes("hello") || command.includes("hi")) {
    intent = "HELP";
  }

  return {
    intent,
    args,
    original: input
  };
}

export async function processIntent(parsed: ParsedCommand): Promise<string> {
  // Simulate AI processing / Agent Logic
  // In a real app, this would call MoltBot API
  
  switch (parsed.intent) {
    case "ANALYZE":
      const token = parsed.args[0] || "ETH";
      return `Analyzing ${token}... 
      
      MoltBot Analysis:
      - Sentiment: Bullish 🟢
      - Volatility: High
      - Support: $2,400
      - Resistance: $2,600
      
      Recommendation: DCA in.`;
      
    case "CREATE":
      return "To create a coin, go to the 'Create' tab and fill out the form. I can help you generate a name if you want! Try '/analyze name-ideas'";
      
    case "STATS":
      return `Base Mainnet Stats:
      - Gas: 0.05 gwei
      - TPS: 35.2
      - Active Users: 2.1M
      
      Your Status:
      - Daily AI Usage: 1/500
      `;
      
    case "SWAP":
        return "Head to the Swap tab to trade tokens instantly via OpenOcean.";

    case "HELP":
      return "I'm MoltBot! 🤖\n\nCommands:\n/analyze <token>\n/create\n/swap\n/stats\n\nHow can I help you build on Base today?";
      
    default:
      return "I didn't understand that. Try /help for a list of commands.";
  }
}
