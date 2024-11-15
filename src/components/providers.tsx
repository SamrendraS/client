"use client";

import { devnet, mainnet } from "@starknet-react/chains";
import { jsonRpcProvider, StarknetConfig } from "@starknet-react/core";
import React from "react";
import { constants, RpcProviderOptions } from "starknet";

import { MYCONNECTORS } from "./navbar";

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
  // const { connectors } = useInjectedConnectors({
  //   recommended: [argent(), braavos()],
  //   includeRecommended: "onlyIfNoConnectors",
  //   order: "alphabetical",
  // });

  if (typeof window === "undefined") return null;

  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={MYCONNECTORS}
    >
      {children}
    </StarknetConfig>
  );
};

export default Providers;
