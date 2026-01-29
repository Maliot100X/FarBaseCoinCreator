import { createThirdwebClient, ThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

// Lazy initialization to avoid build-time errors
let _client: ThirdwebClient | null = null;

export function getClient(): ThirdwebClient {
  if (_client) return _client;

  if (!clientId) {
    throw new Error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID environment variable");
  }

  _client = createThirdwebClient(
    secretKey
      ? { secretKey }
      : { clientId }
  );

  return _client;
}

// For backward compatibility - will throw at runtime if env var is missing
export const client = clientId
  ? createThirdwebClient(secretKey ? { secretKey } : { clientId })
  : (null as unknown as ThirdwebClient);

export const chain = base;
