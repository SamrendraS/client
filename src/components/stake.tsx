"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAccount,
  useBalance,
  useSendTransaction,
} from "@starknet-react/core";
import { Info } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Contract } from "starknet";
import * as z from "zod";

import erc4626Abi from "@/abi/erc4626.abi.json";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import MyNumber from "@/lib/MyNumber";

import { providerAtom } from "@/store/common.store";
import {
  exchangeRateAtom,
  totalStakedAtom,
  totalStakedUSDAtom,
  userSTRKBalanceAtom,
} from "@/store/lst.store";
import { useAtomValue } from "jotai";
import { STRK_TOKEN } from "../../constants";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { snAPYAtom } from "@/store/staking.store";

const formSchema = z.object({
  stakeAmount: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid input" },
  ),
});

export type FormValues = z.infer<typeof formSchema>;

const Stake = () => {
  const { address } = useAccount();

  const { data } = useBalance({
    address,
    token: STRK_TOKEN,
  });

  const currentStaked = useAtomValue(userSTRKBalanceAtom);
  const totalStaked = useAtomValue(totalStakedAtom);
  const exchangeRate = useAtomValue(exchangeRateAtom);
  const totalStakedUSD = useAtomValue(totalStakedUSDAtom);
  const provider = useAtomValue(providerAtom);
  const apy = useAtomValue(snAPYAtom);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      stakeAmount: "",
    },
    mode: "onChange",
  });

  const handleQuickStakePrice = (percentage: number) => {
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

    if (data) {
      form.setValue(
        "stakeAmount",
        ((Number(data?.formatted) * percentage) / 100).toString(),
      );
    }
  };

  const contractSTRK = new Contract(erc4626Abi, STRK_TOKEN);

  const contract = new Contract(
    erc4626Abi,
    process.env.NEXT_PUBLIC_LST_ADDRESS as string,
  );

  const { sendAsync } = useSendTransaction({});

  const onSubmit = async (values: FormValues) => {
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

    const call1 = contractSTRK.populate("approve", [
      contract.address,
      MyNumber.fromEther(values.stakeAmount, 18),
    ]);

    const call2 = contract.populate("deposit", [
      MyNumber.fromEther(values.stakeAmount, 18),
      address,
    ]);

    sendAsync([call1, call2]);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between px-3 py-2 lg:px-6">
        <p className="flex flex-col items-center text-xs font-semibold lg:flex-row lg:gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold text-[#3F6870] lg:text-[#8D9C9C]">
            APY
            <Info className="size-3 text-[#3F6870] lg:text-[#8D9C9C]" />
          </span>
          {(apy.value * 100).toFixed(2)}%
        </p>

        <div className="flex flex-col items-end gap-2 text-xs font-semibold text-[#3F6870] lg:flex-row lg:items-center lg:text-[#8D9C9C]">
          Total value locked
          <p className="flex items-center gap-2">
            <strong>{totalStaked.value.toEtherToFixedDecimals(2)} STRK</strong>
            <span className="font-medium">
              | ${totalStakedUSD.value.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b bg-gradient-to-t from-[#E9F3F0] to-white px-3 py-12 lg:px-5 lg:py-20">
        <div className="flex items-center gap-2 text-sm font-semibold text-black lg:gap-4 lg:text-2xl">
          <Icons.strkLogo className="size-6 lg:size-[35px]" />
          STRK
        </div>

        <div className="rounded-md bg-[#17876D] px-2 py-1 text-xs text-white">
          Current staked: {currentStaked.value.toEtherToFixedDecimals(2)} STRK
        </div>
      </div>

      <div className="flex w-full items-center px-7 py-3 lg:gap-2">
        <div className="flex flex-1 flex-col items-start">
          <p className="text-xs text-[#8D9C9C]">Enter Amount</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="stakeAmount"
                render={({ field }) => (
                  <FormItem className="relative space-y-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="h-fit border-none px-0 pr-1 text-2xl shadow-none outline-none placeholder:text-[#8D9C9C] focus-visible:ring-0 lg:pr-0 lg:!text-3xl"
                          placeholder="0.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 left-0 text-xs lg:left-1" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex flex-col items-end">
          <div className="hidden text-[#8D9C9C] lg:block">
            <button
              onClick={() => handleQuickStakePrice(25)}
              className="rounded-md rounded-r-none border border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C] transition-all hover:bg-[#8D9C9C33]"
            >
              25%
            </button>
            <button
              onClick={() => handleQuickStakePrice(50)}
              className="border border-x-0 border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C] transition-all hover:bg-[#8D9C9C33]"
            >
              50%
            </button>
            <button
              onClick={() => handleQuickStakePrice(75)}
              className="border border-r-0 border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C] transition-all hover:bg-[#8D9C9C33]"
            >
              75%
            </button>
            <button
              onClick={() => handleQuickStakePrice(100)}
              className="rounded-md rounded-l-none border border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C] transition-all hover:bg-[#8D9C9C33]"
            >
              Max
            </button>
          </div>

          <button
            onClick={() => handleQuickStakePrice(100)}
            className="rounded-md bg-[#BBE7E7] px-2 py-1 text-xs font-semibold text-[#215959] transition-all hover:bg-[#BBE7E7] hover:opacity-80 lg:hidden"
          >
            Max
          </button>

          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#8D9C9C] lg:text-sm">
            <Icons.wallet className="size-3 lg:size-5" />
            Balance:{" "}
            {data?.formatted ? Number(data?.formatted).toFixed(2) : "0"} STRK
          </div>
        </div>
      </div>

      <div className="mt-7 space-y-3 px-7">
        <div className="flex items-center justify-between rounded-md bg-[#17876D1A] px-3 py-2 text-xs font-medium text-[#939494] lg:text-sm">
          You will get
          <span>
            {form.watch("stakeAmount")
              ? (Number(form.watch("stakeAmount")) / exchangeRate.rate).toFixed(
                  2,
                )
              : 0}{" "}
            xSTRK
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md bg-[#17876D1A] px-3 py-2 text-xs font-medium text-[#939494] lg:text-sm">
          Exchange rate
          <span>1 xSTRK = {exchangeRate.rate.toFixed(4)} STRK</span>
        </div>
      </div>

      <div className="mt-8 px-5">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full rounded-2xl bg-[#03624C4D] py-6 text-sm font-semibold text-[#17876D] hover:bg-[#03624C4D]"
        >
          Stake
        </Button>
      </div>
    </div>
  );
};

export default Stake;
