"use client";

import { devnet, mainnet } from "@starknet-react/chains";
import {
  argent,
  braavos,
  jsonRpcProvider,
  StarknetConfig,
  useInjectedConnectors,
} from "@starknet-react/core";
import React from "react";
import { constants, RpcProviderOptions } from "starknet";

interface ProvidersProps {
  children: React.ReactNode;
}

const chains = [mainnet, devnet];

const provider = jsonRpcProvider({
  rpc: () => {
    const args: RpcProviderOptions = {
      nodeUrl:
        "https://starknet-mainnet.blastapi.io/4ea5a9e5-6e2b-4e4d-8f0a-a87f5cb84914",
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    };
    return args;
  },
});

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  if (typeof window === "undefined") return null;

  return (
    <StarknetConfig chains={chains} provider={provider} connectors={connectors}>
      {children}
    </StarknetConfig>
  );
};

export default Providers;
