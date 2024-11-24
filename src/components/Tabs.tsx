"use client";

import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import Stake from "./stake";
import { useSidebar } from "./ui/sidebar";
import {
  Tabs as ShadCNTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import Unstake from "./unstake";
import WithdrawLog from "./withdraw-log";

const Tabs: React.FC = () => {
  const [tabs, setTabs] = React.useState("stake");
  const { open } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "mt-12 w-full max-w-xl rounded-xl bg-white shadow-xl lg:h-[37rem]",
          {
            "lg:-ml-36": open,
            "lg:-ml-24": !open,
          },
        )}
      >
        <ShadCNTabs
          onValueChange={(value) => setTabs(value)}
          value={tabs}
          defaultValue="stake"
          className="col-span-2 h-full w-full lg:mt-0"
        >
          <TabsList className="flex w-full items-center justify-start rounded-none border-b bg-transparent px-3 pb-5 pt-5 lg:pt-8">
            <TabsTrigger
              value="stake"
              className="group relative rounded-none border-none bg-transparent pl-0 text-sm font-medium text-[#8D9C9C] focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none lg:pl-3 lg:text-base"
            >
              Stake
              <div className="absolute -bottom-[7.5px] left-0 hidden h-[2px] w-10 rounded-full bg-black group-data-[state=active]:flex lg:-bottom-[5.5px] lg:left-3" />
            </TabsTrigger>
            <TabsTrigger
              value="unstake"
              className="group relative rounded-none border-none bg-transparent text-sm font-medium text-[#8D9C9C] focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none lg:text-base"
            >
              Unstake
              <div className="absolute -bottom-[7.5px] left-3 hidden h-[2px] w-[3.3rem] rounded-full bg-black group-data-[state=active]:flex lg:-bottom-[5.5px] lg:left-3.5" />
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="group relative rounded-none border-none bg-transparent text-sm font-medium text-[#8D9C9C] focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none lg:text-base"
            >
              Withdraw log
              <div className="absolute -bottom-[7.5px] left-3 hidden h-[2px] w-[5rem] rounded-full bg-black group-data-[state=active]:flex lg:-bottom-[5.5px] lg:left-[16px]" />
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="stake"
            className="h-[20%] pb-3 focus-visible:ring-0 focus-visible:ring-offset-0 lg:pb-0"
          >
            <Stake />
          </TabsContent>

          <TabsContent
            value="unstake"
            className="h-[20%] pb-3 focus-visible:ring-0 focus-visible:ring-offset-0 lg:pb-0"
          >
            <Unstake />
          </TabsContent>

          <TabsContent
            value="withdraw"
            className="min-h-[25rem] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-[89.6%]"
          >
            <WithdrawLog />
          </TabsContent>
        </ShadCNTabs>
      </div>

      {tabs === "unstake" && (
        <p
          className={cn(
            "mt-4 flex max-w-xl items-center rounded-md bg-[#FFC4664D] px-3 py-3 text-xs text-[#D69733] lg:text-sm",
            {
              "lg:-ml-36": open,
              "lg:-ml-24": !open,
            },
          )}
        >
          <div className="mr-3 flex size-4 shrink-0 items-center justify-center rounded-full text-xl lg:size-6">
            ⚠️
          </div>
          <p>
            Unstake requests go into a Withdrawal Queue and are processed when
            STRK is available. While instant unstaking isn{"'"}t possible due to
            staking design, the average wait time is about 2 days now but can
            take longer.{" "}
            <Link
              href="https://docs.starknet.io/staking/overview/#economic_parameters"
              target="_blank"
              className="underline"
            >
              Learn more.
            </Link>
          </p>
        </p>
      )}

      <p
        className={cn(
          "mt-8 flex items-center text-xs text-[#707D7D] lg:text-sm",
          {
            "lg:-ml-36": open,
            "lg:-ml-24": !open,
            "mt-4": tabs === "unstake",
          },
        )}
      >
        Made with 💙 by{" "}
        <Link
          href="https://strkfarm.xyz"
          target="_blank"
          className="mx-1 cursor-pointer font-semibold hover:underline"
        >
          STRKFarm
        </Link>{" "}
        and{" "}
        <Link
          href="https://karnot.xyz"
          target="_blank"
          className="mx-1 cursor-pointer font-semibold hover:underline"
        >
          Karnot
        </Link>
      </p>
    </>
  );
};

export default Tabs;
