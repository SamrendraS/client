"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { DASHBOARD_URL } from "@/constants";
import { cn } from "@/lib/utils";

import { Icons } from "./Icons";
import { ChartColumnDecreasingIcon } from "./ui/chart-column-decreasing";
import { GaugeIcon } from "./ui/gauge";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";

const SidebarMenuItems = () => {
  const [triggerAnalyticsIconAnimation, setTriggerAnalyticsIconAnimation] =
    React.useState(false);
  const [triggerDashboardIconAnimation, setTriggerDashboardIconAnimation] =
    React.useState(false);

  const { open } = useSidebar();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const referrer = searchParams.get("referrer");

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className={cn("transition-all hover:bg-[#17876D] hover:text-white", {
            "bg-[#17876D] text-white": pathname === "/",
          })}
        >
          <Link
            href={referrer ? `/?referrer=${referrer}` : "/"}
            className={cn(
              "group/stake flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all",
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
          className={cn("transition-all hover:bg-[#17876D] hover:text-white", {
            "bg-[#17876D] text-white": pathname === "/defi",
          })}
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
          onMouseEnter={() => setTriggerAnalyticsIconAnimation(true)}
          onMouseLeave={() => setTriggerAnalyticsIconAnimation(false)}
        >
          <Link
            href={"https://dune.com/endurfi/xstrk-analytics"}
            target="_blank"
            className="flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all"
          >
            <ChartColumnDecreasingIcon
              triggerAnimation={triggerAnalyticsIconAnimation}
              className="size-5"
            />
            {open && <p>xSTRK Analytics</p>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="transition-all hover:bg-[#17876D] hover:text-white"
          onMouseEnter={() => setTriggerDashboardIconAnimation(true)}
          onMouseLeave={() => setTriggerDashboardIconAnimation(false)}
        >
          <Link
            href={DASHBOARD_URL}
            target="_blank"
            className="flex cursor-pointer flex-row items-center gap-2 text-nowrap rounded-md text-base font-semibold text-[#03624C] transition-all"
          >
            <GaugeIcon
              triggerAnimation={triggerDashboardIconAnimation}
              className="size-5"
            />
            {open && "Staking Dashboard"}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
};

export default SidebarMenuItems;
