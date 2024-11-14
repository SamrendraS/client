"use client";

import { useAccount, useConnect, useDisconnect, useProvider } from "@starknet-react/core";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, shortAddress } from "@/lib/utils";
import { Icons } from "./Icons";
import { Skeleton } from "./ui/skeleton";
import { useAtom, useSetAtom } from "jotai";
import { providerAtom, userAddressAtom } from "@/store/common.store";
import { RpcProvider } from "starknet";

const Navbar = () => {
  const { address, isConnecting } = useAccount();
  const { provider } = useProvider();
  const { connect, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  // todo remove later
  useEffect(() => {
    if (connectors && connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  }, [connectors]);


  const [, setAddress] = useAtom(userAddressAtom);
  const setProvider = useSetAtom(providerAtom)

  useEffect(() => {
    setAddress(address);
  }, [address]);

  useEffect(() => {
    setProvider(provider as RpcProvider);
  }, [provider]);

  return (
    <div className="flex h-20 w-full items-center justify-end">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#ECECED80] bg-[#AACBC433] text-sm font-bold text-[#03624C] focus-visible:outline-[#03624C]">
            {!address && isConnecting && (
              <>
                {/* {starkProfile?.profilePicture ? (
                  <Image
                    src={starkProfile?.profilePicture}
                    className="shrink-0 rounded-full"
                    width={20}
                    height={20}
                    alt="skeleton-pfp"
                  />
                ) : ( */}
                <Icons.gradient />
                {/* )} */}
                <p className="flex items-center gap-1 text-sm">
                  <Skeleton className="h-5 w-full" />
                  <ChevronDown className="size-3" />
                </p>
              </>
            )}

            {address && !isConnecting && (
              <div className="flex h-9 w-[9.5rem] items-center justify-center gap-2 rounded-md">
                <Icons.gradient className="animate-pulse" />
                <p className="flex items-center gap-1 text-sm">
                  {address && shortAddress(address, 4, 4)}
                  <ChevronDown className="size-3" />
                </p>
              </div>
            )}

            {!address && !isConnecting && (
              <p
                className={cn(
                  "flex w-[9.5rem] select-none items-center justify-center gap-1 bg-transparent text-sm",
                )}
              >
                Connect Wallet <ChevronDown className="!size-3" />
              </p>
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
