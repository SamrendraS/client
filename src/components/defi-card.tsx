import React from "react";

import Image from "next/image";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

const DefiCard = () => {
  return (
    <div className="h-[220px] w-full min-w-[330px] rounded-xl bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            <Icons.endurLogo />
            <Icons.usdcLogo className="-ml-2 size-6 rounded-full border-[1.5px] border-white" />
          </div>
          XSTRK-USDC
        </div>

        <Icons.strkfarmLogo />
      </div>

      <p className="mt-4 text-sm text-black">Borrow using xSTRK on STRKFarm</p>

      <div className="relative h-[69px] w-full">
        <Image
          className="mt-2 object-contain"
          src="/blur.svg"
          fill
          alt="blur"
        />
      </div>

      <Button className="mt-8 w-full rounded-full bg-[#03624C4D] text-[13px] font-bold tracking-[-1%] text-[#17876D] hover:bg-[#03624C4D]">
        Coming soon
      </Button>
    </div>
  );
};

export default DefiCard;
