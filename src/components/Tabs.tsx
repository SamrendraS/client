"use client";

import React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
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
            className="h-[89%] overflow-y-auto px-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <WithdrawLog />
          </TabsContent>
        </ShadCNTabs>
      </div>

      {tabs === "stake" && (
        <p
          className={cn(
            "mt-8 flex items-center text-xs text-[#707D7D] lg:text-sm",
            {
              "lg:-ml-36": open,
              "lg:-ml-24": !open,
            },
          )}
        >
          From the teams of{" "}
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
      )}

      {tabs === "unstake" && (
        <p
          className={cn(
            "mt-8 flex max-w-xl items-center rounded-md bg-[#FFC4664D] px-3 py-3 text-xs text-[#D69733] lg:text-sm",
            {
              "lg:-ml-36": open,
              "lg:-ml-24": !open,
            },
          )}
        >
          <div className="mr-2 size-4 shrink-0 rounded-full bg-[#D69733] lg:size-6" />
          <p>
            Unstake requests are placed in a Withdrawal Queue, with STRK
            available in 1 to 21 days due to Starknet{"'"}s staking mechanics.{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://docs.starknet.io/staking/overview/#economic_parameters"
              target="_blank"
            >
              Learn more.
            </a>
          </p>
        </p>
      )}
    </>
  );
};

export default Tabs;
