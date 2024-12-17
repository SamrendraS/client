import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

interface VesuAPIResponse {
  data: {
    assets: Array<{
      stats: {
        supplyApy: {
          value: string;
          decimals: number;
        };
        defiSpringSupplyApr: {
          value: string;
          decimals: number;
        };
      };
    }>;
  };
}

interface EkuboPair {
    token0: {
      name: string;
      symbol: string;
    };
    token1: {
      name: string;
      symbol: string;
    };
    currentApr: number;
    consideredTvl: number;
  }

interface EkuboAPIResponse {
    strkPrice: number;
    totalStrk: number;
    pairs: EkuboPair[];
}

interface ProtocolYield {
  value: number | null;
  isLoading: boolean;
  error?: string;
}

const convertVesuValue = (value: string, decimals: number): number => {
  const numValue = Number(value);
  if (isNaN(numValue)) return 0;
  return numValue / Math.pow(10, decimals);
};

const findEndurPair = (pairs: EkuboPair[]): EkuboPair | undefined => {
    return pairs.find(pair => 
      (pair.token0.symbol === "xSTRK" && pair.token1.symbol === "STRK") ||
      (pair.token0.symbol === "STRK" && pair.token1.symbol === "xSTRK")
    );
};

const vesuYieldQueryAtom = atomWithQuery(() => ({
  queryKey: ["vesuYield"],
  queryFn: async (): Promise<ProtocolYield> => {
    try {
      const response = await fetch(
        "https://api.vesu.xyz/pools/2345856225134458665876812536882617294246962319062565703131100435311373119841"
      );
      const data: VesuAPIResponse = await response.json();
      
      const stats = data.data.assets[0].stats;
      const supplyApy = convertVesuValue(
        stats.supplyApy.value,
        stats.supplyApy.decimals
      );
      const defiSpringApr = convertVesuValue(
        stats.defiSpringSupplyApr.value,
        stats.defiSpringSupplyApr.decimals
      );

      return {
        value: (supplyApy + defiSpringApr) * 100,
        isLoading: false
      };
    } catch (error) {
      console.error("vesuYieldQueryAtom error:", error);
      return {
        value: null,
        isLoading: false,
        error: "Failed to fetch Vesu yield"
      };
    }
  },
  refetchInterval: 60000 
}));

const ekuboYieldQueryAtom = atomWithQuery(() => ({
    queryKey: ["ekuboYield"],
    queryFn: async (): Promise<ProtocolYield> => {
      try {
        const response = await fetch("https://mainnet-api.ekubo.org/defi-spring-incentives");
        const data: EkuboAPIResponse = await response.json();
        
        const endurPair = findEndurPair(data.pairs);
        
        if (!endurPair) {
          return {
            value: null,
            isLoading: false,
            error: "Endur pair not found"
          };
        }
  
        return {
          value: endurPair.currentApr * 100,
          isLoading: false
        };
      } catch (error) {
        console.error("ekuboYieldQueryAtom error:", error);
        return {
          value: null,
          isLoading: false,
          error: "Failed to fetch Ekubo yield"
        };
      }
    },
    refetchInterval: 60000
}));

const strkFarmYieldQueryAtom = atomWithQuery(() => ({
  queryKey: ["strkFarmYield"],
  queryFn: async (): Promise<ProtocolYield> => {
    return {
      value: null,
      isLoading: false,
      error: "Coming soon"
    };
  },
  refetchInterval: 60000
}));

export const vesuYieldAtom = atom((get) => {
  const { data, error } = get(vesuYieldQueryAtom);
  return {
    value: error || !data ? null : data.value,
    error,
    isLoading: !data && !error,
  };
});

export const ekuboYieldAtom = atom((get) => {
  const { data, error } = get(ekuboYieldQueryAtom);
  return {
    value: error || !data ? null : data.value,
    error,
    isLoading: !data && !error,
  };
});

export const strkFarmYieldAtom = atom((get) => {
  const { data, error } = get(strkFarmYieldQueryAtom);
  return {
    value: error || !data ? null : data.value,
    error,
    isLoading: !data && !error,
  };
});

export const protocolYieldsAtom = atom((get) => ({
  strkfarm: get(strkFarmYieldAtom),
  vesu: get(vesuYieldAtom),
  avnu: { value: null, isLoading: false }, 
  fibrous: { value: null, isLoading: false },
  ekubo: get(ekuboYieldAtom),
}));