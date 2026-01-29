import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID; // Client ID for public client
const secretKey = process.env.THIRDWEB_SECRET_KEY; // Secret for server-side

if (!clientId) {
  throw new Error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID");
}

export const client = createThirdwebClient(
  secretKey 
    ? { secretKey } 
    : { clientId }
);

export const chain = base;
