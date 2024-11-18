"use client";

import {
  InjectedConnector,
  useAccount,
  useConnect,
  useDisconnect,
  useProvider,
  useSwitchChain,
} from "@starknet-react/core";
import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Copy, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { constants, num, RpcProvider } from "starknet";
import {
  connect,
  ConnectOptionsWithConnectors,
  disconnect,
  StarknetkitConnector,
} from "starknetkit";
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

import {
  cn,
  copyReferralLink,
  generateReferralCode,
  shortAddress,
} from "@/lib/utils";
import {
  lastWalletAtom,
  providerAtom,
  userAddressAtom,
} from "@/store/common.store";
import { referralCodeAtom } from "@/store/referral.store";
import { UserInfoAtom } from "@/store/user-info.store";

import { NETWORK } from "../../constants";
import { Icons } from "./Icons";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useSidebar } from "./ui/sidebar";

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

  const [___, setReferralCode] = useAtom(referralCodeAtom);
  const [__, setAddress] = useAtom(userAddressAtom);
  const [_, setLastWallet] = useAtom(lastWalletAtom);
  const userInfoAtom = useAtomValue(UserInfoAtom);

  const setProvider = useSetAtom(providerAtom);

  const searchParams = useSearchParams();
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

  async function connectWallet(config = connectorConfig) {
    try {
      const { connector } = await connect(config);

      if (connector) {
        connectSnReact({ connector: connector as any });
      }
    } catch (error) {
      console.error("connectWallet error", error);
    }
  }

  const userInfo = React.useMemo(() => userInfoAtom.data, [userInfoAtom]);

  // switch chain if not on the required chain
  React.useEffect(() => {
    if (
      chainId &&
      chainId.toString() !== num.getDecimalString(requiredChainId)
    ) {
      switchChain();
    }
  }, [chainId]);

  React.useEffect(() => {
    if (error) {
      console.error("switchChain error", error);
    }
  }, [error]);

  // attempt to connect wallet on load
  React.useEffect(() => {
    const config = connectorConfig;
    connectWallet({
      ...config,
      modalMode: "neverAsk",
    });
  }, []);

  React.useEffect(() => {
    if (connector) {
      const name: string = connector.name;
      setLastWallet(name);
    }
  }, [connector]);

  React.useEffect(() => {
    // autoConnect();
    setAddress(address);
    setProvider(provider as RpcProvider);
  }, [address, provider]);

  // React.useEffect(() => {
  //   autoConnect();
  // }, [lastWallet]);

  React.useEffect(() => {
    (async () => {
      try {
        let referrer = searchParams.get("referrer");

        if (address && referrer && address === referrer) {
          referrer = null;
        }

        const res = await axios.post("/api/referral/createUser", {
          address,
          myReferralCode: generateReferralCode(),
          referrerAddress: referrer,
        });

        console.log(res);

        if (res.data.success && res.data.user) {
          setReferralCode(res.data.user.referralCode);
        }
      } catch (error) {
        console.error("Error while creating user", error);
      }
    })();
  }, [address, setReferralCode]);

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
        {address && userInfo?.user?.referralCode && (
          <div className="flex flex-col items-center gap-1 text-sm">
            <p className="text-muted-foreground">Your referral link</p>
            <span className="flex items-center gap-2 text-xs underline">
              {userInfo.user.referralCode}
              <Copy
                onClick={() => {
                  copyReferralLink(userInfo.user.referralCode);
                }}
                className="size-3 cursor-pointer text-muted-foreground transition-all hover:text-foreground"
              />
            </span>
          </div>
        )}

        <button
          className={cn(
            "flex h-10 items-center justify-center gap-2 rounded-lg border border-[#ECECED80] bg-[#AACBC433] text-sm font-bold text-[#03624C] focus-visible:outline-[#03624C]",
            {
              "h-[34px]": isMobile,
            },
          )}
          onClick={() =>
            !address ? connectWallet() : (disconnect(), disconnectAsync())
          }
        >
          {!address && (
            <p
              className={cn(
                "flex w-[9.5rem] select-none items-center justify-center gap-1 bg-transparent text-sm",
              )}
            >
              Connect Wallet
            </p>
          )}

          {address && (
            <>
              {!isMobile ? (
                <div className="flex h-9 w-[9.5rem] items-center justify-center gap-2 rounded-md">
                  <Icons.gradient />
                  <p className="flex items-center gap-1 text-sm">
                    {address && shortAddress(address, 4, 4)}
                    <X className="size-4 text-[#3F6870]" />
                  </p>
                </div>
              ) : (
                <div className="flex w-fit items-center justify-center gap-2 rounded-md px-3">
                  <Icons.wallet className="size-5 text-[#3F6870]" />
                  {shortAddress(address, 4, 4)}
                  <X className="size-4 text-[#3F6870]" />
                </div>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
