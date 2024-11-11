import { Info } from 'lucide-react';
import React from 'react';

import { Icons } from './Icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Stake = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between px-6 py-2">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-[#8D9C9C] font-semibold text-xs flex items-center gap-1">
            APY
            <Info className="size-3 text-[#8D9C9C]" />
          </span>
          3.15%
        </p>
        <p className="text-xs font-semibold text-[#8D9C9C] flex items-center gap-2">
          Total value locked
          <span>243,878.05 STRK</span>
          <span className="font-medium">| $656,022,939</span>
        </p>
      </div>

      <div className="py-20 flex items-center justify-between px-5 border-b">
        <div className="flex items-center gap-4 text-2xl text-black font-semibold">
          <Icons.strkLogo />
          STRK
        </div>
        <div className="bg-[#17876D] px-2 py-1 rounded-md text-xs text-white">
          Current staked - 328 STRK
        </div>
      </div>

      <div className="flex items-center w-full px-7 py-3 gap-2">
        <div className="flex flex-col items-start flex-1">
          <p className="text-[#8D9C9C] text-xs">Enter Amount</p>
          <Input
            className="!text-3xl border-none h-fit px-0 placeholder:text-black outline-none shadow-none focus-visible:ring-0"
            placeholder="0.00"
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[#8D9C9C]">
            <button className="text-xs text-[#8D9C9C] font-semibold border border-[#8D9C9C33] px-2 py-1 rounded-md rounded-r-none">
              25%
            </button>
            <button className="text-xs text-[#8D9C9C] font-semibold border border-x-0 border-[#8D9C9C33] px-2 py-1">
              50%
            </button>
            <button className="text-xs text-[#8D9C9C] font-semibold border border-r-0 border-[#8D9C9C33] px-2 py-1">
              75%
            </button>
            <button className="text-xs text-[#8D9C9C] font-semibold border border-[#8D9C9C33] px-2 py-1 rounded-md rounded-l-none">
              Max
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[#8D9C9C] text-sm font-semibold">
            <Icons.wallet className="size-5" />
            Balance: 0 STRK
          </div>
        </div>
      </div>

      <div className="mt-7 px-7 space-y-3">
        <div className="bg-[#17876D1A] text-[#939494] rounded-md px-3 py-2 font-medium flex items-center justify-between text-sm">
          You will receive
          <span>0 KSTRK</span>
        </div>

        <div className="bg-[#17876D1A] text-[#939494] rounded-md px-3 py-2 font-medium flex items-center justify-between text-sm">
          Exchange rate
          <span>1 STRK = 0.9848 KSTRK</span>
        </div>
      </div>

      <div className="px-5 mt-8">
        <Button className="w-full bg-[#03624C4D] text-[#17876D] hover:bg-[#03624C4D] py-6 rounded-2xl text-sm font-semibold">
          Stake
        </Button>
      </div>
    </div>
  );
};

export default Stake;
