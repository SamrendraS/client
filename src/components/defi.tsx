import React from "react";

import DefiCard from "./defi-card";

const Defi = () => {
  return (
    <div className="mt-12 w-full max-w-7xl px-4 sm:px-14">
      <h1 className="text-2xl font-semibold tracking-[-1%] text-black">Defi</h1>
      <p className="text-base font-normal tracking-[-1%] text-[#8D9C9C]">
        Use xSTRK to unlock greater rewards with DeFi opportunities!
      </p>

      <div className="mt-9">
        <p className="text-2xl font-normal tracking-[-1%] text-black">
          Opportunities
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          <DefiCard
            dapp="strkfarm"
            tokens={["xSTRK", ""]}
            description="Auto compound defi spring rewards on xSTRK"
          />
          <DefiCard
            dapp="vesu"
            tokens={["xSTRK", ""]}
            description="Borrow using xSTRK on Vesu"
          />
          <DefiCard
            dapp="avnu"
            tokens={["xSTRK", "STRK"]}
            description="Swap xSTRK for STRK on Avnu"
          />
          <DefiCard
            dapp="fibrous"
            tokens={["xSTRK", "STRK"]}
            description="Swap xSTRK for STRK on Fibrous"
          />
          <DefiCard
            dapp="ekubo"
            tokens={["xSTRK", "STRK"]}
            description="Provide liquidity for xSTRK/STRK on Ekubo"
          />
        </div>
      </div>
    </div>
  );
};

export default Defi;
