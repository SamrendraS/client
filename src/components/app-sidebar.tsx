"use client";

import {
  ChartLine,
  CircleGauge,
  FileText,
  MessageCircleMore,
  Pin,
} from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { DASHBOARD_URL } from "@/constants";
import { cn } from "@/lib/utils";

import { Icons } from "./Icons";

const font = Inter({ subsets: ["latin-ext"] });

export function AppSidebar({ className }: { className?: string }) {
  const { open, isMobile, setOpen, isPinned, setIsPinned } = useSidebar();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const referrer = searchParams.get("referrer");

  if (typeof window === "undefined" || isMobile) return null;

  return (
    <Sidebar
      variant="floating"
      onMouseOver={() => !isPinned && setOpen(true)}
      onMouseLeave={() => !isPinned && setOpen(false)}
      containerClassname={cn("absolute group z-20", {
        static: isPinned,
      })}
    >
      <SidebarHeader className="p-0">
        <SidebarMenu>
          <SidebarMenuItem
            className={cn(
              font.className,
              "relative flex flex-row items-center justify-start gap-2 bg-[#AACBC433] px-2 py-10 transition-all duration-300",
              {
                "px-4": open,
              },
            )}
          >
            <Pin
              className={cn(
                "absolute right-2 top-3 hidden size-4 cursor-pointer text-muted-foreground transition-all group-hover:block",
                {
                  "block fill-[#17876D] text-[#17876D]": isPinned,
                },
              )}
              onClick={() => setIsPinned(!isPinned)}
            />

            <Icons.logo className="shrink-0" />
            <div
              className={cn("hidden group-hover:block", {
                block: isPinned,
              })}
            >
              <Icons.endurNameOnlyLogo className="h-fit w-20" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className={cn("bg-[#AACBC433] pt-5", {})}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "group/stake transition-all hover:bg-[#17876D] hover:text-white",
                    {
                      "bg-[#17876D] text-white": pathname === "/",
                    },
                  )}
                >
                  <Link
                    href={referrer ? `/?referrer=${referrer}` : "/"}
                    className={cn(
                      "flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
                    )}
                  >
                    {pathname === "/" ? (
                      <Icons.stakingLight className="size-4" />
                    ) : (
                      <>
                        <Icons.stakingDark className="size-4 group-hover/stake:hidden" />
                        <Icons.stakingLight className="hidden size-4 group-hover/stake:flex" />
                      </>
                    )}
                    <span>{open && "Liquid Staking"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "group/stake transition-all hover:bg-[#17876D] hover:text-white",
                    {
                      "bg-[#17876D] text-white": pathname === "/defi",
                    },
                  )}
                >
                  <Link
                    href={referrer ? `/defi?referrer=${referrer}` : "/defi"}
                    className={cn(
                      "group/defi flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
                    )}
                  >
                    {pathname === "/defi" ? (
                      <Icons.defiLight className="size-4" />
                    ) : (
                      <>
                        <Icons.defiDark className="size-4 group-hover/defi:hidden" />
                        <Icons.defiLight className="hidden size-4 group-hover/defi:flex" />
                      </>
                    )}{" "}
                    {open && "DeFi with xSTRK"}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Link
                    href={"https://dune.com/endurfi/xstrk-analytics"}
                    target="_blank"
                    className={cn(
                      "group/defi flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
                    )}
                  >
                    <ChartLine className="size-4" />
                    {open && <p>xSTRK Analytics</p>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Link
                    href={DASHBOARD_URL}
                    target="_blank"
                    className="group/dash flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all"
                  >
                    <CircleGauge className="size-4" />
                    {open && "Staking Dashboard"}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#AACBC433] p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group/stake transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Link
                    href={"https://x.com/endurfi"}
                    target="_blank"
                    className={cn(
                      "group/stake flex w-full cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
                    )}
                  >
                    <Icons.twitter className="size-4" />
                    <span>{open && "Twitter"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group/stake transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Link
                    href={"https://t.me/+jWY71PfbMMIwMTBl"}
                    target="_blank"
                    className={cn(
                      "group/stake flex w-full cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
                    )}
                  >
                    <Icons.telegram className="size-4" />
                    <span>{open && "Telegram"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group/stake transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Link
                    href={"https://docs.endur.fi"}
                    target="_blank"
                    className={cn(
                      "group/stake flex w-full cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
                    )}
                  >
                    <FileText className="size-4" />
                    <span>{open && "Docs"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group/stake transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Link
                    href="https://t.me/+jWY71PfbMMIwMTBl"
                    target="_blank"
                    className="group/stake flex w-full cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all"
                  >
                    <MessageCircleMore className="size-4" />
                    {open && "Support"}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
