"use client";

import erc4626Abi from "@/abi/erc4626.abi.json";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAccount,
  useBalance,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
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
import { Contract, RpcProvider } from "starknet";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const formSchema = z.object({
  unstakeAmount: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid input" },
  ),
});

export type FormValues = z.infer<typeof formSchema>;

const Unstake = () => {
  const { address } = useAccount();

  const { data } = useBalance({
    address,
    token: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  });

  const { data: balance } = useReadContract({
    abi: erc4626Abi,
    functionName: "balance_of",
    address:
      "0x042de5b868da876768213c48019b8d46cd484e66013ae3275f8a4b97b31fc7eb",
    args: [address],
  });

  console.log(balance);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      unstakeAmount: "",
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
        "unstakeAmount",
        ((Number(data?.formatted) * percentage) / 100).toString(),
      );
      form.clearErrors("unstakeAmount");
    }
  };

  const provider = new RpcProvider({
    nodeUrl:
      "https://starknet-sepolia.infura.io/v3/b76d478d59eb4ba4ba86f39fd728f932",
  });

  const contract = new Contract(
    erc4626Abi,
    "0x42de5b868da876768213c48019b8d46cd484e66013ae3275f8a4b97b31fc7eb",
    provider,
  );

  // const call1 = React.useMemo(() => {
  //   return contract.populate("approve", [
  //     "0x0129e54aab55fa4b180aa1ed56d13686d4347fc2cb0f2fb23604621526bf498d",

  //     uint256.bnToUint256(
  //       (Number(form.getValues("unstakeAmount")) * 1.5 * 10 ** 18).toFixed(0),
  //     ),
  //   ]);
  // }, [form]);

  // const call2 = React.useMemo(() => {
  //   return contract.populate("redeem", [
  //     "0x0129e54aab55fa4b180aa1ed56d13686d4347fc2cb0f2fb23604621526bf498d",

  //     uint256.bnToUint256(
  //       (Number(form.getValues("unstakeAmount")) * 1.5 * 10 ** 18).toFixed(0),
  //     ),
  //   ]);
  // }, [form]);

  const { sendAsync } = useSendTransaction({
    // calls: [call1, call2],
  });

  const onSubmit = async (values: FormValues) => {
    const { unstakeAmount } = values;

    const res = sendAsync();

    console.log(res);

    console.log(unstakeAmount);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between border-b bg-gradient-to-t from-[#E9F3F0] to-white px-5 py-12">
        <div className="flex items-center gap-4 text-2xl font-semibold text-black">
          <Icons.strkLogo />
          STRK
        </div>
        <div className="rounded-md bg-[#17876D] px-2 py-1 text-xs text-white">
          Current staked - {Number(balance)} STRK
        </div>
      </div>

      <div className="flex w-full items-center gap-2 px-7 py-3">
        <div className="flex flex-1 flex-col items-start">
          <p className="text-xs text-[#8D9C9C]">Enter Amount (xSTRK)</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="unstakeAmount"
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
        </div>
      </div>

      <div className="mt-[2.75rem] space-y-3 px-7">
        <div className="flex items-center justify-between rounded-md bg-[#17876D1A] px-3 py-2 text-sm font-medium text-[#939494]">
          You will get
          <span>
            {form.watch("unstakeAmount")
              ? (Number(form.watch("unstakeAmount")) * 0.9848).toFixed(2)
              : 0}{" "}
            xSTRK
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md bg-[#17876D1A] px-3 py-2 text-sm font-medium text-[#939494]">
          Exchange rate
          <span>1 STRK = 0.9848 xSTRK</span>
        </div>
      </div>

      <div className="mt-28 px-5">
        <Button
          type="submit"
          className="w-full rounded-2xl bg-[#03624C4D] py-6 text-sm font-semibold text-[#17876D] hover:bg-[#03624C4D]"
        >
          Unstake
        </Button>
      </div>
    </div>
  );
};

export default Unstake;
