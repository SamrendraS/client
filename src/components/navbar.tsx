"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, shortAddress } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useSidebar } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const { isMobile } = useSidebar();

  return (
    <div
      className={cn("flex h-20 w-full items-center justify-end", {
        "justify-between": isMobile,
      })}
    >
      {isMobile && (
        <Sheet>
          <div className="flex items-center justify-center gap-4">
            <SheetTrigger>
              <Icons.hamburger className="size-5" />
            </SheetTrigger>
            <Image src={"/logo.png"} alt="Endur" width={28} height={28} />
          </div>

          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="bg-sidebar p-0 text-sidebar-foreground"
            side="left"
          >
            <div className="h-full border border-[#AACBC480]">
              <div className="flex items-center justify-center bg-[#AACBC433] py-10">
                <Image src={"/logo.png"} alt="Endur" width={63} height={63} />
              </div>

              <div className="h-full space-y-1 bg-[#AACBC433] px-4 pt-5">
                <Link
                  href="#"
                  className="group flex cursor-pointer flex-row items-center gap-2 rounded-md px-3 py-2 text-xl text-[#03624C] transition-all hover:bg-[#17876D] hover:text-white"
                >
                  <Icons.dashboard className="size-5 group-hover:fill-white" />{" "}
                  Dashboard
                </Link>

                <Link
                  href="#"
                  className="flex cursor-pointer flex-row items-center gap-2 rounded-md bg-[#17876D] px-3 py-2 text-xl text-white transition-all"
                >
                  <Icons.staking className="size-5" /> Staking
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex h-10 items-center justify-center gap-2 rounded-lg border border-[#ECECED80] bg-[#AACBC433] text-sm font-bold text-[#03624C] focus-visible:outline-[#03624C]",
              {
                "h-[34px]": isMobile,
              },
            )}
          >
            {!address && (
              <p
                className={cn(
                  "flex w-[9.5rem] select-none items-center justify-center gap-1 bg-transparent text-sm",
                )}
              >
                Connect Wallet <ChevronDown className="!size-3" />
              </p>
            )}

            {address && (
              <>
                {!isMobile ? (
                  <div className="flex h-9 w-[9.5rem] items-center justify-center gap-2 rounded-md">
                    <Icons.gradient />
                    <p className="flex items-center gap-1 text-sm">
                      {address && shortAddress(address, 4, 4)}
                      <ChevronDown className="size-3" />
                    </p>
                  </div>
                ) : (
                  <div className="flex w-fit items-center justify-center gap-2 rounded-md px-3">
                    <Icons.wallet className="size-5 text-[#3F6870]" />
                    <ChevronDown className="size-4 text-[#3F6870]" />
                  </div>
                )}
              </>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[10rem] border border-[#03624C] bg-[#AACBC433] text-white">
            {!address ? (
              connectors?.map((connector) => (
                <DropdownMenuItem
                  key={connector.id}
                  className="text-[#03624C] hover:!bg-[#339d84] hover:!text-white"
                  onClick={() => {
                    connect({ connector });
                  }}
                >
                  <Image
                    src={connector.icon as string}
                    width={15}
                    height={15}
                    alt="icon"
                  />
                  <p>{connector.name}</p>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem
                onClick={() => disconnectAsync()}
                className="text-[#03624C] hover:!bg-[#339d84] hover:!text-white"
              >
                Disconnect
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#AACBC433]">
          <Icons.notification />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
