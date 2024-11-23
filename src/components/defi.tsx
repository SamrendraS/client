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
          <DefiCard />
          <DefiCard />
          <DefiCard />
          <DefiCard />
          <DefiCard />
          <DefiCard />
        </div>
      </div>
    </div>
  );
};

export default Defi;
