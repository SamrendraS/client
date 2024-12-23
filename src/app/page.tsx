"use client";

import confetti from "canvas-confetti";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { protocolConfigs } from "@/components/defi";
import DefiCard from "@/components/defi-card";
import Footer from "@/components/footer";
import { Icons } from "@/components/Icons";
import Navbar from "@/components/navbar";
import Tabs from "@/components/Tabs";
import { protocolYieldsAtom } from "@/store/defi.store";
import {
  isMerryChristmasAtom,
  isStakeInputFocusAtom,
  tabsAtom,
} from "@/store/merry.store";

export default function Home() {
  const [_, setFocusStakeInput] = useAtom(isStakeInputFocusAtom);
  const [___, setActiveTab] = useAtom(tabsAtom);

  const activeTab = useAtomValue(tabsAtom);
  const isMerry = useAtomValue(isMerryChristmasAtom);
  const yields: any = useAtomValue(protocolYieldsAtom);

  const sortedProtocols = React.useMemo(() => {
    return Object.entries(protocolConfigs)
      .filter(([protocol]) => !["avnu", "fibrous"].includes(protocol))
      .sort(([a], [b]) => {
        const yieldA = yields[a]?.value ?? -Infinity;
        const yieldB = yields[b]?.value ?? -Infinity;
        return yieldB - yieldA;
      })
      .map(([protocol]) => protocol);
  }, [yields]);

  const ekuboProtocol = sortedProtocols.find(
    (protocol) => protocol === "ekubo",
  )!;
  const ekuboConfig = protocolConfigs[ekuboProtocol];

  const nostraPoolProtocol = sortedProtocols.find(
    (protocol) => protocol === "nostra-pool",
  )!;
  const nostraPoolConfig = protocolConfigs[nostraPoolProtocol];

  const nostraLendProtocol = sortedProtocols.find(
    (protocol) => protocol === "nostra-lend",
  )!;
  const nostraLendConfig = protocolConfigs[nostraLendProtocol];

  const vesuProtocol = sortedProtocols.find((protocol) => protocol === "vesu")!;
  const vesuConfig = protocolConfigs[vesuProtocol];

  const strkfarmProtocol = sortedProtocols.find(
    (protocol) => protocol === "strkfarm",
  )!;
  const strkfarmConfig = protocolConfigs[strkfarmProtocol];

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  React.useEffect(() => {
    const duration = 7000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0 && isMerry) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }, [isMerry]);

  return (
    <div className="relative flex h-full min-h-screen w-full overflow-x-hidden">
      {activeTab !== "withdraw" && isMerry && (
        <>
          {/* <Snowfetti /> */}
          <div className="hidden transition-all duration-500 lg:block">
            <Image
              src="/merry_bg.svg"
              alt="Merry"
              fill
              className="-z-10 object-cover"
            />

            <div className="group fixed bottom-0 left-24 hover:z-40">
              <Icons.gift1Faded className="group-hover:hidden" />
              <Icons.gift1 className="hidden group-hover:block" />
              <div className="absolute -right-36 -top-[13rem] hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
                <DefiCard
                  key={strkfarmProtocol}
                  tokens={strkfarmConfig.tokens}
                  protocolIcon={strkfarmConfig.protocolIcon}
                  badges={strkfarmConfig.badges}
                  description={strkfarmConfig.description}
                  apy={yields[strkfarmProtocol]}
                  action={strkfarmConfig.action}
                />
              </div>
            </div>

            <div className="group fixed bottom-0 left-56 hover:z-40">
              <Icons.gift2Faded className="group-hover:hidden" />
              <Icons.gift2 className="hidden group-hover:block" />
              <div className="absolute -right-20 -top-44 hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
                <DefiCard
                  key={ekuboProtocol}
                  tokens={ekuboConfig.tokens}
                  protocolIcon={ekuboConfig.protocolIcon}
                  badges={ekuboConfig.badges}
                  description={ekuboConfig.description}
                  apy={yields[ekuboProtocol]}
                  action={ekuboConfig.action}
                />
              </div>
            </div>

            <div className="group fixed bottom-0 right-[286px] z-20 hover:z-40">
              <Icons.gift3Faded className="group-hover:hidden" />
              <Icons.gift3 className="hidden group-hover:block" />
              <div className="absolute -right-24 -top-[14.2rem] hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
                <DefiCard
                  key={nostraPoolProtocol}
                  tokens={nostraPoolConfig.tokens}
                  protocolIcon={nostraPoolConfig.protocolIcon}
                  badges={nostraPoolConfig.badges}
                  description={nostraPoolConfig.description}
                  apy={yields[nostraPoolProtocol]}
                  action={nostraPoolConfig.action}
                />
              </div>
            </div>

            <div className="group fixed bottom-0 right-[185px] z-20 hover:z-40">
              <Icons.gift4Faded className="group-hover:hidden" />
              <Icons.gift4 className="hidden group-hover:block" />
              <div className="absolute -right-8 -top-[5.5rem] hidden w-44 flex-col items-center rounded-md border border-[#03624C] bg-white p-2 text-base text-[#03624C] transition-all group-hover:flex">
                Stake your STRK and <br /> receive xSTRK
                <button
                  onClick={() => {
                    setActiveTab("stake");
                    setFocusStakeInput(true);
                  }}
                  className="mt-2 w-full rounded-md border border-[#03624C] p-1 text-sm transition-all hover:bg-[#03624C] hover:text-white"
                >
                  Stake now
                </button>
              </div>
            </div>

            <div className="group fixed bottom-0 right-[104px] z-20 hover:z-40">
              <Icons.gift5Faded className="group-hover:hidden" />
              <Icons.gift5 className="hidden group-hover:block" />
              <div className="absolute -right-24 -top-[14.2rem] hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
                <DefiCard
                  key={nostraLendProtocol}
                  tokens={nostraLendConfig.tokens}
                  protocolIcon={nostraLendConfig.protocolIcon}
                  badges={nostraLendConfig.badges}
                  description={nostraLendConfig.description}
                  apy={yields[nostraLendProtocol]}
                  action={nostraLendConfig.action}
                />
              </div>
            </div>

            <div className="group fixed bottom-0 right-2 z-20 hover:z-40">
              <Icons.gift6Faded className="group-hover:hidden" />
              <Icons.gift6 className="hidden group-hover:block" />
              <div className="absolute -top-[14.2rem] right-0 hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
                <DefiCard
                  key={vesuProtocol}
                  tokens={vesuConfig.tokens}
                  protocolIcon={vesuConfig.protocolIcon}
                  badges={vesuConfig.badges}
                  description={nostraLendConfig.description}
                  apy={yields[vesuProtocol]}
                  action={vesuConfig.action}
                />
              </div>
            </div>

            <div className="group fixed bottom-[120px] right-5 z-10">
              <Icons.cTreeFaded className="group-hover:hidden" />
              <Icons.cTree className="hidden group-hover:block" />
              <p className="absolute -top-14 right-0 hidden rounded-md border border-[#03624C] bg-white p-2 text-base text-[#03624C] transition-all group-hover:flex">
                Merry Christmas and a Happy new year
              </p>
            </div>
          </div>
        </>
      )}

      <AppSidebar />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex h-full w-full flex-col items-center overflow-hidden px-7 py-3 lg:py-0">
          <Navbar />
          <Tabs avgWaitTime={""} />
        </div>

        <div className="lg:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
