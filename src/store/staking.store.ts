import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { Contract } from "starknet";

import MintingAbi from "@/abi/minting.abi.json";
import StakingAbi from "@/abi/staking.abi.json";
import MyNumber from "@/lib/MyNumber";

import {
  SN_MINTING_CURVE_ADRESS,
  SN_STAKING_ADRESS,
  STRK_DECIMALS,
} from "@/constants";
import { currentBlockAtom, providerAtom } from "./common.store";

const snTotalStakedQueryAtom = atomWithQuery((get) => {
  return {
    queryKey: ["snTotalStaked", get(currentBlockAtom), get(providerAtom)],
    queryFn: async ({ queryKey }: any) => {
      const provider = get(providerAtom);
      if (!provider) {
        return MyNumber.fromZero();
      }
      const stakingContract = new Contract(
        StakingAbi,
        SN_STAKING_ADRESS,
        provider,
      );
      try {
        const totalStaked = await stakingContract.call("get_total_stake");
        return new MyNumber(totalStaked.toString(), STRK_DECIMALS);
      } catch (error) {
        console.error("snTotalStakedQueryAtom", error);
        return MyNumber.fromZero();
      }
    },
    refetchInterval: 60000,
  };
});

export const snTotalStakedAtom = atom((get) => {
  const { data, error } = get(snTotalStakedQueryAtom);
  return {
    value: error || !data ? MyNumber.fromZero() : data,
    error,
    isLoading: !data && !error,
  };
});

export const yearlyMintingQueryAtom = atomWithQuery((get) => {
  return {
    queryKey: ["yearlyMinting", get(currentBlockAtom), get(providerAtom)],
    queryFn: async ({ queryKey }: any) => {
      const provider = get(providerAtom);
      if (!provider) {
        return MyNumber.fromZero();
      }
      const mintingContract = new Contract(
        MintingAbi,
        SN_MINTING_CURVE_ADRESS,
        provider,
      );
      try {
        const yearlyMinting = await mintingContract.call("yearly_mint");
        return new MyNumber(yearlyMinting.toString(), STRK_DECIMALS);
      } catch (error) {
        console.error("yearlyMintingQueryAtom", error);
        return MyNumber.fromZero();
      }
    },
    refetchInterval: 60000,
  };
});

export const yearlyMintingAtom = atom((get) => {
  const { data, error } = get(yearlyMintingQueryAtom);
  return {
    value: error || !data ? MyNumber.fromZero() : data,
    error,
    isLoading: !data && !error,
  };
});

export const snAPYAtom = atom((get) => {
  const yearlyMintRes = get(yearlyMintingAtom);
  const totalStakedRes = get(snTotalStakedAtom);

  let value = 0;
  if (!totalStakedRes.value.isZero()) {
    value =
      Number(yearlyMintRes.value.toEtherToFixedDecimals(4)) /
      Number(totalStakedRes.value.toEtherToFixedDecimals(4));
  }

  const newValue = (1 + value / 365) ** 365 - 1;

  return {
    value: newValue,
    isLoading: yearlyMintRes.isLoading || totalStakedRes.isLoading,
    error: yearlyMintRes.error || totalStakedRes.error,
  };
});
