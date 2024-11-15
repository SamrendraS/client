"use client";

import {
  connect,
  ConnectOptionsWithConnectors,
  disconnect,
  StarknetkitConnector,
} from "starknetkit";
import { useAtom, useSetAtom } from "jotai";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { constants, num, RpcProvider } from "starknet";
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

import { cn, shortAddress } from "@/lib/utils";
import {
  lastWalletAtom,
  providerAtom,
  userAddressAtom,
} from "@/store/common.store";
import { NETWORK } from "../../constants";
import { Icons } from "./Icons";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useSidebar } from "./ui/sidebar";
import {
  InjectedConnector,
  useAccount,
  useConnect,
  useDisconnect,
  useProvider,
  useSwitchChain,
} from "@starknet-react/core";

export const CONNECTOR_NAMES = ["Braavos", "Argent X", "Argent (mobile)"];

export function getConnectors(isMobile: boolean) {
  const mobileConnector = ArgentMobileConnector.init({
    options: {
      dappName: "Endurfi",
      url: window.location.hostname,
      chainId: constants.NetworkName.SN_MAIN,
    },
    inAppBrowserOptions: {},
  }) as StarknetkitConnector;

  const argentXConnector = new InjectedConnector({
    options: {
      id: "argentX",
      name: "Argent X",
    },
  });

  const braavosConnector = new InjectedConnector({
    options: {
      id: "braavos",
      name: "Braavos",
    },
  });

  const webWalletConnector = new WebWalletConnector({
    url: "https://web.argent.xyz",
  }) as StarknetkitConnector;

  const isMainnet = NETWORK === constants.NetworkName.SN_MAIN;
  if (isMainnet) {
    if (isInArgentMobileAppBrowser()) {
      return [mobileConnector];
    } else if (isMobile) {
      return [mobileConnector, webWalletConnector];
    }
    return [
      argentXConnector,
      braavosConnector,
      mobileConnector,
      webWalletConnector,
    ];
  }
  return [argentXConnector, braavosConnector];
}

const Navbar = () => {
  const { address, connector, chainId } = useAccount();
  const { provider } = useProvider();
  const { connect: connectSnReact } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isMobile } = useSidebar();

  const connectorConfig: ConnectOptionsWithConnectors = useMemo(() => {
    return {
      modalMode: "canAsk",
      modalTheme: "light",
      webWalletUrl: "https://web.argent.xyz",
      argentMobileOptions: {
        dappName: "Endur.fi",
        chainId: NETWORK,
        url: window.location.hostname,
      },
      dappName: "Endur.fi",
      connectors: getConnectors(isMobile) as StarknetkitConnector[],
    };
  }, [isMobile]);

  const requiredChainId = useMemo(() => {
    return NETWORK == constants.NetworkName.SN_MAIN
      ? constants.StarknetChainId.SN_MAIN
      : constants.StarknetChainId.SN_SEPOLIA;
  }, []);

  const { switchChain, error } = useSwitchChain({
    params: {
      chainId: requiredChainId,
    },
  });

  useEffect(() => {
    if (error) {
      console.error("switchChain error", error);
    }
  }, [error]);

  async function connectWallet(config = connectorConfig) {
    try {
      const { wallet, connector, connectorData } = await connect(config);
      console.log(
        "wallet",
        NETWORK,
        wallet,
        connector,
        connectorData,
        requiredChainId,
        num.getDecimalString(requiredChainId),
      );

      if (connector) {
        connectSnReact({ connector: connector as any });
      }
    } catch (error) {
      console.error("connectWallet error", error);
    }
  }

  // switch chain if not on the required chain
  useEffect(() => {
    if (
      chainId &&
      chainId.toString() !== num.getDecimalString(requiredChainId)
    ) {
      switchChain();
    }
  }, [chainId]);

  // attempt to connect wallet on load
  useEffect(() => {
    const config = connectorConfig;
    connectWallet({
      ...config,
      modalMode: "neverAsk",
    });
  }, []);

  const [_, setAddress] = useAtom(userAddressAtom);
  const setProvider = useSetAtom(providerAtom);
  const [lastWallet, setLastWallet] = useAtom(lastWalletAtom);

  useEffect(() => {
    if (connector) {
      const name: string = connector.name;
      setLastWallet(name);
    }
  }, [connector]);

  useEffect(() => {
    // autoConnect();
    setAddress(address);
    setProvider(provider as RpcProvider);
  }, [lastWallet, address, provider]);

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
        <button
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
              onClick={() => {
                connectWallet();
              }}
            >
              Connect Wallet
            </p>
          )}

          {address && (
            <>
              {!isMobile ? (
                <div
                  className="flex h-9 w-[9.5rem] items-center justify-center gap-2 rounded-md"
                  onClick={() => {
                    disconnect();
                    disconnectAsync();
                  }}
                >
                  <Icons.gradient />
                  <p className="flex items-center gap-1 text-sm">
                    {address && shortAddress(address, 4, 4)}
                    <X className="size-4 text-[#3F6870]" />
                  </p>
                </div>
              ) : (
                <div
                  className="flex w-fit items-center justify-center gap-2 rounded-md px-3"
                  onClick={() => {
                    disconnect();
                    disconnectAsync();
                  }}
                >
                  <Icons.wallet className="size-5 text-[#3F6870]" />
                  {shortAddress(address, 4, 4)}
                  <X className="size-4 text-[#3F6870]" />
                </div>
              )}
            </>
          )}
        </button>
        {/* </DropdownMenuTrigger> */}
      </div>
    </div>
  );
};

export default Navbar;
