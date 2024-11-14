import { Provider } from "starknet";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

export const providerAtom = atom<Provider | null>(null);

export const currentBlockAtom = atom(async (get) => {
  const provider = get(providerAtom);

  // plus 1 to represent pending block
  return provider ? (await provider.getBlockNumber()) + 1 : 0;
});

export const userAddressAtom = atom<string | undefined>();

export const strkPriceAtom = atomWithQuery((get) => {
  return {
    queryKey: ["strkPrice"],
    queryFn: async ({ queryKey }: any): Promise<number> => {
      try {
        const data = await fetch("https://app.strkfarm.xyz/api/price/STRK");
        const { price } = await data.json();
        return price;
      } catch (error) {
        console.error("strkPriceAtom", error);
        return 0;
      }
    },
    refetchInterval: 60000,
  };
});
