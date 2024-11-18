import { toast } from "@/hooks/use-toast";
import { BigNumber } from "bignumber.js";
import { clsx, type ClassValue } from "clsx";
import { num } from "starknet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(_address: string, startChars = 4, endChars = 4) {
  const x = num.toHex(num.getDecimalString(_address));
  return truncate(x, startChars, endChars);
}

export function truncate(str: string, startChars: number, endChars: number) {
  if (str.length <= startChars + endChars) {
    return str;
  }

  return `${str.slice(0, startChars)}...${str.slice(
    str.length - endChars,
    str.length,
  )}`;
}

export const etherToWeiBN = (amount: any) => {
  if (!amount) {
    return 0;
  }
  const decimals =
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
  if (!decimals) {
    return 0;
  }
  try {
    const factor = new BigNumber(10).exponentiatedBy(18); // Wei in 1 Ether
    const amountBN = new BigNumber(amount)
      .times(factor)
      .times(new BigNumber(10).exponentiatedBy(decimals))
      .dividedBy(factor)
      .integerValue(BigNumber.ROUND_DOWN);

    // Formatting the result to avoid exponential notation
    const formattedAmount = amountBN.toFixed();
    return formattedAmount;
  } catch (e) {
    console.warn("etherToWeiBN fails with error: ", e);
    return amount;
  }
};

export function generateReferralCode() {
  const code = Math.random().toString(36).slice(2, 8);
  return code;
}

export function standariseAddress(address: string | bigint) {
  let _a = address;
  if (!address) {
    _a = "0";
  }
  const a = num.getHexString(num.getDecimalString(_a.toString()));
  return a;
}

export function copyReferralLink(refCode: string) {
  navigator.clipboard.writeText(getReferralUrl(refCode));

  toast({
    description: "Referral link copied to clipboard",
  });
}

export function getReferralUrl(referralCode: string) {
  if (window.location.origin.includes("endur.fi")) {
    return `https://endur.fi/r/${referralCode}`;
  }
  return `${window.location.origin}/r/${referralCode}`;
}

export function timeAgo(unixTimestamp: number): string {
  const currentTime = new Date();
  const timestampTime = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  const difference = currentTime.getTime() - timestampTime.getTime();

  if (difference < 0) {
    return "in the future";
  }

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}
