import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY ?? "HuZ2UqxWJM9Lc9BWERNTZl4jYu5Zfb5yNi6sEPjzRSNic6weIGNPc9B2v3tOGVbw",
  authentication: {
    domain: process.env.APP_DOMAIN ?? "amazing.finance",
    uri: process.env.NEXTAUTH_URL ?? "https://localhost:3000",
    timeout: 120,
  },
});