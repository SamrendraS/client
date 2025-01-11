import { Quote, QuoteRequest, fetchQuotes, executeSwap } from "@avnu/avnu-sdk";
import { AccountInterface } from "starknet";

const AVNU_OPTIONS = { 
  baseUrl: process.env.NEXT_PUBLIC_CHAIN_ID === "SN_MAIN" 
    ? "https://api.avnu.fi" 
    : "https://sepolia.api.avnu.fi"
};

const XSTRK_TOKEN = "0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a";
const STRK_TOKEN = "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

export async function getAvnuQuotes(amount: string, takerAddress: string): Promise<Quote[]> {
  try {
    const params: QuoteRequest = {
      sellTokenAddress: XSTRK_TOKEN,
      buyTokenAddress: STRK_TOKEN,
      sellAmount: BigInt(Math.floor(Number(amount) * 1e18)),
      takerAddress,
      size: 1
    };

    return await fetchQuotes(params);
  } catch (error) {
    console.error("Error fetching Avnu quotes:", error);
    return [];
  }
}

export async function executeAvnuSwap(
  account: AccountInterface,
  quote: Quote,
  onSuccess?: () => void,
  onError?: (error: Error) => void
) {
  try {
    const response = await executeSwap(account, quote, {}, AVNU_OPTIONS);
    onSuccess?.();
    return response;
  } catch (error) {
    console.error("Error executing Avnu swap:", error);
    onError?.(error as Error);
    throw error;
  }
} 