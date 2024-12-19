"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { mainnet, sepolia } from "@starknet-react/chains";
import {
  Connector,
  jsonRpcProvider,
  StarknetConfig,
} from "@starknet-react/core";
import React from "react";
import { constants, RpcProviderOptions } from "starknet";

import { NETWORK } from "@/constants";

interface ProvidersProps {
  children: React.ReactNode;
}

const chains = [mainnet, sepolia];

const provider = jsonRpcProvider({
  rpc: () => {
    const args: RpcProviderOptions = {
      nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
      chainId:
        NETWORK === constants.NetworkName.SN_MAIN
          ? constants.StarknetChainId.SN_MAIN
          : constants.StarknetChainId.SN_SEPOLIA,
      blockIdentifier: "pending",
    };
    return args;
  },
});

const StarknetProvider: React.FC<ProvidersProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [connectors, setConnectors] = React.useState<Connector[]>([]);

  React.useEffect(() => {
    const initConnectors = async () => {
      const { getConnectors } = await import("./navbar");
      setConnectors(getConnectors(isMobile) as Connector[]);
    };
    initConnectors();
  }, [isMobile]);

  return (
    <StarknetConfig chains={chains} provider={provider} connectors={connectors}>
      {children}
    </StarknetConfig>
  );
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <StarknetProvider>{children}</StarknetProvider>;
};

export default Providers;
