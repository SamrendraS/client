"use client";

import { Fira_Sans } from "next/font/google";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { Icons } from "./Icons";

const font = Fira_Sans({
  subsets: ["latin"],
  weight: "400",
});

export function AppSidebar() {
  const { open, isMobile } = useSidebar();

  if (isMobile) return null;

  return (
    <Sidebar
      className={cn(
        font.className,
        "mx-5 my-auto h-[calc(100vh-40px)] rounded-md rounded-r-sm border border-[#AACBC480]",
      )}
    >
      <SidebarHeader className="flex items-center justify-center bg-[#AACBC433] py-10">
        <Image src={"/logo.png"} alt="Endur" width={63} height={63} />
      </SidebarHeader>
      <SidebarContent
        className={cn("bg-[#AACBC433] px-4 pt-5", {
          "px-1.5": !open,
        })}
      >
        {open ? (
          <>
            <SidebarGroup className="flex cursor-pointer flex-row items-center gap-2 rounded-md bg-[#17876D] text-xl font-semibold text-white transition-all">
              <Icons.staking className="size-5" /> Staking
            </SidebarGroup>
            <SidebarGroup className="pointer-events-none flex cursor-pointer flex-row items-center justify-between gap-2 rounded-md transition-all hover:bg-[#17876D] hover:text-white">
              <p className="text-xl font-semibold text-[#03624C]">
                Defi <span className="text-sm font-thin">(coming soon)</span>
              </p>
              {/* <ChevronDown className="size-4 text-[#03624C]" /> */}
            </SidebarGroup>
            <hr />
            <SidebarGroup className="group flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
              <Icons.dashboard className="size-5 group-hover:fill-white" />{" "}
              Dashboard
            </SidebarGroup>
          </>
        ) : (
          <>
            <SidebarGroup className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-[#17876D] text-xl font-semibold text-white transition-all">
              <Icons.staking className="size-5" />
            </SidebarGroup>
            <hr />
            <SidebarGroup className="group flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
              <Icons.dashboard className="size-5 group-hover:fill-white" />{" "}
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="bg-[#AACBC433] px-0">
        <div
          className={cn(
            "mb-5 flex items-center justify-between gap-2 pl-4 pr-6",
            {
              "flex-col px-0": !open,
            },
          )}
        >
          {open ? (
            <div className="flex items-center gap-4">
              <Icons.twitter className="cursor-pointer" />
              <Icons.discord className="cursor-pointer" />
              <Icons.telegram className="cursor-pointer" />
              <Icons.doc className="cursor-pointer" />
            </div>
          ) : (
            <div className="mb-4 flex flex-col items-center gap-4">
              <Icons.twitter className="cursor-pointer" />
              <Icons.discord className="cursor-pointer" />
              <Icons.telegram className="cursor-pointer" />
              <Icons.doc className="cursor-pointer" />
            </div>
          )}
          <SidebarTrigger />
        </div>
        {open ? (
          <button className="flex items-center gap-3 border-t border-[#075A5A1A] px-4 py-3 text-xl font-medium text-[#03624C]">
            <Icons.chat /> Support
          </button>
        ) : (
          <button className="flex items-center border-t border-[#075A5A1A] px-4 py-2 text-[#03624C]">
            <Icons.chat className="size-4 shrink-0" />
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
