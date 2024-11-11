'use client';

import {
  useAccount,
  useConnect,
  useDisconnect,
  useStarkProfile,
} from '@starknet-react/core';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, shortAddress } from '@/lib/utils';
import { Icons } from './Icons';
import { buttonVariants } from './ui/button';
import { Skeleton } from './ui/skeleton';

const Navbar = () => {
  const { address, isConnecting, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const { data: starkProfile } = useStarkProfile({
    address,
    useDefaultPfp: true,
  });

  return (
    <div className="w-full flex justify-end items-center h-20">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-10 focus-visible:outline-[#03624C] rounded-lg border flex gap-2 items-center justify-center text-[#03624C] border-[#ECECED80] bg-[#AACBC433] text-sm font-bold">
            {!address && isConnecting && (
              <>
                {starkProfile?.profilePicture ? (
                  <Image
                    src={starkProfile?.profilePicture}
                    className="shrink-0 rounded-full"
                    width={20}
                    height={20}
                    alt="skeleton-pfp"
                  />
                ) : (
                  <Icons.gradient />
                )}
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
                  'flex w-[9.5rem] select-none items-center justify-center gap-1 text-sm bg-transparent',
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
                  className="hover:!bg-[#339d84] hover:!text-white text-[#03624C]"
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
                className="hover:!bg-[#339d84] hover:!text-white text-[#03624C]"
              >
                Disconnect
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="bg-[#AACBC433] w-8 h-8 rounded-full flex items-center justify-center">
          <Icons.notification />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
