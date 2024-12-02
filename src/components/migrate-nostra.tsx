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
  getLSTContract,
  getNstSTRKContract,
  nstStrkWithdrawalFeeAtom,
  userNstSTRKBalanceAtom,
} from "@/store/lst.store";

import MyNumber from "@/lib/MyNumber";
import React from "react";
import { Icons } from "./Icons";

const font = Figtree({ subsets: ["latin-ext"] });
const fontInter = Inter({ subsets: ["latin-ext"] });

const MigrateNostra = () => {
  const [youWillReceive, setYouWillReceive] = React.useState(0);

  const { address } = useAccount();
  const { sendAsync, data, error } = useSendTransaction({});

  const rpcProvider = useAtomValue(providerAtom);
  const nstStrkBalance = useAtomValue(userNstSTRKBalanceAtom);
  const nstStrkWithdrawal = useAtomValue(nstStrkWithdrawalFeeAtom);

  const currentStakedOnNostra =
    parseFloat(nstStrkBalance.value.toEtherStr()) - 0.01;
  const nstStrkWithdrawalFee = parseFloat(nstStrkWithdrawal.value.toEtherStr());
  const youWillStake = currentStakedOnNostra * (1 - nstStrkWithdrawalFee);

  console.log(currentStakedOnNostra, "current staked");
  console.log(nstStrkWithdrawalFee, "withdrawal fee");

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
      MyNumber.fromEther(currentStakedOnNostra.toString(), 18),
      address,
      address,
    ]);

    const call2 = strkContract.populate("approve", [
      lstContract.address,
      MyNumber.fromEther(youWillStake.toString(), 18),
    ]);

    const call3 = lstContract.populate("deposit", [
      MyNumber.fromEther(youWillStake.toString(), 18),
      address,
    ]);

    await sendAsync([call1, call2, call3]);
  };

  React.useEffect(() => {
    (async () => {
      if (!rpcProvider) return;

      const lstContract = getLSTContract(rpcProvider);

      const balance = await lstContract.call("convert_to_shares", [
        uint256.bnToUint256((youWillStake.toString(), 18)),
      ]);

      console.log(Number(balance), "huehue");

      setYouWillReceive(Number(balance));
    })();
  }, [rpcProvider, youWillStake]);

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
          <span>{formatNumberWithCommas(currentStakedOnNostra)} STRK</span>
        </div>

        <div className="mt-3">
          <p className="text-base text-[#8D9C9C]">If transferred to Endur.fi</p>
          <div className="mt-1 flex flex-col rounded-md bg-[#E8F3F0] px-3 py-3.5 text-[#17876D]">
            <div className="flex items-center justify-between">
              <span>You will stake</span>
              <span>{formatNumberWithCommas(youWillStake)} STRK</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span>You will receive</span>
              <span>{youWillReceive} xSTRK</span>
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
