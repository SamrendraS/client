import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

const XSTRK_TOKEN = '0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a';
const STRK_TOKEN = '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
const QUOTE_REFRESH_INTERVAL = 10000;

export const formatAmountForQuery = (amount: string) => {
  try {
    const amountInWei = BigInt(Math.floor(Number(amount) * 1e18));
    return {
      decimal: amountInWei.toString(),
      hex: `0x${amountInWei.toString(16)}`,
    };
  } catch (error) {
    console.error('Error formatting amount:', error);
    return null;
  }
};

export const fetchRate = async (amount: string): Promise<number> => {
  const formattedAmount = formatAmountForQuery(amount);
  if (!formattedAmount) return 0;

  try {
    const response = await fetch(
      `https://starknet.api.avnu.fi/internal/swap/quotes-with-prices?` +
      `sellTokenAddress=${XSTRK_TOKEN}&` +
      `buyTokenAddress=${STRK_TOKEN}&` +
      `sellAmount=${formattedAmount.hex}`
    );

    if (!response.ok) throw new Error('AVNU API error');

    const data = await response.json();
    if (data.quotes.length === 0) return 0;

    const quote = data.quotes[0];
    const sellAmount = BigInt(quote.sellAmount);
    const buyAmount = BigInt(quote.buyAmount);
    
    return Number(buyAmount) / Number(sellAmount);
  } catch (error) {
    console.error('AVNU fetch error:', error);
    return 0;
  }
};

export const amountAtom = atom<string>('0');

export const rateAtom = atomWithQuery((get) => ({
  queryKey: ['rate', get(amountAtom)],
  queryFn: () => fetchRate(get(amountAtom)),
  refetchInterval: QUOTE_REFRESH_INTERVAL,
  enabled: Number(get(amountAtom)) > 0,
}));