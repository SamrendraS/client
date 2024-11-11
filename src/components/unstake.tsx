import { Info } from 'lucide-react';
import React from 'react';
import { Icons } from './Icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Unstake = () => {
  return (
    <div className="w-full h-full">
      <div className="py-12 flex items-center justify-between px-5 border-b">
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
        </div>
      </div>

      <div className="mt-7 px-7 space-y-3">
        <div className="bg-[#17876D1A] text-[#939494] rounded-md px-3 py-2 font-medium flex items-center justify-between text-sm">
          You will get
          <span>0 KSTRK</span>
        </div>

        <div className="bg-[#17876D1A] text-[#939494] rounded-md px-3 py-2 font-medium flex items-center justify-between text-sm">
          Exchange rate
          <span>1 STRK = 0.9848 KSTRK</span>
        </div>

        <div className="bg-[#17876D1A] text-[#939494] rounded-md px-3 py-2 font-medium flex items-center justify-between text-sm">
          KSTRK burnt
          <span>560 KSTRK</span>
        </div>

        <div className="bg-[#17876D1A] text-[#939494] rounded-md px-3 py-2 font-medium flex items-center justify-between text-sm">
          Transaction cost
          <span>$1.23</span>
        </div>
      </div>

      <div className="px-5 mt-8">
        <Button className="w-full bg-[#03624C4D] text-[#17876D] hover:bg-[#03624C4D] py-6 rounded-2xl text-sm font-semibold">
          Unstake
        </Button>
      </div>
    </div>
  );
};

export default Unstake;
