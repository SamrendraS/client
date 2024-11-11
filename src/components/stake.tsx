"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount, useBalance } from "@starknet-react/core";
import { Info } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    token: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  });

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
      form.clearErrors("stakeAmount");
    }
  };

  const onSubmit = async (values: FormValues) => {
    const { stakeAmount } = values;

    console.log(stakeAmount);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between px-6 py-2">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1 text-xs font-semibold text-[#8D9C9C]">
            APY
            <Info className="size-3 text-[#8D9C9C]" />
          </span>
          3.15%
        </p>
        <p className="flex items-center gap-2 text-xs font-semibold text-[#8D9C9C]">
          Total value locked
          <span>243,878.05 STRK</span>
          <span className="font-medium">| $656,022,939</span>
        </p>
      </div>

      <div className="flex items-center justify-between border-b bg-gradient-to-t from-[#E9F3F0] to-white px-5 py-20">
        <div className="flex items-center gap-4 text-2xl font-semibold text-black">
          <Icons.strkLogo />
          STRK
        </div>
        <div className="rounded-md bg-[#17876D] px-2 py-1 text-xs text-white">
          Current staked - 328 STRK
        </div>
      </div>

      <div className="flex w-full items-center gap-2 px-7 py-3">
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
                          className="h-fit border-none px-0 !text-3xl shadow-none outline-none placeholder:text-[#8D9C9C] focus-visible:ring-0"
                          placeholder="0.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 left-1 text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-[#8D9C9C]">
            <button
              onClick={() => handleQuickStakePrice(25)}
              className="rounded-md rounded-r-none border border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C]"
            >
              25%
            </button>
            <button
              onClick={() => handleQuickStakePrice(50)}
              className="border border-x-0 border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C]"
            >
              50%
            </button>
            <button
              onClick={() => handleQuickStakePrice(75)}
              className="border border-r-0 border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C]"
            >
              75%
            </button>
            <button
              onClick={() => handleQuickStakePrice(100)}
              className="rounded-md rounded-l-none border border-[#8D9C9C33] px-2 py-1 text-xs font-semibold text-[#8D9C9C]"
            >
              Max
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#8D9C9C]">
            <Icons.wallet className="size-5" />
            Balance:{" "}
            {data?.formatted ? Number(data?.formatted).toFixed(2) : "0"} STRK
          </div>
        </div>
      </div>

      <div className="mt-7 space-y-3 px-7">
        <div className="flex items-center justify-between rounded-md bg-[#17876D1A] px-3 py-2 text-sm font-medium text-[#939494]">
          You will get
          <span>
            {form.watch("stakeAmount")
              ? (Number(form.watch("stakeAmount")) * 0.9848).toFixed(2)
              : 0}{" "}
            xSTRK
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md bg-[#17876D1A] px-3 py-2 text-sm font-medium text-[#939494]">
          Exchange rate
          <span>1 STRK = 0.9848 xSTRK</span>
        </div>
      </div>

      <div className="mt-8 px-5">
        <Button className="w-full rounded-2xl bg-[#03624C4D] py-6 text-sm font-semibold text-[#17876D] hover:bg-[#03624C4D]">
          Stake
        </Button>
      </div>
    </div>
  );
};

export default Stake;
