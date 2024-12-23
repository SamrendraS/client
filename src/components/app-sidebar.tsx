"use client";

import { ChartPie } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DASHBOARD_URL } from "@/constants";
import { cn } from "@/lib/utils";

import { Icons } from "./Icons";

const font = Inter({ subsets: ["latin-ext"] });

export function AppSidebar({ className }: { className?: string }) {
  const { open, isMobile } = useSidebar();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const referrer = searchParams.get("referrer");

  if (typeof window === "undefined" || isMobile) return null;

  return (
    <React.Suspense
      fallback={<div className="w-72">Loading sidebar content...</div>}
    >
      <Sidebar
        className={cn(
          "fixed top-1/2 mx-5 h-[calc(100vh-40px)] -translate-y-1/2 rounded-md rounded-r-sm border border-[#AACBC480] transition-[width] duration-1000 ease-linear",
          className,
        )}
      >
        <SidebarHeader
          className={cn(
            font.className,
            "flex flex-row items-center justify-start gap-3.5 bg-[#AACBC433] py-10",
            {
              "px-6": open,
            },
          )}
        >
          {!open && <Icons.logo />}
          {open && (
            <Image
              src="/full_logo.svg"
              width={160}
              height={60}
              alt="full_logo"
            />
          )}
        </SidebarHeader>

        <SidebarContent
          className={cn("bg-[#AACBC433] px-4 pt-5", {
            "px-1.5": !open,
          })}
        >
          {open ? (
            <>
              <Link href={referrer ? `/?referrer=${referrer}` : "/"}>
                <SidebarGroup
                  className={cn(
                    "group/stake flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                    {
                      "bg-[#17876D] text-white": pathname === "/",
                    },
                  )}
                >
                  {pathname === "/" ? (
                    <Icons.stakingLight className="size-5" />
                  ) : (
                    <>
                      <Icons.stakingDark className="size-5 group-hover/stake:hidden" />
                      <Icons.stakingLight className="hidden size-5 group-hover/stake:flex" />
                    </>
                  )}
                  Liquid Staking
                </SidebarGroup>
              </Link>

              <hr className="border-[#AACBC480]" />

              <Link href={referrer ? `/defi?referrer=${referrer}` : "/defi"}>
                <SidebarGroup
                  className={cn(
                    "group/defi flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                    {
                      "bg-[#17876D] text-white": pathname === "/defi",
                    },
                  )}
                >
                  {pathname === "/defi" ? (
                    <Icons.defiLight className="size-5" />
                  ) : (
                    <>
                      <Icons.defiDark className="size-5 group-hover/defi:hidden" />
                      <Icons.defiLight className="hidden size-5 group-hover/defi:flex" />
                    </>
                  )}
                  DeFi <span className="text-sm font-thin">with xSTRK</span>
                </SidebarGroup>
              </Link>

              <Link
                href={"https://dune.com/endurfi/xstrk-analytics"}
                target="_blank"
                style={{ display: "flex" }}
              >
                <SidebarGroup
                  className={cn(
                    "group/defi flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                  )}
                >
                  <ChartPie className="size-5 shrink-0" />
                  <p className="flex flex-col gap-0">xSTRK Analytics</p>
                </SidebarGroup>
              </Link>

              <hr className="border-[#AACBC480]" />

              <Link href={DASHBOARD_URL} target="_blank">
                <SidebarGroup className="group/dash flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
                  <Icons.dashboardDark className="size-5 shrink-0 group-hover/dash:hidden" />
                  <Icons.dashboardLight className="hidden size-5 shrink-0 group-hover/dash:flex" />
                  Staking Dashboard
                </SidebarGroup>
              </Link>
            </>
          ) : (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={referrer ? `/?referrer=${referrer}` : "/"}>
                    <SidebarGroup
                      className={cn(
                        "group/stake flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                        {
                          "bg-[#17876D] text-white": pathname === "/",
                        },
                      )}
                    >
                      {pathname === "/" ? (
                        <Icons.stakingLight className="size-5" />
                      ) : (
                        <>
                          <Icons.stakingDark className="size-5 group-hover/stake:hidden" />
                          <Icons.stakingLight className="hidden size-5 group-hover/stake:flex" />
                        </>
                      )}
                    </SidebarGroup>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>Liquid Staking</p>
                </TooltipContent>
              </Tooltip>

              <hr className="border-[#AACBC480]" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={referrer ? `/defi?referrer=${referrer}` : "/defi"}
                  >
                    <SidebarGroup
                      className={cn(
                        "group/defi flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                        {
                          "bg-[#17876D] text-white": pathname === "/defi",
                        },
                      )}
                    >
                      {pathname === "/defi" ? (
                        <Icons.defiLight className="size-5" />
                      ) : (
                        <>
                          <Icons.defiDark className="size-5 group-hover/defi:hidden" />
                          <Icons.defiLight className="hidden size-5 group-hover/defi:flex" />
                        </>
                      )}
                    </SidebarGroup>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>xSTRK on DeFi</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={"https://dune.com/endurfi/xstrk-analytics"}
                    target="_blank"
                  >
                    <SidebarGroup
                      className={cn(
                        "group/defi flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                      )}
                    >
                      <ChartPie className="size-5 shrink-0" />
                    </SidebarGroup>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>xSTRK Analytics</p>
                </TooltipContent>
              </Tooltip>

              <hr className="border-[#AACBC480]" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarGroup className="group flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
                    <Link href={DASHBOARD_URL} target="_blank">
                      <Icons.dashboardDark className="size-5 group-hover:hidden" />
                      <Icons.dashboardLight className="hidden size-5 group-hover:flex" />
                    </Link>
                  </SidebarGroup>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>Staking Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </SidebarContent>

        <SidebarFooter className="bg-[#AACBC433] p-0">
          <div
            className={cn(
              "mb-3 flex items-center justify-between gap-2 pl-4 pr-6",
              {
                "flex-col px-0": !open,
              },
            )}
          >
            {open ? (
              <>
                <div className="flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://x.com/endurfi" target="_blank">
                        <Icons.twitter className="cursor-pointer" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                    >
                      <p>Twitter (X)</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="https://t.me/+jWY71PfbMMIwMTBl"
                        target="_blank"
                      >
                        <Icons.telegram className="cursor-pointer" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                    >
                      <p>Telegram</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://docs.endur.fi/" target="_blank">
                        <Icons.doc className="cursor-pointer" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                    >
                      <p>Docs</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Collapse (⌘B)</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Expand (⌘B)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="https://x.com/endurfi" target="_blank">
                      <Icons.twitter className="cursor-pointer" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Twitter (X)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="https://t.me/+jWY71PfbMMIwMTBl" target="_blank">
                      <Icons.telegram className="cursor-pointer" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Telegram</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="https://docs.endur.fi/" target="_blank">
                      <Icons.doc className="cursor-pointer" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Docs</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {open ? (
            <Link
              href="https://t.me/+jWY71PfbMMIwMTBl"
              target="_blank"
              className="flex items-center gap-3 border-t border-[#075A5A1A] px-4 py-3 text-xl font-medium text-[#03624C]"
            >
              <Icons.chat /> Support
            </Link>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://t.me/+jWY71PfbMMIwMTBl"
                  target="_blank"
                  className="flex items-center border-t border-[#075A5A1A] px-4 py-2.5 text-[#03624C]"
                >
                  <Icons.chat className="size-4 shrink-0" />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
              >
                <p>
                  Support <span className="text-xs font-thin">(Telegram)</span>
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </SidebarFooter>
      </Sidebar>
    </React.Suspense>
  );
}
