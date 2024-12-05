"use client";

import { useAccount, useSendTransaction } from "@starknet-react/core";
import { useAtomValue } from "jotai";
import { Info } from "lucide-react";
import { Figtree, Inter } from "next/font/google";
import { Contract, uint256 } from "starknet";

import erc4626Abi from "@/abi/erc4626.abi.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { STRK_TOKEN } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { cn, formatNumberWithCommas } from "@/lib/utils";
import { providerAtom } from "@/store/common.store";
import {
  exchangeRateAtom,
  getLSTContract,
  getNstSTRKContract,
  nstStrkWithdrawalFeeAtom,
  userNstSTRKBalanceAtom,
} from "@/store/lst.store";

import React from "react";
import { Icons } from "./Icons";

const font = Figtree({ subsets: ["latin-ext"] });
const fontInter = Inter({ subsets: ["latin-ext"] });

const MigrateNostra = () => {
  const { address } = useAccount();
  const { sendAsync } = useSendTransaction({});

  const rpcProvider = useAtomValue(providerAtom);
  const nstStrkBalance = useAtomValue(userNstSTRKBalanceAtom);
  const nstStrkWithdrawal = useAtomValue(nstStrkWithdrawalFeeAtom);
  const exchangeRate = useAtomValue(exchangeRateAtom);

  const nstStrkWithdrawalFee = parseFloat(
    nstStrkWithdrawal.value.toEtherToFixedDecimals(4),
  );
  const youWillStakeFull = nstStrkBalance.value.operate(
    "multipliedBy",
    1 - nstStrkWithdrawalFee,
  );
  const youWillStake = youWillStakeFull.toEtherToFixedDecimals(4);

  const handleMigrateToEndur = async () => {
    if (!address) {
      return toast({
        description: (
          <div className="flex items-center gap-2">
            <Info className="size-5" />
            Please connect your wallet
          </div>
        ),
      });
    }

    if (!rpcProvider) return;

    const lstContract = getLSTContract(rpcProvider);
    const nstContract = getNstSTRKContract(rpcProvider);
    const strkContract = new Contract(erc4626Abi, STRK_TOKEN);

    const call1 = nstContract.populate("redeem", [
      uint256.bnToUint256(nstStrkBalance.value.toString()),
      address,
      address,
    ]);

    const call2 = strkContract.populate("approve", [
      lstContract.address,
      uint256.bnToUint256(youWillStakeFull.toString()),
    ]);

    const call3 = lstContract.populate("deposit", [
      uint256.bnToUint256(youWillStakeFull.toString()),
      address,
    ]);

    await sendAsync([call1, call2, call3]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-md bg-[#16876C] px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[#1b5649]">
          <Icons.migrate />
          Migrate Nostra STRK
        </button>
      </DialogTrigger>
      <DialogContent
        className={cn(font.className, "px-8 pb-8 pt-12 sm:max-w-[668px]")}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#0B453A]">
            Migrate your Nostra staked STRK to Endur
          </DialogTitle>
          <DialogDescription className="!mt-3.5 text-base font-normal text-[#8D9C9C]">
            Nostra is retiring soon. Easily migrate your staked STRK to Endur,
            and earn more with xSTRK
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-between rounded-md bg-[#E8F3F0] px-3 py-3.5 text-[#17876D]">
          <span>Current staked STRK on Nostra</span>
          <span>
            {formatNumberWithCommas(
              nstStrkBalance.value.toEtherToFixedDecimals(4),
            )}{" "}
            STRK
          </span>
        </div>

        <div className="mt-3">
          <p className="text-base text-[#8D9C9C]">If transferred to Endur.fi</p>
          <div className="mt-1 flex flex-col rounded-md bg-[#E8F3F0] px-3 py-3.5 text-[#17876D]">
            <div className="flex items-center justify-between">
              <span>You will stake</span>
              <span>{formatNumberWithCommas(youWillStake, 4)} STRK</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span>You will receive</span>
              <span>
                {exchangeRate.rate !== 0
                  ? formatNumberWithCommas(
                      (Number(youWillStake) / exchangeRate.rate).toFixed(4),
                    )
                  : formatNumberWithCommas(youWillStake, 4)}{" "}
                xSTRK
              </span>
            </div>
          </div>
        </div>

        <button
          className={cn(
            fontInter.className,
            "mx-auto mt-4 flex w-fit items-center gap-2 rounded-lg bg-[#1b5649] px-5 py-3 text-sm font-medium text-white transition-all",
          )}
          onClick={() => handleMigrateToEndur()}
        >
          <Icons.migrate />
          Migrate to Endur
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MigrateNostra;
