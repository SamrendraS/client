"use client";

import { devnet, mainnet } from "@starknet-react/chains";
import {
  Connector,
  jsonRpcProvider,
  StarknetConfig,
} from "@starknet-react/core";
import React from "react";
import { constants, RpcProviderOptions } from "starknet";
import { getConnectors } from "./navbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProvidersProps {
  children: React.ReactNode;
}

const chains = [mainnet, devnet];

const provider = jsonRpcProvider({
  rpc: () => {
    const args: RpcProviderOptions = {
      nodeUrl: process.env.RPC_URL,
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    };
    return args;
  },
});

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const isMobile = useIsMobile();

  if (typeof window === "undefined") return null;

  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={getConnectors(isMobile) as Connector[]}
    >
      {children}
    </StarknetConfig>
  );
};

export default Providers;
