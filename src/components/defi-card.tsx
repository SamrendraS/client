import Image from "next/image";
import React from "react";

import { Icons } from "./Icons";
import { Button } from "./ui/button";

interface DefiCardProps {
  dapp: string;
  tokens: [string, string];
  description: string;
}

const DefiCard: React.FC<DefiCardProps> = ({ dapp, tokens, description }) => {
  const getDappIcon = (dappName: string) => {
    switch (dappName.toLowerCase()) {
      case "endur":
        return <Icons.endurLogo />;
      case "strkfarm":
        return <Icons.strkfarmLogo />;
      case "vesu":
        return <Icons.vesuLogo className="rounded-full" />;
      case "avnu":
        return <Icons.avnuLogo className="rounded-full border" />;
      case "fibrous":
        return <Icons.fibrousLogo className="rounded-full" />;
      case "ekubo":
        return <Icons.ekuboLogo className="rounded-full" />;
      default:
        return null;
    }
  };

  const getTokenIcon = (tokenName: string) => {
    switch (tokenName.toLowerCase()) {
      case "strk":
        return <Icons.strkLogo className="size-[22px]" />;
      case "xstrk":
        return <Icons.endurLogo />;
      case "usdc":
        return <Icons.usdcLogo />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[230px] w-full min-w-[330px] rounded-xl bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            {getTokenIcon(tokens[0])}
            {getTokenIcon(tokens[1]) && (
              <div className="-ml-2 size-6 rounded-full border-[1.5px] border-white bg-white">
                {getTokenIcon(tokens[1])}
              </div>
            )}
          </div>
          {tokens[0]}
          {getTokenIcon(tokens[1]) && `-${tokens[1]}`}
        </div>

        {getDappIcon(dapp)}
      </div>

      <p className="mt-4 text-sm text-black">{description}</p>

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
