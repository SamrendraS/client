"use client";

import { useAtomValue } from "jotai";
import React from "react";
import { cn } from "@/lib/utils";
import DefiCard from "./defi-card";
import { Icons } from "./Icons";
import { useSidebar } from "./ui/sidebar";
import { protocolYieldsAtom } from "@/store/defi.store";

const defiLinks = {
  strkfarm: "",  // not yet available
  vesu: "https://vesu.xyz/lend",
  avnu: "https://app.avnu.fi/en?mode=simple&tokenFrom=0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&tokenTo=0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a&amount=0.001",
  fibrous: "https://app.fibrous.finance/en?network=starknet&mode=swap&source=0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&destination=0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a",
  ekubo: "https://app.ekubo.org/positions/new?baseCurrency=xSTRK&quoteCurrency=STRK&fee=170141183460469235273462165868118016&tickSpacing=1000&poolOnly=true"
} as const;

const protocolConfigs = {
  strkfarm: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" }
    ],
    protocolIcon: <Icons.strkfarmLogo className="size-8" />,
    badges: [{ type: "Yield Farming", color: "bg-[#E9F3F0] text-[#17876D]" }],
    description: "Auto compound defi spring rewards on xSTRK"
  },
  vesu: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" }
    ],
    protocolIcon: <Icons.vesuLogo className="size-8 rounded-full" />,
    badges: [{ type: "Lend/Borrow", color: "bg-[#EEF6FF] text-[#0369A1]" }],
    description: "Earn DeFi Spring rewards & yield, use xSTRK as collateral to Borrow and Multiply"
  },
  avnu: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" },
      { icon: <Icons.strkLogo className="size-[22px]" />, name: "STRK" }
    ],
    protocolIcon: <Icons.avnuLogo className="size-8 rounded-full border" />,
    badges: [{ type: "DEX Aggregator", color: "bg-[#F3E8FF] text-[#9333EA]" }],
    description: "Swap xSTRK for STRK on Avnu"
  },
  fibrous: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" },
      { icon: <Icons.strkLogo className="size-[22px]" />, name: "STRK" }
    ],
    protocolIcon: <Icons.fibrousLogo className="size-8 rounded-full" />,
    badges: [{ type: "DEX Aggregator", color: "bg-[#F3E8FF] text-[#9333EA]" }],
    description: "Swap xSTRK for STRK on Fibrous"
  },
  ekubo: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" },
      { icon: <Icons.strkLogo className="size-[22px]" />, name: "STRK" }
    ],
    protocolIcon: <Icons.ekuboLogo className="size-8 rounded-full" />,
    badges: [
      { type: "DEX", color: "bg-[#F3E8FF] text-[#9333EA]" },
      { type: "Liquidity Pool", color: "bg-[#FFF7ED] text-[#EA580C]" }
    ],
    description: "Provide liquidity for xSTRK/STRK on Ekubo"
  },
  nostra: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" },
      { icon: <Icons.strkLogo className="size-[22px]" />, name: "STRK" }
    ],
    protocolIcon: <Icons.nostraLogo className="size-8 rounded-full" />,
    badges: [
      { type: "DEX", color: "bg-[#F3E8FF] text-[#9333EA]" },
      { type: "Liquidity Pool", color: "bg-[#FFF7ED] text-[#EA580C]" },
      { type: "Lend/Borrow", color: "bg-[#EEF6FF] text-[#0369A1]" }
    ],
    description: "Provide liquidity to the xSTRK/STRK pool, use xSTRK as collateral and swap xSTRK on Nostra"
  }
} as const;

const Defi: React.FC = () => {
  const { open } = useSidebar();
  const yields = useAtomValue(protocolYieldsAtom);

  return (
    <div
      className={cn("mx-auto mt-12 w-full max-w-7xl px-4 sm:px-14", {
        "lg:pl-28": !open,
      })}
    >
      <h1 className="text-2xl font-semibold tracking-[-1%] text-black">Defi</h1>
      <p className="text-base font-normal tracking-[-1%] text-[#8D9C9C]">
        Use xSTRK to unlock greater rewards with DeFi opportunities!
      </p>

      <div className="mt-9">
        <p className="text-2xl font-normal tracking-[-1%] text-black">
          Opportunities
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {(Object.keys(protocolConfigs) as Array<keyof typeof protocolConfigs>).map((protocol) => {
            const config = protocolConfigs[protocol];
            const shouldShowApy = !["avnu", "fibrous"].includes(protocol);
            
            return (
              <DefiCard
                key={protocol}
                tokens={config.tokens}
                protocolIcon={config.protocolIcon}
                badges={config.badges}
                description={config.description}
                apy={shouldShowApy ? yields[protocol] : undefined}
                link={defiLinks[protocol]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Defi;