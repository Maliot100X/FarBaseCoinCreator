import { createThirdwebClient, ThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

// Get env vars
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

// Lazy client creation to avoid build-time errors
let _client: ThirdwebClient | null = null;

export function getClient(): ThirdwebClient {
  if (_client) return _client;

  if (!clientId) {
    console.error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID - check your Vercel environment variables");
    // Return a placeholder that will fail at runtime but not break build
    throw new Error("Thirdweb client ID not configured. Please add NEXT_PUBLIC_THIRDWEB_CLIENT_ID to Vercel environment variables.");
  }

  _client = createThirdwebClient(
    secretKey
      ? { secretKey }
      : { clientId }
  );

  return _client;
}

// For backward compatibility - uses lazy initialization
export const client = (() => {
  try {
    if (clientId) {
      return createThirdwebClient(
        secretKey ? { secretKey } : { clientId }
      );
    }
    // During build, return a mock that will be replaced at runtime
    return createThirdwebClient({ clientId: "build-placeholder" });
  } catch (e) {
    // During build without env vars
    return createThirdwebClient({ clientId: "build-placeholder" });
  }
})();

// Export chain for consistency
export const chain = base;
