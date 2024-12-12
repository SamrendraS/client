import { useAtomValue } from "jotai";
import Link from "next/link";
import React from "react";

import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { protocolYieldsAtom } from "@/store/defi.store";

const defiLinks = {
  strkfarm: "",  // not yet available
  vesu: "https://vesu.xyz/lend",
  avnu: "https://app.avnu.fi/en?mode=simple&tokenFrom=0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&tokenTo=0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a&amount=0.001",
  fibrous: "https://app.fibrous.finance/en?network=starknet&mode=swap&source=0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&destination=0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a",
  ekubo: "https://app.ekubo.org/positions/new?baseCurrency=xSTRK&quoteCurrency=STRK&fee=170141183460469235273462165868118016&tickSpacing=1000&poolOnly=true"
} as const;

interface ProtocolBadge {
  type: string;
  color: string;
}

const protocolTypes: Record<string, ProtocolBadge[]> = {
  strkfarm: [{ type: "Yield Farming", color: "bg-[#E9F3F0] text-[#17876D]" }],
  vesu: [{ type: "Lend/Borrow", color: "bg-[#EEF6FF] text-[#0369A1]" }],
  avnu: [{ type: "DEX Aggregator", color: "bg-[#F3E8FF] text-[#9333EA]" }],
  fibrous: [{ type: "DEX Aggregator", color: "bg-[#F3E8FF] text-[#9333EA]" }],
  ekubo: [
    { type: "DEX", color: "bg-[#F3E8FF] text-[#9333EA]" },
    { type: "Liquidity", color: "bg-[#FFF7ED] text-[#EA580C]" }
  ],
};

type ProtocolType = "dexAggregator" | "lending" | "farming" | "lpAndDex";

const protocolCategories: Record<keyof typeof defiLinks, ProtocolType> = {
  strkfarm: "farming",
  vesu: "lending",
  avnu: "dexAggregator",
  fibrous: "dexAggregator",
  ekubo: "lpAndDex"
};

interface DefiCardProps {
  dapp: keyof typeof defiLinks;
  tokens: [string, string];
  description: string;
}

const DefiCard: React.FC<DefiCardProps> = ({ dapp, tokens, description }) => {
  const yields = useAtomValue(protocolYieldsAtom);
  const yieldData = yields[dapp];
  const protocolType = protocolCategories[dapp];

  const getDappIcon = (dappName: string) => {
    switch (dappName.toLowerCase()) {
      case "endur":
        return <Icons.endurLogo className="size-8" />;
      case "strkfarm":
        return <Icons.strkfarmLogo className="size-8" />;
      case "vesu":
        return <Icons.vesuLogo className="size-8 rounded-full" />;
      case "avnu":
        return <Icons.avnuLogo className="size-8 rounded-full border" />;
      case "fibrous":
        return <Icons.fibrousLogo className="size-8 rounded-full" />;
      case "ekubo":
        return <Icons.ekuboLogo className="size-8 rounded-full" />;
      default:
        return null;
    }
  };

  const getTokenIcon = (tokenName: string) => {
    switch (tokenName.toLowerCase()) {
      case "strk":
        return <Icons.strkLogo className="size-[22px]" />;
      case "xstrk":
        return <Icons.endurLogo className="size-[22px]" />;
      case "usdc":
        return <Icons.usdcLogo className="size-[22px]" />;
      default:
        return null;
    }
  };

  const isDex = ["avnu", "fibrous", "ekubo"].includes(dapp);
  const link = defiLinks[dapp];

  const renderAPY = () => {
    if (yieldData.isLoading) return "Loading...";
    if (yieldData.error || yieldData.value === null) return "-";
    return `${yieldData.value.toFixed(2)}%`;
  };

  return (
    <div className="flex h-[200px] w-full min-w-[330px] flex-col rounded-xl bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
          <div className="flex items-center">
            {getTokenIcon(tokens[0])}
            {getTokenIcon(tokens[1]) && (
              <div className="-ml-2 size-6 rounded-full border-[1.5px] border-white bg-white">
                {getTokenIcon(tokens[1])}
              </div>
            )}
          </div>
            <span className="text-sm font-medium">
              {isDex ? "xSTRK/STRK" : tokens[0]}
            </span>
          </div>
          
          {protocolType !== "dexAggregator" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8D9C9C]">APY</span>
              <span className="text-lg font-semibold text-[#17876D]">
                {renderAPY()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1.5 justify-end max-w-[180px]">
            {protocolTypes[dapp].map((badge, index) => (
              <div
                key={index}
                className={cn("rounded-full px-2.5 py-1 text-xs whitespace-nowrap", badge.color)}
              >
                {badge.type}
              </div>
            ))}
          </div>
          {getDappIcon(dapp)}
        </div>
      </div>

      <h3 className="mt-4 text-sm text-[#4B5563]">{description}</h3>

      <div className="mt-auto">
        {link ? (
          <Link 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full"
          >
            <Button className="w-full rounded-full bg-[#17876D] px-4 py-2 text-xs font-medium text-white hover:bg-[#146D57] transition-colors">
              Launch App
            </Button>
          </Link>
        ) : (
          <Button className="w-full rounded-full bg-[#03624C4D] px-4 py-2 text-xs font-medium text-[#17876D] hover:bg-[#03624C4D]">
            Coming soon
          </Button>
        )}
      </div>
    </div>
  );
};

export default DefiCard;