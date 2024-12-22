"use client";

import { useAtomValue } from "jotai";
import Image from "next/image";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { Icons } from "@/components/Icons";
import Navbar from "@/components/navbar";
import Tabs from "@/components/Tabs";
import { tabsAtom } from "@/store/tabs.store";

export default function Home() {
  const activeTab = useAtomValue(tabsAtom);

  return (
    <div className="relative flex h-full min-h-screen w-full overflow-x-hidden">
      {activeTab !== "withdraw" && (
        <div className="hidden lg:block">
          <Image
            src="/merry_bg.svg"
            alt="Merry"
            fill
            className="-z-10 object-cover"
          />
          <div className="group fixed bottom-0 left-24">
            <Icons.gift1Faded className="group-hover:hidden" />
            <Icons.gift1 className="hidden group-hover:block" />
            <p className="absolute -right-8 -top-16 hidden w-44 rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
              Auto compound defi spring rewards on xSTRK (coming soon)
            </p>
          </div>

          <div className="group fixed bottom-0 left-56">
            <Icons.gift2Faded className="group-hover:hidden" />
            <Icons.gift2 className="hidden group-hover:block" />
            <p className="absolute -top-10 right-0 hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
              Provide liquidity to the xSTRK/STRK pool on Ekubo and earn trading
              fees & DeFi Spring rewards
            </p>
          </div>

          <div className="group fixed bottom-0 right-[286px] z-20 hover:z-50">
            <Icons.gift3Faded className="group-hover:hidden" />
            <Icons.gift3 className="hidden group-hover:block" />
            <p className="absolute -right-8 -top-[6.5rem] hidden w-44 rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
              Provide liquidity to the xSTRK/STRK pool on Nostra and earn
              trading fees
            </p>
          </div>

          <div className="group fixed bottom-0 right-[185px] z-20">
            <Icons.gift4Faded className="group-hover:hidden" />
            <Icons.gift4 className="hidden group-hover:block" />
            <div className="absolute -right-8 -top-[5.5rem] hidden w-44 flex-col items-center rounded-md border border-[#03624C] bg-white p-2 text-base text-[#03624C] transition-all group-hover:flex">
              Stake your STRK and <br /> receive xSTRK
              <button className="mt-2 w-full rounded-md border border-[#03624C] p-1 text-sm transition-all hover:bg-[#03624C] hover:text-white">
                Stake now
              </button>
            </div>
          </div>

          <div className="group fixed bottom-0 right-[104px] z-20">
            <Icons.gift5Faded className="group-hover:hidden" />
            <Icons.gift5 className="hidden group-hover:block" />
            <p className="absolute -top-[6.5rem] right-0 hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
              Lend your xSTRK on Nostra to earn additional yield
            </p>
          </div>

          <div className="group fixed bottom-0 right-2 z-20">
            <Icons.gift6Faded className="group-hover:hidden" />
            <Icons.gift6 className="hidden group-hover:block" />
            <p className="absolute -top-32 right-0 hidden rounded-md border border-[#03624C] bg-white p-2 text-sm text-[#03624C] transition-all group-hover:flex">
              Earn DeFi Spring rewards & yield, use xSTRK as collateral to
              Borrow and Multiply
            </p>
          </div>

          <div className="group fixed bottom-[120px] right-5 z-10">
            <Icons.cTreeFaded className="group-hover:hidden" />
            <Icons.cTree className="hidden group-hover:block" />
            <p className="absolute -top-14 right-0 hidden rounded-md border border-[#03624C] bg-white p-2 text-base text-[#03624C] transition-all group-hover:flex">
              Merry Christmas and a Happy new year
            </p>
          </div>
        </div>
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
