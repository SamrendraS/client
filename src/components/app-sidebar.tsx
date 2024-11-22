"use client";

import Image from "next/image";
import Link from "next/link";

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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";
import { DASHBOARD_URL } from "../../constants";
import { Icons } from "./Icons";

export function AppSidebar({ className }: { className?: string }) {
  const { open, isMobile } = useSidebar();
  const pathname = usePathname();

  if (isMobile) return null;

  return (
    <Sidebar
      className={cn(
        "mx-5 my-auto h-[calc(100vh-40px)] rounded-md rounded-r-sm border border-[#AACBC480]",
        className,
      )}
      // onMouseOver={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
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
            <Link href="/">
              <SidebarGroup
                className={cn(
                  "flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                  {
                    "bg-[#17876D] text-white": pathname === "/",
                  },
                )}
              >
                <Icons.staking className="size-5" /> Staking
              </SidebarGroup>
            </Link>

            <hr />

            <Link href={DASHBOARD_URL} target="_blank">
              <SidebarGroup className="group flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
                <Icons.dashboard className="size-5 group-hover:fill-white" />{" "}
                Dashboard
              </SidebarGroup>
            </Link>

            <Link href="/defi">
              <SidebarGroup
                className={cn(
                  "group flex cursor-pointer flex-row items-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                  {
                    "bg-[#17876D] text-white": pathname === "/defi",
                  },
                )}
              >
                Defi <span className="text-sm font-thin">(coming soon)</span>
              </SidebarGroup>
            </Link>
          </>
        ) : (
          <>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/">
                    <SidebarGroup
                      className={cn(
                        "flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                        {
                          "bg-[#17876D] text-white": pathname === "/",
                        },
                      )}
                    >
                      <Icons.staking className="size-5" />
                    </SidebarGroup>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>Staking</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <hr />

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarGroup className="group flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white">
                    <Link href={DASHBOARD_URL} target="_blank">
                      <Icons.dashboard className="size-5 group-hover:fill-white" />{" "}
                    </Link>
                  </SidebarGroup>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/defi">
                    <SidebarGroup
                      className={cn(
                        "group flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md text-xl font-semibold text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white",
                        {
                          "bg-[#17876D] text-white": pathname === "/defi",
                        },
                      )}
                    >
                      Dfi
                    </SidebarGroup>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                >
                  <p>Defi (coming soon)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                <TooltipProvider delayDuration={0}>
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
                </TooltipProvider>

                <TooltipProvider delayDuration={0}>
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
                </TooltipProvider>

                <TooltipProvider delayDuration={0}>
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
                </TooltipProvider>
              </div>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Collapse</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="rounded-md border border-[#03624C] bg-[#E3EEEC] text-[#03624C]"
                  >
                    <p>Expand</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
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
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
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
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
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
              </TooltipProvider>
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
          <TooltipProvider delayDuration={0}>
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
          </TooltipProvider>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
