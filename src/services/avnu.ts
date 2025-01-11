import { Quote, QuoteRequest, fetchQuotes, executeSwap } from "@avnu/avnu-sdk";
import { AccountInterface } from "starknet";

const XSTRK_TOKEN = "0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a";
const STRK_TOKEN = "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

interface CacheEntry {
  quotes: Quote[];
  timestamp: number;
}

const quoteCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5000; 

export async function getAvnuQuotes(amount: string, takerAddress: string): Promise<Quote[]> {
  const cacheKey = `${amount}-${takerAddress}`;
  const now = Date.now();
  
  const cachedEntry = quoteCache.get(cacheKey);
  if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION) {
    return cachedEntry.quotes;
  }

  try {
    const params: QuoteRequest = {
      sellTokenAddress: XSTRK_TOKEN,
      buyTokenAddress: STRK_TOKEN,
      sellAmount: BigInt(Math.floor(Number(amount) * 1e18)),
      takerAddress,
      size: 1
    };

    const quotes = await fetchQuotes(params);
    
    quoteCache.set(cacheKey, {
      quotes,
      timestamp: now
    });

    return quotes;
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
    const response = await executeSwap(account, quote);
    onSuccess?.();
    return response;
  } catch (error) {
    console.error("Error executing Avnu swap:", error);
    onError?.(error as Error);
    throw error;
  }
} 