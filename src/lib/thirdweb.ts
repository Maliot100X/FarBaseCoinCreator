import { createThirdwebClient, ThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

// Create client - required for thirdweb components
function createClient(): ThirdwebClient {
  if (!clientId) {
    throw new Error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID environment variable. Please add it to your .env file.");
  }

  return createThirdwebClient(
    secretKey
      ? { secretKey }
      : { clientId }
  );
}

// Export client instance
export const client = createClient();

// Export chain for consistency
export const chain = base;
