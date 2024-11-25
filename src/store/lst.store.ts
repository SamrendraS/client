import erc4626Abi from "@/abi/erc4626.abi.json";
import MyNumber from "@/lib/MyNumber";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { Contract, RpcProvider, uint256 } from "starknet";
import { LST_ADDRRESS, STRK_DECIMALS } from "../../constants";
import {
  currentBlockAtom,
  providerAtom,
  strkPriceAtom,
  userAddressAtom,
} from "./common.store";

export function getLSTContract(provider: RpcProvider) {
  return new Contract(erc4626Abi, LST_ADDRRESS, provider);
}

const userXSTRKBalanceQueryAtom = atomWithQuery((get) => {
  return {
    // current block atom only to trigger a change when the block changes
    queryKey: ["userXSTRKBalance", get(currentBlockAtom), get(userAddressAtom)],
    queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
      const [, , userAddress] = queryKey;
      const provider = get(providerAtom);
      // console.log("userXSTRKBalanceAtom", provider, userAddress);
      if (!provider || !userAddress) {
        return MyNumber.fromZero();
      }
      try {
        const lstContract = getLSTContract(provider);
        const balance = await lstContract.call("balance_of", [userAddress]);
        // console.log("userXSTRKBalanceAtom [2]", balance.toString());
        return new MyNumber(balance.toString(), STRK_DECIMALS);
      } catch (error) {
        console.error("userXSTRKBalanceAtom [3]", error);
        return MyNumber.fromZero();
      }
    },
  };
});

export const userXSTRKBalanceAtom = atom((get) => {
  const { data, error } = get(userXSTRKBalanceQueryAtom);
  return {
    value: error || !data ? MyNumber.fromZero() : data,
    error,
    isLoading: !data && !error,
  };
});

export const userSTRKBalanceQueryAtom = atomWithQuery((get) => {
  return {
    queryKey: [
      "userSTRKBalance",
      get(currentBlockAtom),
      get(userAddressAtom),
      get(userXSTRKBalanceAtom),
    ],
    queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
      const { data, error } = get(userXSTRKBalanceQueryAtom);
      const provider = get(providerAtom);
      const userAddress = get(userAddressAtom);
      const xSTRKBalance = get(userXSTRKBalanceAtom);
      if (!provider || !userAddress || xSTRKBalance.value.isZero()) {
        return MyNumber.fromZero();
      }

      try {
        const lstContract = getLSTContract(provider);
        const balance = await lstContract.call("convert_to_assets", [
          uint256.bnToUint256(xSTRKBalance.value.toString()),
        ]);
        return new MyNumber(balance.toString(), STRK_DECIMALS);
      } catch (error) {
        console.error("userSTRKBalanceQueryAtom [3]", error);
        return MyNumber.fromZero();
      }
    },
  };
});

export const userSTRKBalanceAtom = atom((get) => {
  const { data, error } = get(userSTRKBalanceQueryAtom);
  return {
    value: error || !data ? MyNumber.fromZero() : data,
    error,
    isLoading: !data && !error,
  };
});

export const totalStakedQueryAtom = atomWithQuery((get) => {
  return {
    queryKey: ["totalStaked", get(currentBlockAtom)],
    queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
      const provider = get(providerAtom);
      if (!provider) {
        return MyNumber.fromZero();
      }

      try {
        const lstContract = getLSTContract(provider);
        const balance = await lstContract.call("total_assets");
        return new MyNumber(balance.toString(), STRK_DECIMALS);
      } catch (error) {
        console.error("totalStakedAtom [3]", error);
        return MyNumber.fromZero();
      }
    },
  };
});

export const totalStakedAtom = atom((get) => {
  const { data, error } = get(totalStakedQueryAtom);
  return {
    value: error || !data ? MyNumber.fromZero() : data,
    error,
    isLoading: !data && !error,
  };
});

export const totalSupplyQueryAtom = atomWithQuery((get) => {
  return {
    queryKey: ["totalSupply", get(currentBlockAtom)],
    queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
      const provider = get(providerAtom);
      if (!provider) {
        return MyNumber.fromZero();
      }

      try {
        const lstContract = getLSTContract(provider);
        const balance = await lstContract.call("total_supply");
        return new MyNumber(balance.toString(), STRK_DECIMALS);
      } catch (error) {
        console.error("totalSupplyAtom [3]", error);
        return MyNumber.fromZero();
      }
    },
  };
});

export const totalSupplyAtom = atom((get) => {
  const { data, error } = get(totalSupplyQueryAtom);
  return {
    value: error || !data ? MyNumber.fromZero() : data,
    error,
    isLoading: !data && !error,
  };
});

export const exchangeRateAtom = atom((get) => {
  const totalStaked = get(totalStakedAtom);
  const totalSupply = get(totalSupplyAtom);
  if (totalSupply.value.isZero()) {
    // return ex rate as zero
    // Note: Technically it should be one, but
    // here we assume that if its zero, something wrong
    // in our requests and return 0 to avoid any user side confusion
    return {
      rate: 0,
      isLoading: totalStaked.isLoading || totalSupply.isLoading,
    };
  }
  return {
    rate:
      Number(totalStaked.value.toEtherStr()) /
      Number(totalSupply.value.toEtherStr()),
    isLoading: totalStaked.isLoading || totalSupply.isLoading,
  };
});

export const totalStakedUSDAtom = atom((get) => {
  const { data: price, isLoading: isPriceLoading } = get(strkPriceAtom);
  const totalStaked = get(totalStakedAtom);
  const isLoading = totalStaked.isLoading || isPriceLoading;
  if (!price)
    return {
      value: 0,
      isLoading,
    };

  return {
    value: Number(totalStaked.value.toEtherToFixedDecimals(4)) * price || 0,
    isLoading,
  };
});
