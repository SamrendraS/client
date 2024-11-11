'use client';

import React from 'react';

import Link from 'next/link';
import { Icons } from './Icons';
import Stake from './stake';
import {
  Tabs as ShadCNTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import Unstake from './unstake';
import Withdraw from './withdraw';

const Tabs: React.FC = () => {
  const [tabs, setTabs] = React.useState('unstake');

  return (
    <>
      <div className="h-[37rem] -ml-40 mt-12 w-full max-w-xl bg-white shadow-xl rounded-xl">
        <ShadCNTabs
          onValueChange={(value) => setTabs(value)}
          value={tabs}
          defaultValue="stake"
          className="col-span-2 mt-4 h-full w-full lg:mt-0"
        >
          <TabsList className="w-full px-3 flex items-center justify-start bg-transparent pt-8 pb-5 border-b rounded-none">
            <TabsTrigger
              value="stake"
              className="group data-[state=active]:border-t-0 data-[state=active]:shadow-none text-[#8D9C9C] font-medium text-base bg-transparent rounded-none relative border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Stake
              <div className="absolute -bottom-[5.5px] left-3 rounded-full bg-black w-10 h-[2px] hidden group-data-[state=active]:flex" />
            </TabsTrigger>
            <TabsTrigger
              value="unstake"
              className="group data-[state=active]:border-t-0 data-[state=active]:shadow-none text-[#8D9C9C] font-medium text-base bg-transparent rounded-none relative border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Unstake
              <div className="absolute -bottom-[5.5px] left-3.5 rounded-full bg-black w-[3.3rem] h-[2px] hidden group-data-[state=active]:flex" />
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="group data-[state=active]:border-t-0 data-[state=active]:shadow-none text-[#8D9C9C] font-medium text-base bg-transparent rounded-none relative border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Withdraw log
              <div className="absolute -bottom-[5.5px] left-[16px] rounded-full bg-black w-[3.8rem] h-[2px] hidden group-data-[state=active]:flex" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="h-[20%]">
            <Stake />
          </TabsContent>

          <TabsContent value="unstake" className="">
            <Unstake />
          </TabsContent>

          <TabsContent value="withdraw" className="">
            <Withdraw />
          </TabsContent>
        </ShadCNTabs>
      </div>

      {tabs === 'stake' && (
        <p className="text-[#707D7D] mt-8 -ml-40 flex items-center text-sm">
          From the teams of{' '}
          <Link
            href="https://strkfarm.xyz"
            target="_blank"
            className="font-semibold hover:underline cursor-pointer mx-1"
          >
            STRKFarm
          </Link>{' '}
          and{' '}
          <Link
            href="https://karnot.xyz"
            target="_blank"
            className="font-semibold hover:underline cursor-pointer mx-1"
          >
            Karnot
          </Link>
        </p>
      )}

      {tabs === 'unstake' && (
        <p className="mt-8 -ml-40 flex items-center text-sm bg-[#FFC4664D] rounded-md px-3 py-3 text-[#D69733] max-w-xl">
          <div className="bg-[#D69733] size-6 rounded-full mr-2 shrink-0" />
          Unstake requests are based on Withdrawal Queue. It can take up to 1 to
          21 days. Learn more.
        </p>
      )}
    </>
  );
};

export default Tabs;
