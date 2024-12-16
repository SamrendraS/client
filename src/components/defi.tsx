"use client";

import React from "react";
import { useAtomValue } from "jotai";
import { cn } from "@/lib/utils";
import DefiCard, { ProtocolAction, ProtocolBadge, TokenDisplay } from "./defi-card";
import { useSidebar } from "@/components/ui/sidebar";
import { protocolYieldsAtom } from "@/store/defi.store";
import { Icons } from "./Icons";

interface ProtocolConfig {
  tokens: TokenDisplay[];
  protocolIcon: React.ReactNode;
  badges: ProtocolBadge[];
  description: string;
  actions: ProtocolAction[];
}

const protocolConfigs: Record<string, ProtocolConfig> = {
  strkfarm: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" }
    ],
    protocolIcon: <Icons.strkfarmLogo className="size-8" />,
    badges: [{ type: "Yield Farming", color: "bg-[#E9F3F0] text-[#17876D]" }],
    description: "Auto compound defi spring rewards on xSTRK",
    actions: []
  },
  vesu: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" }
    ],
    protocolIcon: <Icons.vesuLogo className="size-8 rounded-full" />,
    badges: [{ type: "Lend/Borrow", color: "bg-[#EEF6FF] text-[#0369A1]" }],
    description: "Earn DeFi Spring rewards & yield, use xSTRK as collateral to Borrow and Multiply",
    actions: [
      {
        type: "lend",
        link: "https://vesu.xyz/lend",
        buttonText: "Lend xSTRK",
        primary: true
      }
    ]
  },
  avnu: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" },
      { icon: <Icons.strkLogo className="size-[22px]" />, name: "STRK" }
    ],
    protocolIcon: <Icons.avnuLogo className="size-8 rounded-full border" />,
    badges: [{ type: "DEX Aggregator", color: "bg-[#F3E8FF] text-[#9333EA]" }],
    description: "Swap xSTRK for STRK on Avnu",
    actions: [
      {
        type: "swap",
        link: "https://app.avnu.fi/en?mode=simple&tokenFrom=0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a&tokenTo=0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&amount=100",
        buttonText: "Swap Tokens",
        primary: true
      }
    ]
  },
  fibrous: {
    tokens: [
      { icon: <Icons.endurLogo className="size-[22px]" />, name: "xSTRK" },
      { icon: <Icons.strkLogo className="size-[22px]" />, name: "STRK" }
    ],
    protocolIcon: <Icons.fibrousLogo className="size-8 rounded-full" />,
    badges: [{ type: "DEX Aggregator", color: "bg-[#F3E8FF] text-[#9333EA]" }],
    description: "Swap xSTRK for STRK on Fibrous",
    actions: [
      {
        type: "swap",
        link: "https://app.fibrous.finance/en?network=starknet&mode=swap&source=0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a&destination=0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        buttonText: "Swap Tokens",
        primary: true
      }
    ]
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
    description: "Provide liquidity to the xSTRK/STRK pool, use xSTRK as collateral and swap xSTRK on Nostra",
    actions: [
      {
        type: "pool",
        link: "https://app.nostra.finance/pools/xSTRK-STRK/deposit",
        buttonText: "Add Liquidity",
        primary: true
      },
      {
        type: "lend",
        link: "https://app.nostra.finance/lend-borrow/xSTRK/deposit",
        buttonText: "Lend Assets"
      },
      {
        type: "swap",
        link: "https://app.nostra.finance/swap",
        buttonText: "Swap Tokens"
      }
    ]
  }
};

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
        <div className="mb-6 rounded-md border border-[#17876D33] bg-[#17876D0A] p-4">
          <p className="text-sm text-[#03624C]">
            Please note: The protocols listed here are third-party services not affiliated with or endorsed by Endur.
            This list is provided for informational convenience only. Always do your own research and understand the risks
            before using any DeFi protocol.
          </p>
        </div>

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
                actions={config.actions}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Defi;