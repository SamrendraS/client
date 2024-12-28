import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

interface QuoteData {
  quoteId: string;
  sellTokenAddress: string;
  sellAmount: string;
  sellAmountInUsd: number;
  buyTokenAddress: string;
  buyAmount: string;
  buyAmountInUsd: number;
  buyAmountWithoutFees: string;
  buyAmountWithoutFeesInUsd: number;
  estimatedAmount: boolean;
  chainId: string;
  blockNumber: string;
  expiry: null;
  routes: Array<{
    name: string;
    address: string;
    percent: number;
    sellTokenAddress: string;
    buyTokenAddress: string;
    routeInfo: {
      token0: string;
      token1: string;
      fee: string;
      tickSpacing: string;
      extension: string;
    };
    routes: any[];
  }>;
  gasFees: string;
  gasFeesInUsd: number;
  avnuFees: string;
  avnuFeesInUsd: number;
  avnuFeesBps: string;
  integratorFees: string;
  integratorFeesInUsd: number;
  integratorFeesBps: string;
  priceRatioUsd: number;
  liquiditySource: string;
  sellTokenPriceInUsd: number;
  buyTokenPriceInUsd: number;
  gasless: {
    active: boolean;
    gasTokenPrices: Array<{
      tokenAddress: string;
      gasFeesInGasToken: string;
      gasFeesInUsd: number;
    }>;
  };
  exactTokenTo: boolean;
}

interface ApiResponse {
  quotes: QuoteData[];
  prices: any[];
}

const fetchDEXRatio = async (): Promise<number> => {
  const response = await fetch('https://starknet.api.avnu.fi/internal/swap/quotes-with-prices?sellTokenAddress=0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a&buyTokenAddress=0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&sellAmount=0x3635c9adc5dea00000&takerAddress=0x06058fd211ebc489b5f5fa98d92354a4be295ff007b211f72478702a6830c21f&size=3&integratorName=AVNU%20Portal');

  if (!response.ok) {
    throw new Error('Failed to fetch DEX ratio');
  }

  const data: ApiResponse = await response.json();
  if (data.quotes.length > 0) {
    const quote = data.quotes[0];
    const sellAmount = BigInt(quote.sellAmount);
    const buyAmount = BigInt(quote.buyAmount);
    return Number(buyAmount) / Number(sellAmount);
  }
  
  return 0;
};

export const dexRatioQueryAtom = atomWithQuery(() => ({
  queryKey: ['dexRatio'],
  queryFn: fetchDEXRatio,
  refetchInterval: 30000, // Refetch every 30 seconds
}));

export const dexRatioAtom = atom((get) => {
  const { data, error } = get(dexRatioQueryAtom);
  return {
    value: error || !data ? 0 : data,
    error,
    isLoading: !data && !error,
  };
});
