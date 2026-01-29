import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/utils/constants';

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://farbasecoincreator.vercel.app';

  const config = {
    "accountAssociation": {
      // TODO: These values must be generated using a wallet that owns the FID
      // See: https://docs.farcaster.xyz/learn/frames/spec#account-association
      "header": "eyJmaWQiOjEwMDAwLCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4... (Replace with real header)",
      "payload": "eyJkb21haW4iOiJleGFtcGxlLmNvbSJ9... (Replace with real payload)",
      "signature": "0x... (Replace with real signature)"
    },
    "frame": {
      "version": "1",
      "name": APP_CONFIG.name,
      "iconUrl": `${appUrl}/icon.png`,
      "homeUrl": appUrl,
      "imageUrl": `${appUrl}/og-image.png`,
      "buttonTitle": "Launch App",
      "splashImageUrl": `${appUrl}/splash.png`,
      "splashBackgroundColor": "#000000",
      "webhookUrl": `${appUrl}/api/webhook`
    }
  };

  return NextResponse.json(config);
}
