import { atomWithQuery } from "jotai-tanstack-query";
import { currentBlockAtom, providerAtom } from "./common.store";
import { Contract } from "starknet";
import MyNumber from "@/lib/MyNumber";
import StakingAbi from "@/abi/staking.abi.json";
import MintingAbi from "@/abi/minting.abi.json";
import {
  SN_MINTING_CURVE_ADRESS,
  SN_STAKING_ADRESS,
  STRK_DECIMALS,
} from "../../constants";
import { atom } from "jotai";

const snTotalStakedQueryAtom = atomWithQuery((get) => {
  return {
    queryKey: ["snTotalStaked", get(currentBlockAtom)],
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
    queryKey: ["yearlyMinting", get(currentBlockAtom)],
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
  console.log(
    "snAPYAtom",
    yearlyMintRes.value.toEtherStr(),
    totalStakedRes.value.toEtherStr(),
  );

  let value = 0;
  if (!totalStakedRes.value.isZero()) {
    value =
      Number(yearlyMintRes.value.toEtherToFixedDecimals(4)) /
      Number(totalStakedRes.value.toEtherToFixedDecimals(4));
  }
  return {
    value,
    isLoading: yearlyMintRes.isLoading || totalStakedRes.isLoading,
    error: yearlyMintRes.error || totalStakedRes.error,
  };
});
