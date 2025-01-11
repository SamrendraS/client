import { LST_ADDRRESS, RECEPIEINT_FEE_ADDRESS, STRK_TOKEN } from "@/constants";
import { Quote, QuoteRequest, fetchQuotes, executeSwap } from "@avnu/avnu-sdk";
import { AccountInterface } from "starknet";

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
      sellTokenAddress: LST_ADDRRESS,
      buyTokenAddress: STRK_TOKEN,
      sellAmount: BigInt(Math.floor(Number(amount) * 1e18)),
      takerAddress,
      size: 1,
      integratorFees: BigInt(3),
      integratorFeeRecipient: RECEPIEINT_FEE_ADDRESS,
      integratorName: "Endur"
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